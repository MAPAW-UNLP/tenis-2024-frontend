import React, { useState } from 'react';
import InputReComponent from '../Utils/InputReComponent';
import useInputValidation from '../Utils/useInputValidation';

function AgregarProveedor({ handleCloseForm, proveedores }) {

    const [proveedorForm, setProveedorForm] = useState({
        nombre: '',
        telefono: '',
    });

    const {
        value: nombre,
        feedback: nombreFeedback,
        isValid: nombreValid,
        handleChange: handleChangeName
    } = useInputValidation('', "nombre", setProveedorForm, 'nombre', proveedores);

    const {
        value: telefono,
        feedback: telefonoFeedback,
        isValid: telefonoValid,
        handleChange: handleChangeTelefono
    } = useInputValidation('', "telefono", setProveedorForm, 'telefono');

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const habilitarBoton = () => {
        return !(nombreValid && telefonoValid);
    };

    const addProveedor = (e) => {
        e.preventDefault();

        const data = {
            nombre: proveedorForm.nombre,
            telefono: proveedorForm.telefono,
        };

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
        };

        fetch(`http://localhost:8083/api/proveedor`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result),
                setShowSuccessPopup(true),
                setTimeout(() => setShowSuccessPopup(false), 5000),
                handleCloseForm());
    };

    return (
        <div id="proveedor-add-component">
            <button id="close-proveedor-add-form" onClick={handleCloseForm}>
                x
            </button>
            <h2>Nuevo Proveedor</h2>
            <form onSubmit={addProveedor}>
                <label className="textoFormulario">Nombre</label>
                <div className="inputlabel">
                    <InputReComponent
                        type={'text'}
                        name={"nombre"}
                        className={'proveedor-add-form-input'}
                        placeholder={'Juan Carlos Medina'}
                        onChangeFuncion={handleChangeName}
                        value={nombre}
                    />
                    <p className="feedbackInline" style={{ color: nombreFeedback.color }}>
                        {nombreFeedback.text}
                    </p>
                </div>
                <label className="textoFormulario">Teléfono</label>
                <div className="inputlabel">
                    <InputReComponent
                        type={'text'}
                        name={"telefono"}
                        className={'proveedor-add-form-input'}
                        placeholder={'2245 043201'}
                        onChangeFuncion={handleChangeTelefono}
                        value={telefono}
                    />
                    <p className="feedbackInline" style={{ color: telefonoFeedback.color }}>
                        {telefonoFeedback.text}
                    </p>
                </div>
                <button disabled={habilitarBoton()} id="proveedor-add-form-addBtn" type="submit">
                    <p className="textoBotonAceptar">Agregar</p>
                </button>
            </form>
            {showSuccessPopup && (
                <div className="popup">
                    ¡Proveedor agregado con éxito!
                </div>
            )}
        </div>
    );
}

export default AgregarProveedor;