import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

export function useMarks() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [marks, setMarks] = useState([]);
    const [markStatus, setMarkStatus] = useState('');
    const [editCurrentMark, setEditCurrentMark] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const API = useSelector(state => state.api)

    function addMark() {
        setMarkStatus('Кликните по месту, где хотите добавить объект');
    }

    function editMark(mark) {
        setEditCurrentMark(mark);
    }

    async function getMarks() {
        try {
            const response = await axios.get(API + "api/v1/mark");
            
            setMarks(response.data);
            
        } catch(error) {
            console.log(error)
        }
    }

    async function onClickMap(event) {
        if( markStatus === 'Кликните по месту, где хотите добавить объект') {
            setMarkStatus('А теперь отредактируйте новый маркер →');
            const markData = {
                title: 'Новая метка',
                description: 'Описание',
                xpos: event.get("coords")[0],
                ypos: event.get("coords")[1],
                author: user.id
            };
    
            await axios
                .post(API + 'api/v1/mark', markData)
                .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data)
                    editMark(response.data);
                }
                });
            };
    }
    
    useEffect(() => {
        getMarks()
        setEditCurrentMark(false);
        if (isDone) {
            setIsDone(false);
            setTimeout(() => {
                setMarkStatus(false)
            }, 1000);
        }
    }, [isDone]
    )

    return { 
        user, 
        marks, setMarks,
        markStatus, setMarkStatus,
        editCurrentMark, setEditCurrentMark,
        isDone, setIsDone,
        addMark, editMark, getMarks, onClickMap }
    }
