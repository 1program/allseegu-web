import ApiError from "@/api/ApiError";

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return "다시 시도해 주세요.";
}

export default 1;
