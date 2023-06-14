import { NextPage } from "next";
import useTableStore from "./store/useTableStore";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Icon } from "@iconify/react";

interface Props {}

const ExpandData: NextPage<Props> = () => {
  const { handleExpand, expand } = useTableStore((r) => r);
  const { LocalsSwip } = useLocalsSwip();
  return (
    <div
      onClick={handleExpand}
      className="btn-outline btn-primary btn-sm btn gap-2"
    >
      {expand ? (
        <Icon icon="material-symbols:close-fullscreen" className="text-lg" />
      ) : (
        <Icon icon="material-symbols:open-in-full" className="text-lg" />
      )}
      {expand
        ? LocalsSwip("แบบย่อ", "Compact")
        : LocalsSwip("แบบขยาย", "Expand")}
    </div>
  );
};

export default ExpandData;
