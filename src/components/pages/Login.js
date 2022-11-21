import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import Button from "../micros/Button";
import Input from "../micros/Input";

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [equalPassword, setEqualPassword] = useState(false)

  const [activeLogin, setActiveLogin] = useState(true)
  const [activeSignUp, setActiveSignUp] = useState(false)

  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()
   
    if(localStorage.getItem("isLogged") === "false") {
      localStorage.setItem("isLogged", true)
      navigate('/')
    }
  }
  const handleSignUp = async e => {
    e.preventDefault()
    
    if(localStorage.getItem("isLogged") !== "false") {
      navigate('/')
    }
  }

  useEffect(() => {
    if(password === confirmPassword && password && email) {
      setEqualPassword(true)
    }else {
      setEqualPassword(false)
    }
  }, [confirmPassword, password, email])
  
  useEffect(() => {
    if(localStorage.getItem("isLogged") !== "false") {
      navigate('/')
    }
  }, [])


  return (
    <div className='flex flex-col justify-center items-center p-12 rounded-3xl mx-[25%] my-5 z-0'>
      <div className='flex flex-row'>
        <button className={activeLogin ? "font-bold text-lg bg-blue-500 p-3 rounded-l-xl border-r text-white text-center cursor-default" :
         "font-bold text-lg bg-blue-300 p-3 rounded-l-xl border-r text-white text-center cursor-default"}
          onClick={activeLogin ? "": () => {setActiveLogin(true); setActiveSignUp(false)}}
        >Login</button>

        <button className={activeSignUp ? "font-bold text-lg bg-blue-500 p-3 rounded-r-xl text-white text-center cursor-default" :
         "font-bold text-lg bg-blue-300 p-3 rounded-r-xl text-white text-center cursor-default"}
          onClick={activeSignUp ? "": () => {setActiveLogin(false); setActiveSignUp(true)}}
        >SignUp</button>

      </div>
      { activeLogin ? 
      <form className="flex-col flex mt-8 gap-5 min-w-[350px]" onSubmit={handleLogin}>
        <Input type="email" placeholder="E-mail" setState={setEmail}/>
        <Input type="password" placeholder="Password" setState={setPassword}/>
        <Button>Login</Button>
      </form>
      :
      <form className="flex-col flex mt-8 gap-5  min-w-[350px]" onSubmit={handleSignUp}>
        <Input type="email" placeholder="E-mail" setState={setEmail}/>
        <Input type="password" placeholder="Password" setState={setPassword}/>
        <Input type="password" placeholder="Confirm Password" setState={setConfirmPassword}/>
        <Button disabled={!equalPassword}>SignUp</Button>
      </form>
      }
    </div>
  );
}

export default Login