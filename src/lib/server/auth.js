import crypto from 'crypto'
import { SECRET } from '$env/static/private'

export const encrypt = async text => {
	return new Promise((resolve, reject) => {
		try {
			const iv = crypto.randomBytes(12)
			const cipher = crypto.createCipheriv(
				'chacha20-poly1305', Buffer.from(SECRET, 'hex'), iv,
				{ authTagLength: 16	}
			)

			const encrypted = Buffer.concat([
				cipher.update(
					Buffer.from(text), 'utf8'),
					cipher.final()
			])
			const tag = cipher.getAuthTag()
			const final = Buffer.concat([iv, tag, encrypted]).toString('hex')

			resolve(final)
		} catch(err) {
			reject(err)
		}
	})
}

export const decrypt = async text => {
	return new Promise((resolve, reject) => {
		try {
			const decipher = crypto.createDecipheriv(
				'chacha20-poly1305',
				Buffer.from(SECRET, 'hex'),
				Buffer.from(text.substring(0, 24), 'hex'),
				{ authTagLength: 16 }
			)
			decipher.setAuthTag(Buffer.from(text.substring(24, 56), 'hex'))
			const decrypted = [
				decipher.update(
					Buffer.from(text.substring(56), 'hex'),
					'binary', 'utf8'
				),
				decipher.final('utf8')
			].join('')

			resolve(decrypted)
		} catch(err) {
			reject(err)
		}
	})
}

export const genSecureRandom = () => {
	const LENGTH = 16
	const randomValues = new Uint8Array(LENGTH)
	const randomBytes = crypto.getRandomValues(randomValues)

	return Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export const encodeID = num => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''

    while (Number(num) > 0) {
        result = characters[Number(num) % 52] + result
        num = Math.floor(Number(num) / 52)
    }
	
    return result.padEnd(15, '0')
}

// export async function toBase62(num) {
//     const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     let result = '';
//     while (num > 0n) {
//         result = digits[Number(num % 62n)] + result;
//         num /= 62n;
//     }
//     return result;
// }
// export async function generate15CharHash(input) {
//     const encoder = new TextEncoder();
//     const dataBuffer = encoder.encode(input);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
//     const hashArray = new Uint8Array(hashBuffer);
    
//     // Convert hash bytes to BigInt
//     let hashNum = BigInt('0x' + Array.from(hashArray).map(byte => byte.toString(16).padStart(2, '0')).join(''));

//     // Convert the BigInt to a base-62 string
//     let hashBase62 = await toBase62(hashNum);

//     // Truncate to 15 characters
//     return hashBase62.substring(0, 15);
// }