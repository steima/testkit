import { DynamoDB } from 'aws-sdk';

import { getStage } from '../helper';
import { TestkitUser } from "../domain/user";

class UsersRepository {

    private dynamoDb: DynamoDB.DocumentClient;
    private readonly tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient({
            convertEmptyValues: true
        });
        this.tableName = `testkit-${getStage()}-users`;
    }

    async get(userid: string): Promise<TestkitUser> {
        const p = {
            TableName: this.tableName,
            Key: {
                userid: userid
            }
        }
        return this.dynamoDb.get(p).promise().then((response) => {
            return <TestkitUser>response.Item;
        });
    }

    public async put(user: TestkitUser): Promise<TestkitUser> {
        const c = {
            TableName: this.tableName,
            Item: user
        };
        return await this.dynamoDb.put(c).promise().then((_value) => {
            return user;
        });
    }

    public async remove(userid: string): Promise<any> {
        console.log(`Attempting to remove user ${userid}`);
        const p = {
            TableName: this.tableName,
            Key: {
                userid: userid
            }
        }
        return this.dynamoDb.delete(p).promise();
    }

}

export const usersRepository = new UsersRepository();
