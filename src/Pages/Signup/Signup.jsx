import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actSignup } from "../../redux/signup/asyncActions";
import { selectorSignup } from "../../redux/signup/selectors";
import { Navigate } from "react-router-dom";

import s from "./Signup.module.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const { status: signupStatus } = useSelector(selectorSignup);

  const onFormFinished = (values) => {
    dispatch(actSignup(values));
  };

  if (signupStatus === "SUCCESS") {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={s.container}>
      <Form
        className={s.form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFormFinished}
        onFinishFailed={() => {
          console.log("form finish is failed");
        }}
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please inputyour password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Retype password"
          name="repeat_password"
          rules={[
            {
              required: true,
              message: "Please retype your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Retype password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={s["login-form-button"]}
          >
            Register
          </Button>
        </Form.Item>
        {signupStatus === "ERROR" ? (
          <Alert message="Registration error!" type="error" closable />
        ) : null}
      </Form>
    </div>
  );
};

export default SignUp;
