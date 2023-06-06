import useCSSVariableToCSSHexCode from "@/hooks/useCSSVariableToCSSHexCode";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const AntdTheme: NextPage<Props> = ({ children }) => {
  const { theme: NextTheme } = useTheme();
  const hexB3 = useCSSVariableToCSSHexCode("--b1");
  const hexP = useCSSVariableToCSSHexCode("--p");
  const hexBC = useCSSVariableToCSSHexCode("--bc");


  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorText: hexBC,
            colorPrimary: hexP,
            colorBgBase: hexB3,
          },
          algorithm: [
            "dark",
            "synthwave",
            "halloween",
            "forest",
            "black",
            "luxury",
            "dracula",
            "business",
            "night",
            "coffee",
          ].includes(NextTheme!)
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        }}
      >
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </>
  );
};

export default AntdTheme;
