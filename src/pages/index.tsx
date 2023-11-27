import { api } from "../utils/api";
import WithCheckSession from "@/layouts/WithCheckSession";
import { NextPage, NextPageContext } from "next";
import _, { set } from "lodash";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Table from "@/components/Table";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Tabs } from "antd";
import CustomTimeTable from "@/components/Index/CustomTimeTable";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import ShopSubject from "@/components/Index/ShopSubject";
import useTapStore from "@/stores/useTabStore";
import GeneralEducation from "@/components/Index/GeneralEducation";
import Howtouse from "@/components/Howtouse";
import { Icon } from "@iconify/react";
import Achievement from "@/components/Achievement";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export async function getServerSideProps(context: NextPageContext) {
    const UA = context.req!.headers["user-agent"];
    let isIPhone = false;
    if (UA!.match(/iPhone|iPad|Macintosh/i)) {
        if (UA!.match(/Mobile/i)) {
            isIPhone = true;
        } else if (UA!.match(/Chrome/i)) {
            isIPhone = false;
        } else {
            isIPhone = true;
        }
    }
    return {
        props: { isIPhone },
    };
}

interface Props {
    isIPhone: boolean;
}

const Home: NextPage<Props> = ({ isIPhone }) => {
    const getCourseData = api.group_course.getCourse.useQuery();
    const { tab, setTab } = useTapStore((s) => s);
    const [tab2, setTab2] = useLocalStorage("tab", "tab1");
    const { LocalsSwip } = useLocalsSwip();

    const onSetTab = (key: string) => {
        setTab(key);
        setTab2(key);
    }

    useEffect(() => {
        if (tab2) {
            setTab(tab2);
        }
    }, [tab2])


    return (
        <WithCheckSession>
            {/* asdf */}
            <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
                {getCourseData.status !== "loading" ? (
                    <>
                        {getCourseData.status === "success" ? (
                            <>
                                <Navbar />
                                <Tabs
                                    defaultActiveKey={tab}
                                    activeKey={tab}
                                    onChange={(key) => onSetTab(key)}
                                    items={[
                                        {
                                            key: "tab1",
                                            label: LocalsSwip("ตารางเรียน", "Time Table"),
                                            children: (
                                                <>
                                                    {getCourseData.data ? (
                                                        <>
                                                            {getCourseData.data.results &&
                                                                getCourseData.data.results.length > 0 ? (
                                                                <Table
                                                                    isIPhone={isIPhone}
                                                                    hasShare={true}
                                                                    courseData={
                                                                        getCourseData.data.results[0]?.course!
                                                                    }
                                                                />
                                                            ) : (
                                                                LocalsSwip("ไม่พบรายวิชา", "No courses found")
                                                            )}
                                                        </>
                                                    ) : (
                                                        ""
                                                    )}
                                                </>
                                            ),
                                        },
                                        {
                                            key: "tab2",
                                            label: LocalsSwip("สำรวจวิชา", "Explore Course"),
                                            children: <ShopSubject />,
                                        },
                                        {
                                            key: "tab4",
                                            label: LocalsSwip("วิชาศึกษาทั่วไป", "General Education"),
                                            children: <GeneralEducation />,
                                        },
                                        {
                                            key: "tab3",
                                            label: LocalsSwip("จัดตารางเรียน", "Custom Time Table"),
                                            children: <CustomTimeTable isIPhone={isIPhone} />,
                                        },
                                        {
                                            key: "achievement",
                                            label: LocalsSwip("เรียนอะไรไปแล้วบ้าง", "Achievement"),
                                            children: <Achievement />,
                                        },
                                        {
                                            key: "tab5",
                                            label: (
                                                <div className="flex gap-1">
                                                    <Icon icon="tabler:info-circle" className="text-lg" />
                                                    {LocalsSwip("วิธีใช้งาน", "How to use")}
                                                </div>
                                            ),
                                            children: <Howtouse />,
                                        },
                                    ]}
                                />

                                <Footer />
                            </>
                        ) : (
                            <div>Error</div>
                        )}
                    </>
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        </WithCheckSession>
    );
};

export default Home;
