import fs from "fs";
import s3 from "./config.js";

const getFormatDate = (date) => {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "/" + month + "/" + day;
};

const re = /6c7b90f7-6cf1-427d-9cb5-fad9194ddc2a\/description\/\d{4}\/\d{2}\/\d{2}\/EST_KOR_ABSTRACT\.sql/;

const getList = async (params, lists) => {
  await s3.listObjectsV2(params, async (err, data) => {
    if (err) {
      throw err;
    } else {
      let contents = data.Contents;
      const filteredContent = getFilteredFileList(contents);
      const filteredKeyList = filteredContent.map((obj) => obj.Key);

      lists = lists.concat(filteredKeyList);
      if (data.IsTruncated) {
        let obj = Object.assign({}, params, {
          ContinuationToken: data.NextContinuationToken,
        });
        await getList(obj, lists);
      } else {
        return lists;
      }
    }
  });
};

const getFilteredFileList = (contents) => {
  const filteredContent = contents.filter((obj) => {
    const isIn = re.exec(obj.Key);
    if (isIn) {
      return obj.Key;
    }
  });
  return filteredContent;
};

const makeFile = (content, fileName) => {
  fs.writeFileSync(fileName, JSON.stringify(content));
};

const getFile = async (fileName) => {
  const lists = await fs.readFileSync(fileName, "utf8");
  return lists;
};

const parsingToArr = (content) => {
  let temp = content.substring(1, content.length - 1);
  temp = temp.replaceAll('"', "");
  return temp.split(",");
};
export {
  getFormatDate,
  re,
  getList,
  getFilteredFileList,
  makeFile,
  getFile,
  parsingToArr,
};
