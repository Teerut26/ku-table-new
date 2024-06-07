import { Course } from "@/interfaces/GroupCourseResponseInterface";
import calculateCredits from "@/utils/calculateCredits";
import axios from "axios";
import { format } from "date-fns";
import { NextPageContext } from "next";
import _ from "lodash";

export async function getServerSideProps(context: NextPageContext) {
  const result = await axios.get(`${process.env.NEXTAUTH_URL}/api/screenshot/${context.query.id}`);
  const { screenType, lang, theme, major, courseData, isExpand } = result.data as any;

  return {
    props: {
      screenType,
      lang,
      theme,
      major,
      isExpand,
      courseData: courseData ? JSON.parse(courseData as string) : ([] as Course[]),
    },
  };
}

interface Props {
  screenType: string;
  lang: string;
  theme: string;
  major: string;
  isExpand: boolean;
  courseData: Course[];
}

export default function Receipt(props: Props) {
  const courseData = _.uniqBy(props.courseData, (x) => x.subject_code + x.max_credit);

const hasCredit = courseData.some((course) => course.max_credit);

  return (
    <div id="capture" className="receiptContainer flex w-[25rem] flex-col">
      <div className="flex flex-col items-center">
        <div>*****************************************</div>
        <div className="text-2xl">Receipt</div>
        <div>*****************************************</div>
      </div>
      <div>ORDER #0001 FOR {props.major}</div>
      <div>{format(new Date(), "EEEE, LLLL d, u")}</div>
      <div className="border-b-2 border-dashed w-full border-black my-2"></div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div>QTY</div>
          <div>Item</div>
        </div>
        {hasCredit && <div>Credit</div>}
      </div>
      <div className="border-b-2 border-dashed w-full border-black my-2"></div>
      <div className="my-3 flex flex-col">
        {courseData.map((course, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-2">
              <div className="min-w-[35px]">{String(index+1).padStart(2, '0')}</div>
              <div className={hasCredit ? "max-w-[16rem]" : "w-full"}>{course.subject_name_en}</div>
            </div>
            <div>{course.max_credit}</div>
          </div>
        ))}
      </div>
      <div className="border-b-2 border-dashed w-full border-black my-2"></div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div>Item Count</div>
          <div>{courseData.length}</div>
        </div>
        {hasCredit && (
          <div className="flex justify-between">
            <div>Total Credit</div>
            <div>{calculateCredits(props.courseData)}</div>
          </div>
        )}
      </div>
      <div className="border-b-2 border-dashed w-full border-black my-2"></div>
      <div className="text-2xl text-center">Thank you</div>
      <div className="text-center">Generate By kugetreg.teerut.com</div>
    </div>
  );
}
