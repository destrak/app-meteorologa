import React from "react";

export default function ModalNuevaPreferencia({ setNuevaPref, handleNuevaPref }) {
    return (
        <div className="modal-overlay">
            <div className="modal-nueva-preferencia">
                <button className="close-btn" onClick={() => setNuevaPref(false)}>×</button>
                <h3>Nueva Actividad</h3>
                <form onSubmit={handleNuevaPref}>
                    <label>
                        Nombre de la actividad
                        <input type="text" required />
                    </label>
                    <label>
                        Temperatura mínima
                        <input type="text" required />
                    </label>
                    <label>
                        Temperatura máxima
                        <input type="text" required />
                    </label>
                    <label>
                        Descripción
                        <textarea />
                    </label>
                    <button type="submit" className="boton-preferencias">Guardar</button>
                </form>
            </div>
        </div>
    );
}

        