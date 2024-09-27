import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { supabase } from "../utils/SupaClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import useTrancate from "../hooks/useTrancate";
import useformatrupiah from "../hooks/useformatrupiah";
import { Link } from "react-router-dom";

export default function Tabelbarang() {
  // const {formatrupiah} =
  const { trunscatetext } = useTrancate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { formatrupiah } = useformatrupiah();
  const rowsPerPage = 5;

  const [loading, setLoading] = useState(true);

  try {
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const { data } = await supabase
          .from("barang")
          .select("*")
          .order("id", { ascending: false });
        setData(data);
      };
      fetchData();
    }, []);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [page, data]);

  return (
    <Table
      className=" font-serif"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn>Foto</TableColumn>
        <TableColumn>Nama Barang</TableColumn>
        <TableColumn>Harga</TableColumn>
        <TableColumn>Jenis Barang</TableColumn>
        <TableColumn>Stok</TableColumn>
        <TableColumn>Deskripsi</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>
              <img
                src={item.foto_barang}
                alt={item.nama_barang}
                className=" size-12"
              />
            </TableCell>
            <TableCell>{item.nama_barang}</TableCell>
            <TableCell> {formatrupiah(item.harga)}</TableCell>
            <TableCell>{item.jenis_barang}</TableCell>
            <TableCell>{item.stok}</TableCell>
            <TableCell>{trunscatetext(item.deskripsi, 20)}</TableCell>
            <TableCell>
              <div className="flex gap-4 ">
                <Link to={`/detail/${item.id}`}>
                  <Tooltip title="Lihat" arrow placement="top">
                    <VisibilityIcon className="cursor-pointer text-slate-400" />
                  </Tooltip>
                </Link>
                <Tooltip title="Edit" arrow placement="top">
                  <EditIcon
                    onClick={() => handleAction("edit", item)}
                    className="cursor-pointer text-slate-400"
                  />
                </Tooltip>
                <Tooltip title="Hapus" arrow placement="top">
                  <DeleteIcon
                    onClick={() => handleAction("delete", item)}
                    className="cursor-pointer text-red-500"
                  />
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
