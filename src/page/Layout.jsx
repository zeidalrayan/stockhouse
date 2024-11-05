import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const [open, setopen] = useState(true);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setopen(true);
    } else {
      setopen(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen dark:bg-slate-600 ">
      <Header open={open} setopen={setopen} />
      <div className="flex flex-col w-full  ">
        <Nav setopen={setopen} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
