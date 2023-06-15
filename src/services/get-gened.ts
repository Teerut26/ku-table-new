import { GenEdApiResponseInterface } from "@/interfaces/GenEdApiResponseInterface";
import axios from "axios";

export enum SourceFieldNameEnum {
  Order = "_n839027793_",
  Group = "_n60310654_",
  SubjectCode = "_64743190_",
  Name = "_n2129458905_",
  Credits = "_n1312337171_",
  Faculty = "_3563393_",
}

export interface GenEdServiceResponseInterface {
    subjectGroup: string;
    subjectCode: string;
    subjectName: string;
    subjectCredits: string;
    subjectFaculty: string;
}

interface Props {
  stringValues: string;
}

const getGenEdService = async (props: Props) => {
  const sourceFieldName = /\d{8}/gm.test(props.stringValues)
    ? SourceFieldNameEnum.SubjectCode
    : SourceFieldNameEnum.Group;

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
              componentId: "cd-3fvxhkxwzc",
              displayType: "simple-table",
              actionId: "crossFilters",
            },
            requestMode: 0,
          },
          datasetSpec: {
            dataset: [
              {
                datasourceId: "57af9804-f18a-4207-9afe-a2fd92757162",
                revisionNumber: 5,
                parameterOverrides: [],
              },
            ],
            queryFields: [
              {
                name: "qt_i39k79yq2c",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Group,
                },
              },
              {
                name: "qt_n39k79yq2c",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.SubjectCode,
                },
              },
              {
                name: "qt_s39k79yq2c",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Name,
                },
              },
              {
                name: "qt_pval79yq2c",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Credits,
                },
              },
              {
                name: "qt_uval79yq2c",
                datasetNs: "d0",
                tableNs: "t0",
                dataTransformation: {
                  sourceFieldName: SourceFieldNameEnum.Faculty,
                },
              },
            ],
            sortData: [
              {
                sortColumn: {
                  name: "qt_d39k79yq2c",
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
            filters: [
              {
                filterDefinition: {
                  filterExpression: {
                    include: true,
                    conceptType: 0,
                    concept: {
                      name: "qt_g3atnizq2c",
                      ns: "t0",
                    },
                    filterConditionType: "PT",
                    queryTimeTransformation: {
                      dataTransformation: {
                        sourceFieldName: sourceFieldName,
                      },
                    },
                    stringValues: [props.stringValues],
                  },
                },
                dataSubsetNs: {
                  datasetNs: "d0",
                  tableNs: "t0",
                  contextNs: "c0",
                },
                version: 3,
              },
            ],
            features: [],
            dateRanges: [],
            contextNsCount: 1,
            calculatedField: [],
            needGeocoding: false,
            geoFieldMask: [],
          },
          role: "main",
          retryHints: {
            useClientControlledRetry: true,
            isLastRetry: false,
            retryCount: 0,
            originalRequestId: "cd-3fvxhkxwzc_0_0",
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

    const resultRaw =
      (JSON.parse(res.data.replace(`)]}'`, "")) as GenEdApiResponseInterface)
        .dataResponse[0]?.dataSubset[0]?.dataset.tableDataset.column || [];

    const result =
      resultRaw[0]?.stringColumn?.values.map((item: string, index) => ({
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
