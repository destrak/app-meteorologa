import React, { useState } from "react";

export default function ModalEditarPreferencia({ actividad, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    tempMin: actividad.temperatura_min || '',
    tempMax: actividad.temperatura_max || '',
    soleado: actividad.soleado || false,
    nublado: actividad.nublado || false,
    lluvia: actividad.lluvia || false,
    descripcion: actividad.descripcion || ''
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      min_temp: parseFloat(formData.tempMin), 
      max_temp: parseFloat(formData.tempMax), 
      prefiere_soleado: formData.soleado,
      prefiere_nublado: formData.nublado,
      prefiere_lluvia: formData.lluvia,
    };
    try {
      const response = await fetch(`http://localhost:3000/user-preferences/${actividad.idPreferencia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const updatedPreference = await response.json();
      console.log('Preferencia actualizada exitosamente:', updatedPreference);

      onGuardar({
        ...actividad,
        temperatura_min: dataToSend.min_temp,
        temperatura_max: dataToSend.max_temp,
        soleado: dataToSend.prefiere_soleado,
        nublado: dataToSend.prefiere_nublado,
        lluvia: dataToSend.prefiere_lluvia,
        descripcion: formData.descripcion
      });
      onClose();

    } catch (error) {
      console.error('Error al actualizar la preferencia:', error);
      alert('Error al actualizar la preferencia: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-preferencias-container">
        <div className="modal-nueva-preferencia-fill">
          <button className="close-btn" onClick={onClose}>×</button>
          <h3>Editar Actividad</h3>
          <form onSubmit={handleSubmit} className="modal-nueva-preferencia-form">
            <div className="modal-nueva-preferencia-flex">
              <div className="modal-nueva-preferencia-fields">
                <label>
                  Nombre de la actividad
                  <input
                    type="text"
                    value={actividad.nombre}
                    disabled
                  />
                </label>
                <label>
                  Temperatura mínima
                  <input
                    type="number"
                    name="tempMin"
                    value={formData.tempMin}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Temperatura máxima
                  <input
                    type="number"
                    name="tempMax"
                    value={formData.tempMax}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Tipo de actividad
                  <input
                    type="text"
                    value={actividad.tipo}
                    disabled
                  />
                </label>
              </div>
              <div className="modal-nueva-preferencia-checkboxes">
                <label>
                  ¿Es soleado?
                  <input
                    type="checkbox"
                    name="soleado"
                    checked={formData.soleado}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  ¿Es nublado?
                  <input
                    type="checkbox"
                    name="nublado"
                    checked={formData.nublado}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  ¿Prefiere lluvia?
                  <input
                    type="checkbox"
                    name="lluvia"
                    checked={formData.lluvia}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className="modal-nueva-preferencia-descripcion">
              Descripción
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="boton-modal-preferencias">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
