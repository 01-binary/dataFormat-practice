import s3, { ListParams } from "./config.js";
import { getFormatDate, re } from "./util.js";

const fileList = await s3.listObjectsV2(ListParams).promise();
const filteredFileList = fileList.Contents.filter((obj) => {
  const isIn = re.exec(obj.Key);
  if (isIn) {
    return obj;
  }
});

console.log(filteredFileList)
