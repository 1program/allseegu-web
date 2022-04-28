export enum QnaStatus {
  PENDING = "미답변",
  ANSWERED = "답변",
  REOPENED = "추가답변",
}

export const qnaStatusColor: Record<QnaStatus, "default" | "primary" | "danger"> = {
  [QnaStatus.PENDING]: "default",
  [QnaStatus.ANSWERED]: "primary",
  [QnaStatus.REOPENED]: "danger",
};
