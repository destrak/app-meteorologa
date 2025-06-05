import React from 'react';
import BarNav from '../components/BarNav';
import ActividadesRecomendadas from '../components/ActividadesRecomendadas';
import usuarioImg from '../assets/usuario.jpg'; // Ruta de tu imagen

function Cuenta({ usuario }) {
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
          <p className="cuenta-nombre">{usuario?.nombre || 'Nombre de usuario'}</p>
          <p className="cuenta-email">{usuario?.email || 'ejemplo@correo.com'}</p>
        </div>

        <div className="cuenta-panel-derecho">
          <ActividadesRecomendadas />
        </div>
      </div>
    </>
  );
}

export default Cuenta;
