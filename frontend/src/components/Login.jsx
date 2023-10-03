import React from 'react'
import { GoogleLogin , googleLogout } from '@react-oauth/google'
import { client } from '../client.js';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Video from '../assets/share.mp4';
import Icon from '../assets/icon.png';

function Login() {
  const navigate = useNavigate();
  const responseGoogle = async (response) => {
    const decoded = jwt_decode(response.credential);
    console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, sub, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    })
  }
  return (
    <>
    <div className='flex justify-start items-center flex-col h-screen'>
    <div className='relative w-full h-full'>
      <video
        src={Video}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
      />
    </div>

    </div>
    <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay  '>
      <div className='p-5 '>
      <div className='flex justify-center items-center'>
      <img className='w-[50px]' src={Icon} alt="" />
        <h2 className='ms-2 text-2xl  text-white text-center'>SHARENET</h2>
    </div>
    
   
        <div className='mt-5'>
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => console.log('Error')}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Login