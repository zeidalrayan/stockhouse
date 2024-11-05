import React from "react";

export default function Searchbar({ handlersearch }) {
  return (
    <div className=" flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg"
        onChange={handlersearch}
      />
    </div>
  );
}
