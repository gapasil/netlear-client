import React, { useEffect, useState } from 'react';
import './EventPage.scss';

import EventPageParallaxBanner from './corse1Page/EventPageParallaxBanner/EventPageParallaxBanner';
import EventPageContent from './corse1Page/EventPageContent/EventPageContent';
import EventPageAboutSpeaker from './corse1Page/EventPageAboutSpeaker/EventPageAboutSpeaker';
import EventPageParallaxBanner2 from './corse2Page/EventPageParallaxBanner/EventPageParallaxBanner';
import EventPageContent2 from './corse2Page/EventPageContent/EventPageContent';
import EventPageAboutSpeaker2 from './corse2Page/EventPageAboutSpeaker/EventPageAboutSpeaker';
import EventPageParallaxBanner3 from './corse3Page/EventPageParallaxBanner/EventPageParallaxBanner';
import EventPageContent3 from './corse3Page/EventPageContent/EventPageContent';
import EventPageAboutSpeaker3 from './corse3Page/EventPageAboutSpeaker/EventPageAboutSpeaker';
import DeployCourseBlock from '../../components/DeployCourseBlock/DeployCourseBlock';
import promoImg from '../../assets/img/medicineSections/cardiovascular-surgery.jpg';
import speakerImg from '../../assets/img/lector_1.jpg';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetAllCourses, setCoorseRedux,
} from '../../redux/actions/eventRedactor/eventRedactor';
import { url } from '../../conf';
import getCurrentDate from '../../utils/getDate';

