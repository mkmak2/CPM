import {Activity, Task} from '../../types/types'
import cytoscape, {EdgeDataDefinition, NodeDataDefinition} from "cytoscape";


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

export const setDefaultActivityState = (activities: Activity[]): Activity[] => {
    activities.forEach(a => {
        a.isCritical = false;
        a.isEnd = false;
        a.isStart = false;
    })

    return activities
}

export const setEdgesActivities = (activities: Activity[], tasks: Task[]): Activity[] => {
    const {startId, endId} = findStartActivity(tasks)
    activities = setDefaultActivityState(activities)
    activities.forEach(a => {
        if(a.id === startId)
            a.isStart = true
        else if(a.id === endId)
            a.isEnd = true
    })
    return activities
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

export const calculateES = (activities: Activity[]): Activity[] => {
    const calculateESTime = (activity: Activity): number => {
        if (activity.id===1) {
            return 0;
        } else {
            return Math.max(
                ...activity.connected.map((task) =>
                    calculateESTime(
                        activities.find((act) => act.id === task.startActivity)!
                    ) + task.time
                )
            );
        }
    };

    const setESRecursive = (activity: Activity) => {
        activity.ES = calculateESTime(activity);
        activity.nextTasks.forEach((task) => {
            const nextActivity = activities.find(
                (act) => act.id === task.endActivity
            ) as Activity;
            setESRecursive(nextActivity);
        });
    };

    const startActivity = activities.find((act) => act.id===1)!
    setESRecursive(startActivity);

    return activities;
};
export const calculateEF = (activities: Activity[]): Activity[] => {
    const calculateEFTime = (activity: Activity):number => {
        if(activity.isEnd){
            return activity.ES;
        }
        else{
            return Math.min(
                ...activity.nextTasks.map((task)=>
                    calculateEFTime(
                        activities.find((act:Activity)=> act.id ===task.endActivity)!
                    ) - task.time
                )
            );
        }
    };

    const setEFRecursive = (activity: Activity) =>{
        activity.EF = calculateEFTime(activity);
        activity.connected.forEach((task:Task) =>{
            const prevActivity = activities.find((act)=>act.id === task.startActivity)!
            setEFRecursive(prevActivity);
        });
    };
    const startActivity = activities.find((act)=>act.isEnd)!;
    setEFRecursive(startActivity);
    return activities;

    return activities;
};

export const calculateCritical = ((activities :Activity[]) : Activity[] =>{

    activities = calculateES(activities);
    activities = calculateEF(activities);

    activities.forEach((activity) =>{
        activity.R = activity.EF - activity.ES;
        if(!activity.R){
            activity.isCritical=true;
        }
    })

    return activities;
})

export const calculateLF = ((activities :Activity[], tasks: Task[]) =>{

    for(let i=0; i<tasks.length; i++){
        tasks[i].LF = activities.find(activity => activity.id ===tasks[i].endActivity)?.EF!;
    }

    return tasks;
})

export const calculateLS = ((activities: Activity[], tasks: Task[]) =>{

    for(let i=0; i<tasks.length; i++){
        tasks[i].LS = tasks[i].LF - tasks[i].time;
    }

    return tasks;

})

export const calculateTaskES = ((activities: Activity[], tasks: Task[])=>{

    for(let i=0; i<tasks.length; i++){
        tasks[i].ES = activities.find(activity =>
            activity.id === tasks[i].startActivity)?.ES!;

    }


    return tasks;
})

export const calculateTaskEF = ((activities:Activity[], tasks:Task[])=>{

    for(let i=0; i<tasks.length; i++)
    {
        tasks[i].EF = tasks[i].ES + tasks[i].time;
    }

    return tasks;

})

export const calculateTaskR = ((tasks:Task[])=>{

    for(let i=0; i<tasks.length; i++){
        tasks[i].R = tasks[i].LS - tasks[i].ES;
    }

    return tasks;
})

export const calculateTasks = ((activity:Activity[], tasks:Task[])=>{
    calculateLF(activity, tasks);
    calculateLS(activity,tasks);
    calculateTaskES(activity,tasks);
    calculateTaskEF(activity,tasks);
    calculateTaskR(tasks);

    return tasks;
})

export const graph = (activities:Activity[], tasks: Task[])=>{
    const nodes = activities.map(activity => ({
        data: {
            id: activity.id.toString(),
            values: `${activity.id}\n${activity.ES}      ${activity.EF}\n${activity.R}`,
            r: activity.R
        }
    }));

    const edges = tasks.map(task => ({
        data: {
            source: task.startActivity.toString(),
            target: task.endActivity.toString(),
            label: `${task.id}${task.time}`,
            r: task.R
        }
    }));

    let cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [
            ...nodes,
            ...edges
        ],
        style: [
            {
                selector: 'node',

                style: {
                    'background-color' : 'white',
                    'border-width': '2px',
                    'border-color': 'black',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'text-wrap': 'wrap',
                    label: 'data(values)',
                    width: '100px',
                    height: '100px',
                    'text-margin-y': 0,
                    'text-margin-x': 0,
                    'font-size': '20px',
                    'color': 'black',

                }
            },
            {
              selector: 'node[r = 0]',
              style: {
                  'background-color': '#c8e6c9',
              }
            },


            {
                selector: 'edge',
                style: {
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'width': 2,
                    'label': 'data(label)',
                    'text-rotation': 'autorotate',
                    'text-margin-y': -20,
                    'text-margin-x': 10
                }
            },
            {
                selector: 'edge[r = 0]',
                style : {
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    'color' : 'red'
                }
            },
        ],
        layout: {
            name: 'grid',
        },
        wheelSensitivity: 0,
        zoom: 0.1,
        userPanningEnabled: false
    });

    return cy;
}
