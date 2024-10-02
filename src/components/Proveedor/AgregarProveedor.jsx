import React, { useState } from 'react'

import InputReComponent from '../Utils/InputReComponent';

function AgregarProveedor({ handleCloseForm = null, proveedores = [] }) {
    const feedbackStructure = {
        text: '',
        color: '',
    }

    const [proveedorForm, setProveedorForm] = useState({
        nombre: '',
        telefono: '',
    })

    const [feedback, setFeedback] = useState({
        nombreFB: feedbackStructure,
        telefonoFB: feedbackStructure,
        nombreFBCorrecto: null,
        telefonoFBCorrecto: null,
    })

    const URL_BASE = 'http://localhost:8083/api/';

    const addProveedor = (e) => {
        e.preventDefault()

        const data = {
            nombre: proveedorForm.nombre,
            telefono: proveedorForm.telefono,
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
        };

        fetch(`${URL_BASE}proveedor`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
    };

    const habilitarBoton = () => {
        return !((feedback.nombreFBCorrecto !== null && feedback.nombreFBCorrecto === true) && (feedback.telefonoFBCorrecto !== null && feedback.telefonoFBCorrecto === true));
    };

    const existeNombre = (nombre) => {
        return proveedores.find((proveedor) => proveedor.nombre === nombre)
    }

    const handleChangeName = (e) => {
        const pattern = /^[A-Za-z\s]+$/; // Solo letras y espacios
        const nombreproveedor = e.target.value;

        setProveedorForm({ ...proveedorForm, nombre: nombreproveedor });
        if (nombreproveedor === "") {
            setFeedback({ ...feedback, nombreFB: { text: 'El nombre no puede ser vacio.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, nombreFBCorrecto: false }));
        } else if (!pattern.test(nombreproveedor)) {
            setFeedback({ ...feedback, nombreFB: { text: 'El nombre solo debe contener letras.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, nombreFBCorrecto: false }));
        } else if (existeNombre(nombreproveedor)) {
            setFeedback({ ...feedback, nombreFB: { text: 'El nombre de proveedor ya existe.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, nombreFBCorrecto: false }));
        } else if (nombreproveedor.length > 30) {
            setFeedback({ ...feedback, nombreFB: { text: 'El Nombre debe tener menos de 30 caracteres.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, nombreFBCorrecto: false }));
        } else {
            setFeedback({ ...feedback, nombreFB: { text: 'El nombre de proveedor es correcto.', color: '#7CBD1E' } });
            setFeedback(prev => ({ ...prev, nombreFBCorrecto: true }));
        }
    };

    const handleChangeTelefono = (e) => {
        const telefono = e.target.value;
        const pattern = /^\d+$/; // Solo números

        setProveedorForm({ ...proveedorForm, telefono });

        if (telefono === "") {
            setFeedback({ ...feedback, telefonoFB: { text: 'El teléfono no puede ser vacio.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, telefonoFBCorrecto: false }));
        } else if (!pattern.test(telefono)) {
            setFeedback({ ...feedback, telefonoFB: { text: 'El teléfono solo debe contener números.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, telefonoFBCorrecto: false }));
        } else if (telefono.length > 15) {
            setFeedback({ ...feedback, telefonoFB: { text: 'El teléfono debe tener menos de 15 caracteres.', color: '#CC3636' } });
            setFeedback(prev => ({ ...prev, telefonoFBCorrecto: false }));
        } else {
            setFeedback({ ...feedback, telefonoFB: { text: 'Teléfono válido.', color: '#7CBD1E' } });
            setFeedback(prev => ({ ...prev, telefonoFBCorrecto: true }));
        }
    };

    return (
        <div id="proveedor-add-component">
            <button id="close-proveedor-add-form" onClick={handleCloseForm}>
                x
            </button>
            <h2>Nuevo Proveedor</h2>
            <form>
                <label className="textoFormulario">Nombre</label>
                <div className="inputlabel">
                    <InputReComponent
                        type={'text'}
                        name={"nombre"}
                        className={'proveedor-add-form-input'}
                        placeholder={'Juan Carlos Medina'}
                        onChangeFuncion={handleChangeName}
                    />
                    <p className="feedbackInline" style={{ color: feedback.nombreFB.color }}>
                        {feedback.nombreFB.text}
                    </p>
                </div>
                <label className="textoFormulario">Telefono</label>
                <div className="inputlabel">
                    <InputReComponent
                        type={'text'}
                        name={"telefono"}
                        className={'proveedor-add-form-input'}
                        placeholder={'2245 043201'}
                        onChangeFuncion={handleChangeTelefono}
                    />
                    <p className="feedbackInline" style={{ color: feedback.telefonoFB.color }}>
                        {feedback.telefonoFB.text}
                    </p>
                </div>
                <button onClick={addProveedor} disabled={habilitarBoton()} id="proveedor-add-form-addBtn" type="sumbit">
                    <p className="textoBotonAceptar">Agregar</p>
                </button>
            </form>
        </div>
    )
}

export default AgregarProveedor