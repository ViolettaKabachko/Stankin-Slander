import React from 'react'
import classes from './TableHeader.module.css'

const TableHeader = (props) => {
  return (
        <tr>
            <td className={classes.htd}>
                {props.subjectName}
            </td>
            <td className={classes.htd}>
                {props.homeWork}
            </td>
            <td className={classes.htd}>
                {props.notes}
            </td>
            <td className={classes.htd}>
                {props.term}
            </td>
            {props.is_monitor && 
            <td className={classes.htd}>
            </td>
            }
        </tr>
  )
}

export default TableHeader