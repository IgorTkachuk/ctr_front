import { Form, Input } from "antd";

import s from "./Auth.module.css";

const Auth = () => {
  return (
    <div className={s.container}>
      <Form
        className={s.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={() => console.log("form is finished")}
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
          <Input />
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
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
