import {Task} from '../../types/types'

export const findStartActivity = (tasks: Task[]) => {
    //wyszukanie zdarzenia, ktore wsytepuje jedynie jako poczatkowe w czynnosciach
        let result = {
            status: false,
            id: 0,
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

        switch(startActivity.length) {
            case 0:
                result = {
                    status: false,
                    id: 0,
                    error: 'Brak zdarzenia poczatkowego'
                }
                break
            case 1:
                result = {
                    status: true,
                    id: startActivity[0],
                    error: ''
                }
                break
            default:
                result = {
                    status: false,
                    id: 0,
                    error: 'Istnieje wiecej niz jedno zdarzenie poczatkowe'
                }
        }

        return result
}

export const findEndActivity = () => {
    //wyszukanie zdarzenia, ktore wsytepuje jedynie jako koncowe w czynnosciach

    //jesli istnieje - zwracamy true, jesli nie zwracamy false

    //sprawdzenie czy istnieje weicej niz jedno takie zdarzenie 

    //jesli nie - zwracamy true, jesli tak zwracmy blad
}