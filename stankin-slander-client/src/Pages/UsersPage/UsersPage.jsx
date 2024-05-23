import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./UsersPages.module.css"
import { useState, useMemo, useEffect } from 'react'
import CancelButton from '..//..//Components//Button//CancelButton'
import RoundButton from '..//..//Components/Button/RoundButton'
import ModuleWindow from '..//..//Components/ModuleWindow/ModuleWindow'
import RegisterInput from '..//..//Components/RegisterInput/RegisterInput'
import RequestFrom from '../../Components/RequestFrom/RequestFrom'
import { HttpGet, HttpPost } from '../../requests/requests'
import server_domain from '../../host'

const UsersPage = () => {
    const [group, setGroup] = useState(localStorage.getItem("chosen_group") === null ? "" : localStorage.getItem("chosen_group"))
    const [active, setActive] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [bilet, setBilet] = useState("")
    const [newGroup, setNewGroup] = useState("")
    const [admin, setAdmin] = useState(false)
    const [reqs, setReqs] = useState([])
    const [groups, setGroups] = useState([])

    useMemo(() => {
        localStorage.setItem("chosen_group", group)
    }, [group])

    const deleteReq = (reqId) => {
        setReqs(reqs.filter(x => x.id !== reqId))
    }

    useEffect(() => {
        HttpGet(`${server_domain}/users/${localStorage.getItem("access_token")}`).then(
            async (response) => {
                let res = await response.json()
                if (res["status"] === 200) {
                    setFullName(res["full_name"])
                    setBilet(res["bilet"])
                    setEmail(res["email"])
                    setAdmin(res["is_admin"])
                }
                else
                    window.location.href = '/'
            }
        )
    }, [])

    useEffect(() => {
        HttpGet(`${server_domain}/group/`).then(async (response) => {let res = await response.json(); setGroups(res["res"])})
    }, [])

     useEffect(() => {
       admin &&  HttpGet(`${server_domain}/group/requests/${localStorage.getItem("access_token")}`).then(async (response) => {
            let res = await response.json()
            console.log(res)
            if (res["status"] === 200)
                setReqs([...res["res"]])
            else {}
                //alert("Error is " + res["status"])
        })}, [admin] )

    return (
        <div style={{height: "100%"}}>
            <div>
                <Navbar>
                </Navbar>
            </div>

            <ModuleWindow active={active} setActive={setActive}>
                <RegisterInput value={newGroup} onChange={e => {setNewGroup(e.target.value)}} placeholder='Корректное имя группы' style={{margin: 10}}></RegisterInput>
                <RoundButton onClick={() => {
                    HttpPost(`${server_domain}/group/request/${newGroup}/${localStorage.getItem("access_token")}`).then(
                       async  (response) => {let res = await response.json(); alert(res["status"])}
                    );
                    setActive(false)
                }} style={{margin: 10, fontSize: "130%"}}>Отправить на модерацию</RoundButton>
            </ModuleWindow>

            <div className={classes.info}>

                <div className={classes.user_info}>
                    <div className={classes.info_row}>
                        <p>Имя студента: {fullName}</p>
                    </div>
                    <div className={classes.info_row}>
                        <p>Электронная почта: {email}</p>
                    </div>
                    <div className={classes.info_row}>
                        <p>Номер студенческого билета: {bilet}</p>
                    </div>
                    <div className={classes.info_row}>
                        <p>Студенческая группа:  </p>
                        <select value={group} onChange={(e) => setGroup(e.target.value)}>
                            <option selected></option>
                            {groups.map(x => <option>{x}</option>)}
                        </select>
                        </div>

                    <div className={classes.info_row}>
                        <RoundButton onClick={() => {
                            setActive(true)
                        }}>Зарегистрировать свою группу</RoundButton>
                    </div>

                    <div className={classes.info_row}>
                        <CancelButton onClick={() => {
                            localStorage.clear();
                            window.location.href = "/"
                        }}>Выйти</CancelButton>
                    </div>
                </div>

                { 
                admin && 
                <div className={classes.request}>
                    {reqs.map(x => <RequestFrom deleteReq={deleteReq} creator_id={x.creator_id} id={x.id} full_name={x.creator} bilet={x.bilet} group={x.group}></RequestFrom>)}
                </div>
                }

            </div>
        </div>
    )
}

export default UsersPage