// import React, { useEffect, useState } from "react";
// import { supabase } from "./utils/SupaClient";

// const App = () => {
//   const [product, setproduct] = useState([]);

//   const getSupabase = async () => {
//     const { data, error } = await supabase.from("barang").select("*");
//     // .eq("Jenis_barang", "minuman");
//     setproduct(data);
//   };

//   useEffect(() => {
//     getSupabase();
//   }, []);

//   return (
//     <div>
//       <h2>Gudang Toko Ilham Naga api</h2>
//       {product.map((item, index) => (
//         <div key={index}>
//           <img src={item.foto_barang} alt={item.nama_barang} width={100} />
//           <h2>{item.nama_barang}</h2>
//           <div className="flex gap-4">
//             <p>harga : {item.harga}</p>
//             <p>stok : {item.stok}</p>
//           </div>
//           <p>{item.deskripsi}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Taablebarang from "./page/Taablebarang";
import { Detailbarang, DetailSupplier } from "./page/barang/Detailbarang";
import { UbahBaran, UbahSupplier, UbahProfile } from "./page/UbahBarang";
import Supplier from "./page/Supplier";
import Allbarang from "./page/Allbarang";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import Profile from "./page/Profile";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthAdmin />}>
            <Route path="/edit/:id" element={<UbahBaran />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/ubah/:id" element={<UbahSupplier />} />
            <Route path="/about/:id" element={<DetailSupplier />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detailbarang />} />
          <Route path="/table" element={<Taablebarang />} />
          <Route path="/semuabarang" element={<Allbarang />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change" element={<UbahProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
