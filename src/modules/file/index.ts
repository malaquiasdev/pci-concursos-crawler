import { S3 } from 'aws-sdk';
import ObjectsToCsv from 'objects-to-csv';
import { Jobs } from '../../functions/position-offer/service';
import { AWS } from '../../configs';

export async function saveFileCSV(jobs: Jobs[], bucketPath: string): Promise<boolean> {
  const key = getKey();
  try {
    const csv = new ObjectsToCsv(jobs);
    if (!AWS.lambdaVersion) {
      await csv.toDisk(key);
      return true;
    }
    const csvString = await csv.toString();
    const s3 = new S3();
    const params = {
      Bucket: bucketPath,
      ACL: 'public-read',
      Key: key,
      Body: csvString,
      ContentType: 'text/csv',
    };
    await s3.putObject(params).promise();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getKey(): string {
  const today = new Date();
  const todayFormatted = new Intl.DateTimeFormat('pt-BR').format(today).split('/').join('-');
  return `jobs-offers-${todayFormatted}.csv`;
}
