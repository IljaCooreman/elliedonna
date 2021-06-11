import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { store } from './store';
import DayInteractionBox from './components/DayInteractionBox';

const App: React.FC = observer(() => {

  return (
    <div className="App">
      {
        store.daysWithAppointments.map(dwa => {
          return (
            <DayInteractionBox {...dwa} />
          )
        })
      }
    </div>
  );

})

export default App;
