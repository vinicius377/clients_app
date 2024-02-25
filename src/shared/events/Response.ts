export interface ResponseEvent<T> {
    status: 'success' | 'error',
    data: T | undefined
}