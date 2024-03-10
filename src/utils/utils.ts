import {Activity, Task} from '../../types/types'

export const findStartActivity = (tasks: Task[]) => {
    //wyszukanie zdarzenia, ktore wsytepuje jedynie jako poczatkowe w czynnosciach
        let result = {
            status: false,
            startId: 0,
            endId: 0,
            error: ''
        }
        //pobranie wszytskich indeksow zdarzen
        const startIds: number[] = []
        const endIds: number[] = []
        tasks.forEach(t => {
            if(!startIds.includes(t.startActivity))
                startIds.push(t.startActivity)
            if(!endIds.includes(t.endActivity))
                endIds.push(t.endActivity)
        })

        const startActivity = startIds.filter(a => !endIds.includes(a))
        const endActivity = endIds.filter(a => !startIds.includes(a))

        switch(startActivity.length) {
            case 0:
                result = {
                    status: false,
                    startId: 0,
                    endId: 0,
                    error: 'Brak zdarzenia poczatkowego'
                }
                break
            case 1:
                result = {
                    status: true,
                    startId: startActivity[0],
                    endId: 0,
                    error: ''
                }
                break
            default:
                result = {
                    status: false,
                    startId: 0,
                    endId: 0,
                    error: 'Istnieje wiecej niz jedno zdarzenie poczatkowe'
                }
        }

        if(!result.status)
            return result

        switch(endActivity.length) {
            case 0:
                result = {
                    status: false,
                    startId: 0,
                    endId: 0,
                    error: 'Brak zdarzenia poczatkowego'
                }
                break
            case 1:
                result = {
                    status: true,
                    startId: startActivity[0],
                    endId: endActivity[0],
                    error: ''
                }
                break
            default:
                result = {
                    status: false,
                    startId: 0,
                    endId: 0,
                    error: 'Istneiej wiecej niz jedno zdarzenie koncowe'
                }
        }

        return result
}

export const isDuplicate = (tasks: Task[], task: Task):boolean =>{
    let result=false;
    tasks.forEach((value)=>{
        if(task.startActivity===value.startActivity && task.endActivity===value.endActivity ||
        task.startActivity===value.endActivity && task.endActivity===value.startActivity){
            result = true;
        }
        return;

    })

    return result;
}

export const calculateES = (activities: Activity[]):Activity[]=>{

    activities.forEach((value)=>{
        if(value.id===1){
            value.ES=0
            value.EF=0;
        }
        else
        {
            value.ES = 0;
            for(let i=0; i<value.connected.length; i++) {
                let max = activities[value.connected[i].startActivity - 1].ES + value.connected[i].time;
                value.ES = Math.max(value.ES, max);
            }
        }


    })
    return activities;
}