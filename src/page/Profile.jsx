import React, { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";

import { CiEdit, CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";

const Profile = () => {
  const { username, email, avatar_url, user, role, no_telp, full_name } =
    useAuth();
  useEffect(() => {
    document.getElementById("title").innerHTML = "Profile";
  }, []);
  return (
    <Layout>
      <div className=" h-screen flex flex-col justify-center">
        <div className=" my-8 bg-gradient-to-r from-blue-500 to-sky-600 rounded-lg shadow-md p-6 mx-52 pb-14 capitalize max-md:mx-10 ">
          <div className="flex   mb-4">
            <Link to={"/change"}>
              <button className="bg-sky-500 p-2 rounded-full">
                <CiEdit className=" text-white size-6" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col place-items-center text-center  gap-4 text-white max-md:justify-center">
            <h2 className="text-2xl   font-semibold ">{username}</h2>
            <img
              src={avatar_url}
              alt="profile picture"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className=" flex flex-col gap-4 mt-6 text-white max-md:text-center">
            <p className="flex place-items-center  max-md:justify-center gap-2">
              <IoPersonOutline />
              username
            </p>
            <p className="">{full_name}</p>
            <p className=" flex place-items-center max-md:justify-center gap-2">
              <MdOutlineMailOutline /> Email:
            </p>
            <p>{email}</p>
            <p className=" flex place-items-center text-center max-md:justify-center gap-2">
              <CiPhone /> no telepon
            </p>
            <p className="">{no_telp}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
