import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

export function useEvents() {
    const API = useSelector(state => state.api)

    async function getEvents() {
        try {
            const response = await axios.get(API + "api/v1/event");
            return response.data;

        } catch(error) {
            console.log(error)
        }
    }

    async function addEvent(eventData) {
        try {
            const response = await axios.post(API + 'api/v1/event', eventData);
            if (response.status === 200) {
                return response.data;
            } else {
                return false;
            }

        } catch(error) {
            console.log(error)
        }
    }

    async function getEvent(eventId) {
        try {
            const response = await axios.get(API + "api/v1/event/" + eventId);
            if (response.status === 200) {
                return response.data;
            } else {
                return false;
            }
            
            

        } catch(error) {
            console.log(error)
        }
    }

    async function editEvent(eventId, eventData) {
        try {
            const response = await axios.put(API + "api/v1/event/" + eventId, eventData);
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
            

        } catch(error) {
            console.log(error)
        }
    }

    async function deleteEvent(eventId) {
        try {
            const response = await axios.delete(API + "api/v1/event/" + eventId);
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
            
                    

        } catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {}, [])

    return { getEvents, addEvent, getEvent, editEvent, deleteEvent }
    }
