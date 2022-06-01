import { setBannerSelectors } from '../../redux/actions/eventRedactor/eventRedactor';
import SaveButton from '../../components/SaveButton/SaveButton';

export const style = {
  'ant-popover-title': { color: 'blue' },
  'ant-popover-inner-content': {
    color: 'red',
  },
};

export const aboutSpeakerPopoverContent = {
  fullName: {
    title: 'Введите имя и фамилию спикера',
    content: () => {
      return (
        <div>
          <p>По умолчанию используются данные вашего аккаунта</p>
          <p>Полное имя указывать не обязательно</p>
        </div>
      );
    },
  },
  career: {
    title: 'Введите профессию или род занятий спикера',
    content: () => {
      return (
        <div>
          <p>По умолчанию используются данные вашего аккаунта</p>
        </div>
      );
    },
  },
  description: {
    title: 'Введите описание спикера',
    content: () => {
      return (
        <div>
          <p>По умолчанию используются данные вашего аккаунта</p>
          <p>Желательно описать свою профессию (должность) или свои достижения в данной сфере</p>
          <p>Подробное описание достижений спикера может привлечь большую аудиторию</p>
        </div>
      );
    },
  },
  img: {
    title: 'Выберите фото спикера',
    content: () => {
      return (
        <div>
          <p>Загрузите фото спикера или картинку по вашему вкусу.</p>
        </div>
      );
    },
  },
};
