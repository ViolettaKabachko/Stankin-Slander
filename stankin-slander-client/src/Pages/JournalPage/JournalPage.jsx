import {React, useState, useEffect} from 'react'
import classes from './JournalPage.module.css'
import TableRow from '../../Components/TableRow/TableRow'
import InputTableRow from '../../Components/InputTableRow/InputTableRow'
import TableHeader from '../../Components/TableHeader/TableHeader'
import HttpGet from '../../requests/requests'

const JournalPage = () => {
    const monitor = Boolean(localStorage.getItem("is_monitor"))

    const [rows, setRows] = useState([])
    const [gruop, setGroup] = useState("ИДБ-23-13")

    const removeRow = (row_id) => {
        setRows(rows.filter(x => x.id !== row_id))
    }

    const addRow = (newRow) => {
        setRows([...rows, newRow])
    }
    
    useEffect(() => {HttpGet("http://127.0.0.1:5000/test").then(res => {res.map(x => x["is_monitor"] = monitor); setRows([...rows, ...res])})}, [])

    let inputRow = <InputTableRow add={addRow} remove={removeRow}/>;
    const header = <TableHeader subjectName="Название предмета" homeWork="Домашнее задание" term="До какого числа" is_monitor={monitor}/>

    return (
        <div className={classes.body}>
            <div className={classes.title}>
                Текущие домашние работы для группы {gruop}
            </div>
            <div>
                <table  className={classes.table}>
                    <tbody>
                        {header}
                        {[...rows.map(x => <TableRow id={x.id} subjectName={x.subjectName} homeWork={x.homeWork} term={x.term} is_monitor={x.is_monitor} removeRow={removeRow}/>), monitor && inputRow]}
                    </tbody>
                </table>
                <a href="https://pornhub.com"><img className={classes.img} src="https://medialeaks.ru/wp-content/uploads/2022/01/fb-vika-8.jpg"/></a>

            </div>
        </div>
    )
}

export default JournalPage