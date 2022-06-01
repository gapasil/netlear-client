import React from 'react';
import './CostBlock.scss';

import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function CostBlock() {
  const [sum, setSum] = React.useState(1200);
  const [saleSum, setSaleSum] = React.useState(1000);
  const [paymentItemsState, setPaymentItemsState] = React.useState([
    {
      index: 1,
      isActive: true,
      text: 'Продаем товары в интернете законно',
      cost: [
        { value: 600, currency: 'RUB' },
        { value: 7, currency: 'EUR' },
        { value: 20, currency: 'BYN' },
      ],
    },
    {
      index: 2,
      isActive: true,
      text: 'Продаем товары в интернете законно',
      cost: [
        { value: 600, currency: 'RUB' },
        { value: 7, currency: 'EUR' },
        { value: 20, currency: 'BYN' },
      ],
    },
  ]);

  const [currentSum, setCurrentSum] = React.useState(0);

  React.useEffect(() => {
    let currSum = 0;
    if (paymentItemsState) {
      paymentItemsState.map((el, i) => (el.isActive ? (currSum += el.cost[0].value) : currSum));
      setCurrentSum(currSum);
    }
  }, [paymentItemsState]);

  const onSelectPaymentItem = (index) => {
    const currentElement = paymentItemsState[index];
    currentElement.isActive = !currentElement.isActive;
    const untouchedElementsArr = paymentItemsState.filter((el, i) => i !== index);
    const newArr = [currentElement, ...untouchedElementsArr].sort((el1, el2) =>
      el1.index > el2.index ? 1 : -1,
    );
    setPaymentItemsState([...newArr]);
  };

  return (
    <div className="event-page-cost">
      <div className="event-page-cost__fully">
        <div className="event-page-cost__text">
          <p className="event-page-cost__text_light">Стоимость курса</p>
        </div>
        <div className="event-page-cost__currencies-block">
          <div className="currency">
            <span className="currency__numeric">{sum}</span>
            <span className="currency__type">RUB</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">{Math.ceil(sum / 86)}</span>
            <span className="currency__type">EUR</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">{Math.ceil(sum / 30)}</span>
            <span className="currency__type">BYN</span>
          </div>
        </div>
      </div>
      <div className="event-page-cost__fully">
        <div className="event-page-cost__text">
          <p className="event-page-cost__text_light">Стоимость курса</p>
          <p className="event-page-cost__text_active">при покупке всех записей</p>
        </div>
        <div className="event-page-cost__currencies-block event-page-cost__text_active">
          <div className="currency">
            <span className="currency__numeric">{saleSum}</span>
            <span className="currency__type">RUB</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">{Math.ceil(saleSum / 86)}</span>
            <span className="currency__type">EUR</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">{Math.ceil(saleSum / 30)}</span>
            <span className="currency__type">BYN</span>
          </div>
        </div>
      </div>
      <div className="event-page-cost__payment-block">
        <div className="payment-selection">
          {paymentItemsState.map((el, i) => {
            return (
              <div
                key={i}
                className="payment-selection__item payment-item"
                onClick={() => onSelectPaymentItem(i)}>
                <div
                  className={
                    el.isActive ? 'payment-item__line_active' : 'payment-item__line'
                  }></div>
                <div className="payment-item__content">
                  <div className="payment-item__currencies-block">
                    <span className="payment-item__number">{el.index} /</span>
                    {el.cost.map((el, i) => {
                      return (
                        <div key={i} className="payment-item-currency">
                          <span className="payment-item-currency__numeric">{el.value}</span>
                          <span className="payment-item-currency__type">{el.currency}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="payment-item__text">
                    <p className="payment-item__text_light">Продаем товары в интернете законно</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="event-page-cost__currencies-block event-page-cost__text">
          <div className="currency">
            <span className="currency__numeric">{currentSum > saleSum ? saleSum : currentSum}</span>
            <span className="currency__type">RUB</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">
              {currentSum > saleSum
                ? Math.ceil(saleSum / 86)
                : currentSum > 0
                ? Math.ceil(currentSum / 86)
                : 0}
            </span>
            <span className="currency__type">EUR</span>
          </div>
          <div className="currency">
            <span className="currency__numeric">
              {currentSum > saleSum
                ? Math.ceil(saleSum / 30)
                : currentSum > 0
                ? Math.ceil(currentSum / 30)
                : 0}
            </span>
            <span className="currency__type">BYN</span>
          </div>
        </div>
        <Button type="primary">
          Добавить в корзину <ShoppingCartOutlined />
        </Button>
      </div>
    </div>
  );
}

export default CostBlock;
