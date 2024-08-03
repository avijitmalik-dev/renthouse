import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import apiConfig from "../../config";



function ProfilePage() {
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const {  currentUser, updateUser } = useContext( AuthContext )

  //USER PROFILE LOGOUT

  const handleLogout = async(e)=>{
  
    e.preventDefault();
    try {
      const resp = await apiConfig.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Credential Failds!");
    }
  }

  

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button >Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
               src={ currentUser.avatar || "/noavater.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{ currentUser.name }</b>
            </span>
            <span>
              E-mail: <b>{ currentUser.email }</b>
            </span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/profile/createnewpost">
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
