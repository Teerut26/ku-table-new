import { NextPage } from "next";
import SearchBar from "./SearchBar";
import ListSubjects from "./ListSubjects";
import MenuBar from "./MenuBar";
import Filter from "./Filter";
import CourseRecommend from "./CourseRecommend";

interface Props { }

const ShopSubject: NextPage<Props> = () => {

    return (
        <div className="flex flex-col ">
            <div className="sticky top-[2.5rem] z-20 flex flex-col gap-3 bg-base-100 py-5">
                <MenuBar />
                <SearchBar />
            </div>
            {/* <div className="sticky top-[2.5rem] z-10 flex flex-col gap-3 bg-base-100 pb-5">
                <CourseRecommend />
            </div> */}

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
