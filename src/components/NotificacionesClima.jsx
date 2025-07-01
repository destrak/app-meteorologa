import React from 'react';
import { useUser } from '../context/UserContext';

function NotificacionesClima() {
  const { user, temperatura, clima } = useUser();

  React.useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  React.useEffect(() => {
    const mostrarNotificacion = async () => {
      if (
        'Notification' in window &&
        Notification.permission === 'granted' &&
        user &&
        user.id
      ) {
        try {
          const res = await fetch(
            `http://localhost:3000/user-preferences/filter/${user.id}?temperatura=${temperatura}&clima=${clima}`
          );
          const data = await res.json();
          if (data.preferences) {
            const actividades = data.preferences
              .filter(pref => pref.actividades)
              .map(pref => pref.actividades.nombre);

            if (actividades.length > 0) {
              const randomIdx = Math.floor(Math.random() * actividades.length);
              const actividad = actividades[randomIdx];
              new Notification('¡Actividad recomendada!', {
                body: `¿Por qué no pruebas: ${actividad}?`,
                icon: '/weather-icon.png' //Para mas adelante
              });
            }
          }
        } catch (err) {
          // Manejo de errores
          console.error('Error al obtener preferencias del usuario:', err);
        }
      }
    };

    let intervalId;
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        intervalId = setInterval(mostrarNotificacion, 30000); // 60 seconds
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            intervalId = setInterval(mostrarNotificacion, 30000);
          }
        });
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user, temperatura, clima]);

  return null;
}

export default NotificacionesClima;