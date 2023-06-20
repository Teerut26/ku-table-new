import { NextPage } from 'next'

interface Props {}

const Howtouse: NextPage<Props> = () => {
    return (
        <div className='w-full lg:max-w-3xl mx-auto'>
            <img src="/howtouse.svg" alt="" className='w-full' />
        </div>
    )
}

export default Howtouse