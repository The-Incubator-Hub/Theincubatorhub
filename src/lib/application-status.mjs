export const APPLICATION_STATUSES = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "ENROLLED",
]

export const REVIEW_DECISION_STATUSES = [
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "ENROLLED",
]

const STATUS_LABELS = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  ENROLLED: "Enrolled",
}

export function getApplicationStatusLabel(status) {
  return STATUS_LABELS[status] || "Unknown"
}

export function getStatusTone(status) {
  if (status === "ACCEPTED" || status === "ENROLLED") return "green"
  if (status === "REJECTED") return "red"
  if (status === "UNDER_REVIEW") return "amber"
  if (status === "SUBMITTED") return "blue"
  return "gray"
}

