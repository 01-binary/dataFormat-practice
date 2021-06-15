// const START_YEAR = 2020;
// const END_YEAR = 2021;

// const START_MONTH = 01;
// const END_MONTH = 12;

// const START_DAY = 01;
// const END_DAY = 31;

const getFormatDate = (date) => {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "/" + month + "/" + day;
};

const re = /6c7b90f7-6cf1-427d-9cb5-fad9194ddc2a\/description\/\d{4}\/\d{2}\/\d{2}\/EST_KOR_ABSTRACT\.sql/;
export { getFormatDate, re };
