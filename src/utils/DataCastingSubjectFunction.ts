const DataCastingSubjectFunction = (subject: any) => {
  return {
    subjectCode: subject.subjectCode,
    subjectName: subject.subjectName,
    subjectCredits: subject.subjectCredits,
  };
};

export default DataCastingSubjectFunction;
