import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { loginApi, registerApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({ register }) {

  const navigate = useNavigate()

  // state to store inputs
  const [user, setUser] = useState({
    userName: "", email: "", password: ""
  })

  // state to check validation
  const [unameValid, setUnameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [pswValid, setPswValid] = useState(false)


  const setInputs = (e) => {
    const { name, value } = e.target


    if(name=='userName'){
      if(value.match(/^[a-zA-Z ]+$/)){
        setUnameValid(false)
      }
      else{
        setUnameValid(true)
      }
    }

    if(name=='email'){
      if(value.match( /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
        setEmailValid(false)
      }
      else{
        setEmailValid(true)
      }
    }

    if(name=='password'){
      if(value.match(/^[0-9a-zA-Z@]{3,8}$/)){
        setPswValid(false)
      }
      else{
        setPswValid(true)
      }
    }

    // store data after checkin validation
    setUser({ ...user, [name]: value })


  }
  console.log(user);

  const handleRegister = async (e) => {
    e.preventDefault()
    const { userName, email, password } = user
    if (!userName || !email || !password) {
      toast.error('please fill all Datas', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      const result = await registerApi(user)
      if (result.status == 200) {
        toast.success(`${result.data.userName} your account created successfully !`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // reset user state 
        setUser({ userName: "", email: "", password: "" })
        navigate('/login')
      }
      else {
        toast.error(result.response.data, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {
      toast.error("please fill all Datas", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    else {
      const result = await loginApi(user)
      if (result.status == 200) {
        // token
        // console.log(result.data.token);
        // store user datas in local storage
        sessionStorage.setItem("token",result.data.token)
        localStorage.setItem("currentUser",JSON.stringify(result.data.user));
        localStorage.setItem("currentId",result.data.user._id);


        toast.success(`login success`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // reset user state 
        setUser({ email: "", password: "" })
        navigate('/')
      }
      else {
        toast.error(result.response.data, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }


  const isRegisterForm = register ? true : false

  return (
    <div>
      <div className='w-50 container bg-light shadow-lg mb-5 mt-5 p-5'>
        <Row>
          <Col>
            <Link className='p-3 fs-5' style={{ textDecoration: 'none' }}><i clas="fa-solid fa-angles-left fa-fade text-danger me-2"></i>Back To Home</Link>
            <img className='w-100' src={isRegisterForm ? 'https://i.postimg.cc/mZ02bJqy/login.gif' : 'https://i.postimg.cc/mZ02bJqy/login.gif'} alt="" />
          </Col>


          <Col className='p-3'>
            <h1 className='text-center'>
              {
                isRegisterForm ? 'Sign Up' : 'Sign In'
              }
            </h1>
            <div>


              {isRegisterForm &&
                <>
                  <FloatingLabel controlId='floatingPassword' label="User Name" className="mb-3">
                    <Form.Control type='text' placeholder="User Name" value={user.userName} onChange={(e) => setInputs(e)} name="userName" />
                  </FloatingLabel>
                  {unameValid &&
                    <p className='text-danger'>Include charecters only</p>
                  }

                </>
              }
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" value={user.email} onChange={(e) => setInputs(e)} name="email" />
              </FloatingLabel>
{ emailValid &&
             <p className='text-danger'>Email is not valid</p>
}     
         <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
                <Form.Control type="password" placeholder="Password" value={user.password} onChange={(e) => setInputs(e)} name="password" />
              </FloatingLabel>
{     pswValid &&    
     <p className='text-danger'>Invalid password</p>
}         
     <div className='text-center mt-5'>
                {
                  isRegisterForm ?
                    <Button onClick={(e) => handleRegister(e)} className='btn btn-danger rounded pill px-4 py-2'>Register</Button>
                    :
                    <Button onClick={(e) => handleLogin(e)} className='btn btn-danger rounded pill px-4 py-2'>Login</Button>

                }
                <div className='mt-3'>
                  {
                    isRegisterForm ?
                      <p>Already Have An Account ? <Link to={'/login'} style={{ textDecoration: 'none' }}>Login Here</Link></p> :
                      <p>New User ? <Link to={'/register'} style={{ textDecoration: 'none' }}>Sign-Up Here</Link></p>

                  }

                </div>

              </div>
            </div>

          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth