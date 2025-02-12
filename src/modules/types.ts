export type T_Resistor = {
    id: string
    name: string
    description: string
    resistance: number
    image: string
    status: number
    count?: string
}

export type T_Calculation = {
    id: string | null
    status: E_CalculationStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    resistors: T_Resistor[]
    voltage: string
    current: string
    qr: string
}

export enum E_CalculationStatus {
    NotSpecified="Не указан",
    Draft="Черновик",
    InWork="В работе",
    Completed="Завершен",
    Rejected="Отклонен",
    Deleted="Удален"
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_CalculationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_CalculationStatus
    owner: string
}

export type T_ResistorsListResponse = {
    resistors: T_Resistor[],
    draft_calculation_id?: number,
    resistors_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_ResistorAddData = {
    name: string;
    description: string;
    resistance: number;
    image?: File | null;
}