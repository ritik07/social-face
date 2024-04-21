import React, { useState, useEffect } from 'react'
import { Input, Form, Row, Col, Button, message } from 'antd'
import { updateUserTxnId, updateUserVerificationState } from '../../services/user.service';
import { useDispatch, useSelector } from "react-redux";
import { setUserDataRedux } from '../../redux/actions/userData';
import { useNavigate } from "react-router-dom";

const TransitionUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData.userData);
  const [messageApi, contextHolder] = message.useMessage();

  let userToken = localStorage.getItem("ss_token");
  const [form] = Form.useForm();

  const [isLoadingT, setIsLoadingT] = useState(false)

  useEffect(() => {
    if (userData.txn_id) {
      form.setFieldsValue({ txn_id: userData.txn_id })
    }
  }, [])

  const onFinish = async (values) => {
    try {
      setIsLoadingT(true)
      const payload = {
        ...values
      }
      let response = await updateUserTxnId(userToken, payload, userData.id)
      dispatch(setUserDataRedux(response.userDetails));
      setIsLoadingT(false)
      messageApi.open({
        type: "success",
        content: "Transition ID updated successfully 🎉!!",
      });
    } catch (error) {
      setIsLoadingT(false)
      console.log("error", error);
    }
  }

  const handleEdit = () => {
    navigate("/personal-info");
  }

  return (
    <div>
      {contextHolder}
      <Form onFinish={onFinish} form={form} name="register_form" layout="vertical">
        <Row gutter={[10, 10]}>
          <Col xs={24}>
            <Form.Item
              style={{ width: "100%" }}
              rules={[{ required: true, message: 'This field is required!' }]}
              label="Transition Number"
              name="txn_id">
              <Input style={{ width: "100%" }} placeholder='Transition Number' />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Button loading={isLoadingT} htmlType='submit' type='primary'>
              Submit Transition Number
            </Button>
          </Col>
          <Col xs={24}>
            <Button loading={isLoadingT} onClick={handleEdit}>
              Edit Personal Details
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default TransitionUpdate