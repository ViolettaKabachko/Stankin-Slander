import {React, useState} from 'react'
import classes from './LandingPage.module.css'
import RoundButton from '../Components/Button/RoundButton'
import RegisterInput from '../Components/RegisterInput/RegisterInput'

const LandingPage = () => {
    const [showSighIn, setSignIn] = useState(false)
    const [showRegister, setRegister] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newNickname, setNewNickname] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [homeLanguge, setHomeLanguage] = useState("")
    const [targetLanguage, setTargetLanguage] = useState("")


    const addInput = (placeholder, type, value, onChange) => {
        return <RegisterInput type={type} value={value} placeholder={placeholder}
         onChange={e => onChange(e.target.value)}>
        </RegisterInput>
    }


  return (
    <div>
        <div className={classes.title}>
            Welcome in the Dictionary, sign in or make an account:
        </div>

        <div className={classes.button}>
            <RoundButton onClick={() => setSignIn(!showSighIn)}>
                Sign in</RoundButton>
        </div>

        <div>
            {showSighIn && addInput("Email", "text", email, setEmail)}
            {showSighIn && addInput("Password", "password", 
            password, setPassword)}
            {showSighIn && <RoundButton
             onClick={() => {}}
             style={{'background-color': '#7dc4c7', padding: '1 5 1 5', 'font-size': 22}}>SignIn</RoundButton>}
        </div>

        <div className={classes.button}>
            <RoundButton onClick={() => {setRegister(!showRegister)}}>Register</RoundButton>
        </div>

        <div>
            {showRegister && addInput("Email", "text", newEmail, setNewEmail)}
            {showRegister && addInput("Nickname", "text", newNickname, setNewNickname)}
            {showRegister && addInput("Home language", "text", homeLanguge, setHomeLanguage)}
            {showRegister && addInput("Target language", "text", targetLanguage, setTargetLanguage)}
            {showRegister && addInput("Password", "password", newPassword, setNewPassword)}
           
            {showRegister && <RoundButton
             onClick={() => {}}
             style={{'background-color': '#7dc4c7', padding: '1 5 1 5', 'font-size': 22}}>Create an account</RoundButton>}
        </div>
    </div>
  )
}

export default LandingPage