import {APIGatewayAuthorizerResult, APIGatewayProxyEvent, APIGatewayTokenAuthorizerEvent} from "aws-lambda";
import * as AWS from "aws-sdk";
import {httpGetAuth} from "./httpsService";

export interface AuthInfo {

    token: string;
    facebookUserId?: string;

}

class AuthService {

    private async facebookAppSecret(): Promise<string> {
        const ssm = new AWS.SSM();
        const parameter = await ssm.getParameter({
            Name: 'facebook-app-secret',
            WithDecryption: true
        }).promise();
        return parameter.Parameter.Value;
    }

    private async verifyFacebookToken(token: string): Promise<string> {
        const appId = '240892070287062';
        const appSecret = await this.facebookAppSecret();
        const path = `input_token=${token}&access_token=${appId}|${appSecret}`;
        const url = `https://graph.facebook.com/debug_token?${path}`;
        console.log(url);
        return httpGetAuth<{ user_id: string }>(url).then((r) => {
            return r.user_id;
        });
    }

    generatePolicy(principalId: string, effect: 'Allow' | 'Deny', resourceArn: string): APIGatewayAuthorizerResult {
        return {
            principalId: principalId,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resourceArn
                }]
            }
        };
    }

    private extractToken(token: string): string {
        const tokenParts = token.split(' ');
        if(tokenParts.length != 2 || tokenParts[0].toLowerCase() !== 'bearer') {
            throw new Error('Authorization header did not contain a bearer token');
        }
        return tokenParts[1];
    }

    async verifyEvent(event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> {
        const token = this.extractToken(event.authorizationToken);
        try {
            const userId = await this.verifyFacebookToken(token);
            console.log(`Verified Facebook token for user ${userId}, generating policy`);
            const policy = this.generatePolicy(userId, 'Allow', '*');
            console.log(policy);
            return policy;
        }catch (e) {
            throw new Error(e);
        }
    }

    extractAuthInfo(event: APIGatewayProxyEvent): AuthInfo {
        return {
            token: this.extractToken(event.headers.Authorization),
            facebookUserId: event.requestContext.authorizer.principalId
        };
    }

}

export const authService = new AuthService();
