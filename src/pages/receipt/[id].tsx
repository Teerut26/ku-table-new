import { Course } from "@/interfaces/GroupCourseResponseInterface";
import calculateCredits from "@/utils/calculateCredits";
import axios from "axios";
import { format } from "date-fns";
import { NextPageContext } from "next";
import _ from "lodash";
import Barcode from "react-barcode";

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
    <div id="capture" className="receiptContainer flex w-[25rem] flex-col thermal-receipt">
      <div className="flex flex-col items-center">
        <div>*****************************************</div>
        <div className="text-2xl thermal-receipt">Receipt</div>
        <div>*****************************************</div>
      </div>
      <div className="thermal-receipt">ORDER #0001 FOR {props.major}</div>
      <div className="thermal-receipt">{format(new Date(), "EEEE, LLLL d, u")}</div>
      <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="thermal-receipt">QTY</div>
          <div className="thermal-receipt">Item</div>
        </div>
        {hasCredit && <div className="thermal-receipt">Credit</div>}
      </div>
      <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
      <div className="my-3 flex flex-col">
        {courseData.map((course, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-2">
              <div className="min-w-[35px] thermal-receipt">{String(index + 1).padStart(2, "0")}</div>
              <div className={hasCredit ? "max-w-[16rem]" : "w-full"}>
                <div className="flex flex-col">
                  <div className="font-medium thermal-receipt">{course.subject_code}</div>
                  <div className="thermal-receipt">{course.subject_name_en}</div>
                </div>
              </div>
            </div>
            <div className="thermal-receipt">{course.max_credit}</div>
          </div>
        ))}
      </div>
      <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="thermal-receipt">Item Count</div>
          <div className="thermal-receipt">{courseData.length}</div>
        </div>
        {hasCredit && (
          <div className="flex justify-between">
            <div className="thermal-receipt">Total Credit</div>
            <div className="thermal-receipt">{calculateCredits(props.courseData)}</div>
          </div>
        )}
      </div>
      <div className="my-2 w-full border-b-2 border-dashed border-black"></div>
      <div className="flex flex-col items-center justify-center whitespace-nowrap text-base-content">
        <div className="flex w-full flex-col items-center justify-center px-5">
          <div className="uppercase thermal-receipt">Thank you for visiting!!</div>
          <img src="/barcode.svg" />
          <div>kugetreg.teerut.com</div>
        </div>
      </div>
    </div>
  );
}
