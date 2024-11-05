import React, { useEffect, useState } from "react";
import Layout from "../page/Layout";
import TablePaginate from "../components/Paginate";
import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure, Select } from "@nextui-org/react";
import { ModalAddBarang } from "./barang/ModalAddBarang";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";

const Tabelbarangd = () => {
  const [allBarang, setAllBarang] = useState([]);
  const [filteredBarang, setFilteredBarang] = useState([]); // State untuk barang yang difilter
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk menyimpan pilihan jenis barang
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);

  const getAllBarang = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(data);
      setFilteredBarang(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    if (selected) {
      const filtered = allBarang.filter(
        (item) => item.jenis_barang.toLowerCase() === selected.toLowerCase()
      );
      setFilteredBarang(filtered);
    } else {
      setFilteredBarang(allBarang);
    }
  };

  const { user, role } = useAuth();
  console.log();

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Table Barang";
  }, []);

  const [search, setsearch] = useState("");

  const handlersearch = (e) => {
    setsearch(e.target.value);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex flex-col justify-center h-full" />
      ) : (
        <section id="table" className="p-8 ">
          <div className="flex justify-between mb-5">
            <h2 className="text-4xl font-bold">Table Barang</h2>
            <div className="flex gap-3 max-lg:flex-col">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 bg-white text-black rounded-lg px-4 py-2"
              >
                <option value="">Semua Jenis</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Alat">Alat</option>
              </select>
            </div>
            {user && role === "user" ? (
              <>
                <Button onPress={onOpen} color="primary">
                  + Tambah Barang
                </Button>

                <ModalAddBarang isOpen={isOpen} onOpenChange={onOpenChange} />
              </>
            ) : (
              <Link to={"/login"}>
                <Button color="primary">Login</Button>
              </Link>
            )}
          </div>
          <div className=" my-3">
            <Searchbar handlersearch={handlersearch} />
          </div>
          <div className="flex w-full justify-center">
            <TablePaginate allBarang={filteredBarang} search={search} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Tabelbarangd;
