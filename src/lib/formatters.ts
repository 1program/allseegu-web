import { format } from "date-fns";

export function formatDate(date?: Date | number | null) {
  if (date != null) {
    return format(date, "yyyy. MM. dd");
  }

  return null;
}

export default 1;
