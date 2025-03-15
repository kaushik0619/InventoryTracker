import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { InventoryRequestFormValues } from "@/lib/types";
import { Product } from "@shared/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface InventoryRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  productId: z.number().optional(),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  notes: z.string().optional(),
});

export function InventoryRequestForm({ isOpen, onClose }: InventoryRequestFormProps) {
  const [showCustomProduct, setShowCustomProduct] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const form = useForm<InventoryRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      quantity: 1,
      priority: "medium",
      notes: "",
    },
  });

  const createInventoryRequestMutation = useMutation({
    mutationFn: async (data: InventoryRequestFormValues) => {
      return apiRequest("POST", "/api/inventory-requests", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      
      toast({
        title: "Success",
        description: "Inventory request submitted successfully.",
      });
      
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit inventory request.",
      });
    },
  });

  const onSubmit = (data: InventoryRequestFormValues) => {
    createInventoryRequestMutation.mutate(data);
  };

  const handleProductChange = (value: string) => {
    if (value === "other") {
      setShowCustomProduct(true);
      form.setValue("productId", undefined);
      form.setValue("productName", "");
    } else {
      setShowCustomProduct(false);
      const selectedProduct = products?.find(p => p.id.toString() === value);
      if (selectedProduct) {
        form.setValue("productId", selectedProduct.id);
        form.setValue("productName", selectedProduct.name);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Inventory Request</DialogTitle>
          <DialogDescription>
            Submit a request for new inventory items.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Product Selection */}
            <div className="space-y-2">
              <label htmlFor="product-select" className="text-sm font-medium text-gray-700">
                Item
              </label>
              <select
                id="product-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                onChange={(e) => handleProductChange(e.target.value)}
                disabled={isLoadingProducts}
              >
                <option value="">Select an item</option>
                {products?.map((product) => (
                  <option key={product.id} value={product.id.toString()}>
                    {product.name}
                  </option>
                ))}
                <option value="other">-- Other --</option>
              </select>
            </div>

            {/* Custom Product Name */}
            {showCustomProduct && (
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specify Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional information"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createInventoryRequestMutation.isPending}
              >
                {createInventoryRequestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
