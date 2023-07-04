import {useState} from 'react'

const useInput = (initial, required) => {
    const [value, setValue] = useState(initial);
    const [error, setError] = useState(null);

    function onChange(event) {
        setValue(event.target.value)
    }

    function onBlur(event) {
        if (!event.target.value && required) {
            setError('Обязательное поле')
        } else {
            setError(null)
        }
    }
    
    return ({value, error, onChange, onBlur})  
}

export default useInput
