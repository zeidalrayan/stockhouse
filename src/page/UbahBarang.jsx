import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../utils/SupaClient";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthProvider";
import { MdDone, MdOutlineCancel } from "react-icons/md";

export const UbahBaran = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    nama_barang: "",
    harga: 0,
    jenis_barang: "",
    deskripsi: "",
    stok: 0,
    foto_barang: "",
  });

  const [imagePrev, setImagePrev] = useState({
    preview: "",
    nextImage: {},
  });

  const getBarangById = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const previewImage = URL.createObjectURL(e.target.files[0]);
    setImagePrev({ preview: previewImage, nextImage: e.target.files[0] });
  };

  // Update Barang
  const updateBarang = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    try {
      if (imagePrev.preview.length === 0) {
        const { data: updateData } = await supabase
          .from("barang")
          .update(formEdit)
          .eq("id", id)
          .select();

        if (updateData) {
          Swal.fire({
            title: "Success",
            text: "Data Berhasil Diubah",
            icon: "success",
          }).then(() => {
            navigate("/table");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Gagal Mengubah Data",
            icon: "error",
          });
        }
      } else {
        const removeUrlImage = formEdit.foto_barang.replace(
          "https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/produk/foto_produk/",
          ""
        );

        const { data: deleteImage } = await supabase.storage
          .from("produk")
          .remove(`foto_produk/${removeUrlImage}`);

        if (deleteImage) {
          const { data: updateImage } = await supabase.storage
            .from("produk")
            .upload(
              `foto_produk/${imagePrev.nextImage.name}`,
              imagePrev.nextImage,
              {
                cacheControl: "3600",
                upsert: true,
              }
            );

          if (updateImage) {
            const { data } = await supabase
              .from("barang")
              .update({
                ...formEdit,
                foto_barang: `https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/produk/foto_produk/${imagePrev.nextImage.name}`,
              })
              .eq("id", id)
              .select("*");

            if (data) {
              Swal.fire({
                title: "Success",
                text: "Data dan Gambar Berhasil Diubah",
                icon: "success",
              }).then(() => {
                navigate("/table");
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    document.getElementById("title").innerHTML = "Ubah Barang";
    getBarangById();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <section id="page-edit" className="p-20 py-12">
          {/* FORM UPDATE */}
          <form className="flex flex-col gap-4" onSubmit={updateBarang}>
            <label className="text-sm font-medium text-gray-700">
              Nama Barang
              <input
                type="text"
                name="nama_barang"
                value={formEdit.nama_barang}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Harga
              <input
                type="number"
                name="harga"
                value={formEdit.harga}
                onChange={handleChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Jenis Barang
              <select
                name="jenis_barang"
                onChange={handleChange}
                value={formEdit.jenis_barang}
                class="form-select mt-1 block w-1/2 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Alat">Alat</option>
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Deskripsi
              <textarea
                type="text"
                name="deskripsi"
                value={formEdit.deskripsi}
                onChange={handleChange}
                className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Stok
              <input
                name="stok"
                value={formEdit.stok}
                onChange={handleChange}
                type="number"
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Foto Barang
              <input
                name="foto_barang"
                type="file"
                onChange={handleImage}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            <img
              className="size-24"
              src={
                imagePrev.preview.length > 0
                  ? imagePrev.preview
                  : formEdit.foto_barang
              }
              alt={formEdit.foto_barang}
            />

            <div className="flex gap-4">
              <Button color="danger" onClick={() => navigate("/table")}>
                Kembali
              </Button>
              {loadingBtn ? (
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
  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    nama_Supplier: "",
    no_hp: "",
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
                name="nama_supplier"
                value={formEdit.nama_supplier}
                onChange={handlechange}
                className="form-input bg-white text-black border-2 border-gray-400 p-2"
              />
            </label>
            <label className=" flex flex-col gap-2">
              no hp
              <input
                type="text"
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

export const UbahProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    full_name: "",
    username: "",
    email: "",
    no_telp: 0,
    avatar_url: "",
  });

  const [imagePrev, setImagePrev] = useState({
    preview: "",
    nextImage: {},
  });

  const getProfileById = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const previewImage = URL.createObjectURL(e.target.files[0]);
    setImagePrev({ preview: previewImage, nextImage: e.target.files[0] });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoadingBtn(true);
    try {
      if (!imagePrev.preview) {
        const { data: updateData } = await supabase
          .from("profiles")
          .update(formEdit)
          .eq("id", user.id)
          .select();

        if (updateData) {
          Swal.fire({
            title: "Success",
            text: "Data Berhasil Diubah",
            icon: "success",
          }).then(() => navigate("/profile"));
        }
      } else {
        const removeUrlImage = formEdit.avatar_url
          ? formEdit.avatar_url.replace(
              "https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/avatars/logo/",
              ""
            )
          : null;

        if (removeUrlImage) {
          const { error: deleteError } = await supabase.storage
            .from("avatars")
            .remove([`logo/${removeUrlImage}`]);

          if (deleteError) throw deleteError;
        }

        const { data: updateImage, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(`logo/${imagePrev.nextImage.name}`, imagePrev.nextImage, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data } = await supabase
          .from("profiles")
          .update({
            ...formEdit,
            avatar_url: `https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/avatars/logo/${imagePrev.nextImage.name}`,
          })
          .eq("id", user.id)
          .select("*");

        if (data) {
          Swal.fire({
            title: "Success",
            text: "Data dan Gambar Berhasil Diubah",
            icon: "success",
          }).then(() => (window.location.href = "/profile"));
        }
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat memperbarui data.",
        icon: "error",
      });
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    document.getElementById("title").innerHTML = "Ubah Profile";
    getProfileById();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <section id="page-edit">
          <form className="flex flex-col gap-4" onSubmit={updateProfile}>
            <div className="flex gap-4"></div>
            <div className=" h-screen flex flex-col justify-center">
              <p className=" text-center text-4xl max-md:text-2xl my-8 font-bold">
                Edit Profile
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-sky-600 rounded-lg shadow-md p-6 mx-52 pb-14 capitalize max-md:mx-5 ">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-red-600 p-2 rounded-full "
                  >
                    <MdOutlineCancel className=" text-white text-2xl" />
                  </button>
                  {loadingBtn ? (
                    <button className="bg-green-500 p-2 rounded-full" disabled>
                      <Spinner />
                    </button>
                  ) : (
                    <button
                      className=" bg-green-500 p-2 rounded-full"
                      type="submit"
                    >
                      <MdDone className=" text-white text-2xl" />
                    </button>
                  )}
                </div>
                <div className=" flex justify-center ">
                  <img
                    className="w-24 h-24 rounded-full object-cover mb-9"
                    src={imagePrev.preview || formEdit.avatar_url}
                    alt="Profile Preview"
                  />
                </div>
                <label className=" w-full text-white mb-4 text-center font-medium ">
                  Foto Profile
                  <input
                    type="file"
                    name="avatar_url"
                    onChange={handleImage}
                    className="form-input w-full rounded-md "
                  />
                </label>

                <div className=" flex flex-col gap-4 mt-6 text-white">
                  <label className=" font-medium ">
                    Nama Admin
                    <input
                      type="text"
                      name="full_name"
                      value={formEdit.full_name}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-white p-3 bg-blue-500 max-md:p-1 mt-4 border "
                    />
                  </label>
                  <label className=" font-medium ">
                    Username
                    <input
                      type="text"
                      name="username"
                      value={formEdit.username}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-white p-3 bg-blue-500 max-md:p-1 mt-4 border"
                    />
                  </label>
                  <label className=" font-medium ">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formEdit.email}
                      onChange={handleChange}
                      className="form-input w-full rounded-md border-white p-3 bg-blue-500 max-md:p-1 mt-4 border"
                    />
                  </label>
                  <label className=" font-medium ">
                    No Telepon
                    <input
                      type="text"
                      name="no_telp"
                      value={formEdit.no_telp}
                      onChange={handleChange}
                      className="form-input w-full rounded-md bg-blue-500 border-white p-3 max-md:p-1 mt-4 border"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};
