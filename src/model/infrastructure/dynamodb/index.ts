import AWS from "aws-sdk";
const path = require("path");
require("dotenv").config({ path: path.resolve(".env", "../../.env") });

const {
	SKELETON_CHALLENGE_REGION,
	SKELETON_CHALLENGE_ENDPOINT,
	SKELETON_CHALLENGE_ACCESS_KEY_ID,
	SKELETON_CHALLENGE_SECRET_ACCESS_KEY,
} = process.env;

const awsConfig = {
	region: SKELETON_CHALLENGE_REGION,
	endpoint: SKELETON_CHALLENGE_ENDPOINT,
	accessKeyId: SKELETON_CHALLENGE_ACCESS_KEY_ID,
	secretAccessKey: SKELETON_CHALLENGE_SECRET_ACCESS_KEY,
};

console.log(path.resolve("root", "../../../../.env"));

AWS.config.update(awsConfig);

export const dynamodb = new AWS.DynamoDB.DocumentClient();
export type DynamoDBClient = typeof dynamodb;
