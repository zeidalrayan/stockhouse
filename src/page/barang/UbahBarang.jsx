import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import { useState } from "react";
import Swal from "sweetalert2";

export const UbahBaran = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    nama_barang: "",
    harga: 0,
    jenis_barang: "",
    stok: 0,
    deskripsi: "",
    foto_barang: "",
  });

  const [loading, setloading] = useState(true);

  const [loadingbtn, setloadingbtn] = useState(false);

  const handlechange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getbarangid = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const updatebarang = async (e) => {
    e.preventDefault();
    setloadingbtn(true);
    try {
      const { data } = await supabase
        .from("barang")
        .update({
          nama_barang: formEdit.nama_barang,
          harga: formEdit.harga,
          jenis_barang: formEdit.jenis_barang,
          stok: formEdit.stok,
          deskripsi: formEdit.deskripsi,
          foto_barang: formEdit.foto_barang,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "sukses",
          text: "data berhasil di ubah",
          icon: "success",
        }).then(() => navigate("/table"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloadingbtn(false);
    }
  };

  useEffect(() => {
    getbarangid();

    document.getElementById("title").innerHTML = "Halaman edit";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className=" flex justify-center place-items-center h-full w-full">
          <Spinner label="memuat..." />
        </div>
      ) : (
        <section id="edit" className="p-20 ">
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={updatebarang}
          >
            <label className=" flex flex-col gap-2">
              nama barang
              <input
                type="text"
                name="nama_barang"
                value={formEdit.nama_barang}
                onChange={handlechange}
                className="form-input bg-white text-black border-2 border-gray-500 p-2"
              />
            </label>
            <label className=" flex flex-col gap-2 ">
              harga
              <input
                type="number"
                value={formEdit.harga}
                onChange={handlechange}
                name="harga"
                className="form-input bg-white text-black border-2 border-gray-500 p-2"
              />
            </label>
            <label className=" flex flex-col gap-2">
              Jenis barang
              <select
                type="select"
                name="jenis_barang"
                value={formEdit.jenis_barang}
                onChange={handlechange}
                className="form-select bg-white text-black border-2 border-gray-500 p-2"
              >
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="alat">alat</option>
              </select>
            </label>
            <label className=" flex flex-col gap-2">
              stok
              <input
                type="number"
                name="stok"
                className="form-input bg-white text-black border-2 border-gray-500 p-2"
                value={formEdit.stok}
                onChange={handlechange}
              />
            </label>
            <label className=" flex flex-col gap-2">
              deskripsi
              <input
                type="text-area"
                name="deskripsi"
                className="form-textarea bg-white text-black border-2 border-gray-500 p-2"
                value={formEdit.deskripsi}
                onChange={handlechange}
              />
            </label>
            <label className=" flex flex-col gap-2">
              Foto Barang
              <input
                type="text"
                name="foto_barang"
                className="form-input bg-white text-black border-2 border-gray-500 p-2"
                value={formEdit.foto_barang}
                onChange={handlechange}
              />
            </label>
            <div className=" flex gap-4">
              <Button color="danger" onClick={() => navigate("/table")}>
                kembali
              </Button>
              {loadingbtn ? (
                <Button disabled>
                  Loading <Spinner />
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Ubah
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export const UbahSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    nama_Supplier: "",
    no_hp: 0,
    alamat: "",
    email: 0,
    logo_supplier: "",
  });

  const [loading, setloading] = useState(true);

  const [loadingbtn, setloadingbtn] = useState(false);

  const handlechange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getbarangid = async () => {
    setloading(true);
    try {
      const { data } = await supabase
        .from("suplier")
        .select("*")
        .eq("id", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const updatebarang = async (e) => {
    e.preventDefault();
    setloadingbtn(true);
    try {
      const { data } = await supabase
        .from("suplier")
        .update({
          nama_supplier: formEdit.nama_supplier,
          no_hp: formEdit.no_hp,
          alamat: formEdit.alamat,
          email: formEdit.email,
          logo_supplier: formEdit.logo_supplier,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "sukses",
          text: "data berhasil di ubah",
          icon: "success",
        }).then(() => navigate("/supplier"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloadingbtn(false);
    }
  };

  useEffect(() => {
    getbarangid();

    document.getElementById("title").innerHTML = "Halaman edit";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className=" flex justify-center place-items-center h-full w-full">
          <Spinner label="memuat..." />
        </div>
      ) : (
        <section id="ubah " className="p-20 ">
          <form
            action=""
            className="flex flex-col gap-2"
            onSubmit={updatebarang}
          >
            <label className=" flex flex-col gap-2">
              nama supplier
              <input
                type="text"
                name="nama_Supplier"
                value={formEdit.nama_supplier}
                onChange={handlechange}
                className="form-input bg-white text-black border-2 border-gray-400 p-2"
              />
            </label>
            <label className=" flex flex-col gap-2">
              no hp
              <input
                type="number"
                value={formEdit.no_hp}
                onChange={handlechange}
                name="no_hp"
                className="form-input bg-white text-black border-2 border-gray-400 p-2"
              />
            </label>
            <label className=" flex flex-col gap-2">
              alamat
              <input
                type="text"
                name="alamat"
                value={formEdit.alamat}
                onChange={handlechange}
                className="form-select bg-white text-black border-2 border-gray-400 p-2"
              ></input>
            </label>
            <label className=" flex flex-col gap-2">
              email
              <input
                type="email"
                name="email"
                className="form-input bg-white text-black border-2 border-gray-400 p-2"
                value={formEdit.email}
                onChange={handlechange}
              />
            </label>
            <label className=" flex flex-col gap-2">
              logo_supplier
              <input
                type="text"
                name="logo_supplier"
                className="form-textarea bg-white text-black border-2 border-gray-400 p-2"
                value={formEdit.logo_supplier}
                onChange={handlechange}
              />
            </label>

            <div className=" flex gap-4">
              <Button color="danger" onClick={() => navigate("/supplier")}>
                kembali
              </Button>
              {loadingbtn ? (
                <Button disabled>
                  Loading <Spinner />
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Ubah
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};
