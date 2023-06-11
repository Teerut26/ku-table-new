import useChangePage from "@/hooks/useChangePage";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import WithCheckSession from "@/layouts/WithCheckSession";
import { api } from "@/utils/api";
import { Button } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";

interface Props {}

const Report: NextPage<Props> = () => {
  const [issue, setIssue] = useLocalStorage("issue", "");
  const { LocalsSwip } = useLocalsSwip();
  const [IsSend, setIsSend] = useState(false);
  const { back } = useRouter();
  const { isChanging } = useChangePage();
  const sendReportApi = api.sendReport.send.useMutation();

  const onSubmit = () => {
    if (issue.length <= 0) {
      toast.error(LocalsSwip("กรุณากรอกข้อความ", "Please fill in the text"));
    }
    sendReportApi.mutate(
      {
        message: issue,
      },
      {
        onSuccess: () => {
          setIsSend(true);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <WithCheckSession>
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center gap-2 p-5 md:p-10">
        <div className="flex flex-col items-center justify-center gap-5">
          {!IsSend ? (
            <>
              <h1 className="text-3xl font-bold">
                {LocalsSwip("รายงานปัญหา", "Report Issue")}
              </h1>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="h-[60vh] w-full max-w-6xl rounded-lg border-2 p-3"
                placeholder={LocalsSwip("กรอกข้อความที่นี่", "Enter text here")}
              ></textarea>
              <Button
                onClick={onSubmit}
                type="primary"
                size="large"
                className="w-fit"
                loading={sendReportApi.isLoading}
              >
                {LocalsSwip("ส่งข้อความ", "Send")}
              </Button>
            </>
          ) : (
            <>
              <h1>
                {LocalsSwip(
                  "ขอบคุณสำหรับการรายงานปัญหา",
                  "Thank you for reporting the problem"
                )}
              </h1>
              <Button
                onClick={back}
                type="primary"
                size="large"
                className="w-fit"
                loading={isChanging}
              >
                {LocalsSwip("กลับไปหน้าหลัก", "Back to home")}
              </Button>
            </>
          )}
        </div>
      </div>
    </WithCheckSession>
  );
};

export default Report;
