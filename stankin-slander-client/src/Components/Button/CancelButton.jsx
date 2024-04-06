import React from 'react'
import classes from './CancelButton.module.css'

const CancelButton = ({children, ...props}) => {
    return (
        <div className={classes.btn}>
            <button className={classes.button} {...props}>{children}</button>
        </div>
      )
}

export default CancelButton