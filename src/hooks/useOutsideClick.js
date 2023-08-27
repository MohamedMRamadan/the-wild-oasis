import { useEffect, useRef } from "react";

function useOutsideClick(close, listingCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClick, listingCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listingCapturing);
  }, [close, listingCapturing]);
  return ref;
}

export default useOutsideClick;
