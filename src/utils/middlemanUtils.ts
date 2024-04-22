import {Customer, Supplier} from "../../types/types";

export const calculateUnitMatrix = (customers:Customer[], suppliers:Supplier[])=>{

    let array: number[][] = Array.from({ length: customers.length+1 }, () =>
        Array.from({ length: suppliers.length +1 }, () => 0)
    );

    for(let i=0; i<customers.length; i++){
        for(let j=0; j<suppliers.length;j++)
        {
            array[i][j]=customers[i].sellingPrice - suppliers[j].purchasePrice - customers[i].suppliers[suppliers[j].name];
            customers[i].suppliers[suppliers[j].name] = customers[i].sellingPrice - suppliers[j].purchasePrice - customers[i].suppliers[suppliers[j].name];

        }
    }

    let DF = 0;
    let OF = 0;

    for(let i=0; i<customers.length; i++){
        DF+=customers[i].demand;
    }

    for(let i=0; i<suppliers.length; i++){
        OF+=suppliers[i].supply;
    }

    let maxindex = [customers.length+1];
    maxindex[customers.length] = 0;
    for(let i=0; i<customers.length; i++){
        let max = customers[i].suppliers[suppliers[0].name];
        maxindex[i]=0;
        for(let j=0; j<suppliers.length;j++)
        {
            if(array[i][j]>max)
            {
                console.log(j);
                max=customers[i].suppliers[suppliers[j].name];
                maxindex[i] = j;
            }
        }

        for(let i=0; i<customers.length; i++){
            for(let j=maxindex[i]; j<suppliers.length;j++)
            {

                if(customers[i].demand<=suppliers[j].supply)
                {
                    array[i][j] = customers[i].demand;
                    customers[i].demand-=array[i][j];
                    suppliers[j].supply-=array[i][j];
                    console.log("Odbiorca: ", i)
                    console.log("Odbiorca, popyt", i , " ", customers[i].demand);
                    console.log("Dostawca: ", j)
                    console.log("Dostawca, podaż: ", j, " ", suppliers[j].supply);
                    break;
                }
                else if (customers[i].demand>suppliers[j].supply)
                {
                    array[i][j] = customers[i].demand;
                    customers[i].demand-=array[i][j];
                    suppliers[j].supply=0;
                    console.log("Odbiorca: ", i)
                    console.log("Odbiorca, popyt", i , " ", customers[i].demand);
                    console.log("Dostawca: ", j)
                    console.log("Dostawca, podaż: ", j, " ", suppliers[j].supply);
                }

            }
        }

    }
    console.log(array);
    return array;
}