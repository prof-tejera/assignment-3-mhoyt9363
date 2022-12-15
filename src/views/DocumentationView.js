import React from "react";
import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import ElapsedTime from "../components/generic/ElapsedTime";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Stopwatch Timer"
          component={<Stopwatch duration={10} progress={0} />}
          propDocs={[
            {
              prop: "duration",
              description: "The # of seconds to complete the timer",
              type: "number",
              defaultValue: 10,
            },
            {
              prop: "progress",
              description: "The # of seconds elapsed",
              type: "number",
              defaultValue: 0,
            }
          ]}
        />
        <DocumentComponent
          title="Countdown Timer"
          component={<Countdown duration={10} progress={0} />}
          propDocs={[
            {
              prop: "duration",
              description: "The # of seconds to complete the timer",
              type: "number",
              defaultValue: 10,
            },
            {
              prop: "progress",
              description: "The # of seconds elapsed",
              type: "number",
              defaultValue: 0,
            }
          ]}
        />
        <DocumentComponent
          title="XY Timer"
          component={<XY rounds={3} work={10} progress={0} />}
          propDocs={[
            {
              prop: "rounds",
              description: "The # of rounds (X) to complete",
              type: "number",
              defaultValue: 3,
            },
            {
              prop: "work",
              description: "The # of seconds (Y) for each round",
              type: "number",
              defaultValue: 10,
            },
            {
              prop: "progress",
              description: "The total number of seconds completed",
              type: "number",
              defaultValue: 0,
            }
          ]}
        />
        <DocumentComponent
          title="Tabata Timer"
          component={<Tabata rounds={3} work={10} rest={5} progress={0} />}
          propDocs={[
            {
              prop: "rounds",
              description: "The # of rounds to complete",
              type: "number",
              defaultValue: 3,
            },
            {
              prop: "work",
              description: "The # of seconds to exercise each round",
              type: "number",
              defaultValue: 10,
            },
            {
              prop: "rest",
              description: "The # of seconds to rest each round",
              type: "number",
              defaultValue: 5,
            },
            {
              prop: "progress",
              description: "The total number of seconds completed",
              type: "number",
              defaultValue: 0,
            }
          ]}
        />
        <DocumentComponent
          title="Displaying Time"
          component={<ElapsedTime seconds={65} />}
          propDocs={[
            {
              prop: "seconds",
              description: "The # of seconds which is converted to min:sec",
              type: "string",
              defaultValue: 0,
            }
          ]}
        />
        <DocumentComponent
          title="3rd Party Hook - useInterval"
          propDocs={[
            {
              prop: "callback",
              description: "Function to execute when interval completed",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "delay",
              description: "The time before executing callback in setInterval",
              type: "number",
              defaultValue: "0 ms",
            },
          ]}
        />
          <DocumentComponent
          title="Displaying a Timer"
          propDocs={[
            {
              prop: "index",
              description: "The index of the timer in the queue",
              type: "integer",
              defaultValue: "0",
            },
          ]}
        />
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
