import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../utils/SupaClient";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { username, email, avatar_url, user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("anda gagal logout");
    } else {
      alert("anda berhasil logout");
      window.location.reload();
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center gap-4">
      {user && role === "user" ? (
        <>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: `${avatar_url}`,
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">{username}</p>
                <p className="font-bold">{email}</p>
              </DropdownItem>
              <DropdownItem key="profileLink" onClick={handleProfileClick}>
                Profile
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : null}
    </div>
  );
}
