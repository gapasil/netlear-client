import React from 'react';
import './EventUploadImage.scss';

import { Popover } from 'antd';
import { FileImageTwoTone } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { setCourseImg } from '../../redux/actions/UploadingCourse/UploadingCourse';

function EventUploadImage({ selector, action, popoverContentType, index = 1000 }) {
  const courseFiles = useSelector((state) => state.Temp.courseFiles);
  const ref = React.useRef();
  const dispatch = useDispatch();
  
  const onPickUpImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const newAtion = action;
    const url = reader.readAsDataURL(file);

    setFileImgForUpload(file, selector, index);
    reader.onloadend = (e) => {
      dispatch(newAtion(selector, index, e.target.result));
    };
  };

  const setFileImgForUpload = (file, selector, index) => {
    if (selector === 'promoImg') {
      const webinarsImgSelector = `webinarsImg${index}`;
      dispatch(setCourseImg(file, webinarsImgSelector, index));
    } else if (selector === 'img') {
      const speakerBlockImgSelector = 'imgSpeaker';
      dispatch(setCourseImg(file, speakerBlockImgSelector));
    } else {
      dispatch(setCourseImg(file, selector));
    }
  };

  return (
    <>
      <input
        id={index === 1000 ? 'file-input' : index + 'file-input'}
        ref={ref}
        style={{ display: 'none' }}
        type="file"
        name="user[image]"
        multiple={false}
        onChange={onPickUpImage}
      />

      <label htmlFor={index === 1000 ? 'file-input' : index + 'file-input'}>
        <Popover
          placement="topRight"
          content={popoverContentType.content()}
          title={popoverContentType.title}
          trigger="hover">
          <FileImageTwoTone
            style={{ fontSize: '32px', cursor: 'pointer', position: 'absolute', right: '0' }}
          />
        </Popover>
      </label>
    </>
  );
}

export default EventUploadImage;
