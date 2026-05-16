import React, { useEffect, useState } from "react";
import "./Splash.css";
import { Navigate } from "react-router-dom";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="loading">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}

function Splash(props) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return redirect ? (
    <Navigate to="/home" replace />
  ) : (
    <AnimatedSplash theme={props.theme} />
  );
}

export default Splash;
