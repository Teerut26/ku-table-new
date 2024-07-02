import useGenEdStore from "@/stores/useGenEdStore";
import useSearchStore from "./ShopSubject/store/useSearchStore";
import useTapStore from "@/stores/useTabStore";
import _ from "lodash";
import { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { GenEdServiceResponseInterface } from "@/services/get-gened";

interface Props {
  groupName: string;
  index: number;
  genTemp: GenEdServiceResponseInterface[];
}

export default function GeneralEducationSection(props: Props) {
  const { setSelectedSubjectCode , setKeyword} = useSearchStore((s) => s);
  const { setTab } = useTapStore((s) => s);
  const [isCollapse, setIsCollapse] = useState(true);

  const onFind = (subjectCode: string) => {
    setSelectedSubjectCode(subjectCode);
    setKeyword(subjectCode);
    window.scrollTo(0, 0);
    setTab("tab2");
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 mt-3 flex flex-col gap2">
      <div className="flex items-center justify-between">
        <div className="text-xl">{props.groupName}</div>
        <IconButton onClick={handleCollapse}>{isCollapse ? <Icon icon="material-symbols:keyboard-arrow-up" className="text-3xl" /> : <Icon icon="material-symbols:keyboard-arrow-down" className="text-3xl" />}</IconButton>
      </div>
      <Collapse in={isCollapse}>
        <div className="mt-2 grid grid-cols-1 gap-3 lg:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.values(_.groupBy(props.genTemp, (item) => item.subjectGroup))[props.index]?.map((item2, index2) => (
            <div className="flex cursor-pointer flex-col rounded-lg border p-3 hover:bg-base-200" key={index2} onClick={() => onFind(item2.subjectCode)}>
              <div className="flex items-center justify-between">
                <div>{item2.subjectCode}</div>
                <div className="text-xs font-light">หนวยกิต {item2.subjectCredits.split("(")[0]}</div>
              </div>
              <div className="line-clamp-1 text-lg leading-6">{item2.subjectName.split(" (")[0]}</div>
              <div className="line-clamp-1 font-light">{item2.subjectName.split(" (")[1]?.replace(")", "")}</div>
              <div className="mt-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5 21V4h9l.4 2H20v10h-7l-.4-2H7v7z" />
                </svg>
                <div className="line-clamp-1 text-sm font-light">{item2.subjectFaculty}</div>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </motion.div>
  );
}
