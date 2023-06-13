import { NextPage } from "next";
import SearchBar from "./SearchBar";
import ListSubjects from "./ListSubjects";
import MenuBar from "./MenuBar";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import useLocalsSwip from "@/hooks/useLocalsSwip";
import useFilterStore from "@/stores/useFilterStore";
import { DaysMap } from "@/utils/daysMap";
import { sectionTypeMap } from "@/utils/sectionTypeMap";
import { sectionStudentTypeMap } from "@/utils/sectionStudentTypeMap";

interface Props {}

const ShopSubject: NextPage<Props> = () => {
  const { LocalsSwip } = useLocalsSwip();
  const {
    sectionDay,
    addDay,
    removeDay,
    sectionType,
    addSectionType,
    removeSectionType,
    sectionStudentType,
    addSectionStudentType,
    removeSectionStudentType,
  } = useFilterStore((s) => s);
  return (
    <div className="flex flex-col ">
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-base-100 py-5">
        <MenuBar />
        <SearchBar />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-grow flex-col">
          <ListSubjects />
        </div>
        <div className="sticky top-[9rem] h-fit w-fit">
          <Paper variant="outlined" sx={{ width: "fit-content" }}>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Typography variant="caption">
                  {LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
                </Typography>
                <FormGroup>
                  {sectionStudentTypeMap.map((type, id) => (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          checked={sectionStudentType.includes(type.key as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addSectionStudentType(type.key as any);
                            } else {
                              removeSectionStudentType(type.key as any);
                            }
                          }}
                        />
                      }
                      label={LocalsSwip(type.th, type.en)}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="caption">
                  {LocalsSwip("ประเภทภาคเรียน", "Section Student Type")}
                </Typography>
                <FormGroup>
                  {sectionTypeMap.map((type, id) => (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          checked={sectionType.includes(type.key as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addSectionType(type.key as any);
                            } else {
                              removeSectionType(type.key as any);
                            }
                          }}
                        />
                      }
                      label={LocalsSwip(type.th, type.en)}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="caption">
                  {LocalsSwip("วันที่เรียน", "Day")}
                </Typography>
                <FormGroup>
                  {DaysMap.map((day, id) => (
                    <FormControlLabel
                      key={id}
                      control={
                        <Checkbox
                          checked={sectionDay.includes(day.key as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addDay(day.key as any);
                            } else {
                              removeDay(day.key as any);
                            }
                          }}
                        />
                      }
                      label={LocalsSwip(day.th, day.en)}
                    />
                  ))}
                </FormGroup>
              </div>
            </CardContent>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ShopSubject;
