import { action, computed, runInAction } from 'mobx'
import { makeAutoObservable } from "mobx"
import { QuerySnapshot } from '@firebase/firestore-types'
import { db } from './Firestore';
import { Appointment, DaysWithAppointments } from './models';
import { calculateDaysToShow } from './helpers';
import { isSameDay } from 'date-fns'


class Store {
    appointments: Appointment[] = []
    days: any[] = []
    daysToShow: Date[] = []

    constructor() {
        makeAutoObservable(this);
        this.daysToShow = calculateDaysToShow();
        this.fetchAppointments();
        this.fetchDays();
    }

    @action
    async fetchAppointments() {
        const appointmentsRef = db.collection("appointments");
        runInAction(() => {

            appointmentsRef.onSnapshot((appointmentsSnapshot: QuerySnapshot<any>) => {

                const appointments: Appointment[] = []
                appointmentsSnapshot.forEach(element => {
                    appointments.push(element.data())
                });
                return this.appointments = appointments;
                })

        })
    }
    @action
    async fetchDays() {
        const daysRef = db.collection("days");
        runInAction(() => {

            daysRef.onSnapshot((daysSnapshot: QuerySnapshot<any>) => {

                const days: Appointment[] = []
                daysSnapshot.forEach(element => {
                    days.push(element.data())
                });
                return this.days = days;
                })

        })
    }

    @computed
    get daysWithAppointments(): DaysWithAppointments[] {
        return this.daysToShow.map(date => {
            console.log(this.appointments)
            const appointments = this.appointments.filter(appointment => isSameDay(new Date(appointment.day.seconds * 1000), date))
            return {
                appointments,
                day: date,
                isOpen: true
            }
        })
    }

    // @computed
    // get currentEvent() {
    //     return this.events
    //     .filter((event) => isAfter(event.eventDate, new Date()))[0] // only dates in the future
    // }

}

export const store = new Store()
