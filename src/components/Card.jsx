import React from "react";

const Card = ({ keterangan, angka, chart: Chart }) => {
  return (
    <div>
      <div className="border-2 border-black text-white rounded-2xl w-56 max-lg:w-72 text-center bg-sky-600 place-items-center flex flex-col gap-6 py-4">
        <h2 className=" font-semibold text-2xl">{angka}</h2>
        {Chart ? <Chart className="text-3xl" /> : <p>No Chart Available</p>}
        <h1 className="text-center pb-4 font-bold text-xl tracking-wider">
          {keterangan}
        </h1>
      </div>
    </div>
  );
};

export default Card;
