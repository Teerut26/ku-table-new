import { Course } from "@/interfaces/GroupCourseResponseInterface";
import LocaleSwip from "@/utils/localeSwip";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ShareIcon from "@mui/icons-material/Share";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

interface Props {
  courseData: Course[];
}

const ShareTableBtn: NextPage<Props> = ({ courseData }) => {
  const { locale } = useRouter();

  const saveShare = api.share.saveShare.useMutation();

  const handleShare = async () => {
    saveShare.mutate({ courseData });
  };

  useEffect(() => {
    if (saveShare.status === "success") {
      window.navigator.clipboard.writeText(
        `${window.location.origin}/share/${saveShare.data}`
      );
      toast.success(
        `คัดลอกแล้ว : ${window.location.origin}/share/${saveShare.data}`
      );
    }
  }, [saveShare.status]);

  return (
    <div
      onClick={() => handleShare()}
      className={clsx(
        "btn-outline btn-error btn-sm btn gap-2 uppercase",
        saveShare.status === "loading" && "loading"
      )}
    >
      {saveShare.status !== "loading" && <ShareIcon sx={{ width: 20 }} />}
      {LocaleSwip(locale!, "แชร์", "share")}
    </div>
  );
};

export default ShareTableBtn;
