import React, { useState } from 'react';
import { Button, Card, Typography, Form, Input, Checkbox, Select, Row, Col, message, Upload } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from '../../services/user.service';
import { setUserDataRedux } from '../../redux/actions/userData';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);
  let userToken = localStorage.getItem("ss_token");

  const { Dragger } = Upload;
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [form] = Form.useForm();
  form.setFieldsValue(userData)

  const [agree, setAgree] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [fileListData, setFileListData] = useState([]);

  const onInfoCheck = () => {
    setAgree(!agree)
  }

  const onAgreed = () => {
    setAgreed(true)
  }

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      // Check if the file type is PDF
      const isPDF = file.type === "application/pdf";
      const isJPG = file.type === "image/jpeg"; // corrected to image/jpeg
      const isPNG = file.type === "image/png"; // corrected to image/png
      if (!isPDF && !isJPG && !isPNG) { // corrected logical condition
        message.error("You can only upload PDF, JPG, or PNG files!"); // corrected error message
      }
      console.log("fileListData.length", fileListData.length);
      if (fileListData.length == 2) {
        return message.error("You only upload two files!");
      }
      return (isPDF || isJPG || isPNG) ? true : Upload.LIST_IGNORE; // corrected logical condition and file types
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      setFileListData(info.fileList);

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };


  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const fmData = new FormData();
      console.log("fmData", fmData);
      fmData.append("image", file);
      let response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(file);
        }, 1200);
      });
      if (response) {
        onSuccess(response);
      } else {
        onError({ event: "error" });
      }
      console.log("response", response);
    } catch (error) {
      onError({ message: "error" });
      console.log("error", error);
    }
  };

  const handleRemove = (value) => {
    let response = removeItemByUid(fileListData, value.uid);
  };

  function removeItemByUid(array, uidToRemove) {
    return array.filter((item) => item.uid !== uidToRemove);
  }

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    for (let i = 0; i < fileListData.length; i++) {
      formData.append("image" + i, fileListData[i].response);
    }
    return formData;
  }

  const onFinish = async (data) => {
    try {
      setIsLoading(true)
      let payload = getFormData(data);
      let response = await updateUserDetails(userToken, payload, userData.id)
      dispatch(setUserDataRedux(response.userDetails));
      setIsLoading(false)
      navigate("/home")
      // localStorage.setItem("ss_token", response.token)
      // window.location.reload()
    } catch (error) {
      setIsLoading(false)
      messageApi.error(error?.response?.data?.message ?? "Something went wrong");
      console.log("error", error);
    }
  }

  return (
    <div className='cs-m-20'>
      <Form onFinish={onFinish} form={form} name="register_form" layout="vertical">
        <Row gutter={[10, 10]}>
          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: 'This field is required!' }]}
              label="First Name"
              name="first_name">
              <Input placeholder='Enter First Name' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: 'This field is required!' }]}
              label="Last Name"
              name="last_name">
              <Input placeholder='Enter Last Name' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Age" name="age">
              <Input type='number' placeholder='Enter Age' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Gotra" name="gotra">
              <Input placeholder='Enter Gotra' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Cast" name="cast">
              <Input placeholder='Enter Cast' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Mobile No." name="mobile_no">
              <Input disabled type='number' placeholder='Enter Mobile No.' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Email" name="email">
              <Input placeholder='Enter Email' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Gender" name="gender">
              <Select placeholder="Select Gender">
                {[{ id: "MALE", name: "MALE" }, { id: "FEMALE", name: "FEMALE" }, { id: "Other", name: "OTHER" }].map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: 'This field is required!' }]}
              label="Marital Status"
              name="marital_status_id"
            >
              <Select placeholder="Select Marital Status">
                {[
                  { id: "Married", name: "Married" },
                  { id: "Unmarried", name: "Unmarried" },
                  { id: "Divorced", name: "Divorced" },
                  { id: "Widowed", name: "Widowed" },
                  { id: "Separated", name: "Separated" }
                ].map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Education" name="education">
              <Input.TextArea placeholder='Enter Education Details' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Occupation" name="occupation">
              <Input placeholder='Enter Occupation Details' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Present Address" name="present_address">
              <Input.TextArea placeholder='Enter Present Address' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Permanent Address" name="permanent_address">
              <Input.TextArea placeholder='Enter Permanent Address' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="City" name="city">
              <Input placeholder='Enter city' />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Village" name="village">
              <Input placeholder='Enter village' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Landmark" name="landmark">
              <Input.TextArea placeholder='Enter Landmark' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Pin code" name="pincode">
              <Input type='number' placeholder='Enter Pin code' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Ward" name="ward">
              <Input placeholder='Enter ward' />
            </Form.Item>
          </Col>

          <Col xs={8}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Tehsil" name="tehsil">
              <Input value={"Nagaur"} disabled placeholder='Enter Tehsil' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Create Password" name="password">
              <Input placeholder='Enter New Password' />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'This field is required!' }]} label="Verification Type" name="gov_verification_id_type">
              <Select placeholder="Select Verification Type">
                {[{ id: "Aadhar Card", name: "Aadhar Card" }, { id: "Voter ID Card", name: "Voter ID Card" }].map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Typography.Text>
              Upload Verification Id Image (Both front and back)
            </Typography.Text>
            <Dragger
              onRemove={handleRemove}
              fileList={fileListData}
              {...props}
              customRequest={uploadImage}
            >
              <div className="cs-bm-30">
                <Typography.Text type="secondary">File uploader</Typography.Text>
              </div>
              <p className="ant-upload-drag-icon">
                <FileAddOutlined className="cs-clr-black" />
              </p>
              <p className="ant-upload-text">
                <span className="cs-color-primary">Add files</span> or drop files here
              </p>
              <p className="ant-upload-hint">
                We're currently supporting PDF <br />
                under the size of 8mb
              </p>
            </Dragger>
          </Col>

          <Col xs={24} style={{ marginBottom: "60px", marginTop: "100px" }}>
            <Button loading={isLoading} htmlType='submit' type='primary'>
              Update Info
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PersonalInfo