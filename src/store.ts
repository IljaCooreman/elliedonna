import { action, computed, runInAction } from 'mobx'
import { makeAutoObservable } from "mobx"
import { QuerySnapshot } from '@firebase/firestore-types'
import { db } from './Firestore';
import { AppointmentInbound, DaysWithAppointments } from './models';
import { calculateDaysToShow } from './helpers';
import { isSameDay } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';


class Store {
    appointments: AppointmentInbound[] = []
    days: any[] = []
    daysToShow: Date[] = []
    timeslots: string[] = [
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
    ]
    userSessionId = '';

    constructor() {
        makeAutoObservable(this);
        this.daysToShow = calculateDaysToShow();
        this.fetchAppointments();
        this.fetchDays();
        this.userSessionId = this.getUserSessionId();
        

    }

    getUserSessionId = () => {
        const fromLocalStorage = localStorage.getItem("userSessionId");
        if (!fromLocalStorage) {
            const newId = uuidv4();
            localStorage.setItem('userSessionId', newId)
            return newId;
        }
        return fromLocalStorage;
    }

    @action
    async fetchAppointments() {
        const appointmentsRef = db.collection("appointments");
        runInAction(() => {

            appointmentsRef.onSnapshot((appointmentsSnapshot: QuerySnapshot<any>) => {

                const appointments: AppointmentInbound[] = []
                appointmentsSnapshot.forEach(element => {
                    appointments.push({...element.data(), id: element.id})
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

                const days: AppointmentInbound[] = []
                daysSnapshot.forEach(element => {
                    days.push(element.data())
                });
                return this.days = days;
                })

        })
    }

    @computed
    get daysWithAppointments(): DaysWithAppointments[] {
        console.log('running computed stuff')
        return this.daysToShow.map(date => {
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
