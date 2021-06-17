import s3 from "./config.js";

const getObject = async (key) => {
  const getParams = {
    Bucket: process.env.BUCKET_NAME_SOURCE,
    Key: key,
  };

  const one_file = await s3.getObject(getParams).promise();
  const lineArr = one_file.Body.toString().split("\n");
  let result = deleteNull(parsingByVerticalBar(lineArr));

  ///이후 할 것들 < 만나면 >까지 지우기, \r 삭제,  { 만나면 } 삭제
  result = deleteUnusedThings(result).filter(line => line);
  //list in list for csv
  result = result.map(line => [line]);
  return {
    key,
    result
  }
};

const getAllObject = async (list) => {
  let parsedList = [];
  for (let key of list) {
    const parsedObj = await getObject(key);
    console.log(key);
    parsedList.push(parsedObj);
  }
  return parsedList;
};

const parsingByVerticalBar = (arr) => {
  const result = arr.map((line) => {
    let temp = line.split("||||");
    return temp.length > 1 ? temp[1] : null;
  });
  return result;
};

const deleteNull = (arr) => arr.filter((row) => row !== null);

const deleteUnusedThings = (arr) => {
  const blankPattern = /^\s+|\s+$/g;

  let parsedResult = arr.map((line) => {
    let newLine = "";
    let flag = false;
    line = line.replaceAll("\r", "");
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "<") {
        flag = true;
        continue;
      }
      if (line[i] === ">") {
        flag = false;
        continue;
      }
      if (!flag) newLine += line[i];
    }
    newLine = newLine.replaceAll("&nbsp;", "");
    newLine = newLine.replace(/ +/g, " ");
    newLine = newLine.replace(",", "");

    if(newLine.replace(blankPattern, '') === '') return null;
    return newLine;
  });

  return parsedResult;
};

export { getAllObject };
