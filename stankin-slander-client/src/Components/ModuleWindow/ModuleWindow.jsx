import React from 'react'
import classes from "./ModuleWindow.module.css"

const ModuleWindow = ({active, setActive, children}) => {
  return (
    <div className={active ? classes.module + ` ` + classes.active : classes.module} onClick={() => setActive(false)}>
      <div className={classes.module_content} onClick={(e) => e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}

export default ModuleWindow
