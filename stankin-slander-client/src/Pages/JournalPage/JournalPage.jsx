import {React, useState, useEffect} from 'react'
import classes from './JournalPage.module.css'
import TableRow from '../../Components/TableRow/TableRow'
import InputTableRow from '../../Components/InputTableRow/InputTableRow'
import TableHeader from '../../Components/TableHeader/TableHeader'
import ModuleWindow from '../../Components/ModuleWindow/ModuleWindow'
import HttpGet from '../../requests/requests'
import server_domain from '../../host'
import RoundButton from '../../Components/Button/RoundButton'
import CancelButton from '../../Components/Button/CancelButton'

const JournalPage = () => {
    const monitor = Boolean(localStorage.getItem("is_monitor"))

    const [rows, setRows] = useState([])
    const [gruop, setGroup] = useState("ИДБ-23-13")
    const [active, setActive] = useState(false)
    const [activeConfirm, setActiveConfirm] = useState(false)
    const [deletingRow, setDeletingRow] = useState({})


    const removeRow = (row_id) => {
        setRows(rows.filter(x => x.id !== row_id))
    }

    const addRow = (newRow) => {
        setRows([...rows, newRow])
    }
    
    useEffect(() => {HttpGet(`${server_domain}/test`).then(res => {res.map(x => x["is_monitor"] = monitor); setRows([...rows, ...res])})}, [])

    const header = <TableHeader subjectName="Предмет" homeWork="Задание" notes="Примечания" term="До какого числа" is_monitor={monitor}/>

    return (
        <div className={classes.body}>
            <div className={classes.title}>
                Текущие домашние работы для группы {gruop}
            </div>
            <table  className={classes.table}>
                <tbody>
                {header}    
                    {[...rows.map(x => <TableRow id={x.id} subjectName={x.subjectName} 
                    notes={x.notes} homeWork={x.homeWork} term={x.term} 
                    is_monitor={x.is_monitor} setRemoveActive={setActiveConfirm}
                    removeRow={removeRow} setDelRow={setDeletingRow}/>)]}
                </tbody>
            </table>
            <RoundButton onClick={() => setActive(true)}>Добавить</RoundButton>

            <ModuleWindow active={active} setActive={setActive}>
                <InputTableRow add={addRow} remove={removeRow} setActive={setActive}/>
            </ModuleWindow>

            <ModuleWindow active={activeConfirm} setActive={setActiveConfirm}>
                <div>
                    <p style={{margin: 0}}>Вы точно хотите удалить задани по предмету "{deletingRow.name}"?</p>
                </div>
                <div style={{margin: 10}}>
                    <CancelButton onClick={() => {setActive(false); removeRow(deletingRow.id); setActiveConfirm(false)}}>УДАЛИ ЕГО!1!</CancelButton>
                </div>
                <div style={{margin: 10}}>
                    <RoundButton onClick={() => setActiveConfirm(false)}>Обратно давай</RoundButton>
                </div>
            </ModuleWindow>
        </div>
    )
}

export default JournalPage