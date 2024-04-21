import React, { useState } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Typography, Form, Input, Checkbox, Select, Row, Col, message, Upload } from 'antd';
import InfoCard from './components/InfoCard';
import { createUser } from '../../services/user.service';

const { Dragger } = Upload;

const dummy_data = {
  "first_name": "Ritik",
  "last_name": "Soni",
  "age": "25",
  "gotra": "Singat",
  "cast": "Soni",
  "mobile_no": "9509636507",
  "email": "ritiksingat7@gmail.com",
  "gender": "MALE",
  "marital_status_id": 2,
  "education": "Btech",
  "occupation": "Software engineer",
  "present_address": "Merta city",
  "permanent_address": "Merta city",
  "city": "Merta city",
  "village": "Merta city",
  "landmark": "Merta city",
  "pincode": "341506",
  "ward": "A",
  "tehsil": "Nagaur",
  "password": "ritiksoni123",
  "gov_verification_id_type": "Aadhar Card",
  "files": [
    {
      "uid": "rc-upload-1712375408128-2",
      "lastModified": 1711783845340,
      "lastModifiedDate": "2024-03-30T07:30:45.340Z",
      "name": "image_2_6d9f80e1-c084-4386-a4a4-e28cca2afb01_340x455.jpg",
      "size": 11062,
      "type": "image/jpeg",
      "percent": 100,
      "originFileObj": {
        "uid": "rc-upload-1712375408128-2"
      },
      "status": "done",
      "response": {
        "uid": "rc-upload-1712375408128-2"
      }
    },
    {
      "uid": "rc-upload-1712375408128-3",
      "lastModified": 1711783894867,
      "lastModifiedDate": "2024-03-30T07:31:34.867Z",
      "name": "image_4_7eb5701a-57fc-4f39-aa74-1121571ea7e3_340x455.jpg",
      "size": 10880,
      "type": "image/jpeg",
      "percent": 100,
      "originFileObj": {
        "uid": "rc-upload-1712375408128-3"
      },
      "status": "done",
      "response": {
        "uid": "rc-upload-1712375408128-3"
      }
    }
  ]
}

const tehsil = {
  "tehsil": "Nagaur",
}
const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

  const [form] = Form.useForm();
  form.setFieldsValue(tehsil)

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
    console.log("value", value.uid);
    console.log("fileListData", fileListData);
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
    console.log("formData", formData);
    return formData;
  }

  const onFinish = async (data) => {
    try {
      let payload = getFormData(data);
      let response = await createUser(payload)
      console.log("response", response);
      // axios.post("test", payload)
      console.log("data", { ...data, files: fileListData });
      console.log("payload", payload);
      localStorage.setItem("ss_token", response.token)
      // navigate("/home")
      window.location.reload()
    } catch (error) {
      messageApi.error(error?.response?.data?.message ?? "Something went wrong");
      console.log("error", error);
    }
  }
  return (
    <Card className='cs-height-100'>
      <div>
        <Typography.Title level={1}>
          Register User
        </Typography.Title>
        {!agreed ?
          <InfoCard agree={agree} onAgreed={onAgreed} onInfoCheck={onInfoCheck} />
          :
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
                  <Input type='number' placeholder='Enter Mobile No.' />
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
                  <Input disabled placeholder='Enter Tehsil' />
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

              <Col xs={24} className='cs-tm-80'>
                <Button htmlType='submit' type='primary'>
                  Create account
                </Button>
              </Col>
            </Row>
          </Form>
        }
      </div>
      {contextHolder}
    </Card>
  )
}

export default Register