import promoImg from '../../assets/img/medicineSections/cardiovascular-surgery.jpg';
import speakerImg from '../../assets/img/lector_1.jpg';

import {
  getFullCourseCost,
  getFullCourseCostWithDiscount,
} from '../../utils/calculations/getFullCourseCost';

import getCurrentDate from '../../utils/getDate';

const currentDate = getCurrentDate();

const initialState = {
  type:0,
  banner: {
    data: {
      title: 'Интернет-торговля товарами без штрафов: платежи, законы, правила, налоги',
      speakerName: 'Татьяна Гринько',
      speakerShortDescription:
        'Основательница проекта по повышению налоговой грамотности для ИП и малого бизнеса nalogov.by (@nalogov_net)',
      backgroundImg: '',
    },
    selectors: {
      title: false,
      speakerName: false,
      speakerShortDescription: false,
      backgroundImg: false,
    },
  },
  mainContent: {
    data: {
      youWillLearn: {
        title: 'Из курса вы узнаете',
        content:
          '<ul><li>как&nbsp;продавать&nbsp;товары&nbsp;в&nbsp;интернете&nbsp;законно,&nbsp;в&nbsp;том&nbsp;числе&nbsp;используя&nbsp;соцсети</li><li>как&nbsp;правильно&nbsp;принимать&nbsp;оплату&nbsp;за&nbsp;товар,&nbsp;в&nbsp;том&nbsp;числе&nbsp;онлайн-платежи</li><li>какую&nbsp;систему&nbsp;налогообложения&nbsp;выбрать&nbsp;и&nbsp;как&nbsp;минимизировать&nbsp;налоговую&nbsp;нагрузку</li><li>что&nbsp;нужно&nbsp;знать&nbsp;о&nbsp;правилах&nbsp;торговли&nbsp;и&nbsp;о&nbsp;защите&nbsp;прав&nbsp;потребителей,&nbsp;чтобы&nbsp;защититься&nbsp;от&nbsp;потребительского&nbsp;экстремизма</li><li>как&nbsp;законно&nbsp;использовать&nbsp;социальные&nbsp;сети&nbsp;для&nbsp;рекламы</li><li>какие&nbsp;документы&nbsp;необходимо&nbsp;составлять&nbsp;и&nbsp;хранить&nbsp;при&nbsp;онлайн-продаже&nbsp;товаров</li></ul>',
      },
      eventProgram: {
        title: 'Программа',
        content:
          '<p>Цикл полезен вам, если вы зарабатываете или хотите зарабатывать в интернете. Гринько Татьяна, эксперт в области учета и налогообложения малого бизнеса и ИП, расскажет как избежать ошибок. Ведь онлайн-бизнес - это не просто “магазин на диване”. Здесь есть свои законы и правила.</p>',
      },
      vebinars: [
        {
          promoImg: promoImg,
          format: 'В записи',
          date: currentDate,
          isPaid: true,
          cost: 9.99,
          currency: 'RUB',
          personalDiscount: 5,
          promoCode: '',
          video: false,
          videoName: '',
          videoDescription: '',
          videoDuration: 20,
          title: '<p>Продаем товары в интернете законно</p>',
          content:
            '<p>Требования к сайтам интернет-магазинов;</p><p>Шаги создания и регистрации интернет-магазина;</p><p>Зачем сайт, если есть соц.сети;</p><p>Обязательные способы приема платежей;</p>',
        },
        {
          promoImg: promoImg,
          format: 'Онлайн трансляция',
          date: currentDate,
          isPaid: false,
          cost: 0,
          currency: 'RUB',
          personalDiscount: 0,
          promoCode: '',
          video: false,
          videoName: '',
          videoDescription: '',
          videoDuration: 40,
          title: '<p>Продаем товары в интернете законно!</p>',
          content: '<p>asdasdasdasd</p>',
        },
        {
          promoImg: promoImg,
          format: 'Онлайн трансляция',
          date: currentDate,
          isPaid: false,
          cost: 0,
          currency: 'RUB',
          personalDiscount: 15,
          promoCode: '',
          video: false,
          videoName: '',
          videoDescription: '',
          videoDuration: 40,
          title: '<p>Продаем товары в интернете законно!!</p>',
          content: '<p>asdasdasdasd</p>',
        },
      ],
      fullCoursePayCard: {
        cost: '99.99',
        currency: 'RUB',
        discount: 15,
        costWithDiscount: 0,
        promoCode: '',
        promoCodeDiscount: 0,
      },
    },

    selectors: {
      youWillLearn: false,
      eventProgram: false,
      vebinars: false,
      fullCoursePayCard: false,
    },
  },
  aboutSpeaker: {
    data: {
      fullName: 'Татьяна Гринько',
      career: 'Бухгалтер-аналитик',
      description:
        '<p>Имеет 17-летний опыт работы в качестве главного бухгалтера, руководителя и собственника компаний в разных отраслях.</p><p>За 12 лет работы на общей системе налогообложения освоила и отработала на практике законные способы оптимизации налогов.</p><p>Без потерь прошла несколько налоговых проверок.</p><p>Последние 6 лет изучает нюансы и тонкости УСН и налогов для ИП и микробизнеса. Оказывает методическую помощь в написании программного обеспечения в области учета и налогов для ИП и малого бизнеса.</p><p>Действующий индивидуальный предприниматель и собственник ООО. Все предпринимательские боли знает изнутри. Готова делиться опытом не только как профессионал, но и как коллега.</p>',
      img: speakerImg,
      video: 'https://vimeo.com/189301566',
      videoName: 'Промо-видео',
    },
    selectors: { blockEditing: false },
  },
};

