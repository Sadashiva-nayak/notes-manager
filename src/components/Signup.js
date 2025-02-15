import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"" , email: "", password: "", cpassword: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name , email ,password } =credentials;
        const response = await fetch("http://localhost:5500/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            props.showAlert("account created successfully","success");
        }
        else{
           props.showAlert("invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
           <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Email address</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" ClassName="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup