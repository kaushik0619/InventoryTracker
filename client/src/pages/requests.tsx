import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TopBar } from "@/components/layout/topbar";
import { Sidebar } from "@/components/layout/sidebar";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryRequest, Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { InventoryRequestForm } from "@/components/inventory/inventory-request-form";
import { 
  ClipboardList, CheckCircle, XCircle, 
  AlertCircle, Clock, Package, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Requests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<InventoryRequest | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery<InventoryRequest[]>({
    queryKey: ["/api/inventory-requests"],
  });

  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const openStatusDialog = (request: InventoryRequest) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setIsStatusDialogOpen(true);
  };

  const closeStatusDialog = () => {
    setIsStatusDialogOpen(false);
    setSelectedRequest(null);
  };

  // Update request status mutation
  const updateRequestStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      return apiRequest("PUT", `/api/inventory-requests/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Success",
        description: "Request status updated successfully",
      });
      closeStatusDialog();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update request status",
      });
    }
  });

  const handleStatusChange = () => {
    if (selectedRequest && newStatus) {
      updateRequestStatusMutation.mutate({ 
        id: selectedRequest.id, 
        status: newStatus 
      });
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center">
            {status}
          </Badge>
        );
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <Badge variant="destructive" className="flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-orange-100 text-orange-800 flex items-center">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="flex items-center">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center">
            {priority}
          </Badge>
        );
    }
  };

  // Table columns
  const columns: ColumnDef<InventoryRequest>[] = [
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{request.productName}</div>
              {request.productId && <div className="text-sm text-gray-500">ID: {request.productId}</div>}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        return <span className="font-medium">{row.getValue("quantity")} units</span>;
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string;
        return getPriorityBadge(priority);
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return getStatusBadge(status);
      },
    },
    {
      accessorKey: "createdAt",
      header: "Requested",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string | Date;
        const formattedDate = typeof date === 'string'
          ? formatDistanceToNow(new Date(date), { addSuffix: true })
          : formatDistanceToNow(date, { addSuffix: true });
          
        return <span className="text-gray-500">{formattedDate}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => openStatusDialog(request)}
          >
            Update Status
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Inventory Requests" onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Manage Inventory Requests</h2>
            <Button onClick={openRequestModal}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <DataTable
              columns={columns}
              data={requests || []}
              searchPlaceholder="Search requests..."
              searchColumn="productName"
            />
          </div>
        </main>
      </div>

      {/* Inventory Request Modal */}
      <InventoryRequestForm 
        isOpen={isRequestModalOpen} 
        onClose={closeRequestModal} 
      />

      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={closeStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Request Status</DialogTitle>
            <DialogDescription>
              Change the status for request: {selectedRequest?.productName} ({selectedRequest?.quantity} units)
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Current Status</label>
                <div className="mt-1">
                  {selectedRequest && getStatusBadge(selectedRequest.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeStatusDialog}>
              Cancel
            </Button>
            <Button 
              onClick={handleStatusChange}
              disabled={updateRequestStatusMutation.isPending || newStatus === selectedRequest?.status}
            >
              {updateRequestStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
