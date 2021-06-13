import React from 'react';
import styled from 'styled-components';
import { store } from '../store';
import DayInteractionBox from './DayInteractionBox';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react-lite';
import Typography from '@material-ui/core/Typography';

interface ICalendar {

}

const Calendar: React.FC<ICalendar> = observer(() => {
    console.log(store.daysWithAppointments[0])
  return (
    <CalendarBox>
        <Typography variant="h2" style={{flexBasis: '100%', textAlign: 'left'}}>
            Maaltijd kalender
        </Typography>
      {
        store.daysWithAppointments.map(dwa => {
          return (
            <DayInteractionBox key={uuidv4()} {...dwa} />
          )
        })
      }
    </CalendarBox>
  );
})

export default Calendar;

const CalendarBox = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    margin: 10px;
`