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

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <Navbar />
                {getCourseData.data ? (
                  <>
                    {getCourseData.data.results &&
                    getCourseData.data.results.length > 0 ? (
                      <Table
                        isIPhone={isIPhone}
                        hasShare={true}
                        courseData={getCourseData.data.results[0]?.course!}
                      />
                    ) : (
                      "No courses found"
                    )}
                  </>
                ) : (
                  ""
                )}

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
