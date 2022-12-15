import styled from "styled-components";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { PATHS } from "./utils/constants";
import AppProvider from "./components/generic/Context";
import NewTimerView from "./views/NewTimerView";
import EditTimerView from "./views/EditTimerView";
import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import HistoryView from "./views/HistoryView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const LiStyle = styled.li`
padding: 5px;
margin: 2px;
display: inline;
border: 1px solid black;
text-align: center;
font-size: 13px;
background-color: lightblue;
`;

const Nav = () => {

  return (
    <nav>
      <ul>
        <LiStyle>
          <Link to={PATHS.NEWTIMER}>Add Timer</Link>
        </LiStyle>
        <LiStyle>
          <Link to={PATHS.TIMERS}>Workout</Link>
        </LiStyle>
        <LiStyle>
          <Link to={PATHS.HISTORY}>History</Link>
        </LiStyle>
        <LiStyle>
          <Link to={PATHS.DOCUMENTS}>Documentation</Link>
        </LiStyle>
      </ul>
    </nav>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};


const App = () => {

  return (
    <BrowserRouter basename={PATHS.BASENAME}>
      <AppProvider>
        <Container>
          <Nav />
          <Routes>
            <Route path={PATHS.DOCUMENTS} element={<DocumentationView />} />
            <Route path={PATHS.NEWTIMER} element={<NewTimerView />} />
            <Route path={PATHS.EDITTIMER()} element={<EditTimerView />} />
            <Route path={PATHS.TIMERS} element={<TimersView />} />
            <Route path={PATHS.HISTORY} element={<HistoryView />} />
            <Route path={PATHS.HOME} element={<TimersView />} />
          </Routes>
        </Container>
      </AppProvider>
    </BrowserRouter>
  );
};

const AppErrorWrapper = () => {
  return( 
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
  )
}

export default AppErrorWrapper;
