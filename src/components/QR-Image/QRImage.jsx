import React from 'react';
import { Image, Button, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { STATE } from '../../constants/config';
import Pending from './Peding';
import Approved from './Approved';
import Blocked from './Blocked';

const QRImage = ({ src }) => {
  const userData = useSelector((state) => state.userData.userData);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'qr_code.png'; // Set a default filename for the downloaded image
    link.click();
  };

  // const options = {
  //   animationData: pendingAnimation,
  //   loop: true
  // };

  return (
    <div>
      {userData.VerificationType.name === STATE.PENDING ?
        <Pending />
        : userData.VerificationType.name === STATE.APPROVED ?
          <Approved />
          : userData.VerificationType.name === STATE.BLOCKED ?
            <Blocked />
            : <div>
              <Image src={src} />
              <div className='cs-flex-end cs-tm-10'>
                <Button type="primary" onClick={handleDownload}>
                  Download QR?
                </Button>
              </div>
            </div>
      }
    </div>
  );
};

export default QRImage;
