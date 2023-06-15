export interface GenEdApiResponseInterface {
    dataResponse: DataResponse[]
  }
  
  export interface DataResponse {
    dataSubset: DataSubset[]
    dataTimestamp: string
    responseMetaSet: ResponseMetaSet
  }
  
  export interface DataSubset {
    dataset: Dataset
    requestId: string
    isCompare: boolean
    jobRequestUrl: any[]
    isTotals: boolean
    legolasInfo: LegolasInfo
    viewTags: ViewTags
  }
  
  export interface Dataset {
    tableDataset: TableDataset
  }
  
  export interface TableDataset {
    columnInfo: ColumnInfo[]
    totalCount: number
    column: Column[]
    size: number
    metadata: Metadata
  }
  
  export interface ColumnInfo {
    ns: string
    name: string
  }
  
  export interface Column {
    nullIndex: any[]
    doubleColumn?: DoubleColumn
    stringColumn?: StringColumn
  }
  
  export interface DoubleColumn {
    values: number[]
  }
  
  export interface StringColumn {
    values: string[]
  }
  
  export interface Metadata {
    columnMetadata: ColumnMetadaum[]
  }
  
  export interface ColumnMetadaum {
    imageContainsDynamicData: boolean
  }
  
  export interface LegolasInfo {
    slotType: number
  }
  
  export interface ViewTags {
    compareIndex: number
    role: string
  }
  
  export interface ResponseMetaSet {
    responseMetas: ResponseMeta[]
  }
  
  export interface ResponseMeta {
    origin: number
    mappingId: MappingId
  }
  
  export interface MappingId {
    datasourceId: string
  }
  