import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCardProps } from "@/lib/types";

export function StatCard({
  title,
  value,
  icon,
  iconBgColor,
  change,
  action,
}: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBgColor)}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        {change ? (
          <div className="text-sm">
            <span
              className={cn(
                "font-medium mr-2 flex items-center",
                change.type === "increase" ? "text-green-600" : "text-red-600"
              )}
            >
              {change.type === "increase" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {change.value}%
            </span>
            <span className="text-gray-500">{change.text}</span>
          </div>
        ) : null}
        
        {action ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              action.onClick();
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {action.text} <ArrowRight className="ml-1 inline-block h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
