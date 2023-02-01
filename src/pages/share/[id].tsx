import LoadingAnimation from "@/components/LoadingAnimation";
import Table from "@/components/Table";
import ThemeSwich from "@/components/ThemeSwich";
import WithCheckSession from "@/layouts/WithCheckSession";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const Share: NextPage<Props> = () => {
  const { query } = useRouter();

  const couresData = api.share.getTable.useQuery({ link: query.id as string });

  return (
    <>
        {couresData.status !== "loading" ? (
          <>
            {couresData.status === "success" && (
              <div className="p-5 flex flex-col gap-2">
                <ThemeSwich />
                <Table hasShare={false} courseData={couresData.data!} />
              </div>
            )}
          </>
        ) : (
          <LoadingAnimation />
        )}
    </>
  );
};

export default Share;
