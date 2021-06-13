
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React from 'react';
import { AppointmentInbound, AppointmentType } from '../models';
import {LocalDining, ChildCare} from '@material-ui/icons';
import { store } from '../store';
import { db } from '../Firestore';

interface IAppointmentInput {
  appointment: AppointmentInbound
}


const Appointment: React.FC<IAppointmentInput> = ({appointment}) => {
    const [open, setOpen] = React.useState(false);
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = async () => {
        db.collection('appointments').doc(appointment.id).delete()
    }
    return (
        <div>
        <Button fullWidth variant="outlined" onClick={handleClickOpen} style={{marginTop: '15px'}}>
            
            {appointment.type === AppointmentType.foodDelivery ? <LocalDining /> : <ChildCare />}
            {'  '}{appointment.volunteerName} - {appointment.timeslot}
        </Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
            {appointment.volunteerName}
            </div>
            <div>
            {appointment.description}
            </div>
            <div>
            {appointment.timeslot}
            </div>
          </DialogContentText>
      </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {
            appointment.userSessionId === store.userSessionId && (
            <Button onClick={handleRemove} variant="contained" color="secondary" >
                Remove
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Appointment;