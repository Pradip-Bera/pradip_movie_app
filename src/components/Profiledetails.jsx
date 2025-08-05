import { authActions } from "../store/authSlics.js";
import { useNavigate, Link } from "react-router-dom";
import {useSelector,useDispatch } from "react-redux";

const Profiledetails = () =>{
  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <main className="profile-page">
      <div className="profile-box">
        <h2 className="profile-title">Welcome, {user.name}!</h2>
        <p className="profile-info"><strong>Email:</strong> {user.email}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </main>
  );
}

export default Profiledetails;