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
  const { LocalsSwip } = useLocalsSwip();
  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <Navbar />
                <Tabs
                  defaultActiveKey={tab}
                  activeKey={tab}
                  onChange={(key) => setTab(key)}
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
