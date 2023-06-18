export interface ClasseInterface {
  classId: string
  nameTh: string
  nameEn: string
  label: string
  category: string
  hours: string
  unit: number
  numberQuestion: number
  numberRecap: number
  numberReviewer: number
  stats: Stats
}

export interface Stats {
  how: number
  homework: number
  interest: number
  updateAt: string
}
