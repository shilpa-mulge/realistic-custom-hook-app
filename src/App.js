import React, { useCallback, useEffect, useState } from 'react';
import useHttp from './hooks/use-fetch';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const trandferdTask = (taskData) => {
      const loadedTasks = [];
      for (const taskKey in taskData) {
        loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
      }
      setTasks(loadedTasks);
    }
    fetchTasks({ url: 'https://react-app-cd331-default-rtdb.firebaseio.com/tasks.json' }, trandferdTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
