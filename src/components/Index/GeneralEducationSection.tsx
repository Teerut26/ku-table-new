import useGenEdStore from "@/stores/useGenEdStore";
import useSearchStore from "./ShopSubject/store/useSearchStore";
import useTapStore from "@/stores/useTabStore";
import _ from "lodash";
import { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface Props {
  groupName: string;
  index: number;
}

export default function GeneralEducationSection(props: Props) {
  const { genTemp } = useGenEdStore((s) => s);
  const { setSelectedSubjectCode } = useSearchStore((s) => s);
  const { setTab } = useTapStore((s) => s);
  const [isCollapse, setIsCollapse] = useState(true);

  const onFind = (subjectCode: string) => {
    setSelectedSubjectCode(subjectCode);
    window.scrollTo(0, 0);
    setTab("tab2");
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 mt-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-xl">{props.groupName}</div>
        <IconButton onClick={handleCollapse}>{isCollapse ? <Icon icon="material-symbols:keyboard-arrow-up" className="text-3xl" /> : <Icon icon="material-symbols:keyboard-arrow-down" className="text-3xl" />}</IconButton>
      </div>
      <Collapse in={isCollapse}>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.values(_.groupBy(genTemp, (item) => item.subjectGroup))[props.index]?.map((item2, index2) => (
            <div className="flex cursor-pointer flex-col rounded-lg border p-3 hover:bg-base-200" key={index2} onClick={() => onFind(item2.subjectCode)}>
              <div>{item2.subjectCode}</div>
              <div className="line-clamp-1 text-lg">{item2.subjectName.split(" (")[0]}</div>
              <div className="line-clamp-1 font-normal">{item2.subjectName.split(" (")[1]?.replace(")", "")}</div>
              <div className="flex gap-2 items-center mt-2">
                <Icon icon="material-symbols:flag" />
                <div className="line-clamp-1 text-sm">{item2.subjectFaculty}</div>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </motion.div>
  );
}
