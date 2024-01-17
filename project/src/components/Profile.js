import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getProfileApi, updateProfile } from '../service/allApi';
import { BASE_URL } from '../service/baseUrl';

function Profile({ userName }) {
    
    const [update,setUpdate]=useState("");

    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [token,setToken]=useState("")

    const [existingImage,setExistingImage]=useState("")



    const handleClose = () => {
        setShow(false);
        // setProfile({image:"", gitHub: "", linkedIn: ""})
    }

    const handleShow = () => setShow(true);

    const [profile, setProfile] = useState({
        user: "", image: "", gitHub: "", linkedIn: ""
    })

    useEffect(()=>{
        const userData = (JSON.parse(localStorage.getItem("currentUser")))
     if(userData) { setProfile({...profile,user:userData?.userName,image:"",gitHub:userData.gitHub,linkedIn:userData.linkedIn})
        setExistingImage(userData.profile)}
    },[update])
    // api call
  

    // console.log(token);

    // console.log(profile);

    const setData = (e) => {
        const { value, name } = e.target
        setProfile({ ...profile, [name]: value })
    }
    // console.log(profile);

    useEffect(() => {
        if (profile.image) {
            setPreview(URL.createObjectURL(profile.image));
        }
        else{
            setPreview("")
        }
    }, [profile.image])
    // console.log(preview);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])

    const handleUpdate = async (e) => {
      handleClose()
        e.preventDefault()
        const { user, image, gitHub, linkedIn } = profile

       
        
            // api call
        // id
            if (localStorage.getItem("currentId")) {
                const id = localStorage.getItem("currentId")
                console.log(id);
                // header
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "access_token":`Bearer ${token}`
                }

                console.log(reqHeader);

                // body
                const reqBody = new FormData()
                reqBody.append("userName", user)
                reqBody.append("profile", image?image:existingImage)
                reqBody.append("gitHub", gitHub)
                reqBody.append("linkedIn", linkedIn)

                // console.log(reqBody);
                const response = await updateProfile(reqBody, reqHeader, id)

                // console.log(response);
                
                if (response.status == 200) {
                    alert('updated successfully')
                   

                //    update the changed data in local storage
                    localStorage.setItem("currentUser",JSON.stringify(response.data))
                    
                    setUpdate(response.data)
                    
                    handleClose()
                }
                else {
                    alert("profile update fail");
                }
   

        }
    }


    // console.log(profile);

    return (
        <div className='mt-5 py-2 px-3  my-5 shadow'>
            <Row>
                <Col>
                    <h4 className='text-danger '>
                        My Profile
                    </h4>
                </Col>
                <Col className='text-end'>
                    <div>
                        <i class="fa-solid fa-circle-check px-3 fa-2x text-success"></i>
                    </div>
                </Col>

            </Row>
            <div className='text-center'>
                {/* <img className='w-50 mt-3  mb-3 rounded-end-pill' 
                src={profile?.updatedImg?${BASE_URL}/uploads/${profile?.updatedImg}:"https://i.postimg.cc/pThV5Pzv/User-Icon.jpg"} alt="" /> */}
                {
                    existingImage != "" ?
                    <img className='w-50 mt-3 mb-3 rounded-end-pill' style={{width:'100%',height:'150px'}} src={`${BASE_URL}/uploads/${existingImage}`}  alt=''/>
                    :
                    <img className='w-50 mt-3 mb-3 rounded-end-pill' style={{width:'100%',height:'150px'}} src={"https://i.postimg.cc/pThV5Pzv/User-Icon.jpg"} alt='' />

                }
            </div>

            <Container>
                <hr className='text-danger ' />
                <p className='py-3'>Username : <span className='mx-3 fs-3'>
                    {profile.user}</span>
                </p>
                <hr />
                <p className='py-3 ' >GitHub : {profile?.gitHub}</p>
                <hr className='text-danger ' />
                <p className='py-3'>LinkedIn : {profile?.linkedIn}</p>
                <hr />

                <p className='pt-5 text-end'>
                    <span className='btn fs-3 text-info' onClick={handleShow}>
                        Edit
                    </span>
                </p>

                <Modal show={show}
                    onHide={handleClose}
                    backdrop='static'
                    size='md'
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='text-info'>
                            <h4>Update Profile</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label htmlFor="img1" className='text-center'>
                            
                            {/* <img className='w-50 mt-3  mb-3 rounded-end-pill' 
                            src={preview ? preview :profile.updatedImg?${BASE_URL}/uploads/${profile?.updatedImg}:"https://i.postimg.cc/pThV5Pzv/User-Icon.jpg"} alt="" />
                             */}
                             {
                                existingImage != "" ?
                                <img className=' mt-3  mb-3 ' style={{height:'250px',width:'200px',marginLeft:'120px'}} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="" />
                                :
                                <img className=' mt-3  mb-3 ' style={{height:'150px',width:'200px'}} src={preview ? preview : "https://i.postimg.cc/pThV5Pzv/User-Icon.jpg"} alt="" />
                             }
                        </label>
                        
                        <input placeholder='choose file' onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })}
                                id='img1' style={{ display: 'none' }} type="file" />

                        <div className='mt-5'>
                            <input value={profile?.user} onChange={(e) => setData(e)} name="user"
                                id='u1' type="text" className='form-control' />
                        </div>
                        <div className='mt-3'>
                            <input value={profile?.gitHub} onChange={(e) => setData(e)} name="gitHub" type="text" className='form-control' placeholder='GitHub' />
                        </div>
                        <div className='mt-3 mb-5'>
                            <input value={profile?.linkedIn} onChange={(e) => setData(e)} name="linkedIn" type="text" className='form-control' placeholder='LinkedIn' />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" onClick={(e) => handleUpdate(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </Container>



        </div>
    )
}

export default Profile;