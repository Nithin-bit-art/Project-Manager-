import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row,  } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../service/allApi'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'



function Home() {
  const [isLoggedIn,setLoggedIn]=useState(false)
  const [homeProjects,setHomeProjects]= useState([])
  const getHomeProjects=async()=>{
    const response = await homeProjectApi()
    setHomeProjects(response.data)
  }
  useEffect(()=>{
    getHomeProjects()
    if(localStorage.getItem("currentId")){
      setLoggedIn(true)
    }
  },[]
  )
  // console.log(homeProjects);
  // console.log(isLoggedIn);
  return (
    <div >
   <Row className="pt-5 pb-5">
        <Col className=" p-5">
        <h1  className="mt-5 ">Project Manager</h1>
        <p className="mt-3  container">One Stop Destination for all Software Development Projects.Where User can add and manage their projects.As well as access all projects available in our website...What are you waiting for!!!</p>
        {isLoggedIn?<Link to={'/dashboard'} >         <Button id="bt"  className="mt-2 " variant="outline-warning btn rounded">EXPLORE<i  class="fa-solid fa-right-long ms-2  fs-4"></i></Button></Link>:

<Link to={'/login'}>

          <Button id="bt"  className="mt-2 " variant="outline-warning btn rounded">START<i  class="fa-solid fa-right-long ms-2  fs-4"></i></Button>
        
</Link>
  }   
     </Col>

        <Col >
        <img src="https://i.postimg.cc/9QQ4BXdN/how-to-become-project-manager-removebg-preview.png" alt="" />
        </Col>
      </Row>
      <div className='p-5 mt-5 'style={{background:'lightblue'}} >
        <h1 className="text-center">EXPLORE PROJECTS</h1>
        <Container>
          <marquee ScrollAmount={25}>
            <div className='d-flex justify-content-between'>
              {homeProjects.length>0?homeProjects.map(i=>( 
              <div>
                <ProjectCard project={i} ></ProjectCard>
              </div>
                )): <h1> No Projects Uploaded Yet !</h1>
              
             }
            </div>
            </marquee>
            </Container>
        <div>
          <Link
         to= {'/Projects'} style={{textDecoration:'none'}}><h4 className="text-center">View More Projects</h4></Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home