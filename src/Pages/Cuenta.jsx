import BarNav from '../components/BarNav';
import ActividadesRecomendadas from '../components/ActividadesRecomendadas';

function Cuenta({ usuario }) {
  // ✅ Esta función estaba faltando
  const manejarCambioPreferencias = () => {
    alert('Aquí puedes cambiar tus preferencias.');
  };

  return (
    <>
      <BarNav />
<div style={{ padding: '20px', color: 'black', fontSize: '18px' }}>
  <h2 style={{ fontSize: '28px' }}>Mis Datos</h2>
  <p>Nombre: Lorem ipsum</p>
  <p>Email: ejemplo@correo.com</p>
  <p>Contraseña: *********</p>
    <ActividadesRecomendadas onCambiarPreferencias={manejarCambioPreferencias} />
      </div>
    </>
  );
}

export default Cuenta;
