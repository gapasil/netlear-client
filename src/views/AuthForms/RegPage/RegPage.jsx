import React from 'react';
import './RegPage.scss';

import { useHistory } from 'react-router-dom';

import { setLS, getLS } from '../../../utils/LocalStorage';

import { Form, Input, Button, message } from 'antd';
import privacyPDF from '../../../assets/pdf/privacy_projectbox.pdf';

import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '../../../redux/actions/user';
import { setSpinTrue, setSpinFalse } from '../../../redux/actions/spinner';
import { fetchSignUp } from '../../../redux/actions/Auth/Auth';

import Spinner from '../../../components/Spinner/Spinner';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 22,
  },
};
const tailLayout = {
  //   wrapperCol: {
  //     offset: 8,
  //     span: 16,
  //   },
};

function RegPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
  // const [userToken, setUserToken] = React.useState(getLS('EDMED_USER_TOKEN') || null);
  // const { isCompleted, errorMessage } = useSelector((state) => state.user);

  // React.useEffect(() => {
  //   if (isCompleted) {
  //     message.success('Письмо о подтверждении отправлено на указанный Email');
  //     dispatch(setSpinFalse());
  //   }
  //   if (errorMessage === 500) {
  //     message.error('Проверьте правильность электронной почты!');
  //     dispatch(setSpinFalse());
  //   }
  //   if (errorMessage === 401) {
  //     message.error('Данный Email уже зарегистрирован!');
  //     dispatch(setSpinFalse());
  //   }
  // }, [isCompleted, errorMessage]);

  React.useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);
  
  const onFinish = async (values) => {
    dispatch(setSpinTrue());
    await dispatch(fetchSignUp(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register">
      <AuthHeader title="Регистрация" />
      <div className="register__form">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите Ваше имя!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите фамилию!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите Email!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <p>
            Регистрируясь, вы соглашаетесь с <a href={privacyPDF}>правилами пользования сайтом</a> и
            даёте согласие на обработку персональных данных.
          </p>
          <Form.Item {...tailLayout}>
            <Spinner>
              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Spinner>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegPage;
