import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Appointment, AppointmentType } from '../models';
import { db } from '../Firestore';
import firebase from 'firebase';


interface ICreateAppointmentDialog {
  day: Date
}

const CreateAppointmentDialog: React.FC<ICreateAppointmentDialog> = ({day}) => {
  const [open, setOpen] = React.useState(false);
  const [volunteerName, setVolunteerName] = React.useState('');
  const [description, seDescription] = React.useState('');
  const [appointmentType, setAppointmentType] = React.useState(AppointmentType.foodDelivery);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    const appointment: Appointment = {
      volunteerName,
      type: appointmentType,
      description,
      day: firebase.firestore.Timestamp.fromDate(new Date(day))
    }
    db.collection('appointments').add(appointment)
    .then(() => {
      setOpen(false)
    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Reserveer
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reserveer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Laat jouw info achter
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="volunteerName"
            label="naam"
            type="text"
            fullWidth
            value={volunteerName}
            onChange={e => {setVolunteerName(e.currentTarget.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="beschrijving"
            type="text"
            fullWidth
            value={description}
            onChange={e => {seDescription(e.currentTarget.value)}}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={appointmentType} onChange={(e) => {setAppointmentType(e.currentTarget.value as any as AppointmentType)}}>
              <FormControlLabel value={AppointmentType.foodDelivery} control={<Radio />} label="eten brengen" />
              <FormControlLabel value={AppointmentType.visit} control={<Radio />} label="bezoek" />
            </RadioGroup>
          </FormControl>
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
    </div>
  );
}

export default CreateAppointmentDialog;