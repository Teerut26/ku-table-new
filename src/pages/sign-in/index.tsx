import { NextComponentType } from 'next'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const ThemeSwich = dynamic(
    () => import('@/components/ThemeSwich'),
    { ssr: false }
)

interface Props {}

const Index: NextComponentType<Props> = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { data: session, status } = useSession()

    const [showPass, setShowPass] = useState(false)

    const router = useRouter()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!usernameRef.current || !passwordRef.current) {
            return
        }

        let res = await signIn('credentials',{
            username: usernameRef.current.value!,
            password: passwordRef.current.value!,
        })

        console.log(res);
        
    }

    useEffect(() => {
      if(status === 'authenticated'){
        router.push("/")
      }
    }, [status])
    

    return (
        <>
            <div className="absolute z-20 top-0 right-0 left-0 max-w-md mx-auto flex justify-end p-5">
                <ThemeSwich />
            </div>
            <div className="fixed z-10 top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center">
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5 max-w-md mx-auto w-full px-5"
                >
                    <h1 className="text-4xl font-bold">Sign In</h1>
                    <div className="flex flex-col gap-2">
                        <div>Username</div>
                        <input
                            ref={usernameRef}
                            type="text"
                            placeholder="เช่น b63xxxxxxxx หรือ regxxx"
                            className="input input-bordered input-primary w-full"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>Password</div>
                        <div className="relative">
                            <div className="absolute right-0 top-0 bottom-0 h-full flex flex-col justify-center px-5">
                                {showPass ? (
                                    <AiFillEyeInvisible
                                        onClick={() => setShowPass(false)}
                                        className="text-base-content hover:text-base-content/50 cursor-pointer"
                                        size={'20'}
                                    />
                                ) : (
                                    <AiFillEye
                                        onClick={() => setShowPass(true)}
                                        className="text-base-content hover:text-base-content/50 cursor-pointer"
                                        size={'20'}
                                    />
                                )}
                            </div>
                            <input
                                ref={passwordRef}
                                type={showPass ? 'text' : 'password'}
                                placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                                className="input input-bordered input-primary w-full"
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="flex justify-start items-center gap-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-xs"
                        />
                        <div>Remember me</div>
                    </div> */}
                    <button type="submit" className="btn btn-primary">
                        SignIn
                    </button>
                </form>
            </div>
        </>
    )
}

export default Index
