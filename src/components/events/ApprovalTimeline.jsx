import { Badge } from "@/components/ui";
import { CheckCircle, XCircle, Clock, User, Calendar } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

/**
 * Approval Timeline Component
 * Visual timeline showing event approval workflow stages
 */

const ApprovalTimeline = ({ approvals = [], currentStatus = "DRAFT" }) => {
  // Approval workflow stages
  const stages = [
    {
      key: "DRAFT",
      label: "Draft",
      icon: Clock,
      description: "Event created",
    },
    {
      key: "FACULTY_PENDING",
      label: "Faculty Review",
      icon: User,
      description: "Awaiting faculty approval",
    },
    {
      key: "ADMIN_PENDING",
      label: "Admin Review",
      icon: User,
      description: "Awaiting admin approval",
    },
    {
      key: "APPROVED",
      label: "Approved",
      icon: CheckCircle,
      description: "Event approved and published",
    },
  ];

  // Get approval for specific stage
  const getApprovalForStage = (stageKey) => {
    if (stageKey === "DRAFT") return null;
    if (stageKey === "FACULTY_PENDING") {
      return approvals.find((a) => a.approvalLevel === "FACULTY");
    }
    if (stageKey === "ADMIN_PENDING") {
      return approvals.find((a) => a.approvalLevel === "ADMIN");
    }
    if (stageKey === "APPROVED") {
      const allApproved = approvals.every((a) => a.status === "APPROVED");
      return allApproved ? approvals[approvals.length - 1] : null;
    }
    return null;
  };

  // Get stage status (completed, active, pending, rejected)
  const getStageStatus = (stageKey, index) => {
    if (currentStatus === "REJECTED") {
      const approval = getApprovalForStage(stageKey);
      if (approval && approval.status === "REJECTED") return "rejected";
      if (index === 0) return "completed";
      return "inactive";
    }

    const stageIndex = stages.findIndex((s) => s.key === stageKey);
    const currentIndex = stages.findIndex((s) => s.key === currentStatus);

    if (stageIndex < currentIndex) return "completed";
    if (stageIndex === currentIndex) return "active";
    return "pending";
  };

  // Get approval status badge
  const getStatusBadge = (approval) => {
    if (!approval) return null;

    if (approval.status === "APPROVED") {
      return (
        <Badge variant="success" size="sm">
          Approved
        </Badge>
      );
    }
    if (approval.status === "REJECTED") {
      return (
        <Badge variant="error" size="sm">
          Rejected
        </Badge>
      );
    }
    if (approval.status === "PENDING") {
      return (
        <Badge variant="warning" size="sm">
          Pending
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {stages.map((stage, index) => {
        const status = getStageStatus(stage.key, index);
        const approval = getApprovalForStage(stage.key);
        const Icon = stage.icon;
        const isLast = index === stages.length - 1;

        return (
          <div key={stage.key} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div
                className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                  status === "completed"
                    ? "bg-success-500"
                    : status === "rejected"
                      ? "bg-error-500"
                      : "bg-neutral-200"
                }`}
                style={{ height: "calc(100% + 1.5rem)" }}
              />
            )}

            {/* Stage */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  status === "completed"
                    ? "bg-success-100 text-success-600"
                    : status === "active"
                      ? "bg-primary-100 text-primary-600 ring-4 ring-primary-50"
                      : status === "rejected"
                        ? "bg-error-100 text-error-600"
                        : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {status === "rejected" ? (
                  <XCircle className="w-6 h-6" />
                ) : status === "completed" ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`font-semibold ${
                      status === "active"
                        ? "text-primary-900"
                        : status === "completed"
                          ? "text-success-900"
                          : status === "rejected"
                            ? "text-error-900"
                            : "text-neutral-500"
                    }`}
                  >
                    {stage.label}
                  </h4>
                  {getStatusBadge(approval)}
                </div>

                <p
                  className={`text-sm mb-2 ${
                    status === "active" ||
                    status === "completed" ||
                    status === "rejected"
                      ? "text-neutral-600"
                      : "text-neutral-400"
                  }`}
                >
                  {stage.description}
                </p>

                {/* Approval Details */}
                {approval && (
                  <div className="mt-3 p-3 bg-neutral-50 rounded-lg space-y-2">
                    {approval.approvedBy && (
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <User className="w-4 h-4 text-neutral-400" />
                        <span>
                          {approval.status === "APPROVED"
                            ? "Approved by"
                            : "Reviewed by"}
                          :{" "}
                          <span className="font-medium">
                            {approval.approvedBy.name}
                          </span>
                        </span>
                      </div>
                    )}

                    {approval.approvedAt && (
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span>
                          {formatDate(approval.approvedAt, "datetime")}
                        </span>
                      </div>
                    )}

                    {approval.comments && (
                      <div className="mt-2 pt-2 border-t border-neutral-200">
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Comments:</span>{" "}
                          {approval.comments}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Active stage message */}
                {status === "active" && !approval && stage.key !== "DRAFT" && (
                  <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      Waiting for {stage.label.toLowerCase()} approval...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApprovalTimeline;
