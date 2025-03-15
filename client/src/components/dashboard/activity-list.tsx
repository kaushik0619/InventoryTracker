import { 
  Package, DollarSign, UserPlus, ClipboardList, 
  Box, ShoppingCart, FileText 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Activity } from "@shared/schema";

interface ActivityListProps {
  activities: Activity[];
  onViewAll: () => void;
}

export function ActivityList({ activities, onViewAll }: ActivityListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.description.split(":")[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description.includes(":") 
                      ? activity.description.split(":")[1] 
                      : ""}
                  </p>
                </div>
                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                  <time dateTime={activity.timestamp.toString()}>
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewAll();
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all activity
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
        </a>
      </div>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "inventory":
      return (
        <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Package className="h-5 w-5 text-blue-600" />
        </span>
      );
    case "sale":
      return (
        <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-green-600" />
        </span>
      );
    case "client":
      return (
        <span className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
          <UserPlus className="h-5 w-5 text-purple-600" />
        </span>
      );
    case "request":
      return (
        <span className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <ClipboardList className="h-5 w-5 text-yellow-600" />
        </span>
      );
    case "expense":
      return (
        <span className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
          <FileText className="h-5 w-5 text-red-600" />
        </span>
      );
    default:
      return (
        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Box className="h-5 w-5 text-gray-600" />
        </span>
      );
  }
}
