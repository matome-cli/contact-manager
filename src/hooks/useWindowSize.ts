import { useEffect, useState } from "react";

type Window = {
  height: number;
  width: number;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Window>({
    height: window.innerHeight,
    width: window.innerHeight,
  });

  function handleResize() {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  useEffect(() => {
    document.addEventListener("resize", handleResize);

    return () => document.removeEventListener("resize", handleResize);
  }, []); // what should the dependencies be

  return windowSize;
};
