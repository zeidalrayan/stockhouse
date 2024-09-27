import React, { useEffect, useState } from "react";
import Layout from "../page/Layout";

import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { ModalAddSupplier } from "./barang/ModalAddBarang";
import DataSupplier from "../components/DataSupplier";

const Supplier = () => {
  const [allBarang, setAllBarang] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setloading] = useState(true);
  const getAllBarang = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("suplier")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Table Supplier";
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner className=" flex flex-col justify-center h-full" />
      ) : (
        <section id="supplier" className="p-8">
          <div className="flex w-full justify-between mb-5">
            <h2 className="text-4xl font-bold">Table Supplier</h2>
            <Button onPress={onOpen} color="primary">
              + Tambah Barang
            </Button>
            <ModalAddSupplier isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <div className=" flex w-full justify-center">
            <DataSupplier allBarang={allBarang} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Supplier;
