import ChangeLanguage from "@/components/ChangeLanguage";
import { NextPage } from "next";
import Cart from "./Cart";
import useFilterStore from "@/stores/useFilterStore";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Typography } from "@mui/material";

interface Props {}

const MenuBar: NextPage<Props> = () => {
  const { result } = useFilterStore((r) => r);
  const { LocalsSwip } = useLocalsSwip();
  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-1 items-center">
        <Typography variant="h6" component="div">
          {result}
        </Typography>
        {LocalsSwip("ผลลัพธ์", "results")}
      </div>
      <div className="flex gap-2">
        <ChangeLanguage />
        <Cart />
      </div>
    </div>
  );
};

export default MenuBar;
