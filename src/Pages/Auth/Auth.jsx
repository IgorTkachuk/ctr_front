import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reqAuthThunk } from "../../redux/auth/asyncActions";
import { selectorAuth } from "../../redux/auth/selector";

import s from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();
  const { status: authStatus } = useSelector(selectorAuth);

  const onFormFinished = (values) => {
    dispatch(reqAuthThunk(values));
  };

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
            Or <a href="#q">register now!</a>
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
