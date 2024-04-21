import React from 'react'
import Lottie from "lottie-react";
import approvedAnimation from "../../static/json/Animation - 1713327037850.json";
import { Button, Image, Typography } from 'antd';
import { useSelector } from "react-redux";
import { BASE_URL_ASSETS } from '../../constants/baseUrl';

const Approved = () => {
  const userData = useSelector((state) => state.userData.userData);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = BASE_URL_ASSETS + JSON.parse(userData.voter_id_card_media)[0];
    link.download = 'Voter_iD.png'; // Set a default filename for the downloaded image
    link.click();
  };


  return (
    <div>
      {!userData.voter_id_card_media ? <Lottie animationData={approvedAnimation} loop={true} /> : null}
      <div className='cs-hrz-center'>
        <div className='cs-approved-animation cs-hrz-center'>
          {!userData.voter_id_card_media ? <Typography.Title level={3}>Your Voter ID card will be available in 2-3 days.</Typography.Title> :
            <div>
              <Typography.Title level={5}>Voter ID card is ready</Typography.Title>
              <Image style={{ width: "200px", height: "auto" }} src={BASE_URL_ASSETS + JSON.parse(userData.voter_id_card_media)[0]} />
              <div className='cs-hrz-center'>
                <Button onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
          }

        </div>
      </div>

    </div>
  )
}

export default Approved