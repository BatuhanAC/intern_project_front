import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import Button from "../micros/Button";
import Input from "../micros/Input";
import Cookies from "universal-cookie"
import { signProcess } from "../controller/apiController";

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [equalPassword, setEqualPassword] = useState(false)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  const [response, setResponse] = useState({})

  const [activeLogin, setActiveLogin] = useState(true)
  const [activeSignUp, setActiveSignUp] = useState(false)

  const navigate = useNavigate()

  const cookie = new Cookies()

  const handleLogin = e => {
    e.preventDefault()
    signProcess(email, password, setResponse, "/login")
  }
  const handleSignUp = e => {
    e.preventDefault()
    signProcess(email, password, setResponse, "/register", name, lastName)
  }

  useEffect(() => {
    if(response.success === false) {
    console.log(response.message)
    }

    if(response.success && localStorage.getItem("isLogged") === "false") {
      cookie.set("jwt_auth", response.token)
      localStorage.setItem("isLogged", true)
      navigate('/')
    }
  }, [response, navigate])

  useEffect(() => {
    if(password === confirmPassword && password && email && name && lastName) {
      setEqualPassword(true)
    }else {
      setEqualPassword(false)
    }
  }, [confirmPassword, password, email, name, lastName])
  
  useEffect(() => {
    if(localStorage.getItem("isLogged") !== "false") {
      navigate('/')
    }
  }, [navigate])


  return (
    <div className='flex flex-col justify-center items-center p-12 rounded-3xl z-0'>
      <div className='flex flex-row'>
        <button className={activeLogin ? "font-bold text-lg bg-blue-500 p-3 rounded-l-xl border-r text-white text-center cursor-default" :
         "font-bold text-lg bg-blue-300 p-3 rounded-l-xl border-r text-white text-center cursor-default"}
          onClick={activeLogin ? null: () => {setActiveLogin(true); setActiveSignUp(false)}}
        >Login</button>

        <button className={activeSignUp ? "font-bold text-lg bg-blue-500 p-3 rounded-r-xl text-white text-center cursor-default" :
         "font-bold text-lg bg-blue-300 p-3 rounded-r-xl text-white text-center cursor-default"}
          onClick={activeSignUp ? null: () => {setActiveLogin(false); setActiveSignUp(true)}}
        >SignUp</button>

      </div>
      { activeLogin ? 
      <form className="flex-col flex mt-8 gap-5 min-w-[350px]" onSubmit={handleLogin}>
        <Input type="email" placeholder="E-mail" setState={setEmail}/>
        <Input type="password" placeholder="Password" setState={setPassword}/>
        <Button>Login</Button>
      </form>
      :
      <form className="flex-col flex mt-8 gap-5 min-w-[350px]" onSubmit={handleSignUp}>
        <Input type="email" placeholder="E-mail" setState={setEmail}/>
        <div className="flex">
          <Input type="password" placeholder="Password" setState={setPassword}/>
          <Input type="password" placeholder="Confirm Password" setState={setConfirmPassword}/>
        </div>
        <div className="flex">
          <Input type="text" placeholder="Name" setState={setName}/>
          <Input type="text" placeholder="Last Name" setState={setLastName}/>
        </div>
        
        <Button disabled={!equalPassword}>SignUp</Button>
      </form>
      }
    </div>
  );
}

export default Login