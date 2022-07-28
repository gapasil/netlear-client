import React, { useEffect, useState } from 'react';
import './DeployCourseBlock.scss';
import { url } from "../../conf"
import Button from '../Button/Button';
import EventDeployPanel from '../EventDeployPanel/EventDeployPanel';

import { useDispatch, useSelector } from 'react-redux';
import { setVideosFromRedactor } from '../../redux/actions/UploadingCourse/UploadingCourse';
import { Modal } from 'antd';

function DeployCourseBlock({props}) {
  const eventRedactor = useSelector((state) => state.eventRedactor);
  const [isDeployPanelOpen, setIsDeployPanelOpen] = React.useState(false);

  const onDeployCourseData = () => {
    const speaker  = eventRedactor.aboutSpeaker.data
    const banner   = eventRedactor.banner.data
    const main     = eventRedactor.mainContent.data
    const vebinars = eventRedactor.mainContent.data.vebinars
    const masVebin = []
    let index = 1
    const form = new FormData()
    
    const dataURLtoFile = (dataurl, filename) => {
      if(dataurl.length > 60){
  	    let arr = dataurl.split(','),
	        mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]),
	        n = bstr.length,
	        u8arr = new Uint8Array(n);
	      while (n--) {
	       u8arr[n] = bstr.charCodeAt(n);
	      }
	      return new File([u8arr], filename, { type: mime });
      }
	  }
  
    const backgroundImg = dataURLtoFile(banner.backgroundImg, "backgroundImg")

    for(let key of vebinars){
      const objVebinars = {
        title: key.title,
        description: key.content,
        date : key.date,
        photo: key.promoImg,
        typeOfContent: key.format,
        paymentMethod: {
          paymentType: key.isPaid?"Платный контент":"Бесплатный контент",
          price      : key.cost ,
          currency   : key.currency,
          promocode  : key.promoCode,
          promocodeDiscount: key.personalDiscount
        },
        video: {
          video : key.video,
          videoName : key.videoName,
          videoDescription : key.videoDescription
        }
      }
      let vebinarPhoto = dataURLtoFile(key.promoImg, "vebinarPhoto");
      if(vebinarPhoto){
        form.append(`vebinarPhoto${index}`,vebinarPhoto)
      }
      if(key.video){
        form.append(`vebinarVideo${index}`,key.video)
      }
      masVebin.push(objVebinars)
      index += 1
    }

    const course = {
      backgroundTitle: backgroundImg,
      mainTitle: banner.title,
      type: props,
      speakerTitle: banner.speakerName,
      speakerTitleParagraph: banner.speakerShortDescription,
      aboutCourse: {
        title: main.youWillLearn.title,
        paragraph:main.youWillLearn.content
      },
      program: {
        title: main.eventProgram.title,
        paragraph:main.eventProgram.content
      },
      vebinars: masVebin,
      fullCoursePayCard: {
        cost: main.fullCoursePayCard.cost,
        currency: main.fullCoursePayCard.currency,
        discount: main.fullCoursePayCard.discount,
        costWithDiscount: main.fullCoursePayCard.costWithDiscount,
        promocode: main.fullCoursePayCard.promoCode,
        promoCodeDiscount: main.fullCoursePayCard.promoCodeDiscount
      },
      speaker: {
        name: speaker.fullName,
        profession: speaker.career,
        paragraph:speaker.description,
        promoVideoName: speaker.videoName,
        photo:speaker.img,
        promoVideo:speaker.video
      }
    }
    const speakerImg = dataURLtoFile(speaker.img, "speakerImg");
    if(speakerImg){
      form.append("speakerPhoto",speakerImg)
    }
    if(speaker.video.size){
      form.append("speakerVideo",speaker.video)
    }
    if(backgroundImg){
      form.append("backgroundTitle",backgroundImg)
    }
    form.append("body",JSON.stringify(course))

    // for(let key of form.entries()){
    //   console.log(key);
    // }

    fetch(`${url}post/add`,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      method: "POST",
      body: form
    })
    .then((res)=>res.json())
    .then((result)=>console.log(result))
    setIsDeployPanelOpen(true);
  };
  if(isDeployPanelOpen){
    return (
      <div>
        
      </div>
    )
  }
  return (
    <div className="deploy-course">
      <Button type="primary" onClick={onDeployCourseData} text="Загрузить данные о курсе на рассмотрение"/>
    </div>
  );
}

export default DeployCourseBlock;
