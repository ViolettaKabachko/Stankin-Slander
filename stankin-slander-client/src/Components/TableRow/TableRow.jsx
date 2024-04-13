import {React} from 'react'
import classes from './TableRow.module.css'
import CancelButton from '../Button/CancelButton'


const TableRow = (props) => {

  return (
        <tr className={classes.tableR}>
            <td className={classes.tdName}>
                {props.subjectName}
            </td>
            <td className={classes.tdWork}>
                {props.homeWork}
            </td>
            <td className={classes.tdNotes}>
                {props.notes}
            </td>
            <td className={classes.tdTerm}>
                {props.term}
            </td>
            {props.is_monitor && 
            <td className={classes.td}>
                {<CancelButton onClick={() => {props.setDelRow({id: props.id, name: props.subjectName}); props.setRemoveActive(true)}}>╳</CancelButton>}
            </td>
            }
        </tr>
        
  )
}

export default TableRow