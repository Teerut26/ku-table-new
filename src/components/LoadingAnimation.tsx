import { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "@emotion/styled";

import content1 from "@/json/lf20_xtwyqv2j.json";
import content2 from "@/json/mdwuubBA9C.json";

interface Props {}

const Container = styled.div``;

const LoadingAnimation: NextPage<Props> = () => {
  return (
    <Container className="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <Player
          autoplay
          loop
          //   src={Math.random() > 0.5 ? content1 : content2}
          src={content2}
          style={{ height: "200px", width: "200px" }}
        />
        <div className="text-xl font-bold">Loading...</div>
      </div>
    </Container>
  );
};

export default LoadingAnimation;
