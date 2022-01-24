import React, { useDebugValue } from "react";
import Task from "./Task";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className='list-items'>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='list-items'>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <div className='title-message'>Your have no tasks</div>
          <div className='subtitle-message'>Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((task) => task.state === "TASK_PINNED"),
    ...tasks.filter((task) => task.state !== "TASK_PINNED"),
  ];
  return (
    <div className='list-items'>
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
};
PureTaskList.defaultProps = {
  loading: false,
};

export function TaskList() {
  // retrieve state from store
  const tasks = useSelector((state) => state.tasks);
  // define variable to handle dispatching the actions back to teh store
  const dispatch = useDispatch();

  const pinTask = (value) => {
    // displatch Pinned event back to the store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };

  const archiveTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };

  const filteredTasks = tasks.filter(
    (task) => task.state === "TASK_INBOX" || task.state === "TASK_PINNED"
  );
  return (
    <PureTaskList
      tasks={filteredTasks}
      onPinTask={(task) => pinTask(task)}
      onArchiveTask={(task) => archiveTask(task)}
    />
  );
}
