import React from 'react'
import { useEffect, useState } from 'react'
import { getUserDetails } from '../../services/user.service'
import { useQuery, useMutation } from 'react-query';
import qrimg from '../../static/images/qr/qr.jpeg'
import QRImage from '../../components/QR-Image/QRImage'
import { LongerCaching, STATE } from '../../constants/config'
import TransitionUpdate from '../../components/TransitionUpdate/TransitionUpdate';
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.userData.userData);


  /**
   * @api_calls
   */
  // // Define a query for rescue type data
  // const { data: UserDetailsData, isLoading: UserDetailsLoading, isError: UserDetailsError } = useQuery(
  //   'UserDetailsData',
  //   () => getUserDetails(userToken),
  //   {
  //     ...LongerCaching,
  //     onError: console.log("error"),
  //   }
  // );

  return (
    <div className='cs-app-container'>
      <QRImage src={qrimg} />
      {userData.VerificationType.name === STATE.INITIATE || userData.VerificationType.name === STATE.REJECTED ?
        <TransitionUpdate />
        : null
      }
    </div>
  )
}

export default Home