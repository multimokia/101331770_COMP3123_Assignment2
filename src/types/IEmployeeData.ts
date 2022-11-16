export interface IEmployeeData {
    _id: string
    __v: number
    first_name: string
    last_name: string
    email: string,
    gender: "male" | "female" | "other"
    salary: number
}
