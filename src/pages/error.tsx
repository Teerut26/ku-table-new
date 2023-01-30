import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const Error: NextPage<Props> = () => {
  const { query, back } = useRouter();
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center gap-3">
      {query.error}
      <button className="btn btn-primary btn-sm" onClick={() => back()}>กลับหน้าหลัก</button>
    </div>
  );
};

export default Error;
