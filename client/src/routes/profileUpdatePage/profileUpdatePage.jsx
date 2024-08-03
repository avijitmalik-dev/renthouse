
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiConfig from "../../config";
import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ProfileUpdatePage() {

  const {currentUser, updateUser } = useContext( AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(currentUser.avatar);
  console.log("log img...", avatar);
  const [fromData, setFromData] = useState({
    name : currentUser.name, 
    email : currentUser.email,
    password : "",
    avatar: currentUser.avatar
  });

  useEffect(() => {
    setFromData((prevFromData) =>({
      ...prevFromData,
      avatar : avatar[0]
    }))
  }, [ avatar ])
  
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFromData((prevFromData) =>({
      ...prevFromData, [name ] : value 
    }))
  }

  //SUBMIT THE UPDATE DATA..
  const handleSubmit = async(e) =>{
    e.preventDefault();   
    try {
      console.log(fromData);
      const res = await apiConfig.put(`/user/${currentUser.id}`, fromData);
      updateUser(res.data.data);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.message : "Network Error");
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={ handleSubmit }>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="name">Username</label>
            <input
              id="name"
              name="name"
              type="text"
              value={fromData.name}
              onChange={ handleChange }
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={fromData.email}
              onChange={ handleChange }
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={ fromData.password }   onChange={ handleChange }/>
          </div>
          <button>Update</button>
          {error && <span >{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={ avatar[0] || currentUser.avatar || "/noavater.png"} 
        alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dc8pqinhz",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 200000,
            folder: "avatars",
        }}
        setState={setAvatar}
        >   
        </UploadWidget>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
