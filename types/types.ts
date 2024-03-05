export type Task = {
    id: string,
    time: number,
    startActivity: number
    endActivity: number
}

export type Activity = {
    id: number,
    ES: number,
    EF: number,
    R:number,
    connected: Task[]

}