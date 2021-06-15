import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config()

const info = {
  accessKeyId: process.env.ID,
  secrestAccessKey: process.env.SECRET,
}

const params = {
  Bucket: process.env.BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: process.env.REGION
  }
}
console.log(info, params);
// const s3 = new AWS.S3({apiVersion: '2006-03-01'});
