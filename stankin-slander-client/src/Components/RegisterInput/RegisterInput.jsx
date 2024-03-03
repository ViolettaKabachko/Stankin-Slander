import React from 'react'
import classes from './RegisterInput.module.css'

const RegisterInput = ({childern, ...props}) => {
  return (
    <div className={classes.input}>
        <input {...props}>{childern}</input>
    </div>
  )
}

export default RegisterInput