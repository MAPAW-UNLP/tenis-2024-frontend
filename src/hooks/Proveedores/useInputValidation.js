import { useState } from 'react';

const useInputValidation = (initialValue, type, setForm, fieldName, proveedores) => {
    const [value, setValue] = useState(initialValue);
    const [feedback, setFeedback] = useState({ text: '', color: '' });
    const [isValid, setIsValid] = useState(false);

    const validate = (inputValue) => {
        const { valid, message } = (type === "nombre" ? validateName(inputValue, proveedores) : validateTelefono(inputValue));
        setFeedback({ text: message, color: valid ? '#7CBD1E' : '#CC3636' });
        setIsValid(valid);
        setForm((prev) => ({ ...prev, [fieldName]: inputValue }));
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        validate(inputValue);
    };

    const validateName = (nombre, proveedores) => {
        const pattern = /^[A-Za-z\s]+$/; // Solo letras y espacios
        if (nombre === "") {
            return { valid: false, message: 'El nombre no puede ser vacío.' };
        } else if (!pattern.test(nombre)) {
            return { valid: false, message: 'El nombre solo debe contener letras.' };
        } else if (nombre.length > 30) {
            return { valid: false, message: 'El nombre debe tener menos de 30 caracteres.' };
        }
        return { valid: true, message: 'El nombre de proveedor es correcto.' };
    };

    const validateTelefono = (telefono) => {
        const pattern = /^\d+$/; // Solo números
        if (telefono === "") {
            return { valid: false, message: 'El teléfono no puede ser vacío.' };
        } else if (!pattern.test(telefono)) {
            return { valid: false, message: 'El teléfono solo debe contener números.' };
        } else if (telefono.length > 15) {
            return { valid: false, message: 'El teléfono debe tener menos de 15 caracteres.' };
        }
        return { valid: true, message: 'Teléfono válido.' };
    };

    return { value, feedback, isValid, handleChange };
};

export default useInputValidation;