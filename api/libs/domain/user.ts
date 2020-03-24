export interface TestkitUser {

    userid: string;
    imported: string;
    name?: string;

}

export function userBlueprint(userid: string, name: string): TestkitUser {
    return {
        userid: userid,
        imported: new Date().toISOString(),
        name: name
    };
}
