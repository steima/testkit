export enum Stage {
    dev = 'dev',
    test = 'test',
    app = 'app'
}

export function stage(): Stage {
    return stageFromHostname(window.location.hostname);
}

export function stageFromHostname(hostname: string): Stage {
    if(hostname === 'localhost') {
        return Stage.dev;
    }else if(hostname.startsWith(Stage.dev) || hostname.startsWith('testkit-dev')) {
        return Stage.dev;
    }else if(hostname.startsWith(Stage.test) || hostname.startsWith('testkit-test')) {
        return Stage.test;
    }else if(hostname.startsWith(Stage.app) || hostname.startsWith('testkit-app')) {
        return Stage.app;
    }
    throw new Error(`The hostname ${hostname} does not contain a valid stage`);
}
