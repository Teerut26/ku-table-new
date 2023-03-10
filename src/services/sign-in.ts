import { env } from '@/env/server.mjs'
import { SignInServicePropsInterface } from '@/interfaces/SignInServicePropsInterface'
import { SignInServiceResponseInterface } from '@/interfaces/SignInServiceResponseInterface'
import axios from 'axios'
import crypto from 'crypto'

const encodeString = (str: string) => {
    return crypto
        .publicEncrypt(
            {
                key: env.MYKU_PUBLIC_KEY.replace(/\\n/gm, '\n'),
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
