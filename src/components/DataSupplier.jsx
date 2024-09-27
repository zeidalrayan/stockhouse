import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../utils/SupaClient";

const columnsData = [
  {
    key: "nama_supplier",
    label: "Nama supplier",
  },
  {
    key: "no_hp",
    label: "no hp",
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
    key: "logo_supplier",
    label: "logo",
  },
  {
    key: "action",
    label: "Action",
  },
];

const getKeyValue = (item, key) => item[key];

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
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => window.location.reload()
          );
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default function DataSupplier({ allBarang }) {
  const columns = columnsData.map((col) => ({
    field: col.key,
    headerName: col.label,
    width: 150,
    renderCell: (params) => {
      const item = params.row;
      const columnKey = col.key;

      if (columnKey === "logo_supplier") {
        return (
          <img
            src={getKeyValue(item, columnKey)}
            alt="barang"
            className=" w-16"
          />
        );
      } else if (columnKey === "action") {
        return (
          <div className="relative flex items-center gap-3">
            <Link to={`/about/${item.id}`}>
              <Tooltip content="Detail Barang">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <VisibilityIcon />
                </span>
              </Tooltip>
            </Link>
            <Link to={`/ubah/${item.id}`}>
              <Tooltip title="Ubah Barang">
                <EditIcon style={{ cursor: "pointer" }} />
              </Tooltip>
            </Link>
            <Tooltip title="Hapus Barang">
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => deletebarang(item.id)}
              />
            </Tooltip>
          </div>
        );
      } else {
        return getKeyValue(item, columnKey);
      }
    },
  }));

  const rows = allBarang.map((item) => ({
    id: item.id,
    logo_supplier: item.logo_supplier,
    nama_supplier: item.nama_supplier,
    no_hp: item.no_hp,
    alamat: item.alamat,
    email: item.email,
  }));

  return (
    <Paper sx={{ height: 400 }} className="lg:w-[45rem] w-full">
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Paper>
  );
}
