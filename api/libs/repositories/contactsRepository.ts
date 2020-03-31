import { DynamoDB } from 'aws-sdk';

import { getStage } from '../helper';
import {Contact} from "../domain/contact";

class ContactsRepository {

    private dynamoDb: DynamoDB.DocumentClient;
    private readonly tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient({
            convertEmptyValues: true
        });
        this.tableName = `testkit-${getStage()}-contacts`;
    }

    async get(from: string, to: string): Promise<Contact> {
        const p = {
            TableName: this.tableName,
            Key: {
                from: from,
                to: to
            }
        }
        return this.dynamoDb.get(p).promise().then((response) => {
            return <Contact>response.Item;
        });
    }

    async listForUser(from: string): Promise<Contact[]> {
        const p = {
            TableName: this.tableName,
            KeyConditionExpression: "#from = :from",
            ExpressionAttributeNames: {
                "#from": "from"
            },
            ExpressionAttributeValues: {
                ":from": from
            },
            ScanIndexForward: false,
            Limit: 5000
        };
        return this.dynamoDb.query(p).promise().then((r) => {
            if(r.Items) {
                return r.Items.map((c) => { return c as Contact; });
            }else{
                return Promise.reject();
            }
        });
    }

    public async put(contact: Contact): Promise<Contact> {
        const c = {
            TableName: this.tableName,
            Item: contact
        };
        return await this.dynamoDb.put(c).promise().then((_value) => {
            return contact;
        });
    }

    public async remove(from: string, to: string): Promise<any> {
        console.log(`Attempting to remove contact ${from} : ${to}`);
        const p = {
            TableName: this.tableName,
            Key: {
                from: from,
                to: to
            }
        }
        return this.dynamoDb.delete(p).promise();
    }

}

export const contactsRepository = new ContactsRepository();
