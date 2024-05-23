import React from 'react'
import RoundButton from '../Button/RoundButton'
import CancelButton from '../Button/CancelButton'
import cl from './RequestForm.module.css'
import { HttpPost } from '../../requests/requests'
import server_domain from '../../host'

const RequestFrom = ({...props}) => {
  return (
        <div className={cl.form}>
          <div>
              <p>От: {props.full_name}</p>
          </div>
          <div>
              <p>Студенческий билет: {props.bilet}</p>
          </div>
          <div>
              <p>Группа: {props.group}</p>
          </div>
          <div className={cl.buttons}>
            <RoundButton onClick={() => {
              HttpPost(`${server_domain}/group/handle_answer/${localStorage.getItem("access_token")}`, {
                creator_id: props.creator_id,
                id: props.id,
                status: "approved",
                group: props.group
              });
              props.deleteReq(props.id)
            }}>Одобрить</RoundButton>
            <CancelButton onClick={() => {
              HttpPost(`${server_domain}/group/handle_answer/${localStorage.getItem("access_token")}`, {
                creator_id: props.creator_id,
                id: props.id,
                status: "denied",
                group: props.group
              });
              props.deleteReq(props.id)
            }}>Отказать</CancelButton>
          </div>
          <hr style={{color: 'black', width: '100%', }}/>
      </div>
  )
}

export default RequestFrom