const CourseDateSeparate = (date: string) => {
  try {
    let isError = false;
    const result = date.split(",").map((schedule) => {
      const day = schedule.split("  ")[0];
      const time_form = schedule.split("  ")[1]?.split("-")[0]?.trim();
      const time_to = schedule.split("  ")[1]?.split("-")[1]?.trim();

      if ((day && day?.length > 3) || !time_form || !time_to) {
        isError = true;
      }

      return {
        day_w: day,
        time_form: time_form,
        time_to: time_to,
      };
    });

    if (isError) return []

    return result;
  } catch (error) {
    return [];
  }
};

export default CourseDateSeparate;
