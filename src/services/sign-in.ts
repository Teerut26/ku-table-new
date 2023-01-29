import { SignInServicePropsInterface } from '@/interfaces/SignInServicePropsInterface'
import { SignInServiceResponseInterface } from '@/interfaces/SignInServiceResponseInterface'
import axios from 'axios'
import crypto from 'crypto'

const encodeString = (str: string) => {
    return crypto
        .publicEncrypt(
            {
                key: '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAytOhlq/JPcTN0fX+VqObE5kwIaDnEtso2KGHdi9y7uTtQA6pO4fsPNJqtXOdrcfDgp/EQifPwVRZpjdbVrD6FgayrQQILAnARKzVmzwSMDdaP/hOB6i9ouKsIhN9hQUmUhbhaMkh7UXoxGW+gCSK8dq0+FJVnlt1dtJByiVAJRi2oKSdLRqNjk8yGzuZ6SrEFzAgYZwmQiywUF6V1ZaMUQDz8+nr9OOVU3c6Z2IQXCbOv6S7TAg0VhriFL18ZxUPS6759SuKC63VOOSf4EEHy1m0qBgpCzzlsB7D4ssF9x0ZVXLREFrqikP71Hg6tSGcu4YBKL+VwIDWWaXzz6szxeDXdYTA3l35P7I9uBUgMznIjTjNaAX4AXRsJcN9fpF7mVq4eK1CorBY+OOzOc+/yVBpKysdaV/yZ+ABEhX93B2kPLFSOPUKjSPK2rtqE6h2NSl5BFuGEoVBerKn+ymOnmE4/SDBSe5S6gIL5vwy5zNMsxWUaUF5XO9Ez+2v8+yPSvQydj3pw5Rlb07mAXcI18ZYGClO6g/aKL52KYnn1FZ/X3r8r/cibfDbuXC6FRfVXJmzikVUqZdTp0tOwPkh4V0R63l2RO9Luy7vG6rurANSFnUA9n842KkRtBagQeQC96dbC0ebhTj+NPmskklxr6/6Op/P7d+YY76WzvQMvnsCAwEAAQ==\n-----END PUBLIC KEY-----',
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(str, 'utf8')
        )
        .toString('base64')
}

const SignInService = (props: SignInServicePropsInterface) => {
    return axios.post<SignInServiceResponseInterface>(
        'https://myapi.ku.th/auth/login',
        {
            username: encodeString(props.username),
            password: encodeString(props.password),
        },
        {
            headers: {
                authority: 'myapi.ku.th',
                accept: '*/*',
                'accept-language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
                'app-key': 'txCR5732xYYWDGdd49M3R19o1OVwdRFc',
                'content-type': 'application/json',
                origin: 'https://my.ku.th',
                referer: 'https://my.ku.th/',
                'sec-ch-ua':
                    '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
            },
        }
    )
}

export default SignInService
