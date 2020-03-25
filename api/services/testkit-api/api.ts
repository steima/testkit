import {APIGatewayAuthorizerHandler, APIGatewayProxyHandler, APIGatewayTokenAuthorizerEvent} from "aws-lambda";
import {Responses} from "../../libs/responses";
import {usersService} from "../../libs/services/usersService";
import {authService} from "../../libs/services/authService";
import {UpdateConditionRequest} from "./resources";
import {Requests} from "../../libs/requests";

export const auth: APIGatewayAuthorizerHandler = async (event: APIGatewayTokenAuthorizerEvent, _context) => {
    return await authService.verifyEvent(event);
};

export const getOrCreateUser: APIGatewayProxyHandler = async (event, _context) => {
    const authInfo = authService.extractAuthInfo(event);
    console.log(`Logged in Facebook user: `, authInfo);
    const existingUser = await usersService.getUser(authInfo);
    if(existingUser) {
        return Responses.success(existingUser);
    }
    const importedUser = await usersService.importUser(authInfo);
    return Responses.success(importedUser);
};

export const updateCondition: APIGatewayProxyHandler = async (event, _context) => {
    const authInfo = authService.extractAuthInfo(event);
    const existingUser = await usersService.getUser(authInfo);
    if(!existingUser) {
        return Responses.notFound(`No user found with userid ${authInfo.facebookUserId}`);
    }
    const request = <UpdateConditionRequest>Requests.body(event);
    const updatedUser = await usersService.updateCondition(authInfo.facebookUserId, request)
    return Responses.success(updatedUser);
};
