import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { TaskList } from "./TaskList";

export function PureInboxScreen({ error }) {
  if (error) {
    return (
      <div className='page lists-show'>
        <div clssName='wraper-message'>
          <span className='icon-face-sad' />
          <div className='title-message'>Oh no!</div>
        </div>
      </div>
    );
  }
  return (
    <div className='page lists-show'>
      <nav>
        <h1 className='title-page'>
          <span className='title-wrapper'>Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}

PureInboxScreen.propTypes = {
  error: PropTypes.string,
};

PureInboxScreen.defaultProps = {
  error: null,
};

export function InboxScreen() {
  // retrieve error from updated store
  const isError = useSelector((state) => state.isError);

  return <PureInboxScreen error={isError} />;
}
