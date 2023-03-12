import React from "react";

const HomeFeatureHeader = ({ children }) => {
  return (
    <div>
      <div className="w-[45px] h-1 bg-[#00D1ED] rounded-2xl"></div>
      <h2 className="text-[28px] font-semibold text-[#3A1097]">{children}</h2>
    </div>
  );
};

export default HomeFeatureHeader;
