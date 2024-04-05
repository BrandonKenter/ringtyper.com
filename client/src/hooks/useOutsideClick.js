import { useEffect } from "react";

const useOutsideClick = (modalRef, setModalOpened) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setModalOpened(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
};

export default useOutsideClick;
