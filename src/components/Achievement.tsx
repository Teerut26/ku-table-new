import { NextPage } from 'next'
import CardAchievement from './Achievement/CardAchievement'
import useLocalsSwip from '@/hooks/useLocalsSwip';
import { use, useState } from 'react';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';

interface Props { }

const Achievement: NextPage<Props> = () => {
    const { LocalsSwip } = useLocalsSwip();
    const { data: session } = useSession()
    const [expand, setExpand] = useState(true)

    const { data, isLoading } = api.achievement.getAll.useQuery();

    return (
        <div className='flex flex-col gap-2'>
            <div className=''>
                {LocalsSwip("ความสำเร็จ", "Achievement")}
            </div>
            {isLoading ? "Loading..." : <div className='flex gap-3 flex-col sm:flex-row'>
                {(data && data.length > 0) ? data?.map((e) => (
                    <CardAchievement {
                        ...{
                            isExpand: expand,
                            type: e?.type!,
                            current_credit: e?.credit_current,
                            require_credit: e.credit_require,
                            children: e.children.map((e2) => ({
                                type: e2.type,
                                require_credit: e2.credit_require,
                                current_credit: e2.credit_current,
                                children: e2.children.map((e3) => ({
                                    isExpand: false,
                                    type: e3.subjectName,
                                    message: e3.subjectCode,
                                }))
                            }))
                        }
                    } />
                )) : LocalsSwip(`ไม่พบข้อมูลสำหรับ ${session?.user?.email?.user.student.majorCode}`, `No data for ${session?.user?.email?.user.student.majorCode}`)}
            </div>}

        </div>
    )
}

export default Achievement