import { GenEdApiResponseInterface } from "@/interfaces/GenEdApiResponseInterface";
import { SubjectGroupGenEdEnum } from "@/interfaces/SubjectGroupEnum";
import axios from "axios";
import { promises } from "fs";

export enum SourceFieldNameEnum {
  Order = "_n839027793_",
  Group = "_670128532_",
  SubjectCode = "_64743190_",
  Name = "_n2129458905_",
  Credits = "_n1312337171_",
  Faculty = "_n911244856_",
}

export interface GenEdServiceResponseInterface {
  subjectGroup: SubjectGroupGenEdEnum;
  subjectCode: string;
  subjectName: string;
  subjectCredits: string;
  subjectFaculty: string;
}

interface Props {
  stringValues: string;
}

const getGenEdService = async (props: Props) => {
  const sourceFieldName = /\d{8}/gm.test(props.stringValues) ? SourceFieldNameEnum.SubjectCode : SourceFieldNameEnum.Group;

  if (/\d{8}/gm.test(props.stringValues)) {
    const newStringValues = props.stringValues.split("-")[0] as string;
    props.stringValues = newStringValues.trim();
  }

  try {
    let data = JSON.stringify({
      dataRequest: [
        {
          requestContext: {
            reportContext: {
              reportId: "74b8fea7-c925-403d-b721-edb97425c69b",
              pageId: "p_hcamwexwzc",
              mode: 1,
              componentId: "cd-f9rdx0lfdd",
              displayType: "simple-table",
            },
            requestMode: 0,
          },
          datasetSpec: {
            dataset: [
              {
                datasourceId: "57af9804-f18a-4207-9afe-a2fd92757162",
                revisionNumber: 30,
                parameterOverrides: [],
              },
            ],
            queryFields: [
              {
                name: "qt_zf22vomfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Order,
                  aggregation: 0,
                },
              },
              {
                name: "qt_ddedx0lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.SubjectCode,
                },
              },
              {
                name: "qt_d5b8o1lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Name
                },
              },
              {
                name: "qt_npyen2lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Credits,
                },
              },
              {
                name: "qt_t08yw2lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Faculty,
                },
              },
              {
                name: "qt_viu1z2lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Group,
                },
              },
              {
                name: "qt_hub112lfdd",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: "_670128535_",
                },
              },
            ],
            sortData: [
              {
                sortColumn: {
                  name: "qt_zf22vomfdd",
                  datasetNs: "d0",
                  tableNs: "t0",
                  dataTransformation: {
                    sourceFieldName: SourceFieldNameEnum.Order,
                    aggregation: 0,
                  },
                },
                sortDir: 0,
              },
            ],
            includeRowsCount: true,
            relatedDimensionMask: {
              addDisplay: false,
              addUniqueId: false,
              addLatLong: false,
            },
            paginateInfo: {
              startRow: 1,
              rowsCount: 250,
            },
            filters: [],
            features: [],
            dateRanges: [],
            contextNsCount: 1,
            calculatedField: [],
            needGeocoding: false,
            geoFieldMask: [],
            multipleGeocodeFields: [],
          },
          role: "main",
          retryHints: {
            useClientControlledRetry: true,
            isLastRetry: false,
            retryCount: 0,
            originalRequestId: "cd-f9rdx0lfdd_0_0",
          },
        },
      ],
    });

    let res = await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://lookerstudio.google.com/embed/batchedDataV2",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });

    const resultRaw = (JSON.parse(res.data.replace(`)]}'`, "")) as GenEdApiResponseInterface).dataResponse[0]?.dataSubset[0]?.dataset.tableDataset.column || [];

    const result =
      resultRaw[5]?.stringColumn?.values.map((item: string, index) => ({
        subjectGroup: item,
        subjectCode: resultRaw[1]?.stringColumn?.values[index],
        subjectName: resultRaw[2]?.stringColumn?.values[index],
        subjectCredits: resultRaw[3]?.stringColumn?.values[index],
        subjectFaculty: resultRaw[4]?.stringColumn?.values[index],
      })) || [];
      

    return result as GenEdServiceResponseInterface[];
  } catch (error) {
    return [] as GenEdServiceResponseInterface[];
  }
};

export default getGenEdService;
