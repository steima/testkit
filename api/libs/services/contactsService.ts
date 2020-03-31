import {contactsRepository} from "../repositories/contactsRepository";
import {Contact, contactBlueprint, contactPushLastMetAt} from "../domain/contact";
import {LastMetRecord, SocialNetworkScore, SocialNetworkScoreResultType} from "../../services/testkit-api/resources";
import {usersRepository} from "../repositories/usersRepository";
import {Condition} from "../domain/user";


class ContactsService {

    async recordMeeting(request: { me: string, otherUser: string, lastMetAt: string}): Promise<Contact> {
        let forwardContact = await contactsRepository.get(request.me, request.otherUser);
        if(!forwardContact) {
            forwardContact = contactBlueprint(request.me, request.otherUser, request.lastMetAt);
        }
        let backwardContact = await contactsRepository.get(request.otherUser, request.me);
        if(!backwardContact) {
            backwardContact = contactBlueprint(request.otherUser, request.me, request.lastMetAt);
        }
        contactPushLastMetAt(forwardContact, request.lastMetAt);
        contactPushLastMetAt(backwardContact, request.lastMetAt);
        await contactsRepository.put(forwardContact);
        await contactsRepository.put(backwardContact);
        return forwardContact;
    }

    async computeLastMet(from: string, userIds: string[]): Promise<LastMetRecord[]> {
        const lastMet: LastMetRecord[] = [];
        for(let to of userIds) {
            const contact = await contactsRepository.get(from, to);
            lastMet.push({
                userId: to,
                lastMetAt: contact.lastMetAt
            });
        }
        return lastMet;
    }

    async computeNetworkScore(from: string): Promise<SocialNetworkScore> {
        // TODO cache results and retrieve them back here
        try {
            const contacts = await contactsRepository.listForUser(from);
            if(contacts == undefined || contacts.length <= 0) {
                return {
                    resultType: SocialNetworkScoreResultType.NotEnoughConnections,
                    positive: 0
                };
            }
            let counter = 0;
            // TODO find a good day estimate for how old the data can be
            for(let contact of contacts) {
                if(contact.lastMetAt) {
                    const otherUsersProfile = await usersRepository.get(contact.to);
                    if(otherUsersProfile && otherUsersProfile.currentCondition == Condition.Positive) {
                        counter ++;
                    }
                }
            }
            return {
                resultType: SocialNetworkScoreResultType.CurrentResult,
                positive: counter
            };
        }catch(e) {
            console.log('Cannot query contacts', e);
            return {
                resultType: SocialNetworkScoreResultType.NotEnoughConnections,
                positive: 0
            };
        }
    }

}

export const contactsService = new ContactsService();
