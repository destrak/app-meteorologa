import React from "react";

export default function ModalNuevaPreferencia({ setNuevaPref, handleNuevaPref }) {
    return (
        <div className="modal-overlay">
            <div className="modal-preferencias-container">
                <div className="modal-nueva-preferencia-fill">
                    <button className="close-btn" onClick={() => setNuevaPref(false)}>×</button>
                    <h3>Nueva Actividad</h3>
                    <form onSubmit={handleNuevaPref} className="modal-nueva-preferencia-form">
                        <div className="modal-nueva-preferencia-flex">
                            <div className="modal-nueva-preferencia-fields">
                                <label>
                                    Nombre de la actividad
                                    <input type="text" required />
                                </label>
                                <label>
                                    Temperatura mínima
                                    <input type="number" required />
                                </label>
                                <label>
                                    Temperatura máxima
                                    <input type="number" required />
                                </label>
                                <label>
                                    Tipo de actividad
                                    <input type="text" required />
                                </label>                                
                            </div>
                            <div className="modal-nueva-preferencia-checkboxes">
                                <label>
                                    ¿Es soleado?
                                    <input type="checkbox" name="soleado" />
                                </label>
                                <label>
                                    ¿Es nublado?
                                    <input type="checkbox" name="nublado" />
                                </label>
                                <label>
                                    ¿Prefiere lluvia?
                                    <input type="checkbox" name="lluvia" />
                                </label>
                            </div>
                        </div>
                        <label className="modal-nueva-preferencia-descripcion">
                            Descripción
                            <textarea />
                        </label>
                        <button type="submit" className="boton-modal-preferencias">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}