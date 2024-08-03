import "./newPostPage.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import UploadWidget from './../../components/uploadWidget/UploadWidget';
import apiConfig from "../../config";
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';



function NewPostPage() { 
const [images, setImages] = useState([]);
const [error, setError] = useState("");
const  navigate = useNavigate()
const [formData, setFormData] = useState({
  title : "",
  price: "",
  address :"",
  bedroom: "",
  city : "",
  latitude: "",
  bathroom : "",
  longtude: "",
  type : "",
  property: "",
  images
});

const [postDetail, setPostDetail] = useState({
  desc:'',
  utilites: "",
  pet : "",
  school : "",
  restaurant : "",
  income :"",
  bus : "",
  size : "",
});

const handleChange = (e)=>{
  const { name, value } = e.target;
  if(name in formData){
    if(name === "price" || name === "bedroom" || name === "bedroom" || name==="bathroom" ){
      setFormData({...formData, [name] : parseInt(value) || 0 });
    }else{
      setFormData({...formData, [name] : value});
    }
  }else if(name in postDetail){
      setPostDetail({...postDetail, [name]: value});
    
  }
  // console.log("show all formdata...", formData);
}


const handleQuillChange = (value) => {
  setPostDetail({...postDetail, desc : value})
};



const handleSubmit =async(e)=>{
  e.preventDefault()
  setFormData({...formData, images : images })
  console.log(formData);
  try {
    console.log(images);
    const Post = ({...formData})
    const resp = await apiConfig.post("/posts/",{
      Post,
      postDetail
    })
    if(resp.status === 200 || resp.status === 201){
      // console.log(resp);
      const id = resp.data.data.id;
      console.log(id);
      navigate("/"+id);
    }else{
      console.error("Error creating post:", resp.data);
      setError(resp.error)
    }
  } catch (err) {
    console.error(err);
    navigate("/profile/createnewpost")
    setError(err.message);
  }
}


  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" value={formData.price} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" value={formData.address} onChange={handleChange}/>
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={handleQuillChange} value={postDetail.desc} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={formData.city} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" value={formData.bedroom} onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" value={formData.bathroom} onChange={handleChange} />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" value={formData.latitude} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longtude" name="longtude" type="text" value={formData.longtude} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type"  value={formData.type} onChange={handleChange}>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property" value={formData.property} onChange={handleChange}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilites" value={postDetail.utilites} onChange={handleChange}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" value={postDetail.pet} onChange={handleChange}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                value={postDetail.income} 
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" value={postDetail.size} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" value={postDetail.school} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" value={postDetail.bus} onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" value={postDetail.restaurant} onChange={handleChange}/>
            </div>
              {error}
            <button className="sendButton">upload</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((img, index) =>(
          <img src={img}  key={index} alt="" />
        ))}
      <UploadWidget
          uwConfig={{
            cloudName: "dc8pqinhz",
            uploadPreset: "estate",
            multiple: true,
            maxImageFileSize: 200000,
            folder: "posts",
        }}
          setState={setImages}
        >   
        </UploadWidget>
      </div>
    </div>
  );
}

export default NewPostPage;
