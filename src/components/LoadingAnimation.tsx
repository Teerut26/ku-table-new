import { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "@emotion/styled";

import content1 from '@/json/lf20_xtwyqv2j.json';
import content2 from '@/json/mdwuubBA9C.json';

interface Props {}

const Container = styled.div``

const LoadingAnimation: NextPage<Props> = () => {
  return (
    <Container className="absolute z-50 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <Player
          autoplay
          loop
          src={Math.random() > 0.5 ? content1 : content2}
          style={{ height: "200px", width: "200px" }}
        />
        <div className="text-xl font-bold">Loading...</div>
      </div>
    </Container>
  );
};

export default LoadingAnimation;
