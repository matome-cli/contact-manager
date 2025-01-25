import { useEffect, useState } from "react";

type Window = {
  height: number;
  width: number;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Window>({
    // default
    height: window.innerHeight,
    width: window.innerHeight,
  });

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timerID: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>) => {
      if (timerID) {
        clearTimeout(timerID);
      }

      timerID = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  function handleResize() {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  const debouncedHandleResise = debounce(handleResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResise);

    return () => window.removeEventListener("resize", debouncedHandleResise);
  }, []); // what should the dependencies be

  return windowSize;
};
