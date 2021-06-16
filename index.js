import s3, { ListParams } from "./config.js";
import { getFilteredFileList, makeFile, getFile, parsingToArr } from "./util.js";
import {getAllObject, getObject} from "./parsing.js"
const FILE_DIR = './test.txt';
// let lists = [];

// let loopParams = { ...ListParams };

// let isNotEnd = false;

// do {
//   let data = await s3.listObjectsV2(loopParams).promise();
//   let contents = data.Contents;
//   isNotEnd = data.IsTruncated;
//   const filteredContent = getFilteredFileList(contents);
//   const filteredKeyList = filteredContent.map((obj) => obj.Key);

//   lists = lists.concat(filteredKeyList);
//   loopParams = Object.assign({}, ListParams, {
//     ContinuationToken: data.NextContinuationToken,
//   });
// } while (isNotEnd);

// makeFile(lists, 'test.txt');

const obj = await getFile(FILE_DIR);
const objArr= parsingToArr(obj);
getAllObject(objArr);