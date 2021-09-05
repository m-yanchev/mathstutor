import crypto from "crypto";

export const getSecret = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, async (err, buf) => {
            if (err) {
                reject(err);
                return
            }
            resolve(buf.toString('hex'))
        })
    })
}

export const getHash = (password, secret) => {
    return new Promise(resolve => {
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(password);
        resolve(hmac.digest('hex'));
    })
}