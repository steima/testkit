export interface Contact {
    from: string;
    to: string;
    lastMetAt: string;
    meetingLog: string[];
}

export function contactBlueprint(from: string, to: string, lastMetAt: string): Contact {
    return {
        from: from, to: to, lastMetAt: lastMetAt, meetingLog: []
    };
}

export function contactPushLastMetAt(contact: Contact, lastMetAt: string): Contact {
    contact.lastMetAt = lastMetAt;
    contact.meetingLog.push(lastMetAt);
    return contact;
}
