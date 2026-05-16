import React from "react";
import AuroraNav from "../../aurora/Nav";

export default function Header(props) {
  return <AuroraNav setTheme={props.setTheme} />;
}
