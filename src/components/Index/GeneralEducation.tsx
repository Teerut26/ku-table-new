import useLocalsSwip from "@/hooks/useLocalsSwip";
import useGenEdStore from "@/stores/useGenEdStore";
import { NextPage } from "next";
import _ from "lodash";
import GeneralEducationSection from "./GeneralEducationSection";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

interface Props {}

const GeneralEducation: NextPage<Props> = () => {
  const [search, setSearch] = useState("");
  const { LocalsSwip } = useLocalsSwip();
  const { genEd } = useGenEdStore();
  const [genEdTemp, setGenEdTemp] = useState<typeof genEd>([]);

  const searchGenEd = (search: string) => {
    const fuse = new Fuse(genEd, {
      keys: ["subjectCode", "subjectName", "subjectGroup", "subjectFaculty"],
    });

    setGenEdTemp(fuse.search(search).map((item) => item.item));
  };

  const clearSearch = () => {
    setSearch("");
  };

  useEffect(() => {
    if (search.length > 0) {
      searchGenEd(search);
    } else {
      setGenEdTemp(genEd);
    }
  }, [genEd, search]);

  return (
    <div className="flex w-full flex-col gap-2 overflow-x-auto">
      <div className="mt-3 flex justify-center">
        <div className="flex w-full max-w-md items-center gap-2 rounded-full border px-3 py-2">
          <div className="flex-1">
            <Icon icon="material-symbols:search" className="text-2xl text-base-content/50" />
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-full bg-transparent text-lg focus:outline-none " placeholder={LocalsSwip("ค้นหา", "Search")} />
          {search.length > 0 && (
            <button onClick={clearSearch}>
              <Icon icon="material-symbols:close" className="text-2xl text-base-content/50" />
            </button>
          )}
        </div>
      </div>
      {search.length > 0 && (
        <div>
          {genEdTemp.length.toLocaleString("th-TH")} {LocalsSwip("ผลการค้นหา", "Search Result")}
        </div>
      )}
      <div className="flex flex-col">
        <AnimatePresence key={genEdTemp.length.toString()}>
          {Object.keys(_.groupBy(genEdTemp, (item) => item.subjectGroup)).map((item, index) => (
            <GeneralEducationSection genTemp={genEdTemp} groupName={item} index={index} key={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeneralEducation;
