import Typography from '@material-ui/core/Typography';
import React from 'react';
import './App.css';
import Calendar from './components/Calendar';

const App: React.FC = () => {

  return (
    <div className="App">
        <Typography variant="h2" style={{flexBasis: '100%', textAlign: 'left'}}>
            Ellie en Donna
        </Typography>
        <Typography variant="body1" style={{maxWidth: '400px', textAlign: 'left', margin: '40px 40px 60px 40px'}}>
          Een tweeling ... dubbele liefde, vier handen tekort! <br /> <br />
            Wil je Leander en Annebel een handje helpen? Steek een lekkere maaltijd binnen!
            Laat weten via deze kalender wanneer je iets binnensteekt, zodat we elkaar niet voor de voeten lopen.
        </Typography>
      <Calendar />
    </div>
  );

}

export default App;
