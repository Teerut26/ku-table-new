import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Course } from "@/interfaces/GroupCourseResponseInterface";
import useTableStore from "../Table/store/useTableStore";
import CourseCardMobile from "./CourseCardMobile";
import clsx from "clsx";
import { css } from "@emotion/css";
import { useSession } from "next-auth/react";
import { ForwardRefExoticComponent, RefAttributes, forwardRef } from "react";

interface Props extends RefAttributes<HTMLDivElement> {
  courseDatas: Course[];
  isCapture?: boolean;
}

const CourseCardMobileList: ForwardRefExoticComponent<Props> = forwardRef<HTMLDivElement,Props>(({ courseDatas, isCapture = true, ...props }, ref) => {

  const { imageBackground, opacity } = useTableStore((r) => r);
  const { data: session } = useSession();
  const { LocalsSwip } = useLocalsSwip();
  
  return (
    <>
      <div ref={ref} className="mx-auto min-w-[40rem] bg-base-100">
        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden py-2 px-5">
          {isCapture && (
            <div className="z-10 text-lg font-bold">
              {session?.user?.email?.user.student.majorCode} -{" "}
              {LocalsSwip(
                session?.user?.email?.user.student.majorNameTh!,
                session?.user?.email?.user.student.majorNameEn!
              )}
            </div>
          )}

          <div
            className={clsx(
              "relative grid w-full grid-cols-2 gap-2",
              imageBackground && "p-5"
            )}
          >
            {imageBackground && (
              <>
                <img
                  src={imageBackground}
                  className={clsx(
                    css`
                      background-image: url(${imageBackground});
                      background-position: center;
                      background-size: cover;
                      background-repeat: no-repeat;
                      position: absolute;
                      height: 100%;
                      width: 100%;
                      object-fit: cover;
                      opacity: ${imageBackground ? opacity : "0.5"};
                    `
                  )}
                  alt=""
                />
              </>
            )}
            {courseDatas.map((course, index) => (
              <CourseCardMobile course={course} key={index} />
            ))}
          </div>
          {isCapture && (
            <div className="z-10 flex gap-2 whitespace-nowrap text-lg text-base-content">
              <div>Generate by :</div>
              <div className="font-bold">ku-table2.vercel.app</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default CourseCardMobileList;
