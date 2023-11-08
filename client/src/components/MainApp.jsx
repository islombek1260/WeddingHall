import React, { useState } from 'react';

import UserList from './UserList';
import HallsList from './HallList';
import Calendar from './calendar/Calendar';
import ErrorBoundary from './ErrorBoundary';

const MainApp = () => {
  const [activeList, setActiveList] = useState('users');

  const handleListChange = (list) => {
    setActiveList(list);
  };

  return (
    <>
      <div className="container">
        <div className="btn-group p-2">
        <button
            className={`btn activey ${activeList === 'main' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleListChange('main')}
          >
            Main
          </button>
          <button
            className={`btn ${activeList === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleListChange('users')}
          >
            Users
          </button>
          <button
            className={`btn ${activeList === 'halls' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleListChange('halls')}
          >
            Halls
          </button>
        </div>

        <ErrorBoundary>
          {activeList === 'main' ? <Calendar /> : null}
        </ErrorBoundary>

        <ErrorBoundary>
          {activeList === 'users' ? <UserList /> : null}
        </ErrorBoundary>

        <ErrorBoundary>
          {activeList === 'halls' ? <HallsList /> : null}
        </ErrorBoundary>

      </div>
    </>
  );
};

export default MainApp;