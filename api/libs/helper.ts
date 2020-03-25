import {DateTime} from "luxon";

export function getStage() {
    let stage = process.env.stage;
    if(!stage) {
        stage = 'dev';
    }
    return stage;
}

export function getFrontendBaseUrl() {
    return `https://${getStage()}.testkit.link`;
}

export function getBackendBaseUrl() {
    return `https://api-${getStage()}.testkit.link`;
}

export function luxonDate(date?: any): DateTime {
    if(!date) {
        return DateTime.local();
    } else if(typeof date === "string") {
        return DateTime.fromISO(date);
    } else if(date instanceof DateTime) {
        return date;
    }else if(date instanceof Date) {
        return DateTime.fromJSDate(date);
    }
    throw Error('Date was in a not supported type')
}

export function nowIsoString(): string {
    return new Date().toISOString();
}

export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

export function emptyString(value?: string): string | undefined {
    if(value) { return value; }
    return undefined;
}

export function isEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

const ip4ToInt = (ip:any) => {
    return ip.split('.').reduce((int: any, oct: any) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
};

export const isIp4InCidr = (ip:any, cidr:any) => {
    const [range, bits = 32] = cidr.split('/');
    const mask = ~(2 ** (32 - bits) - 1);
    return (ip4ToInt(ip) & mask) === (ip4ToInt(range) & mask);
};

export function randomInt(max: number) {
    return Math.floor(Math.random() * max);
};

export const zeroPad = (num, places) => String(num).padStart(places, '0');
