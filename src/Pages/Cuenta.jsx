import React from 'react';
import BarNav from '../components/BarNav';
import ActividadesRecomendadas from '../components/ActividadesRecomendadas';
import usuarioImg from '../assets/usuario.jpg';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Cuenta() {
  const { user, userLocation, logout } = useUser();
  const navigate = useNavigate();
  
  // Obtener el nombre del usuario desde los metadatos o el email
  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuario';
  const userEmail = user?.email || 'No hay email disponible';
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <>
      <BarNav />
      <div className="cuenta-contenedor">
        <div className="cuenta-panel-izquierdo">
          <img
            src={usuarioImg}
            alt="Foto de perfil"
            className="cuenta-foto-perfil"
          />
          <p className="cuenta-nombre">{userName}</p>
          <p className="cuenta-email">{userEmail}</p>
          
          {/* Información adicional del usuario */}
          <div className="cuenta-info-adicional">
            <h3>Información de ubicación</h3>
            <p className="cuenta-ubicacion">
              <strong>Ciudad:</strong> {userLocation.city}
            </p>
            <p className="cuenta-coordenadas">
              <strong>Coordenadas:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
            </p>
            <p className="cuenta-fecha-registro">
              <strong>Miembro desde:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-CL') : 'N/A'}
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              marginTop: '20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.opacity = '0.9';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="cuenta-panel-derecho">
          <ActividadesRecomendadas />
        </div>
      </div>
    </>
  );
}

export default Cuenta;