import React from "react";
import "./LoginPage.scss";

// import { getToken } from '../../../redux/actions/user';
import { useSelector, useDispatch } from "react-redux";
import { fetchLogIn } from "../../../redux/actions/Auth/Auth";

import { Form, Input, Button, Checkbox } from "antd";

import Spinner from "../../../components/Spinner/Spinner";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 22,
  },
};
const tailLayout = {
  // wrapperCol: {
  //   offset: 8,
  //   span: 16,
  // },
};

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.Auth);

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth]);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(fetchLogIn(values));
    // dispatch(getToken(values.email, values.password, values.remember));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClickRegister = () => {
    history.push("/reg-page");
  };
  return (
    <div className="register">
      <AuthHeader title="Войти" />
      <div className="register__form">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите Email!",
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите пароль!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <p>или</p>
            <Button type="primary" onClick={onClickRegister}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
