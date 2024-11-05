import React from "react";
import { BlinkBlur } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="  dark:text-white text-black h-screen flex flex-col justify-center place-items-center">
      <BlinkBlur color="#2fb6ca" size="small" text="Loading" speedPlus={-4} />
    </div>
  );
};

export default Loading;
