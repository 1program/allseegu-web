export enum RequestStatus {
  PENDING = "미승인",
  APPROVED = "승인",
  REJECTED = "반려",
}

export const requestStatusColor: Record<RequestStatus, "default" | "primary" | "danger"> = {
  [RequestStatus.PENDING]: "default",
  [RequestStatus.APPROVED]: "primary",
  [RequestStatus.REJECTED]: "danger",
};
