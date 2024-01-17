import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import Myprojects from '../components/Myprojects'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import ViewMyProjects from '../components/ViewMyProjects'



function Dashboard() {

    const [uname,setUname]=useState("")
    const navigate=useNavigate()

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            try {
                const parsedUser = JSON.parse(currentUser);
                setUname(parsedUser.userName);
            } catch (error) {
                console.error("Error parsing currentUser:", error);
                // Handle the error accordingly (e.g., show an error message or handle default behavior)
            }
        } else {
            alert("Please login first");
            navigate('/');
        }
    }, []);
    return (
        <div className='bg-light'>
            <Header dashboard></Header>
            <Row>
                <Col lg={8}>
                    <div className='py-5 px-3 mx-2 my-5 shadow bg-white'>
                        <h3>Welcome <span className='text-danger'> {uname}</span></h3>
                      <Myprojects></Myprojects>
                      <ViewMyProjects></ViewMyProjects>
                    </div>

                </Col>

                <Col lg={4}>
                    <div className='py-5 px-3 mx-2 my-5 shadow bg-white'>
                        <Profile userName={uname}></Profile>
                    </div>


                </Col>
            </Row>
        </div>
    )
}

export default Dashboard