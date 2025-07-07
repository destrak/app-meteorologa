import React from "react";

export default function ModalNuevaPreferencia({ setNuevaPref, handleNuevaPref }) {
    return (
        <div className="modal-overlay">
            <div className="modal-preferencias-container">
                <div className="modal-nueva-preferencia-fill">
                    <button className="close-btn" onClick={() => setNuevaPref(false)}>×</button>
                    <h3>Nueva Preferencia</h3>
                    <p>Selecciona una actividad de la plataforma para agregar a tus preferencias.</p>
                    <p>Esta funcionalidad te llevará a la página de selección de actividades.</p>
                    <div className="modal-acciones">
                        <button 
                            className="boton-modal-preferencias" 
                            onClick={() => {
                                setNuevaPref(false);
                                // Redirigir a la página de selección (Quiz)
                                window.location.href = '/preguntas';
                            }}
                        >
                            Ir a Seleccionar Actividades
                        </button>
                        <button 
                            className="boton-secundario" 
                            onClick={() => setNuevaPref(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}