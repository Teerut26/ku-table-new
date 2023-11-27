import useLocalsSwip from '@/hooks/useLocalsSwip'
import { SubjectGroupEnum } from '@/interfaces/SubjectGroupEnum'
import { Icon } from '@iconify/react'
import { Collapse } from '@mui/material'
import { Divider } from 'antd'
import clsx from 'clsx'
import { NextPage } from 'next'
import { useState } from 'react'

interface Props {
    type: SubjectGroupEnum | string
    current_credit?: number
    require_credit?: number
    message?: string
    children?: Props[]
    isInternal?: boolean
    isExpand?: boolean
}

const CardAchievement: NextPage<Props> = (data) => {
    const { LocalsSwip } = useLocalsSwip();
    const [isCollapse, setIsCollapse] = useState(data.isExpand ?? true);
    const remain = (data.require_credit && data.current_credit) ? (data.require_credit - data.current_credit) < 0 ? 0 : (data.require_credit - data.current_credit) : null
    const percent = (data.require_credit && data.current_credit) ? (data.current_credit / data.require_credit) * 100 : null

    const handleCollapse = () => {
        setIsCollapse(pre => !pre);
    };

    return (
        <div className={clsx('flex flex-col w-full h-fit relative', data.isInternal ? "border-t" : "border rounded-md border-base-content/20", data.message ? "pt-2" : "p-3")}>
            {data.children?.length && <div className='absolute top-2 right-2' onClick={handleCollapse} >
                {isCollapse ? (
                    <Icon
                        icon="material-symbols:keyboard-arrow-up"
                        className="text-3xl"
                    />
                ) : (
                    <Icon
                        icon="material-symbols:keyboard-arrow-down"
                        className="text-3xl"
                    />
                )}
            </div>}

            <div className='flex items-end gap-1'>
                {!data.message ? <>
                    <div className='text-3xl font-bold'>{data.current_credit}/{data.require_credit}</div>
                    <div className='pb-1 text-base-content/50'>{LocalsSwip("หน่วย", "credit")}</div>
                </> : <div className='pb-1 text-base-content/50'>{data.message}</div>}
            </div>
            <div className='text-xl text-base-content/70 font-bold'>
                {data.type}
            </div>
            {(percent) && <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <div className={clsx('font-bold', percent >= 100 ? "text-primary" : "text-error")}>
                        เหลืออีก {remain}
                    </div>
                    <div className={clsx('text-base-content/50 font-bold', percent >= 100 ? "text-primary" : "text-error")}>
                        {percent.toFixed(2)}%
                    </div>
                </div>
                <progress className={clsx("progress w-full", percent >= 100 ? "progress-primary" : "progress-error")} value={percent} max="100"></progress>
            </div>}

            {data.children?.length && <Collapse in={isCollapse}>
                <>
                    <div className='flex flex-col gap-3 mt-3'>
                        {data.children?.map((item, index) => (
                            <CardAchievement key={index} {
                                ...{
                                    ...item,
                                    isExpand: false,
                                    isInternal: true
                                }
                            } />
                        ))}
                    </div>
                </>
            </Collapse>}

        </div>
    )
}

export default CardAchievement