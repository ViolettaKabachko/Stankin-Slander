import {React, useState} from 'react'
import RoundButton from '../Button/RoundButton'
import classes from './InputTableRow.module.css'

const InputTableRow = ({add, remove, setActive}) => {
    const [subject, setSubject] = useState("")
    const [homeWork, setHomeWork] = useState("")
    const [notes, setNotes] = useState("")
    const [term, setTerm] = useState("")

    const ruDateFormat = (date) => {
        let arr = date.split("-")
        arr.reverse()
        return arr.join(".")
    } 

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
        subjectName: subject,
        homeWork: homeWork,
        notes: notes,
        term: term,
        is_monitor: true,
        removeRow: remove
    }

    return (
        <div className={classes.tr}>
            <div className={classes.blocks}>
                <input value={subject} onChange={(e) => {setSubject(e.target.value)}} className={classes.input} placeholder='Название'></input>
            </div>
            <div className={classes.blocks}>
                <textarea value={homeWork} rows={1} onChange={(e) => {setHomeWork(e.target.value); autoResize(e.target)}} className={classes.area} placeholder='Задание'></textarea>
            </div>
            <div className={classes.blocks}>
                <textarea value={notes} rows={1} onChange={(e) => {setNotes(e.target.value); autoResize(e.target)}} className={classes.area} placeholder='Примечания'></textarea>
            </div>
            <div className={classes.blocks}>
                <input value={term} type="date" onChange={(e) => {setTerm(e.target.value)}} className={classes.input} placeholder='Срок'></input>
            </div>
            <div className={classes.blocks}>
                <RoundButton onClick={() => {add(newRow); setActive(false); clearInputs()}}>Добавить задание</RoundButton>
            </div>
        </div>
    )
}

export default InputTableRow