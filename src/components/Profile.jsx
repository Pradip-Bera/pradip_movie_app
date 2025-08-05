
import { useEffect } from "react";
import { useSelector} from "react-redux";
import { useNavigate, Link } from "react-router-dom";


const Profile = () => {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

useEffect(() => {
    if (user) {
      navigate("/profiledetails");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-box">
          <div className="margin">
           <p className="profile-message">Please login to view profile.</p>
          <Link to="/login">
            <button className="login-btn">Go to Login</button>
          </Link>
          </div>
        </div>
      </main>
    );
  }

 return null;
};

export default Profile;
