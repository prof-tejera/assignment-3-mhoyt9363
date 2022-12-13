import React, { useEffect, useState } from 'react';
import getTotTime from '../../utils/getTotTime';
import { useInterval } from './useInterval';
import usePersistedState from './usePersistedState';
import createHistoryItem from '../../utils/createHistoryItem';
import updateURL from '../../utils/useUpdateURL';

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {

  const [paused, setPaused] = usePersistedState('paused', true);
  const [time, setTime] = usePersistedState('time', 0);
  const [complete, setComplete] = usePersistedState('complete', false);
  const [totTime, setTotTime] = usePersistedState('totTime', 0);
  const [wkoutHistory, setWkoutHistory] = usePersistedState('hist', []);
  const [queue, setQueue] = usePersistedState('queue', []);

  const [url, setUrl] = useState( {
    pathname: window.location.pathname,
    origin: window.location.origin,
    wkout: '',
  }  );

  // used to check for a starting url, runs once
  useEffect(() => {

    // I still need to figure out how to load a timer queue on window load
    console.log('in use effect, url q', url, queue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    updateURL(url, queue);
 
  }, [ url, queue ]);
  
  useInterval(() => {
    // confirm total time of workout
    setTotTime(getTotTime({queueToTotal: queue}));

    if (paused) return;

    // increase the global timer (seconds)
    setTime(t => t + 1);

    // if the workout is done, stop the timer and indicate wkout comp
    if (time === totTime) {
      setComplete(true);
      setPaused(!paused);
      setTime(totTime);
      setWkoutHistory(() => [...wkoutHistory, createHistoryItem({queueToTansform: queue})]);
    }
  }, 1000);

  return (
    <AppContext.Provider
      value={{
        time,
        queue,
        setQueue,
        wkoutHistory,
        url,
        setUrl,
        totTime,
        setTotTime,
        paused,
        togglePaused: () => setPaused(!paused),
        complete,
        setComplete,
        reset: () => {setTime(0);
                      setPaused(true);
                      setComplete(false);
                    },
        addItem: item =>  {
          setQueue(q => [...q, item]);
          setUrl({...url, wkout: JSON.stringify(queue)});
          },
        updateItem: (item, index) => {
          const updatedQueue = queue.map((q, i) => index === i ? item : q);
          setQueue(updatedQueue);
          setUrl({...url, wkout: JSON.stringify(queue)});
        },
        removeItem: index => {
          setQueue(queue.filter((q, i) => i !== index));
          setUrl({...url, wkout: JSON.stringify(queue)});
          },
        moveTimerUp: index => {
          if (index === 0)
            return
          else{
            let holdQ = [...queue];
            const holdTimer = holdQ.splice(index, 1)[0];
            holdQ.splice(index-1, 0, holdTimer);
            setQueue(holdQ);
            setUrl({...url, wkout: JSON.stringify(queue)});
          }
        },
        moveTimerDown: index => {
          if (index === (queue.length - 1))
            return
          else{
            let holdQ = [...queue];
            const holdTimer = holdQ.splice(index, 1)[0];
            holdQ.splice(index + 1, 0, holdTimer);
            setQueue(holdQ);
            setUrl({...url, wkout: JSON.stringify(queue)});
          }
        },
        fastForward: index => {
          setTime(queue.reduce((acc, curr, i) => {
            if (i <= index) {
              return curr.duration + acc;
            } else {
              return acc;
            }
          }, 0)
          );
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;