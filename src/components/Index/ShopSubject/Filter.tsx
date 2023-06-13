import useLocalsSwip from "@/hooks/useLocalsSwip";
import useFilterStore from "@/stores/useFilterStore";
import { convertKeyToColor } from "@/utils/colorsMap";
import { DaysMap } from "@/utils/daysMap";
import { sectionStudentTypeMap } from "@/utils/sectionStudentTypeMap";
import { sectionTypeMap } from "@/utils/sectionTypeMap";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { Modal } from "antd";
import { NextPage } from "next";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ChipDayProps {
  day_w?: string;
}

const FormControlLabelColor = styled(FormControlLabel)<ChipDayProps>`
  color: ${({ day_w }) => (day_w ? convertKeyToColor(day_w)?.textHex : "gray")};
`;

interface Props {}

const Filter: NextPage<Props> = () => {
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
    showFilterDesktop,
    showFilterMobile,
    setShowFilterDesktop,
    setShowFilterMobile,
    expandAll,
    setExpandAll,
  } = useFilterStore((s) => s);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setShowFilterDesktop(!isMobile);
  }, [isMobile]);

  return (
    <div>
      {showFilterDesktop && !isMobile && (
        <div className="sticky top-[9rem] h-fit w-fit">
          <Paper
            variant="outlined"
            sx={{ width: "fit-content" }}
            className={css`
              overflow: auto;
              max-height: calc((100vh - 8rem) - 24px);
              padding: 1rem;
            `}
          >
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Typography variant="caption">
                  {LocalsSwip("ขยายทั้งหมด", "Expand All")}
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={expandAll}
                        onChange={(e) => {
                          setExpandAll(e.target.checked);
                        }}
                      />
                    }
                    label={LocalsSwip("ขยายทั้งหมด", "Expand")}
                  />
                </FormGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="caption">
                  {LocalsSwip("ประเภทภาคเรียน", "Section Student Type")}
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
                  {LocalsSwip("ประเภทหมู่เรียน", "Section Type")}
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
                    <FormControlLabelColor
                      day_w={day.key}
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
      )}

      <Modal
        open={isMobile ? showFilterMobile : false}
        footer={[]}
        onCancel={() => {
          setShowFilterDesktop(false);
          setShowFilterMobile(false);
        }}
      >
        <CardContent className="flex flex-wrap justify-between gap-5">
          <div className="flex flex-col gap-2">
            <Typography variant="caption">
              {LocalsSwip("ขยายทั้งหมด", "Expand All")}
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={expandAll}
                    onChange={(e) => {
                      setExpandAll(e.target.checked);
                    }}
                  />
                }
                label={LocalsSwip("ขยายทั้งหมด", "Expand")}
              />
            </FormGroup>
          </div>
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
                <FormControlLabelColor
                  day_w={day.key}
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
      </Modal>
    </div>
  );
};

export default Filter;
