import { S3 } from 'aws-sdk';
import ObjectsToCsv from 'objects-to-csv';
import { Jobs } from '../../functions/position-offer/service';
import { AWS } from '../../configs';

export async function saveFileCSV(jobs: Jobs[], bucketPath: string): Promise<boolean> {
  const key = getKey();
  const csv = new ObjectsToCsv(jobs);
  if (AWS.lambdaVersion) {
    const s3 = new S3();
    const params = {
      Bucket: bucketPath,
      ACL: 'public-read',
      Key: key,
      Body: csv.toString(),
      ContentType: 'text/csv',
    };
    await s3.putObject(params).promise();
    return true;
  }
  await csv.toDisk(key);
  return true;
}

function getKey(): string {
  const today = new Date();
  const todayFormatted = new Intl.DateTimeFormat('pt-BR').format(today).split('/').join('-');
  return `jobs-offers-${todayFormatted}.csv`;
}
