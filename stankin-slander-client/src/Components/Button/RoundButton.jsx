import React from 'react'
import classes from './RoundButton.module.css'

const RoundButton = ({children, ...props}) => {
  return (
    <div className={classes.btn}>
        <button className={classes.button} {...props}>{children}</button>
    </div>
  )
}

export default RoundButton