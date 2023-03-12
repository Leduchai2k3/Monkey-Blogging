import React from "react";

const DashboardHeading = ({
  title = "",
  desc = "",
  children,
  content = "",
}) => {
  document.title = `${title}`;
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <h1 className="dashboard-heading">{desc}</h1>
        <span>{content}</span>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
