import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // Get the current route path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll the window to the top
  }, [pathname]); // Trigger this effect on route changes

  return null; // This component doesn't render any UI
}

export default ScrollToTop;
