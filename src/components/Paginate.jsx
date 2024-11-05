import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";

import useFormatRupiah from "../hooks/useformatrupiah";
import useTruncateText from "../hooks/useTrancate";

import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useAuth } from "../auth/AuthProvider";

const columns = [
  {
    key: "foto_barang",
    label: "foto",
  },
  {
    key: "nama_barang",
    label: "Nama Barang",
  },
  {
    key: "harga",
    label: "Harga",
  },
  {
    key: "jenis_barang",
    label: "Jenis Barang",
  },
  {
    key: "stok",
    label: "Stok",
  },
  {
    key: "deskripsi",
    label: "Deskripsi",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TablePaginate({ allBarang, search }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredBarang = useMemo(() => {
    return (allBarang || []).filter((barang) =>
      barang.nama_barang.toLowerCase().includes(search.toLowerCase())
    );
  }, [allBarang, search]);

  const pages = Math.ceil(filteredBarang.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredBarang.slice(start, end);
  }, [page, filteredBarang]);

  const { formatrupiah } = useFormatRupiah();

  const { trunscatetext } = useTruncateText();

  const deletebarang = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Mengambil foto barang berdasarkan ID
          const { data: getImage, error } = await supabase
            .from("barang")
            .select("foto_barang")
            .eq("id", id)
            .single();

          if (error) {
            console.error("Error fetching image:", error);
            return;
          }

          if (getImage) {
            const removeUrlImage = String(getImage.foto_barang).replace(
              "https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/produk/foto_produk/",
              ""
            );

            // Menghapus foto dari storage
            const { error: removeError } = await supabase.storage
              .from("produk")
              .remove([`foto_produk/${removeUrlImage}`]);

            if (removeError) {
              console.error("Error removing image:", removeError);
              return;
            }

            // Menghapus barang setelah foto berhasil dihapus
            const { error: deleteError } = await supabase
              .from("barang")
              .delete()
              .eq("id", id);

            if (deleteError) {
              console.error("Error deleting item:", deleteError);
              return;
            }

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => window.location.reload());
          }
        }
      });
    } catch (error) {
      console.error("Error during delete operation:", error);
    }
  };

  const { user, role } = useAuth();

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "action" ? (
                  <div className="relative flex items-center gap-3">
                    <Link to={`/detail/${item.id}`}>
                      <Tooltip content="Detail Barang">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaEye />
                        </span>
                      </Tooltip>
                    </Link>
                    {user && role === "user" ? (
                      <>
                        <Link to={`/edit/${item.id}`}>
                          <Tooltip content="Ubah Barang">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <FaPencil />
                            </span>
                          </Tooltip>
                        </Link>
                        <Tooltip color="danger" content="Hapus Barang">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => {
                              deletebarang(item.id);
                            }}
                          >
                            <FaTrashAlt />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : columnKey === "foto_barang" ? (
                  <img
                    src={getKeyValue(item, columnKey)}
                    alt="barang"
                    className=" size-10"
                  />
                ) : columnKey === "harga" ? (
                  formatrupiah(getKeyValue(item, columnKey))
                ) : columnKey === "nama_barang" ? (
                  trunscatetext(getKeyValue(item, columnKey), 20)
                ) : columnKey === "jenis_barang" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "deskripsi" ? (
                  trunscatetext(getKeyValue(item, columnKey), 30)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
