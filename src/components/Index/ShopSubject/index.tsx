import { NextPage } from "next";
import SearchBar from "./SearchBar";
import ListSubjects from "./ListSubjects";
import MenuBar from "./MenuBar";
import useFilterStore from "@/stores/useFilterStore";
import Filter from "./Filter";

interface Props {}

const ShopSubject: NextPage<Props> = () => {
  const {} = useFilterStore((r) => r);

  return (
    <div className="flex flex-col ">
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-base-100 py-5">
        <MenuBar />
        <SearchBar />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-grow flex-col">
          <ListSubjects />
        </div>
        <Filter />
      </div>
    </div>
  );
};

export default ShopSubject;
