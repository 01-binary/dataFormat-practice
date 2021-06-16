import s3 from "./config.js";

const getObject = async (key) => {
  const getParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  const one_file = await s3.getObject(getParams).promise();
  const lineArr = one_file.Body.toString().split("\n");
  const result = deleteNull(parsingByVerticalBar(lineArr));

  console.log(result, key);
  ///이후 할 것들 < 만나면 >까지 지우기, \r 삭제 
};

const getAllObject = async (list) => {
  for (let key of list) {
    await getObject(key);
  }
};

const parsingByVerticalBar = (arr) => {
  const result = arr.map((line) => {
    let temp = line.split("||||");
    return temp.length > 1 ? temp[1] : null;
  });
  return result;
};

const deleteNull = (arr) => arr.filter((row) => row !== null);

export { getAllObject, getObject };
