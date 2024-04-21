import React from 'react'
import Logout from '../Logout/Logout';
import pendingAnimation from "../../static/json/Animation - 1713236524486.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from 'antd';

const Pending = () => {
  const userData = useSelector((state) => state.userData.userData);

  return (
    <div>
      <Lottie animationData={pendingAnimation} loop={true} />
      <Typography.Title className='cs-ta-center' level={5}>
        Sit back relax, you profile is under verification
      </Typography.Title>
      <Typography.Title className='cs-ta-center' level={5}>
        Transistion ID - {userData.txn_id}
      </Typography.Title>

      {/* <div className='cs-hrz-center cs-tm-20'>
        <Logout />
      </div> */}
    </div>
  )
}

export default Pending