import {
    findStartActivity,
    setDefaultActivityState,
    setEdgesActivities
} from '../utils/utils'
import { 
    manyEndActivities, 
    manyStartActivities,
    correctDataset,
    testActivities 
} from "../testDatasets"

describe('Testing datasets correctness:', () => {

    it('Testing dataset with more than one end activity', () => {
        const result = findStartActivity(manyEndActivities)

        expect(result.status).toBe(false)
        expect(result.error).toBe('Istneiej wiecej niz jedno zdarzenie koncowe')
    })

    it('Testing dataset with more than one start activity', () => {
        const result = findStartActivity(manyStartActivities)

        expect(result.status).toBe(false)
        expect(result.error).toBe('Istnieje wiecej niz jedno zdarzenie poczatkowe')

    })

    it('Testing correct dataset with only one end and start activity', () => {
        const result = findStartActivity(correctDataset)

        expect(result.status).toBe(true)
        expect(result.error).toMatch('')
        expect(result.startId).toBeGreaterThan(0)
        expect(result.endId).toBeGreaterThan(0)

    })
})

describe('Testing activities state manipulation:', () => {

    const activities = testActivities

    it('Testing initial activities dataset', () => {
        const edgesActivities = activities.filter(a => a.isStart || a.isEnd)
        const criticalActivities = activities.filter(a => a.isCritical)
        expect(edgesActivities.length).toBe(2)
        expect(criticalActivities.length).toBeGreaterThan(0)
    })

    it('Setting default activities state', () => {
        const defaultActivities = setDefaultActivityState(activities)
        defaultActivities.forEach(a => {
            expect(a.isCritical).toBeFalsy
            expect(a.isStart).toBeFalsy
            expect(a.isEnd).toBeFalsy
        })
    })

    //Najpierw dodac testTasks dataset odpoweidni do naszego testActivities datasetu
    // it('Setting edges activities', () => {
    //     const defaultActivities = setDefaultActivityState(activities)
    //     const updatedActivities = setEdgesActivities(defaultActivities)
    // })
})
