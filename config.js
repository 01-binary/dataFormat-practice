import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config()

const info = {
  accessKeyId: process.env.ID,
  secrestAccessKey: process.env.SECRET,
  region: process.env.REGION
}

const ListParams = {
  Bucket: process.env.BUCKET_NAME,
  Prefix: process.env.LOCATION
}

const s3 = new AWS.S3(info);

export default s3;

export {ListParams};