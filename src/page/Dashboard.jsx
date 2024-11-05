import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import "../App.css";

import { supabase } from "../utils/SupaClient";
import LoadingSkeleton from "../components/next-ui/LoadingSkeleton";
import Layout from "./Layout";

import { FaBox } from "react-icons/fa";
import { MdBlender, MdLocalDrink, MdLunchDining } from "react-icons/md";
import { GrDropbox } from "react-icons/gr";

const Dashboard = () => {
  const [barang, setbarang] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [countjenisbarang, setcountjenisbarang] = useState({});

  const [loadingskeleton, setloadingskeleton] = useState(true);

  const totalBarang = async () => {
    setloadingskeleton(true);
    try {
      const countotalbarang = supabase
        .from("barang")
        .select("*", { count: "exact", head: true });

      const jenisbarang = ["Makanan", "Minuman", "alat"];

      const counttoaljenisbarang = jenisbarang.map((jenis) =>
        supabase
          .from("barang")
          .select("*", { count: "exact", head: true })
          .eq("jenis_barang", jenis)
      );
      const result = await Promise.all([
        countotalbarang,
        ...counttoaljenisbarang,
      ]);

      const totalcount = result[0].count;
      let counts = {};
      result.slice(1).forEach((hasil, index) => {
        counts[jenisbarang[index]] = hasil.count;
      });

      setbarang(totalcount);

      setcountjenisbarang(counts);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingskeleton(false);
    }
  };

  const totalSupplier = async () => {
    setloadingskeleton(true);
    try {
      const countTotalSupplier = supabase
        .from("suplier")
        .select("*", { count: "exact", head: true });

      const result = await countTotalSupplier;

      const totalCount = result.count;

      setSupplierCount(totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingskeleton(false);
    }
  };

  useEffect(() => {
    totalBarang();
    totalSupplier();
    document.getElementById("title").innerHTML = "Dasboard";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className=" flex flex-col gap-4 text-center mb-8 bg h-72 justify-center">
          <h2 className=" text-3xl font-bold text-white">
            Welcome{" "}
            <span className=" text-sky-400">
              {import.meta.env.VITE_NAMA_USER}
            </span>{" "}
            to adsmintration panel
          </h2>
          <p className=" text-white">
            Ini adalah Data barang dari bulan januari
          </p>
        </div>
        <div
          className=" grid  grid-cols-2 place-items-center max-lg:grid-cols-1  gap-16 px-40
    "
        >
          {loadingskeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <Card angka={barang} keterangan="Total Barang " chart={FaBox} />
              <Card
                keterangan="Total Makanan "
                angka={countjenisbarang.Makanan}
                chart={MdLunchDining}
              />

              <Card
                keterangan="Total Minuman  "
                angka={countjenisbarang.Minuman}
                chart={MdLocalDrink}
              />
              <Card
                keterangan="Total alat  "
                angka={countjenisbarang.alat}
                chart={MdBlender}
              />
              <Card
                angka={supplierCount}
                keterangan="Total Supplier"
                chart={GrDropbox}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
