import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { Appointment } from '../models';
import { db } from '../Firestore';
import firebase from 'firebase';
import { format} from 'date-fns';
import nlLocale from 'date-fns/locale/nl-BE/index.js';
import { store } from '../store';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';


interface ICreateAppointmentDialog {
  day: Date
}

const CreateAppointmentDialog: React.FC<ICreateAppointmentDialog> = observer(({day}) => {
  const [open, setOpen] = React.useState(false);
  const [volunteerName, setVolunteerName] = React.useState('');
  const [description, seDescription] = React.useState('');
  const [timeslot, setTimeslot] = React.useState(store.timeslots[0]);
  // const [appointmentType, setAppointmentType] = React.useState(AppointmentType.foodDelivery);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    const appointment: Appointment = {
      volunteerName,
      // type: appointmentType,
      description,
      day: firebase.firestore.Timestamp.fromDate(new Date(day)),
      timeslot,
      userSessionId: store.userSessionId,
    }
    db.collection('appointments').add(appointment)
    .then(() => {
      setOpen(false)
    })
  }

  return (
    <Wrapper>
      <Button variant="outlined"  style={{marginTop: '25px'}} color="primary" onClick={handleClickOpen}>
        Reserveer
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reserveer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              {format(day, 'EEEE MMM do', {locale: nlLocale})}
            </div>
            <div>
              Laat jouw info achter
            </div>
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="volunteerName"
            label="naam"
            type="text"
            fullWidth
            value={volunteerName}
            onChange={e => {setVolunteerName(e.target.value)}}
          />

          <TextField
            margin="dense"
            id="description"
            label="beschrijving"
            type="text"
            fullWidth
            value={description}
            onChange={e => {seDescription(e.target.value)}}
          />

        <InputLabel style={{marginTop: '30px'}} id="demo-simple-select-label">tijdsslot</InputLabel>
        <Select
          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeslot}
          onChange={(e) => {setTimeslot(e.target.value as string)}}
          fullWidth
          >
          {store.timeslots.map(timeslot => {
            return (
              <MenuItem key={timeslot} value={timeslot}>{timeslot}</MenuItem>
              )
            })}
        </Select>

        {/* <FormLabel style={{marginTop: '30px'}} component="legend">type afspraak</FormLabel>
        <RadioGroup aria-label="type" name="type" value={appointmentType} onChange={(e) => {setAppointmentType(e.target.value as any as AppointmentType)}}>
          <FormControlLabel value={AppointmentType.foodDelivery} control={<Radio />} label="eten brengen" />
          <FormControlLabel value={AppointmentType.visit} control={<Radio />} label="bezoek" />
        </RadioGroup> */}
      </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Verstuur
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
})

export default CreateAppointmentDialog;

const Wrapper = styled.div`
  
`