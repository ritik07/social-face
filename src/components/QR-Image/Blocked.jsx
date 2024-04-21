import React from 'react'
import Logout from '../Logout/Logout';
import blockedAnimation from "../../static/json/Animation - 1713332097279.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from 'antd';

const Blocked = () => {
  const userData = useSelector((state) => state.userData.userData);

  return (
    <div>
      <Lottie animationData={blockedAnimation} loop={false} />
      <Typography.Title className='cs-ta-center' level={5}>
        Your account has been blocked, Please contact Administrator for more information
      </Typography.Title>
    </div>
  )
}

export default Blocked