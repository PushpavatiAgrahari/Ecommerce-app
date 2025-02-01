import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import '../css/Register.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("http://localhost:8080/api/vi/auth/register",
                { name, email, password, phone, address, answer });
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    };
    return (
         <Layout >  
            <div className='form-container'>

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER FORM</h4>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Name</label> */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Enter Your Name'
                            required
                            autoFocus />

                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputEmail" className="form-label">Email</label> */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter your Email'
                            required />

                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter Your Password'
                            required />
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputPhone" className="form-label">Phone</label> */}
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder='Enter Your Phone Number'
                            required />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputAddress" className="form-label">Address</label> */}
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='Enter Your Address'
                            required />

                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="What is Your Favorite sports"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    );
}

// <layout title="Register-Ecommer App">
export default Register;