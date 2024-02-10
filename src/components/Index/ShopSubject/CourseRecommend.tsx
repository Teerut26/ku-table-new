import useLocalsSwip from '@/hooks/useLocalsSwip';
import { NextPage } from 'next'
import useSearchStore from './store/useSearchStore';
import { Tag } from 'antd';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useEffect } from 'react';
import { RecommendResponseInterface } from '@/interfaces/RecommendResponseInterface';
import { Button, Skeleton } from '@mui/material';

interface Props { }

const fetcher = (classId: string | null) => {
    return fetch(`/api/recommend/${(classId as string).slice(0, 8)}`).then(res =>
        res.json()
    )
}

const CourseRecommend: NextPage<Props> = () => {
    const { setSelectedSubjectCode, selectedSubjectCode } = useSearchStore((s) => s);
    const { isLoading, error, data, refetch } = useQuery<RecommendResponseInterface[]>([selectedSubjectCode], () => fetcher(selectedSubjectCode), {
        enabled: !!selectedSubjectCode,
    })

    const { LocalsSwip } = useLocalsSwip();

    const handleClick = (classId: string) => {
        setSelectedSubjectCode(classId)
        refetch()
    }

    return (
        <div className='flex flex-col'>
            <div className='font-bold text-xl'>{data && LocalsSwip("คุณอาจจะชื่นชอบ", "You may like")}</div>
            <div className='flex overflow-x-auto py-1 gap-2'>
                {isLoading ? <>
                    {[...new Array(10)].map((_, id) => (
                        <Skeleton variant="rectangular" width={"30rem"} height={"3rem"} key={id} />
                    ))}
                </> : <>
                    {data?.slice(1, 6).map((item, id) => (
                        <Button onClick={() => handleClick("0" + item.classId.toString())} variant='contained' sx={{ boxShadow: 0, flex: "none" }} key={id}>
                            <div className='flex flex-col justify-start text-start gap-2 w-full'>
                                <div className='md:text-sm text-xs md:leading-3 leading-3'>{item.classId}</div>
                                <div className='md:text-lg text-base md:leading-3 leading-[0.5rem]'>{LocalsSwip(item.nameTh, item.nameEn)}</div>
                            </div>
                        </Button>
                    ))}
                </>}
                
            </div>
        </div>
    )
}

export default CourseRecommend