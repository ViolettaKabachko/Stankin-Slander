import cl from './Navbar.module.css'
import {React} from 'react'


const Navbar = () => {
  return (
    <div className={cl.navbar}>
       <div>
          <div><a href="/journal" className={localStorage.getItem("chosen_group") ? cl.anchor : cl.anchor_disabled}>К таблице</a></div>
          <div><a href="/users_page" className={cl.anchor}>Личный кабинет</a></div>
      </div>
    </div>
  )
}

export default Navbar