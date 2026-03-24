import React from "react";
import { layout, text } from "../styles/designSystem";

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div className={layout.page}>

      {/* Header */}
      <div>
        <h1 className={text.title}>{title}</h1>
        {subtitle && <p className={text.subtitle}>{subtitle}</p>}
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default PageLayout;
