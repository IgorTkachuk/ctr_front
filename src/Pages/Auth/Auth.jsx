import { useEffect } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reqAuthThunk } from "../../redux/auth/asyncActions";
import { selectorAuth } from "../../redux/auth/selector";
import { Link, Navigate, useLocation } from "react-router-dom";

import s from "./Auth.module.css";
import { selectorSignup } from "../../redux/signup/selectors";

const Auth = () => {
  const location = useLocation();

  const redirectedFrom = location?.state?.from?.pathname;

  const dispatch = useDispatch();
  const { status: authStatus } = useSelector(selectorAuth);
  const { status: signupStatus } = useSelector(selectorSignup);

  const onFormFinished = (values) => {
    dispatch(reqAuthThunk(values));
  };

  useEffect(() => {
    if (signupStatus === "SUCCESS") {
      notification.open({
        message: "Registered!",
        description: "Registered success! Now you can log in.",
        duration: 3,
      });
    }
  }, [signupStatus]);

  useEffect(() => {
    if (redirectedFrom) {
      notification.open({
        message: "Warning!",
        description: "You need authenticate first.",
        duration: 3,
      });
    }
  }, [redirectedFrom]);

  if (authStatus === "SUCCESS") {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className={s.container}>
      <Form
        className={s.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFormFinished}
        onFinishFailed={() => {
          console.log("form finish is failed");
        }}
      >
        <Form.Item
          label="Username"
          name="username"
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
        <Form.Item wrapperCol={{ span: 24 }}>
          <a className={s["login-form-forgot"]} href="#q">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={s["login-form-button"]}
          >
            Log in
          </Button>
          <div className={s["login-form-register"]}>
            Or <Link to="/signup">register now!</Link>
          </div>
        </Form.Item>
        {authStatus === "ERROR" ? (
          <Alert message="Autentication error!" type="error" closable />
        ) : null}
      </Form>
    </div>
  );
};

export default Auth;
