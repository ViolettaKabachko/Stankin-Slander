import {React, useState} from 'react'
import classes from './LandingPage.module.css'
import RoundButton from '../../Components/Button/RoundButton'
import RegisterInput from '../../Components/RegisterInput/RegisterInput'
import { validateEmail, validateFullname } from '../../inputsValidation'

const LandingPage = () => {
    const [showSighIn, setSignIn] = useState(false)
    const [showRegister, setRegister] = useState(false)
    const [showRegisterError, setRegisterError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [studBilet, setStudBilet] = useState("")
    const [studentGroup, setStudentGroup] = useState("")
    const [monitorVerification, setMonitorVerification] = useState("");
    
    const validations = [validateFullname, validateEmail]

    const addInput = (placeholder, type, value, onChange) => {
        return <RegisterInput type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}>
        </RegisterInput>
    }

    
    const inputs = [addInput("Имя и фамилия", "text", newName, setNewName), 
    showRegister && addInput("Email", "text", newEmail, setNewEmail),
    showRegister && addInput("Номер студ.билета", "text", studBilet, setStudBilet),
    showRegister && addInput("Название учебной группы", "text", studentGroup, setStudentGroup),
    showRegister && addInput("Пароль", "password", newPassword, setNewPassword),
    showRegister && addInput("Код старосты*", "text", monitorVerification, setMonitorVerification)]
    
    const errorHandler = () => {
        for (let i = 0; i < 2; i++) {
            if (!validations[i](inputs[i].props.value)) {
                setRegisterError(true);
                return
            }
        }
        setRegisterError(false);
    } 

  return (
    <div className={classes.main_content}>
        <div className={classes.title}>
            Добро пожаловать в дневник Stankin Slander, войдите или зарегистрируйтесь:
        </div>

        <div className={classes.button}>
            <RoundButton style={{marginBottom: 10}} onClick={() => setSignIn(!showSighIn)}>
                Вход
            </RoundButton>
        </div>
        
        <div className={classes.inputs}>
            {showSighIn && addInput("Email", "text", email, setEmail)}
            {showSighIn && addInput("Пароль", "password", password, setPassword)}
            {showSighIn && <RoundButton
             onClick={() => {}}
             style={{'marginBottom': 10, 'backgroundColor': '#7dc4c7', padding: '1 5 1 5', 'fontSize': 22}}>Войти</RoundButton>}
        </div>

        <div className={classes.button}>
            <RoundButton onClick={() => {setRegister(!showRegister)}}>Регистрация</RoundButton>
        </div>

        <div className={classes.inputs}>
            {showRegister && inputs}
           
            {showRegister && <RoundButton
             onClick={() => {errorHandler()}}
             style={{'backgroundColor': '#7dc4c7', padding: '1 5 1 5', 'fontSize': 22}}>
                Зарегистрироваться</RoundButton>}
            
            {showRegister && showRegisterError && <div className={classes.button}><p style={{color: "red", fontSize: 21}}>Одно или несколько полей заполнены неверно</p></div>}
        </div>
    </div>
  )
}

export default LandingPage