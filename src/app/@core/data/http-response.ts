export interface ServerHTTPResponse<T> {
    message: string,
    result: T,
    success: boolean
}