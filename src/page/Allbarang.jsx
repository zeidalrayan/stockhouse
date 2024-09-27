import React, { useEffect, useState } from "react";
import Layout from "../page/Layout";
import { supabase } from "../utils/SupaClient";
import { Spinner } from "@nextui-org/react";
import useFormatRupiah from "../hooks/useformatrupiah";
import useTrancate from "../hooks/useTrancate";

const Allbarang = () => {
  const [allSupliers, setAllSupliers] = useState([]);
  const [allBarang, setAllBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatrupiah } = useFormatRupiah();
  const { trunscatetext } = useTrancate();

  const getAllData = async () => {
    setLoading(true);
    try {
      const { data: suplierData } = await supabase
        .from("suplier")
        .select("*")
        .order("id", { ascending: false });
      setAllSupliers(suplierData);

      const { data: barangData } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(barangData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
    document.getElementById("title").innerHTML =
      "Table all barang and supliers";
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex flex-col justify-center h-full" />
      ) : (
        <section id="dataTables" className="p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Suplier Data</h2>
            <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
              {allSupliers.length > 0 ? (
                allSupliers.map((suplier, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    {suplier.logo_supplier && (
                      <img
                        src={suplier.logo_supplier}
                        alt={`${suplier.nama_supplier} logo`}
                        className="h-20 w-full object-contain mt-2 mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold">
                      {suplier.nama_supplier}
                    </h3>
                    <p>Alamat: {trunscatetext(suplier.alamat, 30)}</p>
                    <p>Email: {suplier.email}</p>
                  </div>
                ))
              ) : (
                <p>No suplier data available</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Barang Data</h2>
            <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
              {allBarang.length > 0 ? (
                allBarang.map((barang, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 border border-gray-400 rounded-lg"
                  >
                    {barang.foto_barang && (
                      <img
                        src={barang.foto_barang}
                        alt={`${barang.nama_barang} photo`}
                        className="h-20 w-full object-contain mt-2 mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold">
                      {barang.nama_barang}
                    </h3>
                    <p>Harga: {formatrupiah(barang.harga)}</p>
                    <p>Stok: {barang.stok}</p>
                    <p>Deskripsi: {trunscatetext(barang.deskripsi, 100)}</p>
                  </div>
                ))
              ) : (
                <p>No barang data available</p>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Allbarang;