function EventPage({ variant = 'static' }) {
  const dispatch = useDispatch();
  const eventRedactor = useSelector((state) => state.eventRedactor);
  const [typeCoorse, setTypeCoorse] = useState("")
  const [coorse, setCoorse] = useState(false)
  const currentDate = getCurrentDate();

  useEffect(()=>{
    let urlpage = []
    let id  = []
    let idd = false
    let i   = 0
    let coorse = []

    for(let key of window.location.pathname){
      i++
      if(idd){
        id.push(key)
      }
      if(key == "/" && i != 1){
        id.push(key)
        idd = true
      } else if(!idd){
        urlpage.push(key)
      }
    }
    id[0]  = ""
    urlpage[0] = ""
    urlpage = urlpage.join("")
    id  = id.join("")
    
    if(urlpage == "pagecoorse"){
      fetch(`${url}post/`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((res)=>res.json())
      .then((result)=> {coorse = result} )
      .then(()=>{
        console.log(coorse);

        if(coorse.message){
          alert(coorse.message)
        }
  
        for(let key of coorse){
          console.log(key);
          if(key._id == id){
            setCoorse(key)
          } 
        }
      })

    } else {
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
      setCoorse(false)
      dispatch(setCoorseRedux(initialState))
    }
  },[])

  useEffect(()=>{
    if(coorse){
        console.log(coorse);
        const coorsee = coorse
        const masVebin = []
        
        for(let key of coorsee.vebinars){

          const objVebinars = {
            title: key.title,
            content : key.description,
            date : key.date,
            promoImg: key.photo,
            format : key.typeOfContent,
            isPaid: key.paymentMethod.paymentType == "Платный контент"?true:false,
            cost      : key.price ,
            currency   : key.currency,
            promoCode  : key.promocode,
            personalDiscount : key.promocodeDiscount,
            video : key.video.video,
            videoName : key.video.videoName,
            videoDescription : key.video.videoDescription
          }
          masVebin.push(objVebinars)
        }

        const initialState = {
          type:+coorse.type,
          banner: {
            data: {
              title: coorse.mainTitle,
              speakerName: coorse.speakerTitle,
              speakerShortDescription:
              coorse.speakerTitleParagraph,
              backgroundImg: coorse.backgroundTitle,
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
                title: coorse.aboutCourse.title,
                content:coorse.aboutCourse.paragraph,
              },
              eventProgram: {
                title: coorse.program.title,
                content:
                coorse.program.paragraph,
              },
              vebinars: 
                masVebin
              ,
              fullCoursePayCard: {
                cost: coorse.fullCoursePayCard.cost,
                currency: coorse.fullCoursePayCard.currency,
                discount: coorse.fullCoursePayCard.discount,
                costWithDiscount: coorse.fullCoursePayCard.costWithDiscount,
                promoCode: coorse.fullCoursePayCard.promocode,
                promoCodeDiscount: coorse.fullCoursePayCard.promoCodeDiscount,
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
              fullName: coorse.speaker.name,
              career: coorse.speaker.profession,
              description:
              coorse.speaker.paragraph,
              img: coorse.speaker.photo,
              video: coorse.speaker.promoVideo,
              videoName: coorse.speaker.promoVideo,
            },
            selectors: { blockEditing: false },
          },
        };
        dispatch(setCoorseRedux(initialState))
    }
  },[coorse])

  if(typeCoorse === 0||variant != "redactor"&&eventRedactor.type === 0||variant != "redactor"&&!eventRedactor.type){
    return (
      <div className="event-page">
        <button onClick={()=>setTypeCoorse("")} className="knop">
          <p>
            Назад
          </p>
        </button>
        <EventPageParallaxBanner variant={variant} />
        <EventPageContent variant={variant} />
        <EventPageAboutSpeaker variant={variant} />
        {variant === 'redactor' && <DeployCourseBlock props={typeCoorse}/>}
      </div>
    );
  } else if(typeCoorse == 1||variant != "redactor"&&eventRedactor.type === 1){
    return (
      <div className="event-page">
        <button onClick={()=>setTypeCoorse("")} className="knop">
          <p>
            Назад
          </p>
        </button>
        <EventPageParallaxBanner2 variant={variant} />
        <EventPageContent2 variant={variant} />
        <EventPageAboutSpeaker2 variant={variant} />
        {variant === 'redactor' && <DeployCourseBlock props={typeCoorse}/>}
      </div>
    );
  } else if(typeCoorse == 2||variant != "redactor"&&eventRedactor.type === 2){
    return (
      <div className="event-page">
        <button onClick={()=>setTypeCoorse("")} className="knop">
          <p>
            Назад
          </p>
        </button>
        <EventPageParallaxBanner3 variant={variant} />
        <EventPageContent3 variant={variant} />
        <EventPageAboutSpeaker3 variant={variant} />
        {variant === 'redactor' && <DeployCourseBlock props={typeCoorse}/>}
      </div>
    );
  } else {
    return(
      <div className='blockType'>
        <div className='blockType__container'>
          <h1>
            Выберите тип курса:
          </h1>
          <button onClick={()=>setTypeCoorse(0)}>
            <img src='https://sun9-87.userapi.com/impf/ec2gdJcF-H_Ki1Hnx6APhbHV85hohfSZxk7apg/d4Gp2hRfFwU.jpg?size=445x1080&quality=95&sign=8dfc33e2910f490079ea1d363996b885&type=album'/>
          </button>
          <button onClick={()=>setTypeCoorse(1)}>
            <img src='https://sun9-31.userapi.com/impf/YaWIr45yVIZO_-zZPHm6RdTJbJ6TdqZKIr7egA/e4S-O4d3Tno.jpg?size=445x1080&quality=95&sign=bdc1c9987bde8406a9876af2b8f9032b&type=album'/>
          </button>
          <button onClick={()=>setTypeCoorse(2)}>
            <img src='https://sun9-34.userapi.com/impf/CZsZFk3aA-JZ093k_8mzPBPhUts6RHi_0ZCxkQ/rqhwPuLHgUw.jpg?size=452x1080&quality=95&sign=872be01ddfd2bdd658d32813605f3fd6&type=album'/>
          </button>
        </div>
      </div>
    )
  }
}

export default EventPage;
