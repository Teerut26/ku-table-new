import { api } from "../utils/api";
import WithCheckSession from "@/layouts/WithCheckSession";
import { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import _ from "lodash";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import Table from "@/components/Table";
import LoadingAnimation from "@/components/LoadingAnimation";
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
  const { data: session, status } = useSession();
  const getCourseData = api.group_course.getCourse.useQuery();

  useEffect(() => {
    if (status == "authenticated" && typeof window !== "undefined") {
      window.umami(`student_status_name-${session.user?.email?.user.student.studentTypeNameEn}`);
    }
  }, [status]);

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <Navbar />
                <Table
                  isIPhone={isIPhone}
                  hasShare={true}
                  courseData={getCourseData.data.results[0]?.course!}
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
