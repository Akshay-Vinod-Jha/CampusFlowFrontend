/**
 * QuickActions Widget
 * Role-specific quick action shortcuts
 */

import { Card, Button } from "../ui";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = ({ actions = [], title = "Quick Actions" }) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <p className="text-sm text-neutral-600">Common tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Link key={index} to={action.link} className="block">
              <button className="w-full p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${action.color || "bg-primary-100"} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    {action.icon && (
                      <action.icon
                        className={`w-5 h-5 ${action.iconColor || "text-primary-600"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {action.label}
                    </p>
                    {action.description && (
                      <p className="text-sm text-neutral-600 mt-0.5">
                        {action.description}
                      </p>
                    )}
                  </div>
                  {action.badge && (
                    <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {action.badge}
                    </div>
                  )}
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
