import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LogOut } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';


function Header({dashboard}) {
const navigate=useNavigate()

const LogOut=(e)=>{
  e.preventDefault()
  localStorage.removeItem("currentUser")
  localStorage.removeItem("currentId")
  localStorage.removeItem("token")

navigate('/')

}

  return (
    <div>
        <Navbar className="bg-danger">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://i.postimg.cc/fRF0fwz0/images.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
           <b className='ms-1 fs-2'>Project Master</b>
          </Navbar.Brand>
          {dashboard &&  
            
            <Link onClick={(e)=>LogOut(e)} className='fs-4 text-dark' style={{textDecoration:'none'}}><b>Logout</b> <i class="fa-solid fa-right-from-bracket "></i></Link>

      }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header