const eventRedactor = (state = initialState, action) => {
  if (action.type === 'SET_COORSE') {
    const coorse = action.payload
    console.log(coorse);
    return {
      ...coorse
    };
  }
  if (action.type === 'SET_BANNER_DATA') {
    const selector = action.selector;
    const data = action.data;
    return {
      ...state,
      banner: {
        ...state.banner,
        data: {
          ...state.banner.data,
          [selector]: data,
        },
      },
    };
  }
  if (action.type === 'SET_BANNER_SELECTOR') {
    const selector = action.selector;
    const boolean = action.boolean;
    return {
      ...state,
      banner: {
        ...state.banner,
        selectors: {
          ...state.banner.selectors,
          [selector]: boolean,
        },
      },
    };
  }
  if (action.type === 'SET_MAIN_CONTENT_DATA') {
    const selector = action.selector;
    const subSelector = action.subSelector;
    const data = action.data;
    // console.log(selector, subSelector,data)
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          [selector]: { ...state.mainContent.data[selector], [subSelector]: data },
        },
      },
    };
  }
  if (action.type === 'REMOVE_MAIN_CONTENT_VEBINARS_ITEM') {
    const index = action.index;
    const newDataArray = state.mainContent.data.vebinars.slice(0);
    newDataArray.splice(index, 1);
    console.log(newDataArray);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          vebinars: newDataArray,
        },
      },
    };
  }
  if (action.type === 'SET_MAIN_CONTENT_VEBINARS_DATA') {
    const selector = action?.selector;
    const index = action?.index;
    const data = action?.data;
    const newDataArray = state.mainContent.data.vebinars.map((el, i) => {
      if (i == index) {
        return { ...el, [selector]: data };
      }
      return el;
    });
    console.log(newDataArray);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          vebinars: newDataArray,
        },
      },
    };
  }
  if (action.type === 'SET_MAIN_CONTENT_VEBINARS_SETTINGS') {
    const {
      format,
      date,
      isPaid,
      cost,
      personalDiscount,
      promoCode,
      currency,
      video,
      videoName,
      videoDescription,
    } = action.payload;
    const index = action?.index;
    const newDataArray = state.mainContent.data.vebinars.map((el, i) => {
      if (i == index) {
        return {
          ...el,
          format: format,
          date: date,
          isPaid: isPaid,
          currency: currency,
          cost: Number(cost),
          personalDiscount: personalDiscount,
          promoCode: promoCode,
          video: video,
          videoName: videoName,
          videoDescription: videoDescription,
        };
      }
      return { ...el, currency: currency };
    });
    // console.log(newDataArray);
    console.log(state);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          vebinars: newDataArray,
          fullCoursePayCard: {
            ...state.mainContent.data.fullCoursePayCard,
            currency: currency,
          },
        },
      },
    };
  }
  if (action.type === 'ADD_ITEM_MAIN_CONTENT_VEBINARS_DATA') {
    const selector = action?.selector;
    const newDataArray = state.mainContent.data[selector].slice(0);

    const currentCurrency = state.mainContent.data.fullCoursePayCard.currency;
    newDataArray.push({
      promoImg: promoImg,
      format: 'В записи',
      date: currentDate,
      isPaid: true,
      cost: 9.99,
      currency: currentCurrency,
      personalDiscount: 0,
      promoCode: '',
      video: false,
      videoDuration: 0,
      title: '<p>Продаем товары в интернете законно</p>',
      content:
        '<p>Требования к сайтам интернет-магазинов;</p><p>Шаги создания и регистрации интернет-магазина;</p><p>Зачем сайт, если есть соц.сети;</p><p>Обязательные способы приема платежей;</p>',
    });

    console.log(newDataArray);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          [selector]: newDataArray,
        },
      },
    };
  }
  if (action.type === 'SET_MAIN_CONTENT_SELECTOR') {
    const selector = action.selector;
    const boolean = action.boolean;
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        selectors: {
          ...state.mainContent.selectors,
          [selector]: boolean,
        },
      },
    };
  }
  if (action.type === 'SET_ALL_SELECTORS') {
    // const boolean = action.boolean;
    return {
      ...state,
      banner: {
        ...state.banner,
        selectors: {
          title: false,
          speakerName: false,
          speakerShortDescription: false,
          backgroundImg: false,
        },
      },
      mainContent: {
        ...state.mainContent,
        selectors: { youWillLearn: false, eventProgram: false, vebinars: false },
      },
      aboutSpeaker: {
        ...state.aboutSpeaker,
        selectors: { blockEditing: false },
      },
    };
  }
  if (action.type === 'SET_FULL_COURSE_COST') {
    const courseArray = state.mainContent.data.vebinars;
    const costSum = getFullCourseCost(courseArray);
    const fullCourseDiscount = state.mainContent.data.fullCoursePayCard.discount;
    const costWithDiscount = getFullCourseCostWithDiscount(costSum, fullCourseDiscount);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          fullCoursePayCard: {
            ...state.mainContent.data.fullCoursePayCard,
            cost: costSum,
            costWithDiscount: costWithDiscount,
          },
        },
      },
    };
  }
  if (action.type === 'SET_FULL_COURSE_SETTINGS') {
    const { currency, discount, promoCode, promoCodeDiscount } = action.payload;
    const dataArray = state.mainContent.data.vebinars.slice(0);
    const newDataArray = dataArray.map((el, i) => {
      return { ...el, currency: currency };
    });
    console.log(newDataArray);
    return {
      ...state,
      mainContent: {
        ...state.mainContent,
        data: {
          ...state.mainContent.data,
          fullCoursePayCard: {
            ...state.mainContent.data.fullCoursePayCard,
            currency,
            discount,
            promoCode,
            promoCodeDiscount,
          },
          vebinars: newDataArray,
        },
      },
    };
  }
  if (action.type === 'SET_ABOUT_SPEAKER_SELECTOR') {
    const selector = action.selector;
    const boolean = action.boolean;
    return {
      ...state,
      aboutSpeaker: {
        ...state.aboutSpeaker,
        selectors: { ...state.aboutSpeaker.selectors, [selector]: boolean },
      },
    };
  }
  if (action.type === 'SET_ABOUT_SPEAKER_DATA') {
    const selector = action.selector;
    const data = action.data;
    return {
      ...state,
      aboutSpeaker: {
        ...state.aboutSpeaker,
        data: { ...state.aboutSpeaker.data, [selector]: data },
      },
    };
  }
  return state;
};

export default eventRedactor;
