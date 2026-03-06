import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // State from store.js
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()); // Call logoutUser action from authSlice.js to logout user
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center p-4 bg-[#111c2d] text-gray-300">
      <h2>
        Welcome <span className="font-bold">{user?.name}</span>
      </h2>

      <button onClick={handleLogout} >
        Logout
      </button>
    </div>
  );
}

export default Navbar;