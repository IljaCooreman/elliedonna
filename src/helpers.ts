import { addDays, startOfToday } from 'date-fns'

export const calculateDaysToShow = (amountOfDays = 10) => {
    const today = startOfToday();
    return  [...Array(amountOfDays).keys()].map((i) => {
        return addDays(today, i)
    })
}