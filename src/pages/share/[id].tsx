import LoadingAnimation from "@/components/LoadingAnimation";
import Table from "@/components/Table";
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
      <div className="p-5">
        {couresData.status !== "loading" ? (
          <>
            {couresData.status === "success" && (
              <Table hasShare={false} courseData={couresData.data!} />
            )}
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </>
  );
};

export default Share;
