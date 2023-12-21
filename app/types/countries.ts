export interface Country {
    _id: string
    iso: string
    lang: string
    name: string
    node: string
    variable?:string
    variableData?:string
    flag?: string
    data?: string
    update?:string
}

export interface BreadcrumbItem {
    name: string | null
    index?: number | null
}

export interface Tag {
    input: string | null
    option: string | null
    index: number | null
}

export interface TooltipData{
    variable?:string
      variableData?:string
      flag?: string
      data?: string
      countryName: string
      update?: string
  }