import  { useContext, useState } from 'react'
import { FeedbackProps } from '../assets/types/Types';
import { useNavigate } from 'react-router-dom';
import  Alert  from '@mui/material/Alert';
import { AuthContext } from '../context/AuthContext';

type LoginProps = {
    username:string,
    password:string
}

const Login = () => {
    const {dispatch} = useContext(AuthContext);
    const [data, setData]=useState<LoginProps>({username:'', password:''});
    const [feedback, setFeedback]=useState<FeedbackProps>({message:'', error:false});
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setData(pre=>({
            ...pre, [e.target.name]:e.target.value
    }))
    }
    const navigate = useNavigate();
    const handleLogin = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setFeedback({error:false, message:''});
        if (data.password.trim() === "" || data.username.trim() === "") {
          dispatch({type:'LOGIN_FAILED', payload:'Both username and password are required'})
          setFeedback({
            error: true,
            message: "Both username and password are required",
          });
        } else if (
          data.username !== import.meta.env.VITE_USERNAME ||
          data.password !== import.meta.env.VITE_PASSWORD
        ) {
          dispatch({type:'LOGIN_FAILED', payload:'Invalid credentials'})
          setFeedback({ error: true, message: "Invalid credentials" });
        }else{
          dispatch({type:'LOGIN_SUCCESS', payload:data});
          navigate("/");
        }
    }
  return (
    <div className='w-full h-screen flex items-center flex-col gap-8 justify-center radial-orange' >
        <h2 className='text-2xl font-bold text-center' >Welcome back, Admin</h2>
        <form onSubmit={handleLogin} className="bg-white p-4 items-center flex flex-col justify-center w-80 shadow-2xl rounded gap-4">
            <input onChange={handleTextChange} required className='w-full border-none outline-none rounded-lg px-4 py-2 bg-slate-100' name='username' type="text" placeholder='Enter username' />
            <input onChange={handleTextChange} required className='w-full border-none outline-none rounded-lg px-4 py-2 bg-slate-100' name='password' type="password" placeholder='Enter password' />
            {
                feedback.message &&
                <Alert className='w-full' onClose={()=>setFeedback({error:false, message:''})} variant='filled' severity={feedback.error ? 'error':'success'} >{feedback.message}</Alert>
            }
            <button type='submit' className='bg-[#cb4900] text-white font-semibold py-2 px-4 rounded hover:bg-orange-300 self-end' >Proceed</button>
        </form>
    </div>
  )
}

export default Login