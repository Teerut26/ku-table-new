import useLocalsSwip from "@/hooks/useLocalsSwip";
import useGenEdStore from "@/stores/useGenEdStore";
import { NextPage } from "next";
import _ from "lodash";
import GeneralEducationSection from "./GeneralEducationSection";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";

interface Props {}

const GeneralEducation: NextPage<Props> = () => {
  const { genTemp, searchGenEd } = useGenEdStore((s) => s);
  const { LocalsSwip } = useLocalsSwip();

  return (
    <div className="flex w-full flex-col gap-2 overflow-x-auto">
      <div className="mt-3 flex justify-center">
        <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-base-300 px-3 py-2">
          <Icon icon="material-symbols:search" className="text-2xl text-base-content/50" />
          <input onChange={(e) => searchGenEd(e.target.value)} type="text" className="w-full bg-transparent text-lg focus:outline-none " placeholder={LocalsSwip("ค้นหา", "Search")} />
        </div>
        {/* <Input allowClear className="w-fit" onChange={(e) => searchGenEd(e.target.value)} size="large" placeholder={LocalsSwip("ค้นหา", "Search")} /> */}
      </div>
      <div className="flex flex-col">
        <AnimatePresence key={genTemp.length.toString()}>
          {Object.keys(_.groupBy(genTemp, (item) => item.subjectGroup)).map((item, index) => (
            <GeneralEducationSection groupName={item} index={index} key={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeneralEducation;
