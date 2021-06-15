import { addDays, startOfToday } from 'date-fns'
import { db } from './Firestore';

export const calculateDaysToShow = (amountOfDays = 10) => {
    const today = startOfToday();
    return  [...Array(amountOfDays).keys()].map((i) => {
        return addDays(today, i)
    })
}

export interface EmailValues {
    to: string | string[],
    subject: string,
    text: string,
    html: string,
}

export const sendMail = ({to, subject, text, html}: EmailValues) => {
    db.collection('mail').add({
  to,
  message: {
    subject,
    text,
    html,
  }
}).then(() => {console.log('email queued for delivery')})
}