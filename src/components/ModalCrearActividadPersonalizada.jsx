import React, { useState } from "react";
import { useUser } from '../context/UserContext';

export default function ModalCrearActividadPersonalizada({ onClose, onCrear }) {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: 'outdoor',
        descripcion: '',
        temperatura_min: '',
        temperatura_max: '',
        prefiere_soleado: false,
        prefiere_nublado: false,
        prefiere_lluvia: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.temperatura_min || formData.temperatura_min === '') {
            newErrors.temperatura_min = 'La temperatura mínima es requerida';
        }

        if (!formData.temperatura_max || formData.temperatura_max === '') {
            newErrors.temperatura_max = 'La temperatura máxima es requerida';
        }

        if (formData.temperatura_min && formData.temperatura_max && parseFloat(formData.temperatura_min) > parseFloat(formData.temperatura_max)) {
            newErrors.temperatura_max = 'La temperatura máxima debe ser mayor que la mínima';
        }

        if (!formData.prefiere_soleado && !formData.prefiere_nublado && !formData.prefiere_lluvia) {
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
        
        try {
            console.log('Creating activity for user ID:', user.id);
            const response = await fetch('http://localhost:3000/actividades-personalizadas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario_id: user.id,
                    nombre: formData.nombre.trim(),
                    tipo: formData.tipo,
                    descripcion: formData.descripcion.trim(),
                    temperatura_min: parseFloat(formData.temperatura_min),
                    temperatura_max: parseFloat(formData.temperatura_max),
                    prefiere_soleado: formData.prefiere_soleado,
                    prefiere_nublado: formData.prefiere_nublado,
                    prefiere_lluvia: formData.prefiere_lluvia
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear la actividad personalizada');
            }

            // Crear objeto con el formato esperado por el componente padre
            const nuevaActividad = {
                titulo: data.activity.nombre,
                nombre: data.activity.nombre,
                duracion: 'Variable',
                tipo: data.activity.tipo,
                descripcion: data.activity.descripcion,
                temperatura_min: data.activity.temperatura_min,
                temperatura_max: data.activity.temperatura_max,
                soleado: data.activity.prefiere_soleado,
                nublado: data.activity.prefiere_nublado,
                lluvia: data.activity.prefiere_lluvia,
                idActividadPersonalizada: data.activity.id,
                esPersonalizada: true,
                creadoEn: data.activity.creado_en
            };

            onCrear(nuevaActividad);
            onClose();

        } catch (error) {
            console.error('Error al crear actividad personalizada:', error);
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
                    <h3>Crear Actividad Personalizada</h3>
                    <form onSubmit={handleSubmit} className="modal-nueva-preferencia-form">
                        <div className="modal-nueva-preferencia-flex">
                            <div className="modal-nueva-preferencia-fields">
                                <label>
                                    Nombre de la actividad
                                    <input 
                                        type="text" 
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Ej: Caminata nocturna"
                                        required 
                                    />
                                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                                </label>
                                <label>
                                    Temperatura mínima (°C)
                                    <input 
                                        type="number" 
                                        name="temperatura_min"
                                        value={formData.temperatura_min}
                                        onChange={handleChange}
                                        step="0.1"
                                        placeholder="15"
                                        required 
                                    />
                                    {errors.temperatura_min && <span className="error-message">{errors.temperatura_min}</span>}
                                </label>
                                <label>
                                    Temperatura máxima (°C)
                                    <input 
                                        type="number" 
                                        name="temperatura_max"
                                        value={formData.temperatura_max}
                                        onChange={handleChange}
                                        step="0.1"
                                        placeholder="25"
                                        required 
                                    />
                                    {errors.temperatura_max && <span className="error-message">{errors.temperatura_max}</span>}
                                </label>
                                <label>
                                    Tipo de actividad
                                    <select 
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="outdoor">Outdoor (Al aire libre)</option>
                                        <option value="indoor">Indoor (En interiores)</option>
                                    </select>
                                </label>                                
                            </div>
                            <div className="modal-nueva-preferencia-checkboxes">
                                <div className="checkboxes-titulo-small">Preferencias climáticas</div>
                                <label>
                                    Soleado
                                    <input 
                                        type="checkbox" 
                                        name="prefiere_soleado"
                                        checked={formData.prefiere_soleado}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Nublado
                                    <input 
                                        type="checkbox" 
                                        name="prefiere_nublado"
                                        checked={formData.prefiere_nublado}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Lluvia
                                    <input 
                                        type="checkbox" 
                                        name="prefiere_lluvia"
                                        checked={formData.prefiere_lluvia}
                                        onChange={handleChange}
                                    />
                                </label>
                                {errors.clima && <span className="error-message">{errors.clima}</span>}
                            </div>
                        </div>
                        <label className="modal-nueva-preferencia-descripcion">
                            Descripción (opcional)
                            <textarea 
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                placeholder="Describe tu actividad personalizada"
                            />
                        </label>
                        
                        {errors.submit && <div className="error-message">{errors.submit}</div>}
                        
                        <button 
                            type="submit" 
                            className="boton-modal-preferencias"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creando...' : 'Crear Actividad'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}