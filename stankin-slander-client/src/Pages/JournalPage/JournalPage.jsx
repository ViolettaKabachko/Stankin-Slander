import {React, useState, useEffect, useMemo} from 'react'
import classes from './JournalPage.module.css'
import TableRow from '../../Components/TableRow/TableRow'
import InputTableRow from '../../Components/InputTableRow/InputTableRow'
import TableHeader from '../../Components/TableHeader/TableHeader'
import ModuleWindow from '../../Components/ModuleWindow/ModuleWindow'
import {HttpGet, HttpPost} from '../../requests/requests'
import server_domain from '../../host'
import RoundButton from '../../Components/Button/RoundButton'
import CancelButton from '../../Components/Button/CancelButton'
import Navbar from '../../Components/Navbar/Navbar'
import ruDateFormat from '../../funcs'

const JournalPage = () => {
    const [rows, setRows] = useState([])
    const [active, setActive] = useState(false)
    const [activeConfirm, setActiveConfirm] = useState(false)
    const [deletingRow, setDeletingRow] = useState({})
    const [monitor, setMonitor] = useState(false)

    useEffect(() => {
        HttpGet(`${server_domain}/users/${localStorage.getItem("access_token")}`).then(
            async (res) => {
                let r = await res.json()
                if (r["status"] !== 200) {
                    window.location.href = '/'
                }
                else {
                    setMonitor(r["group"] === localStorage.getItem("chosen_group") || r["is_admin"])
                    console.log(monitor)
                }
            }
        );
        HttpGet(`${server_domain}/homework/${localStorage.getItem("chosen_group")}`)
        .then(async (res) => {
            let r = await res.json()
            if (r["status"] !== 200) {
                //alert("Error " + r["status"])
            }
            else {
                r['payload'].map(x => x["is_monitor"] = monitor); setRows([...r['payload']])
            }
        })
    }, [monitor])
    


    const removeRow = (row_id) => {
        setRows(rows.filter(x => x.id !== row_id))
    }

    const addRow = (newRow) => {
        setRows([...rows, newRow])
    }

    const header = <TableHeader subjectName="Предмет" homeWork="Задание" notes="Примечания" term="До какого числа" is_monitor={monitor}/>

    return (
        <div>
            <Navbar>
                <div>
                    <div><a href="/journal" className={classes.anchor}>К таблице</a></div>
                    <div><a href="/users_page" className={classes.anchor}>Личный кабинет</a></div>
                </div>
            </Navbar>
            
        <div className={classes.body}>

            <div style={{margin: "8px"}} className={classes.title}>
                Текущие домашние работы для группы {localStorage.getItem("chosen_group")}
            </div>
            <table  className={classes.table}>
                <tbody>
                {header}    
                    {[...rows.map(x => <TableRow id={x.id} subjectName={x.subject} 
                    notes={x.notes} homeWork={x.homework} term={ruDateFormat(x.term)} 
                    is_monitor={x.is_monitor} setRemoveActive={setActiveConfirm}
                    removeRow={removeRow} setDelRow={setDeletingRow}/>)]}
                </tbody>
            </table>
            {monitor && <RoundButton style={{margin: "8px"}} onClick={() => setActive(true)}>Добавить</RoundButton>}

            <ModuleWindow active={active} setActive={setActive}>
                <InputTableRow add={addRow} remove={removeRow} setActive={setActive}/>
            </ModuleWindow>

            <ModuleWindow active={activeConfirm} setActive={setActiveConfirm}>
                <div>
                    <p style={{margin: 0}}>Вы точно хотите удалить задани по предмету "{deletingRow.name}"?</p>
                </div>
                <div style={{margin: 10}}>
                    <CancelButton style={{"borderRadius": "5px", padding: "3px 10px"}} onClick={() => {
                        setActive(false);
                        removeRow(deletingRow.id); 
                        setActiveConfirm(false);
                        HttpPost(`${server_domain}/homework/delete_homework/${deletingRow.id}/${localStorage.getItem("access_token")}`)}}>УДАЛИ ЕГО!1!</CancelButton>
                </div>
            </ModuleWindow>
        </div>
        </div>
    )
}

export default JournalPage