const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    month = '0' + day;
  }

  return `${year}-${month}-${day}`;
};

export default getCurrentDate;
