import React from 'react';
import './DeployCourseBlock.scss';

import Button from '../Button/Button';
import EventDeployPanel from '../EventDeployPanel/EventDeployPanel';

import { useDispatch, useSelector } from 'react-redux';
import { setVideosFromRedactor } from '../../redux/actions/UploadingCourse/UploadingCourse';

function DeployCourseBlock() {
  const eventRedactor = useSelector((state) => state.eventRedactor);
  const [isDeployPanelOpen, setIsDeployPanelOpen] = React.useState(false);
  const dispatch = useDispatch();

  const onDeployCourseData = () => {
    dispatch(
      setVideosFromRedactor(
        eventRedactor.mainContent.data.vebinars,
        eventRedactor.aboutSpeaker.data,
      ),
    );
    setIsDeployPanelOpen(true);
  };
  React.useEffect(() => {
    // onDeployCourseData();
  }, []);

  return (
    <div className="deploy-course">
      <Button type="primary" onClick={onDeployCourseData}>
        Загрузить данные о курсе на рассмотрение
      </Button>

      {isDeployPanelOpen && <EventDeployPanel />}
    </div>
  );
}

export default DeployCourseBlock;
