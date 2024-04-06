import React from 'react'
import classes from './TableRow.module.css'
import CancelButton from '../Button/CancelButton'

const TableRow = (props) => {
  return (
        <tr>
            <td className={classes.td}>
                {props.subjectName}
            </td>
            <td className={classes.td}>
                {props.homeWork}
            </td>
            <td className={classes.td}>
                {props.term}
            </td>
            {props.is_monitor && 
            <td className={classes.td}>
                {<CancelButton onClick={() => props.removeRow(props.id)}>Удалить</CancelButton>}
            </td>}
        </tr>
  )
}

export default TableRow