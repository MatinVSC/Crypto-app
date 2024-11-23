import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handelClickBody(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener('click', handelClickBody, listenCapturing);

    return () => document.removeEventListener('click', handelClickBody, listenCapturing);
  }, [handler, listenCapturing])

  return ref;
}