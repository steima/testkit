import {contactsRepository} from "../repositories/contactsRepository";
import {Contact, contactBlueprint, contactPushLastMetAt} from "../domain/contact";


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

}

export const contactsService = new ContactsService();
