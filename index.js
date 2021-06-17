import {
  getFile,
  parsingToArr,
} from "./util.js";
import { getAllObject } from "./parsing.js";
import { makeCsv, uploadToS3 } from "./upload.js";

import { makeTargetList, FILE_DIR } from "./makeList.js";
// await makeTargetList();

const obj = await getFile(FILE_DIR);
const objArr = parsingToArr(obj);
const parsedResults = await getAllObject(objArr);
parsedResults.map((obj) => {
  console.log(obj.key);
  const content = makeCsv(obj.result);
  uploadToS3(obj.key, content);
});
