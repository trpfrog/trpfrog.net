import React from "react";

export default function useScrollPositionKeeper(ref: React.RefObject<HTMLElement>) {
  const scrollPosition = React.useRef(0);

  // restore scroll position
  React.useEffect(() => {
    ref.current?.scrollTo(0, scrollPosition.current);
  })

  // register scroll event
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      scrollPosition.current = element.scrollTop;
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);
}
