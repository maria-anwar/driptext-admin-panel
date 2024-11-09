import { useEffect } from "react";
const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Driptext`;
  }, [title]);
};

export default useTitle;
