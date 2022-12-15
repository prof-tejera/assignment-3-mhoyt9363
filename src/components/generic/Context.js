import React, { useEffect, useState } from 'react';
import getTotTime from '../../utils/getTotTime';
import { useInterval } from './useInterval';
import usePersistedState from './usePersistedState';
import createHistoryItem from '../../utils/createHistoryItem';
import getUrlHash from './getUrlHash';
import updateURLHash from './updateURLHash';

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {

  const [holdQ, setHoldQ] = usePersistedState('queue', []);
  const [paused, setPaused] = usePersistedState('paused', true);
  const [time, setTime] = usePersistedState('time', 0);
  const [complete, setComplete] = usePersistedState('complete', false);
  const [wkoutHistory, setWkoutHistory] = usePersistedState('hist', []);

  const [queue, setQueue] = useState( ( getUrlHash().length === 0 ) ? holdQ : getUrlHash() ); 

  const [totTime, setTotTime] = usePersistedState('totTime', getTotTime({queueToTotal: queue})); 

  // update the hold q (persisted state) when the queue changes
  useEffect(() => {

    setHoldQ(queue);

  }, [ queue, setHoldQ ]);
  
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
        // url,
        // setUrl,
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
          setHoldQ(q => [...q, item]);
          updateURLHash(queue);
          },
        updateItem: (item, index) => {
          const updatedQueue = queue.map((q, i) => index === i ? item : q);
          setQueue(updatedQueue);
          setHoldQ(updatedQueue);
          updateURLHash(queue);
        },
        removeItem: index => {
          setQueue(queue.filter((q, i) => i !== index));
          setHoldQ(queue.filter((q, i) => i !== index));
          updateURLHash(queue);
          },
        moveTimerUp: index => {
          if (index === 0)
            return
          else{
            let tmp = [...queue];
            const holdTimer = tmp.splice(index, 1)[0];
            tmp.splice(index-1, 0, holdTimer);
            setQueue(tmp);
            setHoldQ(tmp);
            updateURLHash(queue);
          }
        },
        moveTimerDown: index => {
          if (index === (queue.length - 1))
            return
          else{
            let tmp = [...queue];
            const holdTimer = tmp.splice(index, 1)[0];
            tmp.splice(index + 1, 0, holdTimer);
            setQueue(tmp);
            setHoldQ(tmp);
            updateURLHash(queue);
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