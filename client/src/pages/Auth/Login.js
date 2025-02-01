import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import '../css/Register.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const loaction = useLocation();

    // form handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("http://localhost:8080/api/vi/auth/login",
                { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message);

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(loaction.state || "/"); // Navigate to home
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
                    <h4 className='title'>LOGIN FORM</h4>

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
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >
                            Forgot Password
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    );
}

export default Login;