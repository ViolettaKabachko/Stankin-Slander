import {React, useState} from 'react'
import RoundButton from '../Button/RoundButton'
import classes from './InputTableRow.module.css'
import RegisterInput from '../RegisterInput/RegisterInput'
import ruDateFormat from '../../funcs'
import { HttpGet, HttpPost } from '../../requests/requests'
import server_domain from '../../host'

const InputTableRow = ({add, remove, setActive}) => {
    const [subject, setSubject] = useState("")
    const [homeWork, setHomeWork] = useState("")
    const [notes, setNotes] = useState("")
    const [term, setTerm] = useState("")
    const [creator, setCreator] = useState(0)

    const clearInputs = () => {
        setHomeWork("");
        setSubject("");
        setNotes("");
        setTerm("");
    }

    const autoResize = (e) => {
        e.style.height = 'auto'
        e.style.height = e.scrollHeight + 'px';
    }

    let newRow = {
        id: Date.now(),
        subject: subject,
        homework: homeWork,
        notes: notes,
        term: ruDateFormat(term),
        is_monitor: true,
        removeRow: remove
    }

    return (
        <div className={classes.tr}>
            <div className={classes.blocks}>
                <RegisterInput value={subject} onChange={(e) => {setSubject(e.target.value)}} className={classes.input} placeholder='Название'></RegisterInput>
            </div>
            <div className={classes.blocks}>
                <textarea value={homeWork} rows={1} onChange={(e) => {setHomeWork(e.target.value); autoResize(e.target)}} className={classes.area} placeholder='Задание'></textarea>
            </div>
            <div className={classes.blocks}>
                <textarea value={notes} rows={1} onChange={(e) => {setNotes(e.target.value); autoResize(e.target)}} className={classes.area} placeholder='Примечания'></textarea>
            </div>
            <div className={classes.blocks}>
                <RegisterInput value={term} type="date" onChange={(e) => {setTerm(e.target.value)}} className={classes.input} placeholder='Срок'></RegisterInput>
            </div>
            <div className={classes.blocks}>
                <RoundButton onClick={() => {
                    add(newRow); 
                    setActive(false); 
                    clearInputs();
                    HttpPost(`${server_domain}/homework/add_homework/${localStorage.getItem("access_token")}`, 
                    {
                        group: localStorage.getItem("chosen_group"),
                        subject: subject,
                        homework: homeWork,
                        notes: notes,
                        term: term
                    }).then(async res => {let r = await res.json(); alert(r["status"])})}}>Добавить задание</RoundButton>
            </div>
        </div>
    )
}

export default InputTableRow