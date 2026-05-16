import React, { useEffect } from "react";
import "./SnailsTrail.css";

function SnailsTrail(props) {
  useEffect(() => {
    // Hide scrollbar for fullscreen game experience
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="snailstrail-container">
      <iframe
        src={`${process.env.PUBLIC_URL}/snailstrail/index.html`}
        title="Snail's Trail Game"
        className="snailstrail-iframe"
      />
    </div>
  );
}

export default SnailsTrail;
