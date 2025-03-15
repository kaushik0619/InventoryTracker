import { useLocation } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { Product } from "@shared/schema";

interface LowStockTableProps {
  products: Product[];
  onOrderInventory: () => void;
}

export function LowStockTable({ products, onOrderInventory }: LowStockTableProps) {
  const [_, navigate] = useLocation();

  const getStockStatus = (current: number, minimum: number) => {
    const ratio = current / minimum;
    if (ratio < 0.25) return "critical";
    if (ratio < 0.5) return "low";
    return "normal";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min. Required</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{product.sku}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {product.quantity} units
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {product.minQuantity} units
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={getStockStatus(product.quantity, product.minQuantity)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-4 rounded-b-lg">
        <button
          onClick={onOrderInventory}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Order inventory
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "critical":
      return (
        <Badge variant="destructive" className="px-2 py-1 text-xs">
          Critical
        </Badge>
      );
    case "low":
      return (
        <Badge variant="default" className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs">
          Low
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 px-2 py-1 text-xs">
          Normal
        </Badge>
      );
  }
}
