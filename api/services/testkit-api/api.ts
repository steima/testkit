import {APIGatewayAuthorizerHandler, APIGatewayProxyHandler, APIGatewayTokenAuthorizerEvent} from "aws-lambda";
import {Responses} from "../../libs/responses";
import {usersService} from "../../libs/services/usersService";
import {authService} from "../../libs/services/authService";
import {
    LastMetRequest, LastMetResponse,
    Meeting,
    UpdateConditionRequest
} from "./resources";
import {Requests} from "../../libs/requests";
import {contactsService} from "../../libs/services/contactsService";

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

export const storeSocialContact: APIGatewayProxyHandler = async (event, _context) => {
    const authInfo = authService.extractAuthInfo(event);
    const existingUser = await usersService.getUser(authInfo);
    if(!existingUser) {
        return Responses.notFound(`No user found with userid ${authInfo.facebookUserId}`);
    }
    const request = <Meeting>Requests.body(event);
    const contact = await contactsService.recordMeeting({ me: existingUser.userid, ... request });
    return Responses.success(contact);
};

export const computeScore: APIGatewayProxyHandler = async (event, _context) => {
    const authInfo = authService.extractAuthInfo(event);
    const existingUser = await usersService.getUser(authInfo);
    if(!existingUser) {
        return Responses.notFound(`No user found with userid ${authInfo.facebookUserId}`);
    }
    const result = await contactsService.computeNetworkScore(existingUser.userid);
    return Responses.success(result);
};

export const getLastMet: APIGatewayProxyHandler = async (event, _context) => {
    const authInfo = authService.extractAuthInfo(event);
    const existingUser = await usersService.getUser(authInfo);
    if(!existingUser) {
        return Responses.notFound(`No user found with userid ${authInfo.facebookUserId}`);
    }
    const request = <LastMetRequest>Requests.body(event);
    const records = await contactsService.computeLastMet(existingUser.userid, request.userIds);
    const response: LastMetResponse = {
        data: records
    };
    return Responses.success(response);
};

