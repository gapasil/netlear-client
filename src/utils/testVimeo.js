var Vimeo = require('vimeo').Vimeo;
var VimeoUpload = require('vimeo-upload');

const client_id = 'e99c4ca28841dab2c510911e884bac53e832003a';
const client_secret =
  '4k4i65Y+PPep2arbNBD/pIvf2OfgJDSVO/v5QclBj0OS370WjY3IMseIipW99MNoUpdKvfuEnGfsjltyfbDQOmvW+UXTNsFdwf0+agcEZU1BjXHyhfndczk5rJc7gjLn';
const access_token = '0f8cda46bbaa0456bae6475b238e2375';

var client = new Vimeo(client_id, client_secret, access_token);

var myVideo = require('../assets/video/IMG_5067.MP4');

export function testUploadVimeoVids(
  video,
  title,
  description,
  displayProcessFunc,
  getVideoURIfunc,
  elementIndex,
) {
  let file_name = video;
  console.log('file_name', video);
  return client.upload(
    file_name,
    {
      name: title,
      description: description,
    },
    function (uri) {
      console.log('Your video URI is: ' + uri);
      return getVideoURIfunc(uri, elementIndex);
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
      console.log(bytes_uploaded, bytes_total, percentage + '%');
      return displayProcessFunc(percentage, elementIndex);
    },
    function (error) {
      //   debugger;
      console.log('Failed because: ' + error);
      return displayProcessFunc(error, elementIndex);
    },
  );
}

export const testCheckTranscodingVimeoVids = (uri, setTranscodingStatusFunc, elementIndex) => {
  return client.request(
    uri + '?fields=transcode.status',
    function (error, body, status_code, headers) {
      if (body.transcode.status === 'complete') {
        setTranscodingStatusFunc('complete', elementIndex);
        // console.log('Your video finished transcoding.');
      } else if (body.transcode.status === 'in_progress') {
        setTranscodingStatusFunc('in_progress', elementIndex);
        // console.log('Your video is still transcoding.');
      } else {
        setTranscodingStatusFunc('error', elementIndex);
        // console.log('Your video encountered an error during transcoding.');
      }
    },
  );
};

export const testGetVimeoVidsURL = (uri, setVideoURLFunc, elementIndex) => {
  client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
    if (error) {
      console.log('There was an error making the request.');
      console.log('Server reported: ' + error);
      return;
    }

    console.log('Your video link is: ' + body.link);
    setVideoURLFunc(body.link, elementIndex);
  });
};

export function testEditTitleAndDescriptionVideo() {
  const uri = '574942695';
  const url = 'https://ancient-fortress-47643.herokuapp.com/';
  client.request(
    {
      method: 'PATCH',
      path: uri,
      query: {
        name: '{new video title}',
        description: '{new video description}',
      },
      //   headers: {
      //             Authorization: `Bearer f04070881e9d0374b49e1cc3a11bd11a`,
      //           },
    },
    function (error, body, status_code, headers) {
      //   debugger;
      // console.log('The title and description for ' + uri + ' has been edited.');
      console.log(error);
      console.log(body);
      console.log(headers);
      console.log(status_code);
    },
  );
}
