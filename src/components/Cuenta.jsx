function Cuenta({ usuario }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Mis Datos</h2>
      <p>Nombre: {usuario}</p>
      <p>Email: ejemplo@correo.com</p>
      <p>Contraseña: *********</p>
    </div>
  );
}

export default Cuenta;
