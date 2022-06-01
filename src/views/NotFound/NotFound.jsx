import React from "react";
import Button from "../../components/Button/Button";
import "./NotFound.scss";

import notFoundImg from "../../assets/img/notFound/404.jpg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found__text">
        На этой странице найден только один хороший <s>мальчик</s> доктор
      </h2>
      <Link to="/" className="not-found__button">
        <Button text="На главную"></Button>
      </Link>
      <div className="not-found__img">
        <img src={notFoundImg} alt="404" />
      </div>
    </div>
  );
}

export default NotFound;
