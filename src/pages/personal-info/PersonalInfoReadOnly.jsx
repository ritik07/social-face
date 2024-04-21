import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

const PersonalInfoReadOnly = () => {
  const userData = useSelector((state) => state.userData.userData);
  const navigate = useNavigate()
  return (
    <div style={{ padding: '20px' }}>
      <div className='cs-dis-flex'>
        <ArrowLeftOutlined onClick={() => navigate("/profile")} style={{ fontSize: "26px", marginRight: "10px" }} />
        <h1>Personal Info</h1>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Name:</h2>
        <p>{`${userData.first_name} ${userData.last_name}`}</p>
      </div>
      <div>
        <h2>Email:</h2>
        <p>{userData.email}</p>
      </div>
      <div>
        <h2>Mobile No:</h2>
        <p>{userData.mobile_no}</p>
      </div>
      <div>
        <h2>Age:</h2>
        <p>{userData.age}</p>
      </div>
      <div>
        <h2>Gender:</h2>
        <p>{userData.gender}</p>
      </div>
      <div>
        <h2>Address:</h2>
        <p>{userData.present_address}</p>
      </div>
      <div>
        <h2>Education:</h2>
        <p>{userData.education}</p>
      </div>
      <div>
        <h2>Occupation:</h2>
        <p>{userData.occupation}</p>
      </div>
    </div>
  );
};

export default PersonalInfoReadOnly;
