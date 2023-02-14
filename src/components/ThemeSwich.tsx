import { NextComponentType } from "next";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useEffect } from "react";

interface Props {}

const listTheme = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const ThemeSwich: NextComponentType<Props> = () => {
  const { theme: themeCurrent, setTheme } = useTheme();

  const handleTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      window.umami(`change-theme-${theme}`);
    }
    setTheme(theme);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.umami(`initial-theme-${themeCurrent}`);
    }
  }, []);

  return (
    <div title="Change Theme" className="dropdown-end dropdown ">
      <div tabIndex={0} className="btn-ghost btn-sm btn gap-1 normal-case">
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>{" "}
        <span className="hidden md:inline">Theme</span>{" "}
        <svg
          width="12px"
          height="12px"
          className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>{" "}
      <div className="dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {listTheme.map((theme, idx) => (
            <div
              key={idx}
              onClick={() => handleTheme(theme)}
              className={clsx(
                "overflow-hidden rounded-lg outline-2 outline-offset-2 outline-base-content"
              )}
              data-set-theme={theme}
              data-act-class="outline"
            >
              <div
                data-theme={theme}
                className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                    <div className="flex-grow text-sm font-bold">
                      {theme === themeCurrent ? "✅" : ""} {theme}
                    </div>
                    <div className="flex flex-shrink-0 flex-wrap gap-1">
                      <div className="w-2 rounded bg-primary" />{" "}
                      <div className="w-2 rounded bg-secondary" />{" "}
                      <div className="w-2 rounded bg-accent" />{" "}
                      <div className="w-2 rounded bg-neutral" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwich;
