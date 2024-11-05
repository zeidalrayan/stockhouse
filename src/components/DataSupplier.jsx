import React from "react";
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

import useTruncateText from "../hooks/useTrancate";

import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const columns = [
  {
    key: "logo_supplier",
    label: "log",
  },
  {
    key: "nama_supplier",
    label: "Nama Supplier",
  },
  {
    key: "no_hp",
    label: "No Hp",
  },
  {
    key: "alamat",
    label: "alamat",
  },
  {
    key: "email",
    label: "email",
  },

  {
    key: "action",
    label: "Action",
  },
];

export default function DataSupplier({ allBarang }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(allBarang.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allBarang.slice(start, end);
  }, [page, allBarang]);

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
          const { data } = await supabase
            .from("suplier")
            .delete()
            .eq("id", id)
            .select();
          if (data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => window.location.reload());
          }
        }
      });
    } catch (error) {
      console.log(Error);
    }
  };

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
                    <Link to={`/about/${item.id}`}>
                      <Tooltip content="Detail Barang">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaEye />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/ubah/${item.id}`}>
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
                  </div>
                ) : columnKey === "logo_supplier" ? (
                  <img
                    src={getKeyValue(item, columnKey)}
                    alt="barang"
                    className=" size-10 object-contain"
                  />
                ) : columnKey === "jenis_barang" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "alamat" ? (
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
