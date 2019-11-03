import * as AWS from 'aws-sdk'
import { SNS } from 'aws-sdk'
import config from "config";

const accessKeyId: string = config.get('accessKeyId');
const secretAccessKey: string = config.get('secretAccessKey');
const region: string = config.get('region');
const snsTopicArn: string = config.get('snsTopicArn');

// write AWS access credentials
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const sns = new AWS.SNS();

export async function Producer(): any {
  console.log("aaa");
}

export async function publishToSns(message: string) {
  const publishParams: SNS.PublishInput = {
    TopicArn: snsTopicArn,
    Message: message,
  };

  console.log(`publish-event: "${message}" to "${snsTopicArn}"\n`);
  return sns.publish(publishParams).promise()
}
