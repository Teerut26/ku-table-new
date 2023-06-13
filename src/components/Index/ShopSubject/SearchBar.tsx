import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemText,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { NextPage } from "next";
import useSearchStore from "./store/useSearchStore";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { api } from "@/utils/api";
import { SearchSubjectOpenEnrResponseInterface } from "@/interfaces/SearchSubjectOpenEnrResponseInterface";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import useFilterStore from "@/stores/useFilterStore";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface Props {}

const SearchBar: NextPage<Props> = () => {
  const { keyword, setKeyword, clearKeyword, setSelectedSubjectCode } =
    useSearchStore((r) => r);
  const [open, setOpen] = React.useState(false);
  const SearchApi = api.subject.search.useMutation();
  const { LocalsSwip } = useLocalsSwip();
  const { setShowFilterDesktop, setShowFilterMobile,showFilterDesktop } = useFilterStore(
    (r) => r
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword === "") return;
      SearchApi.mutate(keyword);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword]);

  const filterOptions = createFilterOptions({
    stringify: (option: SearchSubjectOpenEnrResponseInterface) => {
      return `${option.subjectCode} ${option.subjectNameTh} ${option.subjectNameEn}`;
    },
    limit: 20,
  });

  return (
    <div className="flex gap-2">
      <Autocomplete
        sx={{ width: "100%" }}
        open={open}
        filterOptions={filterOptions}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={
          SearchApi.data?.subjects && SearchApi.data?.subjects.length > 0
            ? SearchApi.data?.subjects
            : []
        }
        renderOption={(props, option) => (
          <ListItemButton
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
        )}
        loading={SearchApi.isLoading}
        renderInput={(params) => (
          <TextField
            placeholder={LocalsSwip(
              "รหัสวิชา / ชื่อวิชา",
              "Subject Code / Subject Name"
            )}
            {...params}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment:
                keyword.length > 0 ? (
                  <IconButton onClick={clearKeyword} aria-label="delete">
                    <Icon icon="material-symbols:close" className="text-xl" />
                  </IconButton>
                ) : (
                  <IconButton onClick={clearKeyword} aria-label="delete">
                    <Icon
                      icon="material-symbols:search-rounded"
                      className="text-xl"
                    />
                  </IconButton>
                ),
            }}
          />
        )}
      />
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
