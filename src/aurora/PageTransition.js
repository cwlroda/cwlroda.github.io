import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Re-mounts its children whenever the pathname changes so the CSS
// keyframe in aurora.css plays on every navigation. Scrolls the
// window back to the top on route change so the entering page starts
// at its hero, not at the previous page's scroll offset.
export default function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="aur-page-transition">
      {children}
    </div>
  );
}
