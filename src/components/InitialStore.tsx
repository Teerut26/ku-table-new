import useGenEdStore from "@/stores/useGenEdStore";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {}

const InitialStore: NextPage<Props> = () => {
  const { setGenEd } = useGenEdStore((s) => s);
  const GenEdApi = api.subject.getGenEd.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (GenEdApi.data) {
      setGenEd(GenEdApi.data);
    }
  }, [GenEdApi.data]);

  return <></>;
};

export default InitialStore;
