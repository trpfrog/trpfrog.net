import React from "react";

export default function useScrollPositionKeeper(ref?: React.RefObject<HTMLElement>) {
  const scrollPosition = React.useRef(0);

  // restore scroll position
  React.useEffect(() => {
    const element = ref ? ref.current : typeof window !== "undefined" ? window : undefined;
    element?.scrollTo(0, scrollPosition.current);
  })

  // register scroll event
  React.useEffect(() => {
    const element = ref ? ref.current : typeof window !== "undefined" ? window : undefined;
    if (!element) return;

    const handleScroll = () => {
      scrollPosition.current = 'scrollTop' in element
        ? element.scrollTop
        : (element ? window.scrollY : 0)
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
}
