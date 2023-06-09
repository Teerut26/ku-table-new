const TeacherSeparate = (teachers: string) => {
  try {
    return teachers.split(",");
  } catch (error) {
    return [];
  }
};

export default TeacherSeparate;
