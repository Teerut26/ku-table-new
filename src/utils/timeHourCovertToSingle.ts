const timeHourCovertToSingle = (time: string) => {
  const hour = parseInt(time.split(":")[0]!);
  const minute = parseInt(time.split(":")[1]!);
  const timeString = `${hour}:${minute === 0 ? "00" : "30"}`;
  return timeString;
};

export default timeHourCovertToSingle;
