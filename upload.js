import { convertArrayToCSV } from "convert-array-to-csv";

import s3 from "./config.js";
const header = ["content"];

const makeCsv = (arr) => {
  const csvFromArrayOfArrays = convertArrayToCSV(arr, {
    header,
  });
  return csvFromArrayOfArrays;
};

const uploadToS3 = async (key, content) => {
  const targetKey = getFilePath(key);
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME_TARGET,
    Key: targetKey,
    Body: content,
  };

  await s3.putObject(uploadParams).promise();
};

const getFilePath = (pathString) => {
  const [cuid, folder, year, month, day, fileName] = pathString.split("/");
  return `${cuid}/abstract/${year}/${month}/${day}/abstract.csv`;
};

export { makeCsv, uploadToS3 };
