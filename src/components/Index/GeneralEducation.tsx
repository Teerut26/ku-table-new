import useLocalsSwip from "@/hooks/useLocalsSwip";
import { GenEdServiceResponseInterface } from "@/services/get-gened";
import useGenEdStore from "@/stores/useGenEdStore";
import { Typography } from "@mui/material";
import { Button, Card, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { NextPage } from "next";
import useTableStore from "../Table/store/useTableStore";
import useTapStore from "@/stores/useTabStore";
import useSearchStore from "./ShopSubject/store/useSearchStore";

interface Props {}

const GeneralEducation: NextPage<Props> = () => {
  const { genTemp, searchGenEd } = useGenEdStore((s) => s);
  const { setTab } = useTapStore((s) => s);
  const { LocalsSwip } = useLocalsSwip();
  const { setSelectedSubjectCode } = useSearchStore((s) => s);

  const onFind = (subjectCode: string) => {
    setSelectedSubjectCode(subjectCode);
    setTab("tab2");
  };

  return (
    <div className="flex w-full flex-col gap-2 overflow-x-auto">
      <Input
        allowClear
        onChange={(e) => searchGenEd(e.target.value)}
        size="large"
        placeholder={LocalsSwip("ค้นหา", "Search")}
      />
      <div className="w-full overflow-x-auto">
        <Table
        className="min-w-[80rem]"
          dataSource={genTemp}
          columns={
            [
              {
                title: LocalsSwip("รหัสวิชา", "Subject Code"),
                dataIndex: "subjectCode",
                key: "subjectCode",
              },
              {
                title: LocalsSwip("กลุ่มสาระ", "Subject Group"),
                dataIndex: "subjectGroup",
                key: "subjectGroup",
              },
              {
                title: LocalsSwip("ชื่อวิชา", "Subject Name"),
                dataIndex: "subjectName",
                render: (_, text) => (
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    dangerouslySetInnerHTML={{ __html: text.subjectName }}
                  ></div>
                ),
                filterMode: "tree",
                filterSearch: true,
                onFilter: (value: string, record) =>
                  record.subjectName.includes(value),
              },
              {
                title: LocalsSwip("หน่วยกิต", "Credits"),
                dataIndex: "subjectCredits",
                key: "subjectCredits",
              },
              {
                title: LocalsSwip("คณะ", "Faculty"),
                dataIndex: "subjectFaculty",
                key: "subjectFaculty",
              },
              {
                title: "action",
                dataIndex: "action",
                key: "action",
                render: (_, text) => (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onFind(text.subjectCode)}
                      type="primary"
                    >
                      {LocalsSwip("ค้นหา", "Search")}
                    </Button>
                  </div>
                ),
              },
            ] as ColumnsType<GenEdServiceResponseInterface>
          }
          scroll={{ y: 500 }}
        />
      </div>
    </div>
  );
};

export default GeneralEducation;
