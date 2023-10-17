

import React, { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {
  // Stan aplikacji
  const [status, setStatus] = useState('off'); // Możliwe wartości: 'off', 'work', 'rest'
  const [time, setTime] = useState(0); // Czas w sekundach
  const [timer, setTimer] = useState(null); // Interval

  // Funkcja formatująca czas w formacie mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = secondsPart < 10 ? `0${secondsPart}` : secondsPart;
    return `${formattedMinutes}:${formattedSeconds}`;
  }; 
 
// Użycie useMemo do zoptymalizowania formatowania czasu
const formattedTime = useMemo(() => formatTime(time), [time]);
const startTimer = () => {
  setTime(2); // 20 minut
  setStatus('work');
  setTimer(
    setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setStatus((prevStatus) => {
            if (prevStatus === 'work') {
              setTime(3); // 20 sekund
              playBell(); // Odtwarzaj dźwięk gongu
              return 'rest';
            } else {
              setTime(4); // 20 minut
              playBell(); // Odtwarzaj dźwięk gongu
              return 'work';
            }
          });
        }
      });
    }, 1000)
  );
};


  
  // Funkcja zatrzymująca odmierzanie czasu
  const stopTimer = () => {
    if (timer !== null) {
     clearInterval(timer);
     setTimer(null);
    }
    setStatus('off');
    setTime(0);
  };
      // Funkcja obsługująca zamknięcie aplikacji
    const closeApp = () => {
      window.close();
    };

    // Funkcja obsługująca odtwarzanie dźwięku
    const playBell = () => {
      const bell = new Audio('./sounds/bell.wav');
      bell.play();
    };

  // Funkcja obsługująca zmianę stanu na 'work' (praca)
  const startWork = () => {
    setStatus('work');
    setTime(0);
    startTimer();
  };

  // Funkcja obsługująca zmianę stanu na 'rest' (przerwa)
  const startRest = () => {
    setStatus('rest');
    setTime(0);
    startTimer();
  };

  // Funkcja obsługująca zmianę stanu na 'off' (wyłączenie)
  const turnOff = () => {
    setStatus('off');
    setTime(0);
    stopTimer();
  };

  // Ustawienie odpowiedniego tekstu i akcji w zależności od statusu
  let buttonText, buttonAction;
  if (status === 'off') {
    buttonText = 'Start';
    buttonAction = startWork;
  } else if (status === 'work') {
    buttonText = 'Stop';
    buttonAction = startWork;
  } else {
    buttonText = 'Stop';
    buttonAction = turnOff;
  }

  // Renderowanie komponentu
  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      {status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
      { status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));



// //Funkcja rozpoczynająca timer
// const startTimer = () => {
//   setStatus('work');
//   setTime(5); // 20 minut
//   setTimer(
//     setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime > 0) {
//           return prevTime - 1;
//         } else {
//           // Zmiana statusu i restart czasu
//           if (status === 'work') {
//             setStatus('rest');
//             setTime(20); // 20 sekund
//             playBell(); // Odtwarzaj dźwięk gongu
//           } else {
//             setStatus('rest');
//             setTime(2); // 20 minut
//             //playBell(); // Odtwarzaj dźwięk gongu
//           } 
//           return time;
//         }
//       });
//     }, 1000)
//   );
// };