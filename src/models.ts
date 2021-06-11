import firebase from 'firebase';

export enum AppointmentType {
    visit = "visit",
    foodDelivery = "foodDelivery"
}

export interface Appointment {
    volunteerName: string,
    type: AppointmentType 
    day: firebase.firestore.Timestamp, // => TODO this is wrong!
    description: string

}

export interface DaysWithAppointments {
    day: Date,
    isOpen: boolean,
    appointments: Appointment[],
}