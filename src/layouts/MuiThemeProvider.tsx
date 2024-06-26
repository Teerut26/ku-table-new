import useCSSVariableToCSSHexCode from "@/hooks/useCSSVariableToCSSHexCode";
import { ThemeProvider, createTheme } from "@mui/material";
import { NextPage } from "next";
import { useTheme } from "next-themes";
interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider: NextPage<Props> = ({ children }) => {
  const { theme: NextTheme } = useTheme();
  const hexB1 = useCSSVariableToCSSHexCode("--b1");
  const hexB2 = useCSSVariableToCSSHexCode("--b2");
  const hexP = useCSSVariableToCSSHexCode("--p");
  const hexBC = useCSSVariableToCSSHexCode("--bc");
  const hexError = useCSSVariableToCSSHexCode("--er");

  if (!hexB1 || !hexP || !hexBC) return <></>;

  const theme = createTheme({
    palette: {
      primary: {
        main: hexP,
      },
      text: {
        primary: hexBC,
        secondary: hexBC,
      },
      background: {
        default: hexB1,
        paper: hexB1,
      },
      mode: [
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
        ? "dark"
        : "light",
    },
    shape: {
      borderRadius: 5,
    },
    typography: {
        fontFamily: 'Noto Sans Thai',
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
