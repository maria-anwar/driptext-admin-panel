import { format } from "date-fns"; // 2. import format from date-fns
const formatDate = (dateString: Date | string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd.MM.yyyy"); // "August 2025"
  };

  export default formatDate;