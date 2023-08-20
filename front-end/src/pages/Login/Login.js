import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { useStateProvider } from "../../utils/StateProvider";

const LoginPage = () => {
    const { dispatch } = useStateProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post("http://localhost:8081/login", { email, password })
            .then(res => {
                console.log(res);
                const userData = res.data;
                if (userData) {
                    dispatch({ type: "SET_ID", payload: userData.id });
                    localStorage.setItem("userId", userData.id);
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    };


    return (
        <>
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{height: '100vh'}}>

        <MDBRow className='d-flex justify-content-center'>
            <MDBCol md='6' className='position-relative'>

            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <MDBCard className='my-5 bg-glass'>
            <h3 className="fw-normal text-center m-5" style={{letterSpacing: '1px'}}>Log in</h3>
                <MDBCardBody className='p-5'>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>


                <div className='d-flex justify-content-center'>
                    <MDBBtn className='w-50 mb-4' size='md' onClick={handleLogin}>sign up</MDBBtn>
                </div>
                <div className='d-flex justify-content-between mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                </div>

                <div className="text-center">
                    <p className='ms-5'>Don't have an account? <a href="#!" className="link-info">Register here</a></p>
                </div>

                </MDBCardBody>
            </MDBCard>

            </MDBCol>

        </MDBRow>

        </MDBContainer>
    </>
    );
};

export default LoginPage;
