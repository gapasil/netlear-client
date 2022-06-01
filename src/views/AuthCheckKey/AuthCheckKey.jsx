import React from 'react';
import './AuthCheckKey.scss';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorization } from '../../redux/actions/Auth/Auth';

import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';

function AuthCheckKey({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isAuth } = useSelector((state) => state.Auth);

  const onReturnMainPage = () => {
    history.push('/');
  };
  React.useEffect(() => {
    dispatch(fetchAuthorization(id));
  }, []);

  return (
    <div className="check-key-page">
      {isAuth ? (
        <>
          <div className="check-key-page__message">
            <p>Вы успешно авторизованы!</p>
            <p>Благодарим за регистрацию на Edmed.online!</p>
          </div>
          <Button type="primary" onClick={onReturnMainPage}>
            Возврат на главную страницу
          </Button>
        </>
      ) : (
        <div className="check-key-page__message">
          <Spinner>
            <p>Идет регистрация пользователя, пожалуйста, подождите...</p>
          </Spinner>
        </div>
      )}
    </div>
  );
}

export default AuthCheckKey;
