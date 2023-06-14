import { NextPage } from "next";
import useTableStore from "./store/useTableStore";
import useLocalsSwip from "@/hooks/useLocalsSwip";

interface Props {}

const ExpandData: NextPage<Props> = () => {
  const { handleExpand, expand } = useTableStore((r) => r);
  const { LocalsSwip } = useLocalsSwip();
  return (
    <div
      onClick={handleExpand}
      className="btn-outline btn-primary btn-sm btn gap-2"
    >
      {expand
        ? LocalsSwip("แบบย่อ", "Compact")
        : LocalsSwip("แบบขยาย", "Expand")}
    </div>
  );
};

export default ExpandData;
