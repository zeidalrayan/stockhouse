import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export const ModalAddBarang = ({ isOpen, onOpenChange }) => {
  const [loadingbtn, setloadingbtn] = useState(false);
  const jenis_barang = [
    { key: "Makanan", value: "Makanan" },
    { key: "Minuman", value: "Minuman" },
    { key: "alat", value: "alat" },
  ];
  const [formdata, setformdata] = useState({
    nama_barang: "",
    harga: "",
    jenis_barang: "",
    stok: "",
    deskripsi: "",
    foto_barang: "",
  });

  const handlechage = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from("barang").insert(formdata).select();
      if (data) {
        Swal.fire({
          title: "Suskses input",
          text: "Data berhasil di input",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tambah barang
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody className=" flex flex-col gap-6">
                <Input
                  required
                  type="text"
                  label="nama barang"
                  labelPlacement="inside"
                  name="nama_barang"
                  value={formdata.nama_barang}
                  onChange={handlechage}
                />
                <Input
                  required
                  type="number"
                  label="Harga"
                  labelPlacement="inside"
                  name="harga"
                  value={formdata.harga}
                  onChange={handlechage}
                />
                <Select
                  required
                  label="Jenis barang"
                  name="jenis_barang"
                  onChange={handlechage}
                >
                  {jenis_barang.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.value}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  required
                  type="number"
                  label="stok"
                  labelPlacement="inside"
                  name="stok"
                  value={formdata.stok}
                  onChange={handlechage}
                />
                <Textarea
                  label="Deskripsi"
                  labelPlacement="inside"
                  name="deskripsi"
                  value={formdata.deskripsi}
                  onChange={handlechage}
                />
                <Input
                  required
                  type="text"
                  label="foto barang"
                  labelPlacement="inside"
                  name="foto_barang"
                  value={formdata.foto_barang}
                  onChange={handlechage}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {loadingbtn ? (
                  <Button disabled>
                    Loading <Spinner />
                  </Button>
                ) : (
                  <Button color="primary" type="submit">
                    Tambah Barang
                  </Button>
                )}
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const ModalAddSupplier = ({ isOpen, onOpenChange }) => {
  const [formdata, setformdata] = useState({
    nama_supplier: "",
    no_hp: "",
    alamat: "",
    email: "",
    logo_supplier: "",
  });

  const handlechage = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("suplier")
        .insert(formdata)
        .select();
      if (error) {
        console.error("Error inserting data:", error.message);
      }
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Data successfully added",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tambah barang
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody className=" flex flex-col gap-6">
                <Input
                  required
                  type="text"
                  label="nama supplier"
                  labelPlacement="inside"
                  name="nama_supplier"
                  value={formdata.nama_supplier}
                  onChange={handlechage}
                />
                <Input
                  required
                  type="number"
                  label="no hp"
                  labelPlacement="inside"
                  name="no_hp"
                  value={formdata.no_hp}
                  onChange={handlechage}
                />
                <Input
                  required
                  label="alamat"
                  name="alamat"
                  value={formdata.alamat}
                  onChange={handlechage}
                />
                <Input
                  required
                  type="email"
                  label="email"
                  labelPlacement="inside"
                  name="email"
                  value={formdata.email}
                  onChange={handlechage}
                />
                <Input
                  label="Logo supplier"
                  labelPlacement="inside"
                  name="logo_supplier"
                  value={formdata.logo_supplier}
                  onChange={handlechage}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Tambah barang
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
