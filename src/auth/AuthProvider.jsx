import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import Loading from "../components/Loading";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) => {
  supabase.auth.signInWithPassword({ email, password });
};

const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [auth, setauth] = useState(false);
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);
  const [full_name, setfull_name] = useState("");
  const [email, setemail] = useState("");
  const [avatar_url, setavatar] = useState("");
  const [no_telp, setno_telp] = useState("");
  useEffect(() => {
    setloading(true);
    const getuser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentuser } = data;
      setuser(currentuser ?? null);
      setauth(currentuser ? true : false);

      if (currentuser) {
        getdatauser(currentuser.id);
      } else {
        console.log("data user belum tersedia");
        setloading(false);
      }
    };

    getuser();
    const getdatauser = async (userid) => {
      try {
        const { data: userdata } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userid);

        if (userdata && userdata.length > 0) {
          setusername(userdata[0].username);
          setemail(userdata[0].email);
          setavatar(userdata[0].avatar_url);
          setrole(userdata[0].role);
          setno_telp(userdata[0].no_telp);
          setfull_name(userdata[0].full_name);
        }
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setuser(session.user);
        setauth(true);
      } else if (event === "SIGNED_OUT") {
        setuser(null);
        setauth(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        username,
        role,
        user,
        auth,
        loading,
        email,
        avatar_url,
        no_telp,
        full_name,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
