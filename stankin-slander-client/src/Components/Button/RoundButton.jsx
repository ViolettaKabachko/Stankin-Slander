import React from 'react'
import classes from './RoundButton.module.css'

const RoundButton = ({children, ...props}) => {
  console.log(props)
  return (
    <div className={classes.btn}>
        <button {...props}>{children}</button>
    </div>
  )
}

export default RoundButton