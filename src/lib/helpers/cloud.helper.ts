import {
    S3Client,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ApplicationError, { ERROR_CODES } from "../error/application.error";


function getCloudUploadInstance() {
    try {
      const bucket_region = process.env.AWS_S3_BUCKET_REGION as string;
      const access_key = process.env.AWS_S3_ACCESS_KEY as string;
      const secret_key = process.env.AWS_S3_SECRET_KEY as string;
  
      const s3_client = new S3Client({
        credentials: {
          accessKeyId: access_key,
          secretAccessKey: secret_key,
        },
        region: bucket_region,
      });
  
      return s3_client;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(ERROR_CODES.CLOUD_INSTANCE_CREATE_FAILED);
    }
  }

  function createGetObjectCommand(fileName: string) {

    try {
        const bucket_name = process.env.AWS_S3_BUCKET_NAME as string;
  
        const params = {
          Bucket: bucket_name,
          Key: fileName,
        };
      
        const command = new GetObjectCommand(params);
      
        return command;
    } catch (error) {
        console.log(error);
        throw new ApplicationError(ERROR_CODES.CLOUD_GET_COMMAND_FAILED);
    }

  }


export async function getImageURL(fileName: string) {
    const imageUrl = getSignedUrl(
      getCloudUploadInstance(),
      createGetObjectCommand(fileName),
      {
        expiresIn: Number(process.env.AWS_SIGNED_URL_EXPIRY?.trim()),
      }
    );
  
    return imageUrl;
  }