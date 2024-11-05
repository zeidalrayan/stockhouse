import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import useFormatRupiah from "../hooks/useformatrupiah";
import useTrancate from "../hooks/useTrancate";
import { supabase } from "../utils/SupaClient";
import Layout from "./Layout";

const Allbarang = () => {
  const [allSupliers, setAllSupliers] = useState([]);
  const [allBarang, setAllBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatrupiah } = useFormatRupiah();
  const { trunscatetext } = useTrancate();
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleCardClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Layout>
      <section id="dataTables" className="p-8">
        {loading ? (
          <Spinner className="flex flex-col justify-center h-full" />
        ) : (
          <>
            {/* Modal Component */}

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {selectedItem?.nama_supplier || selectedItem?.nama_barang}
                    </ModalHeader>
                    <ModalBody>
                      {selectedItem?.logo_supplier && (
                        <img
                          src={selectedItem.logo_supplier}
                          alt={selectedItem.nama_supplier}
                          className="w-full h-32 object-contain"
                        ></img>
                      )}
                      {selectedItem?.alamat && (
                        <p>Alamat: {selectedItem.alamat}</p>
                      )}
                      {selectedItem?.no_hp && (
                        <p>No Hp: {selectedItem.no_hp}</p>
                      )}
                      {selectedItem?.email && (
                        <p>Email: {selectedItem.email}</p>
                      )}
                      {selectedItem?.foto_barang && (
                        <img
                          src={selectedItem.foto_barang}
                          alt={selectedItem.nama_barang}
                          className="w-full h-32 object-contain"
                        ></img>
                      )}
                      {selectedItem?.harga && (
                        <p>Harga: {formatrupiah(selectedItem.harga)}</p>
                      )}
                      {selectedItem?.stok && <p>Stok: {selectedItem.stok}</p>}
                      {selectedItem?.deskripsi && (
                        <p>Deskripsi: {selectedItem.deskripsi}</p>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Suplier Data</h2>
              <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                {allSupliers.length > 0 ? (
                  allSupliers.map((suplier, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 border rounded-lg cursor-pointer"
                      onClick={() => handleCardClick(suplier)}
                    >
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
                      <p>No hp: {suplier.no_hp}</p>
                      <p>Alamat: {trunscatetext(suplier.alamat, 30)}</p>
                      <p>Email: {trunscatetext(suplier.email, 20)}</p>
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
                      className="mb-6 p-4 border rounded-lg cursor-pointer"
                      onClick={() => handleCardClick(barang)}
                    >
                      {barang.foto_barang && (
                        <img
                          src={barang.foto_barang}
                          alt={`${barang.nama_barang} photo`}
                          className="h-20 w-full object-contain mt-2 mb-4"
                        ></img>
                      )}
                      <h3 className="text-xl font-semibold">
                        {barang.nama_barang}
                      </h3>
                      <p>Harga: {formatrupiah(barang.harga)}</p>
                      <p>Stok: {barang.stok}</p>
                      <p>Deskripsi: {trunscatetext(barang.deskripsi, 50)}</p>
                    </div>
                  ))
                ) : (
                  <p>No barang data available</p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Allbarang;
