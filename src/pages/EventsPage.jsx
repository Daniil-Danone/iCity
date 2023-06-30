import React from 'react';
import DefaultPage from './templates/DefaultPage';
import EventsList from '../components/EventsList';

const EventsPage = () => {
  return (
    <DefaultPage>
      <EventsList/>
    </DefaultPage>
  )
}

export default EventsPage;
