import { format } from 'date-fns';
import React from 'react';
import {AppointmentInbound } from '../models';
import Appointment from './Appointment';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import styled from 'styled-components';
import nlLocale from 'date-fns/locale/nl-BE/index.js'

interface IDayInteractionBox {
  day: Date,
  isOpen: boolean,
  appointments: AppointmentInbound[]
}

const DayInteractionBox: React.FC<IDayInteractionBox> = ({day, isOpen, appointments}) => {
  return (
    <DayBox>
        <Day>{format(day, 'EEEE dd MMMM', {locale: nlLocale})}</Day>
        {
          appointments.sort((a, b) => a.timeslot < b.timeslot ? -1 : 1).map((appointment, i) => {
            return (
              <Appointment key={i} appointment={appointment} />
            )
          })
        }
        {isOpen && <CreateAppointmentDialog day={day} />}
    </DayBox>
  );
}

export default DayInteractionBox;

const DayBox = styled.div`
  padding: 15px;
  margin: 5px;
  border-radius: 25px;
  border: 5px solid #efefef;
  background: white;
  min-width: 160px;
  max-width: 200px;
  min-height: 100px;
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

const Day = styled.div`
  text-align: left;
`