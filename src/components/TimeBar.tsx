import styled from "@emotion/styled";
import { NextPage } from "next";

interface Props {
  times: string[];
}

const TimeBar: NextPage<Props> = ({ times }) => {
  const Bar = styled.div`
    display: grid;
    grid-template-columns: repeat(${times.length * 2 + 2}, minmax(0, 1fr));
  `;
  return (
    <Bar>
      <div className="col-span-2 border border-base-content text-center text-xl">Day/Time</div>
      {times.map((time, index) => (
        <div key={index} className="col-span-2 border border-base-content pl-3 text-xl">
          {time}
        </div>
      ))}
    </Bar>
  );
};

export default TimeBar;
