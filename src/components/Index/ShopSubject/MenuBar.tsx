import ChangeLanguage from "@/components/ChangeLanguage";
import { NextPage } from "next";
import Cart from "./Cart";

interface Props {}

const MenuBar: NextPage<Props> = () => {
  return (
    <div className="flex justify-end gap-2">
      <ChangeLanguage />
      <Cart />
    </div>
  );
};

export default MenuBar;
