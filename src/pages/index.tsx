import { api } from "../utils/api";
import WithCheckSession from "@/layouts/WithCheckSession";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import _ from "lodash";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import Table from "@/components/Table";
import LoadingAnimation from "@/components/LoadingAnimation";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const getCourseData = api.group_course.getCourse.useQuery({
    stdId: session?.user?.email?.user.student.stdId!,
  });

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        {getCourseData.status !== "loading" ? (
          <>
            {getCourseData.status === "success" ? (
              <>
                <Navbar />
                <Table hasShare={true} courseData={getCourseData.data.results[0]?.course!} />
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
