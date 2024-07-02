import { Button, CircularProgress, IconButton, ListItemButton } from "@mui/material";
import { NextPage } from "next";
import useSearchStore from "./store/useSearchStore";
import { Icon } from "@iconify/react";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/utils/api";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import useFilterStore from "@/stores/useFilterStore";
interface Props {}

const SearchBar: NextPage<Props> = () => {
  const { setSelectedSubjectCode, setKeyword: setKeyword2, keyword: keyword2 } = useSearchStore((r) => r);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = React.useState(false);
  const SearchApi = api.subject.search.useMutation();
  const { LocalsSwip } = useLocalsSwip();
  const { setShowFilterDesktop, setShowFilterMobile, showFilterDesktop } = useFilterStore((r) => r);

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (keyword.length === 0) {
      setOpen(false);
      SearchApi.reset();
    }
    const timer = setTimeout(() => {
      if (keyword === "") return;
      SearchApi.mutate(keyword);
      setKeyword2(keyword);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword]);

  useMemo(() => {
    setKeyword(keyword2);
  }, [keyword2]);

  return (
    <div className="flex gap-2">
      <div
        onBlur={(e) => {
          const currentTarget = e.currentTarget;
          setTimeout(() => {
            if (document.activeElement && !currentTarget.contains(document.activeElement)) {
              setOpen(false);
            }
          }, 0);
        }}
        onFocus={() => setOpen(true)}
        className="relative flex h-[55px] w-full items-center gap-2 rounded-md border px-5"
      >
        <div className="flex-1">
          <Icon icon="material-symbols:search" className="text-2xl text-base-content/50" />
        </div>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" className="w-full bg-transparent text-lg focus:outline-none " placeholder={LocalsSwip("รหัสวิชา / ชื่อวิชา", "Subject Code / Subject Name")} />
        {keyword.length > 0 && (
          <div className="mr-0 md:mr-10">
            <IconButton onClick={clearKeyword} className="mr-10">
              <Icon icon="material-symbols:close" className="text-2xl text-base-content/50" />
            </IconButton>
          </div>
        )}
        {keyword.length > 0 &&
          open &&
          (SearchApi.isLoading ? (
            <div className={"absolute left-0 right-0 top-0 max-h-[40vh] translate-y-[3.8rem] overflow-y-auto rounded-md border bg-base-100 shadow-md"}>
              <div className="flex justify-center p-5">
                <div className="flex flex-col items-center justify-center gap-2">
                  <CircularProgress
                    sx={{
                      animationDuration: "550ms",
                    }}
                    size={24}
                  />
                  {LocalsSwip("กําลังค้นหา...", "Searching...")}
                </div>
              </div>
            </div>
          ) : (
            <>
              {SearchApi.isSuccess && (
                <div className={"absolute left-0 right-0 top-0 max-h-[40vh] translate-y-[3.8rem] overflow-y-auto rounded-md border bg-base-100 shadow-md"}>
                  {(SearchApi.data?.subjects.length ?? 0) > 0 ? (
                    <>
                      {SearchApi.data?.subjects.map((option, index) => (
                        <ListItemButton
                          key={index}
                          onClick={() => {
                            setSelectedSubjectCode(option.subjectCode);
                            setOpen(false);
                          }}
                        >
                          <div className="flex flex-col border-l-2 border-base-content pl-3 text-base-content hover:border-primary hover:text-primary">
                            <div>{option.subjectCode}</div>
                            <div>{option.subjectNameTh}</div>
                            <div>{option.subjectNameEn}</div>
                          </div>
                        </ListItemButton>
                      ))}
                    </>
                  ) : (
                    <div className="flex justify-center p-5">ไม่พบผลการค้นหา</div>
                  )}
                </div>
              )}
            </>
          ))}
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          setShowFilterDesktop(!showFilterDesktop);
          setShowFilterMobile(!showFilterDesktop);
        }}
      >
        <Icon icon="ic:outline-filter-list" className="text-xl" />
      </Button>
    </div>
  );
};
export default SearchBar;
