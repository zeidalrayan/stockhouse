import React from "react";

const Footer = () => {
  return (
    <footer className="  flex justify-between w-full h-full place-items-end   py-2    ">
      <div className="border-t-2 border-slate-600  w-full flex justify-between">
        <p className=" pl-4">Copyright &copy; 2024</p>
        <p>
          Developer By <span className=" pr-4 text-cyan-900">zeid</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
