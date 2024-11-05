import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { supabase } from "../../utils/SupaClient";
import { Link, useParams } from "react-router-dom";
import useformatrupiah from "../../hooks/useformatrupiah";
import { Divider, Spinner } from "@nextui-org/react";

import { BiBuilding } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";

export const Detailbarang = () => {
  const [getbarangbyid, setgetbarangbyid] = useState({});

  const [loading, setloading] = useState(true);

  const { formatrupiah } = useformatrupiah();

  const { id } = useParams();

  const getidbarang = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();
      setgetbarangbyid(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getidbarang();
    document.getElementById("title").innerHTML = "Detail barang";
  }, [id]);
  return (
    <Layout>
      {loading ? (
        <Spinner className=" flex flex-col justify-center h-screen" />
      ) : (
        <div className=" p-32 max-lg:p-4  ">
          <div className=" flex gap-16 flex-col  justify-center max-lg:place-items-center max-lg:gap-0">
            <img
              src={getbarangbyid.foto_barang}
              alt="product"
              className="  w-full h-60 object-contain  mb-8 "
            />
            <div className=" flex flex-col ">
              <h4 className="text-sm capitalize  text-gray-400">
                {getbarangbyid.jenis_barang}
              </h4>
              <h2 className=" text-4xl max-lg:text-xl font-bold mb-4">
                {getbarangbyid.nama_barang}
              </h2>
              <h4 className="text-6xl font-bold mb-4 max-lg:text-2xl">
                {formatrupiah(getbarangbyid.harga)}
              </h4>
              <div className="my-5 max-lg:my-2">
                <h2 className=" font-bold">Deskripsi barang</h2>
                <Divider className=" my-2" />

                <p className="">{getbarangbyid.deskripsi}</p>
              </div>
              <div className="mb-4">
                <h2 className=" font-bold ">
                  jumlah barang:
                  <Divider className="my-2" />
                  <span className=" font-normal"> {getbarangbyid.stok}</span>
                </h2>
              </div>
              <Link
                className=" flex gap-2 items-center bg-cyan-600 p-4 rounded-lg text-white justify-center"
                to={"/table"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                kembali
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const DetailSupplier = () => {
  const [getbarangbyid, setgetbarangbyid] = useState({});

  const [loading, setloading] = useState(true);

  const { id } = useParams();

  const getidbarang = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("suplier")
        .select("*")
        .eq("id", id)
        .single();
      setgetbarangbyid(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getidbarang();
    document.getElementById("title").innerHTML = "Detail Supplier";
  }, [id]);
  return (
    <Layout>
      {loading ? (
        <Spinner className=" flex flex-col justify-center h-full" />
      ) : (
        <div className=" m-28 p-8 rounded-2xl max-lg:m-16 max-md:m-8 border-black border-2 ">
          <div className=" flex gap-16 flex-col  py-8   justify-center max-lg:place-items-center max-lg:gap-0">
            <img
              src={getbarangbyid.logo_supplier}
              alt="product"
              className=" object-contain h-24 max-lg:h-20 mb-8 flex place-items-center max-md:h-16  "
            />
            <div className=" flex flex-col gap-4 ">
              <h2 className=" text-4xl text-center max-lg:text-3xl font-bold max-md:text-xl ">
                {getbarangbyid.nama_supplier}
              </h2>
              <h4 className="text-2xl   flex gap-5 max-lg:text-xl max-md:text-lg">
                <HiPhone /> {getbarangbyid.no_hp}
              </h4>
              <h4 className="text-xl place-items-center max-lg:text-lg capitalize flex gap-5 max-md:text-base">
                <BiBuilding />
                {getbarangbyid.alamat}
              </h4>

              <div className="  text-xl flex place-items-center gap-5 max-md:text-base">
                <MdEmail /> <p className="">{getbarangbyid.email}</p>
              </div>

              <Link
                className=" flex gap-2 items-center bg-cyan-600 p-4 rounded-lg text-white justify-center"
                to={"/supplier"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                kembali
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
