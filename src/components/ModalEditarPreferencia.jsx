import React, { useState } from "react";

export default function ModalEditarPreferencia({ actividad, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    tempMin: actividad.temperatura_min || '',
    tempMax: actividad.temperatura_max || '',
    soleado: actividad.soleado || false,
    nublado: actividad.nublado || false,
    lluvia: actividad.lluvia || false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tempMin || formData.tempMin === '') {
      newErrors.tempMin = 'La temperatura mínima es requerida';
    }

    if (!formData.tempMax || formData.tempMax === '') {
      newErrors.tempMax = 'La temperatura máxima es requerida';
    }

    if (formData.tempMin && formData.tempMax && parseFloat(formData.tempMin) > parseFloat(formData.tempMax)) {
      newErrors.tempMax = 'La temperatura máxima debe ser mayor que la mínima';
    }

    if (!formData.soleado && !formData.nublado && !formData.lluvia) {
      newErrors.clima = 'Debe seleccionar al menos una preferencia climática';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
        lluvia: dataToSend.prefiere_lluvia
      });
      onClose();

    } catch (error) {
      console.error('Error al actualizar la preferencia:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-preferencias-container">
        <div className="modal-nueva-preferencia-fill">
          <button className="close-btn" onClick={onClose}>×</button>
          <h3>Editar Preferencias - {actividad.nombre}</h3>
          
          {/* Información de la actividad (solo lectura) */}
          <div className="actividad-info-readonly">
            <p><strong>Actividad:</strong> {actividad.nombre}</p>
            <p><strong>Tipo:</strong> {actividad.tipo}</p>
            {actividad.descripcion && <p><strong>Descripción:</strong> {actividad.descripcion}</p>}
          </div>
          
          <form onSubmit={handleSubmit} className="modal-nueva-preferencia-form">
            <div className="modal-nueva-preferencia-flex">
              <div className="modal-nueva-preferencia-fields">
                <label>
                  Temperatura mínima (°C)
                  <input
                    type="number"
                    name="tempMin"
                    value={formData.tempMin}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="15"
                    required
                  />
                  {errors.tempMin && <span className="error-message">{errors.tempMin}</span>}
                </label>
                <label>
                  Temperatura máxima (°C)
                  <input
                    type="number"
                    name="tempMax"
                    value={formData.tempMax}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="25"
                    required
                  />
                  {errors.tempMax && <span className="error-message">{errors.tempMax}</span>}
                </label>
              </div>
              <div className="modal-nueva-preferencia-checkboxes">
                <h4 className="checkboxes-titulo-small">Preferencias Climáticas</h4>
                <label>
                  Soleado
                  <input
                    type="checkbox"
                    name="soleado"
                    checked={formData.soleado}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Nublado
                  <input
                    type="checkbox"
                    name="nublado"
                    checked={formData.nublado}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Lluvia
                  <input
                    type="checkbox"
                    name="lluvia"
                    checked={formData.lluvia}
                    onChange={handleChange}
                  />
                </label>
                {errors.clima && <span className="error-message">{errors.clima}</span>}
              </div>
            </div>
            
            {errors.submit && <div className="error-message">{errors.submit}</div>}
            
            <button 
              type="submit" 
              className="boton-modal-preferencias"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar Preferencias'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
