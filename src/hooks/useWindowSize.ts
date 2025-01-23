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

  function handleResize() {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // what should the dependencies be

  return windowSize;
};
