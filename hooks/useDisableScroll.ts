import {useEffect} from "react";

export default function useDisableScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.onscroll = () => {
      window.scrollTo(0, 0)
    }
    return () => {
      window.onscroll = null
    }
  })
}
