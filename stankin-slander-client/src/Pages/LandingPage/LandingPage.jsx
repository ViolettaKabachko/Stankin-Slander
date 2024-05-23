import {React, useEffect, useState} from 'react'
import classes from './LandingPage.module.css'
import RoundButton from '../../Components/Button/RoundButton'
import RegisterInput from '../../Components/RegisterInput/RegisterInput'
import { validateEmail, validateFullname, validatePassword, validateStudak } from '../../inputsValidation'
import { HttpGet, HttpPost } from '../../requests/requests'
import server_domain from '../../host'

const LandingPage = () => {
    const [showSighIn, setSignIn] = useState(false)
    const [showRegister, setRegister] = useState(false)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [studBilet, setStudBilet] = useState("")

    useEffect(() => {
        HttpGet(`${server_domain}/users/check_token/${localStorage.getItem("access_token")}`).then(
            async (res) => {
                let r = await res.json()
                if (r["status"] === 200) {
                    window.location.href = '/users_page'
                }
            }
        )
    }, [])
    
    const validations = [validateFullname, validateEmail, validateStudak, validatePassword]

    const addInput = (placeholder, type, value, onChange) => {
        return <RegisterInput type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} style={{margin: "10px"}}>
        </RegisterInput>
    }

    
    
    const inputs = [addInput("Имя и фамилия", "text", newName, setNewName), 
    showRegister && addInput("Email", "text", newEmail, setNewEmail),
    showRegister && addInput("Номер студ.билета", "text", studBilet, setStudBilet),
    showRegister && addInput("Пароль", "password", newPassword, setNewPassword),
]

    const clearInputs = () => {
        setNewName("")
        setNewEmail("")
        setStudBilet("")
        setNewPassword("")
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
             onClick={() => {
                HttpPost(`${server_domain}/users/login`, {"email": email, "password": password}).then(async (response) => {
                    let res = await response.json()
                    if (res['status'] === 200) {
                        for (var key in res)
                            localStorage.setItem(key, res[key])
                        window.location.href = "/users_page"
                    }
                    else {
                        alert("Возникла ошибка " + res['msg'])
                    }
                })
            }
        }
             style={{'marginBottom': 10, 'backgroundColor': '#7dc4c7', padding: '1 5 1 5', 'fontSize': 22}}>Войти</RoundButton>}
        </div>

        <div className={classes.button}>
            <RoundButton onClick={() => {setRegister(!showRegister)}}>Регистрация</RoundButton>
        </div>

        <div className={classes.inputs}>
            {showRegister && inputs}
            
            {showRegister && <RoundButton
             onClick={() => {
                for (let i = 0; i < inputs.length; i++) {
                    if (!validations[i](inputs[i].props.value)) {
                        alert("Одно или несколько полей введены неверно")
                        return
                    }
                }
                HttpPost(`${server_domain}/users/register`, 
                {"full_name": newName, "email": newEmail, "bilet": studBilet, "password": newPassword})
                .then(async (response) => {
                    let res = await response.json()
                    if (res['status'] === 200) {
                        clearInputs()
                    }
                    setMessage(res["msg"]); 
                });
                
            }}
             style={{'backgroundColor': '#7dc4c7', padding: '1 5 1 5', 'fontSize': 22}}>
                Зарегистрироваться
            </RoundButton>}
            {showRegister &&
            <div className={classes.button}>
                <p style={{color: "#1cb33f", fontSize: 21}}>{message}</p>
            </div>}
        </div>
    </div>
  )
}

export default LandingPage