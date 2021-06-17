import { getFilteredFileList, makeFile } from "./util.js";

import s3, { ListParams } from "./config.js";

const FILE_DIR = "test.txt";

const makeTargetList = async () => {
  let lists = [];
  let loopParams = { ...ListParams };
  let isNotEnd = false;

  do {
    let data = await s3.listObjectsV2(loopParams).promise();
    let contents = data.Contents;
    isNotEnd = data.IsTruncated;
    const filteredContent = getFilteredFileList(contents);
    const filteredKeyList = filteredContent.map((obj) => obj.Key);

    lists = lists.concat(filteredKeyList);
    loopParams = Object.assign({}, ListParams, {
      ContinuationToken: data.NextContinuationToken,
    });
  } while (isNotEnd);

  makeFile(lists, FILE_DIR);
};

export { makeTargetList, FILE_DIR };
