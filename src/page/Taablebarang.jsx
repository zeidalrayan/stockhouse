import React, { useEffect, useState } from "react";
import Layout from "../page/Layout";
import TablePaginate from "../components/Paginate";
import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { ModalAddBarang } from "./barang/ModalAddBarang";

const Tabelbarangd = () => {
  const [allBarang, setAllBarang] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setloading] = useState(true);
  const getAllBarang = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("barang")
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
    document.getElementById("title").innerHTML = "Table Barang";
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner className=" flex flex-col justify-center h-full" />
      ) : (
        <section id="table" className="p-8">
          <div className="flex justify-between mb-5">
            <h2 className="text-4xl font-bold">Table Barang</h2>
            <Button onPress={onOpen} color="primary">
              + Tambah Barang
            </Button>
            <ModalAddBarang isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <div className=" flex w-full justify-center">
            <TablePaginate allBarang={allBarang} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Tabelbarangd;
