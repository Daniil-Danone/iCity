import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

export function useMarks() {
    const API = useSelector(state => state.api)

    async function getMarks() {
        try {
            const response = await axios.get(API + "api/v1/mark");
            return response.data;

        } catch(error) {
            console.log(error)
        }
    }

    async function addMark(markData) {
        try {
            const response = await axios.post(API + 'api/v1/mark', markData);
            if (response.status === 200) {
                return response.data;
            } else {
                return false;
            }

        } catch(error) {
            console.log(error)
        }
    }

    async function getMark(markId) {
        try {
            const response = await axios.get(API + "api/v1/mark/" + markId);
            if (response.status === 200) {
                return response.data;
            } else {
                return false;
            }
            
            

        } catch(error) {
            console.log(error)
        }
    }

    async function editMark(markId, markData) {
        try {
            const response = await axios.put(API + "api/v1/mark/" + markId, markData);
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
            

        } catch(error) {
            console.log(error)
        }
    }

    async function deleteMark(markId) {
        try {
            const response = await axios.delete(API + "api/v1/mark/" + markId);
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

    return { getMarks, addMark, getMark, editMark, deleteMark }
    }
