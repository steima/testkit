import { APIGatewayProxyEvent } from "aws-lambda";

export class Requests {

    static body(event: APIGatewayProxyEvent): any {
        if(typeof event.body === "string") {
            return JSON.parse(event.body);
        }else{
            return event.body;
        }
    }

}