export interface ResponseProps<T>{
    data:T|null,
    error:string|null,
    message:string|null,
    success:boolean
}