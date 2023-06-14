import styled from "@emotion/styled";
import { NextPage } from "next";

interface Props {
  times: string[];
}

const VerticalLine: NextPage<Props> = ({ times }) => {
  const Bar = styled.div`
    display: grid;
    grid-template-columns: repeat(${times.length * 2 + 2}, minmax(0, 1fr));
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  `;

  const Time = styled.div`
    border-right: 0.5px solid;
    border-color: hsl(var(--bc) / 0.3);
  `;
  return (
    <Bar className="relative">
      {times.map((time, index) => (
        <Time key={index} className="col-span-2 pl-3 text-xl">
         
        </Time>
      ))}
    </Bar>
  );
};

export default VerticalLine;
