import styled from "@emotion/styled";
import { NextPage } from "next";
import useTableStore from "./Table/store/useTableStore";

interface Props {
  times: string[];
}

const TimeBar: NextPage<Props> = ({ times }) => {
  const { imageBackground } = useTableStore((r) => r);
  const Bar = styled.div`
    display: grid;
    grid-template-columns: repeat(${times.length * 2 + 2}, minmax(0, 1fr));
  `;

  const Time = styled.div`
    border-right: 0.5px solid;
    border-top: 0.5px solid;
    border-bottom: 0.5px solid;
    background-color: hsl(var(--b2, var(--b1)) / ${imageBackground ? "var(--obg)" : "1"} );
  `;
  return (
    <Bar className="relative">
      <Time className="col-span-2 text-center text-xl">
        Day/Time
      </Time>
      {times.map((time, index) => (
        <Time key={index} className="col-span-2 pl-3 text-xl">
          {time}
        </Time>
      ))}
    </Bar>
  );
};

export default TimeBar;
