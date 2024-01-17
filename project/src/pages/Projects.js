import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../service/allApi'



function Project() {
  const [searchData ,setSearchData] = useState("")
  const[allProjects,setAllProjects]=useState([])
  const getAllProjects= async ()=>{
    const result= await allProjectsApi(searchData)
    setAllProjects(result.data)
  }
  useEffect(()=>{
    getAllProjects()
  },[])
  // console.log(allProjects);

  return (


    <div>

        <Header></Header>
<div className='text-center p-5'>
            <h1 className='mb-3 text-warning'>Explore All  Projects</h1>
            <div className='d-flex container w-50 mt-4 rounded'>
            <input onChange={(e)=>setSearchData(e.target.value)} id='a1' type='text' className='form-control '
            placeholder='search Projects by technology used'/>
            <i class="fa-solid fa-magnifying-glass   border p-3 shadow text-warning "></i>
    
</div> 
</div>
<div className='container py-5 mb-5'>

<Row>
  {allProjects.length > 0 ?allProjects.map(i => (
      <Col>
       <ProjectCard project={i}></ProjectCard>
      </Col>
    )) : 
    <h1>Loading.......</h1>
  }
</Row>

</div>
   </div>
  )
}

export default Project