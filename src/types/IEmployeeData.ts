export interface IEmployeeData {
    first_name: string
    last_name: string
    email: string,
    gender: "male" | "female" | "other"
    salary: number
}

export interface ISaveableEmployeeData extends IEmployeeData {
    _id: string
    __v: number
}
