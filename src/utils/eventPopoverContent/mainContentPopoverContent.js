import { setBannerSelectors } from '../../redux/actions/eventRedactor/eventRedactor';
import SaveButton from '../../components/SaveButton/SaveButton';

export const mainContentPopoversContent = {
  title: {
    title: 'Введите название мероприятия',
    content: () => {
      return (
        <div>
          <p>Название должно быть емким и отражать суть мероприятия</p>
          <SaveButton selector="title" action={setBannerSelectors} />
        </div>
      );
    },
  },
  speakerName: {
    title: 'Введите Ф.И.О спикера',
    content: () => {
      return (
        <div>
          <p>По умолчанию используются данные вашего аккаунта</p>
          <p>Полное имя указывать не обязательно</p>
          <SaveButton selector="speakerName" action={setBannerSelectors} />
        </div>
      );
    },
  },
  speakerShortDescription: {
    title: 'Введите краткое описание спикера',
    content: () => {
      return (
        <div>
          <p>По умолчанию используются данные вашего аккаунта</p>
          <p>
            Желательно кратко, в одном предложении, описать свою профессию (должность) или свои
            достижения в данной сфере
          </p>
          <SaveButton selector="speakerShortDescription" action={setBannerSelectors} />
        </div>
      );
    },
  },
  backgroundImg: {
    title: 'Выберите промо-картинку данного блока',
    content: () => {
      return (
        <div>
          <p>Вы можете изменить картинку</p>
          <p>Загрузите тематическое фото или картинку по вашему вкусу.</p>
        </div>
      );
    },
  },
};
