import LoadingAnimation from "@/components/LoadingAnimation";
import Table from "@/components/Table";
import ThemeSwich from "@/components/ThemeSwich";
import WithCheckSession from "@/layouts/WithCheckSession";
import { api } from "@/utils/api";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  isIPhone: boolean;
}

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

const Share: NextPage<Props> = ({ isIPhone }) => {
  const { query, back } = useRouter();

  const couresData = api.share.getTable.useQuery({ link: query.id as string });

  return (
    <>
      {couresData.status !== "loading" ? (
        <>
          {couresData.status === "success" && (
            <div className="flex flex-col gap-2 p-5">
              <div className="flex gap-2">
                <div
                  onClick={() => back()}
                  className="btn-outline btn-primary btn-sm btn w-fit"
                >
                  <ArrowBackIcon />
                </div>
                <ThemeSwich />
              </div>
              <Table
                isIPhone={isIPhone}
                hasShare={false}
                courseData={couresData.data!}
              />
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
