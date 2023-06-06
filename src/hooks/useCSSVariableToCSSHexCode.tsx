import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const useCSSVariableToCSSHexCode = (variableName: string) => {
  const [cssHexCode, setCSSHexCode] = useState("");
  const { theme: NextTheme } = useTheme();
  const [Key, setKey] = useState(0);

  const hslToHex = (hsl: any) => {
    const [h, s, l] = hsl.split(" ").map(parseFloat);
    const hslToRgb = (h: any, s: any, l: any) => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;

      let r, g, b;

      if (h >= 0 && h < 60) {
        [r, g, b] = [c, x, 0];
      } else if (h >= 60 && h < 120) {
        [r, g, b] = [x, c, 0];
      } else if (h >= 120 && h < 180) {
        [r, g, b] = [0, c, x];
      } else if (h >= 180 && h < 240) {
        [r, g, b] = [0, x, c];
      } else if (h >= 240 && h < 300) {
        [r, g, b] = [x, 0, c];
      } else {
        [r, g, b] = [c, 0, x];
      }

      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
      ];
    };

    const [r, g, b] = hslToRgb(h, s / 100, l / 100);
    const rgbToHex = (r: any, g: any, b: any) =>
      `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    const hexCode = rgbToHex(r, g, b);

    return hexCode;
  };

  useEffect(() => {
    const computedStyles = getComputedStyle(document.documentElement);
    const variableValue = computedStyles.getPropertyValue(variableName).trim();
    setCSSHexCode(hslToHex(variableValue));
  }, [Key]);

  useEffect(() => {
    setKey((pre) => pre + 1);
  }, [NextTheme]);

  return cssHexCode;
};

export default useCSSVariableToCSSHexCode;
