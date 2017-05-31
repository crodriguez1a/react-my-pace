import React from 'react'
import ProgressClock from './progress-clock';
import ProgressBar from './progress-bar';
import ProgressControls from './progress-controls';
import TaskCount from './task-count';
import ThemePicker from './theme-picker';
import RestDuration from './rest-duration';
import UpcomingTask from './upcoming-task';
import RoutineMeta from './routine-meta';

const App = () => (
  <div>
    <ProgressClock />
    <ProgressBar />
    <ProgressClock />
    <ProgressControls />
    <TaskCount />
    <ThemePicker />
    <RestDuration />
    <UpcomingTask />
    <RoutineMeta />
  </div>
)

export default App;
