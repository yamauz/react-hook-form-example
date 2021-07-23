import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
};

aws.config.update(awsConfig);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const s3 = new aws.S3();

  if (req.method === "GET") {
    console.log(awsConfig);
    const s3Params = {
      Bucket: "pastify-inquiry-form",
      Key: query.filePath,
      Expires: 60,
      ContentType: query.fileType,
    };

    let success = true;
    const result = await s3
      .getSignedUrlPromise("putObject", s3Params)
      .catch((err) => {
        success = false;
        return err;
      });
    return res.json({ success, result });
  }
};
