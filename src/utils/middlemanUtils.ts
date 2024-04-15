import {Customer, Supplier} from "../../types/types";

export const calculateUnitMatrix = (customers:Customer[], suppliers:Supplier[])=>{

    console.log(customers[0].suppliers[suppliers[0].name]);
    for(let i=0; i<customers.length; i++){
        for(let j=0; j<suppliers.length;j++)
        {
            customers[i].suppliers[suppliers[j].name] = customers[i].sellingPrice - suppliers[j].purchasePrice - customers[i].suppliers[suppliers[j].name];
        }
    }
}