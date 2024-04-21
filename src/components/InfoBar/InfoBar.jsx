import React from 'react'
import { Typography, Alert } from 'antd'
import './InfoBar.css'
import { APPROVED_TXT, BLOCKED_TXT, INITATE_TXT, PENDING_TXT, REJECTED_TXT } from '../../constants/Text'
import { STATE } from '../../constants/config'
import { useDispatch, useSelector } from "react-redux";

const InfoBar = ({ text, state }) => {
  const userData = useSelector((state) => state.userData.userData);

  const getInfoBarMsg = () => {
    switch (state) {
      case STATE.PENDING:
        return PENDING_TXT
      case STATE.INITIATE:
        return INITATE_TXT
      case STATE.REJECTED:
        return REJECTED_TXT
      case STATE.APPROVED:
        return APPROVED_TXT
      case STATE.BLOCKED:
        return BLOCKED_TXT

      default:
        break;
    }
  }

  const getInfoBarType = () => {
    switch (state) {
      case STATE.PENDING:
        return "warning"
      case STATE.INITIATE:
        return "info"
      case STATE.REJECTED:
        return "error"
      case STATE.APPROVED:
        return "success"
      case STATE.BLOCKED:
        return "error"
      default:
        break;
    }
  }
  return (
    <div>
      <Alert banner message={
        getInfoBarMsg() +
        (userData.VerificationType.name === STATE.REJECTED || userData.VerificationType.name === STATE.BLOCKED ? ` Reason for rejection ----> ${userData.rejection_reason}` : "")
      } type={getInfoBarType()} />
    </div>
  )
}

export default InfoBar