export type Task = {
    id: string,
    time: number,
    startActivity: number
    endActivity: number
    ES:number;
    EF:number;
    LS:number;
    LF:number;
    R: number;
}

export type Activity = {
    id: number,
    ES: number,
    EF: number,
    R:number,
    connected: Task[];
    nextTasks:Task[];
    isStart:boolean;
    isEnd:boolean;
    isCritical:boolean;
}

export type Customer = {
    name:string;
    demand: number;
    sellingPrice:number;
    suppliers: {[name:string]:number};
}

export type Supplier = {
    name:string;
    supply:number;
    purchasePrice:number;

}

export type Calculations = {
    x:boolean;
    unitCost :number;
    value:number;
}