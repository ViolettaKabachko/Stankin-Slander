import {React, useState} from 'react'
import RoundButton from '../Button/RoundButton'
import classes from './InputTableRow.module.css'
import TableRow from '../TableRow/TableRow'

const InputTableRow = ({add, remove}) => {
    const [subject, setSubject] = useState("")
    const [homeWork, setHomeWork] = useState("")
    const [term, setTerm] = useState("")

    const ruDateFormat = (date) => {
        let arr = date.split("-")
        arr.reverse()
        return arr.join(".")
    } 

    let newRow = {
        id: Date.now(),
        subjectName: subject,
        homeWork: homeWork,
        term: term,
        is_monitor: true,
        removeRow: remove
    }

    return (
        <tr>
            <td>
                <input onChange={(e) => {setSubject(e.target.value)}} className={classes.input} placeholder='Название предмета'></input>
            </td>
            <td>
                <input onChange={(e) => {setHomeWork(e.target.value)}} className={classes.input} placeholder='Домашнеее задание'></input>
            </td>
            <td>
                <input type="date" onChange={(e) => {setTerm(ruDateFormat(e.target.value))}} className={classes.input} placeholder='Срок (до какого числа)'></input>
            </td>
            <td>
                <RoundButton onClick={() => add(newRow)}>Добавить</RoundButton>
            </td>
        </tr>
    )
}

export default InputTableRow