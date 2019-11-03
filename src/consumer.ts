import * as AWS from 'aws-sdk'
import { SQS } from 'aws-sdk'
import config from "config";

const accessKeyId: string = config.get('accessKeyId');
const secretAccessKey: string = config.get('secretAccessKey');
const region: string = config.get('region');
const sqsQueueUrl: string = config.get('sqsQueueUrl');

// write AWS access credentials
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const sqs = new AWS.SQS();

export async function Consumer(): any {
  console.log("aaa");
}

export async function readFromSQS() {
  const receiveParams: SQS.ReceiveMessageRequest = {
    QueueUrl: sqsQueueUrl,
  };
  console.log(`read-event from "${sqsQueueUrl}"\n`);
  return sqs.receiveMessage(receiveParams).promise()
}

export async function deleteFromSQS(event: SQS.ReceiveMessageResult) {
  if (event.Messages && event.Messages.length) {
    const deleteParams: SQS.DeleteMessageRequest = {
      QueueUrl: sqsQueueUrl,
      ReceiptHandle: event.Messages[0].ReceiptHandle,
    };
    console.log(`delete-event from "${sqsQueueUrl}"\n`);
    return sqs.deleteMessage(deleteParams).promise()
  }
}
