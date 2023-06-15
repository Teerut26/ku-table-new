import { OpenSubjectForEnrollInterface } from "@/interfaces/OpenSubjectForEnrollInterface";

const CourseDateSeparate = (
  date: string,
  subject?: OpenSubjectForEnrollInterface
) => {
  try {
    let isError = false;
    let result = date.split(",").map((schedule) => {
      const day = schedule.split("  ")[0];
      const time_from = schedule.split("  ")[1]?.split("-")[0]?.trim();
      const time_to = schedule.split("  ")[1]?.split("-")[1]?.trim();

      if ((day && day?.length > 3) || !time_from || !time_to) {
        isError = true;
      }

      return {
        day_w: day,
        time_from: time_from,
        time_to: time_to,
      };
    });

    let newResult = result.map((r) => ({
      ...r,
      subject:subject
    }));

    if (isError) return [];

    return newResult;
  } catch (error) {
    return [];
  }
};

export default CourseDateSeparate;
