import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

// Coordenadas de Santiago por defecto
const SANTIAGO_COORDS = {
  lat: -33.4489,
  lon: -70.6693,
  city: 'Santiago'
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(SANTIAGO_COORDS);
  const [loading, setLoading] = useState(false);

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedLocation = localStorage.getItem('userLocation');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    }
  }, []);

  // Función para solicitar ubicación
  const requestUserLocation = () => {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let cityName = 'Ubicación actual';
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
              );
              const data = await response.json();
              cityName =
                data.address.city ||
                'Ubicación actual';
            } catch (error) {
              console.log("No se pudo obtener el nombre de la ciudad:", error);
            }
            const newLocation = {
              lat,
              lon,
              city: cityName
            };
            setUserLocation(newLocation);
            localStorage.setItem('userLocation', JSON.stringify(newLocation));
            resolve(newLocation);
          },
          (error) => {
            console.log("Usuario rechazó ubicación, usando Santiago por defecto");
            setUserLocation(SANTIAGO_COORDS);
            localStorage.setItem('userLocation', JSON.stringify(SANTIAGO_COORDS));
            resolve(SANTIAGO_COORDS);
          }
        );
      } else {
        console.log("Geolocalización no disponible, usando Santiago");
        setUserLocation(SANTIAGO_COORDS);
        localStorage.setItem('userLocation', JSON.stringify(SANTIAGO_COORDS));
        resolve(SANTIAGO_COORDS);
      }
    });
  };

  // Función de registro
  const register = async (email, password, nombre) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      // Auto-login después del registro
      return login(email, password);
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Función de login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Credenciales inválidas');
      }

      // Guardar usuario
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('session', JSON.stringify(data.session));

      // Solicitar ubicación después del login exitoso
      await requestUserLocation();

      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    localStorage.removeItem('userLocation');
    setUserLocation(SANTIAGO_COORDS);
  };

  const updateUserLocation = (location) => {
    console.log(location)
    setUserLocation(location);
    localStorage.setItem('userLocation', JSON.stringify(location));
  };

  const value = {
    user,
    userLocation,
    loading,
    register,
    login,
    logout,
    requestUserLocation,
    updateUserLocation
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
