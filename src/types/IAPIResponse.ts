export interface IAPIResponse<T> {
    statusCode: number
    status: boolean
    message: string
    content: T
}
