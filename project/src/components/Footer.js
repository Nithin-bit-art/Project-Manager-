import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Mail, Phone } from 'react-feather'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className='bg-danger text-white mt-5 p-5'>
      <Row>
        <Col>
          <h1>Project Master</h1>
          <p>Completely Free App To Manage All Your Software Projects</p><br />
          <p>For Any Query <Mail className='ms-2 me-2'></Mail>contact@projectfair.com</p>
        </Col>
        <Col>
          
          <div className='ms-5'>
          <h3>Links</h3>
            <Link style={{textDecoration:'none',color:'white'}}>Home</Link><br />
            <Link style={{textDecoration:'none',color:'white'}}>Login In</Link><br />
            <Link style={{textDecoration:'none',color:'white'}}>Sign Up</Link><br />
          </div>

        </Col>
        <Col>
        <div className='ms-5'>
      <h3>Guides</h3>
      <h5>React</h5>
      <h5>React Bootstrap</h5>
      <h5>Routing</h5>
        </div>
        </Col>

        <Col lg={3} md={6} sm={12} xs={12}>
        <h4 className='text-white'><Phone></Phone>  Contact Us</h4>
        <input type='text' className='form-control w-75'placeholder='enter email'/>
        <button className='btn btn-primary w-75 mt-3'>send</button><br />
        <i class="fa-brands fa-instagram text-white fa-2x mt-3"></i>
        <i class="fa-brands fa-facebook text-white fa-2x mt-3 ms-5"></i>
        <i class="fa-brands fa-twitter text-white fa-2x mt-3 ms-5"></i>
        <i class="fa-brands fa-github text-white fa-2x mt-3 ms-5"></i>

        </Col>
      </Row>
    </div>
  )
}

export default Footer

