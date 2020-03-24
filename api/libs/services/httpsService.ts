import * as https from "https";

export function httpGet<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        https.get(url, (response) => {
            if(response.statusCode == 200) {
                let data;
                data = '';
                response.on('readable', () => {
                    data += response.read().toString();
                });
                response.on('end', () => {
                    const parsed = JSON.parse(data);
                    console.log(parsed);
                    resolve(parsed);
                });
            }else{
                reject(response.statusMessage);
            }
        });
    });
}

export function httpGetAuth<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        https.get(url, (response) => {
            if(response.statusCode == 200) {
                let data;
                data = '';
                response.on('readable', () => {
                    data += response.read().toString();
                });
                response.on('end', () => {
                    const parsed = JSON.parse(data);
                    console.log(parsed);
                    if(parsed.data.is_valid) {
                        resolve(parsed.data);
                    }else{
                        reject(parsed.data.error.message);
                    }
                });
            }else{
                reject(response.statusMessage);
            }
        });
    });
}
