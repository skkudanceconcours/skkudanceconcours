import { useEffect } from "react";

const useBodyScrollLock = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
};

export default useBodyScrollLock;
