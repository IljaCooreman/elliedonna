import { getDate } from 'date-fns';
import React from 'react';
import { Appointment } from '../models';
import CreateAppointmentDialog from './CreateAppointmentDialog';

interface IDayInteractionBox {
  day: Date,
  isOpen: boolean,
  appointments: Appointment[]
}

const DayInteractionBox: React.FC<IDayInteractionBox> = ({day, isOpen, appointments}) => {
  console.log(appointments)
  return (
    <div>
        {getDate(day)}
        {
          appointments.map(appointment => {
            return (
              <div>{appointment.volunteerName}</div>
            )
          })
        }
        <CreateAppointmentDialog day={day} />
    </div>
  );
}

export default DayInteractionBox;