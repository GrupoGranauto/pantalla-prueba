import { useState, useEffect } from 'react';

// Datos de prueba basados en tu CSV
const mockData = [
  { time: '07:00', name: 'BARCELO MOLINA ANA PAULA', model: 'XTRAIL', year: '2026' },
  { time: '07:00', name: 'LOPEZ GAYOSSO VERONICA', model: 'MARCH', year: '2024' },
  { time: '07:00', name: 'VALENZUELA RUIZ NORMA LUCIA', model: 'ALTIMA', year: '2013' },
  { time: '07:15', name: 'RENDON DAMIAN NORMA PATRICIA', model: 'VERSA', year: '2025' },
  { time: '07:30', name: 'CAMARGO VALDEZ MIRNA VANESSA', model: 'QUEST', year: '2025' },
  { time: '07:30', name: 'CHAVEZ ORTIZ JESUS ANTONIO', model: 'MAGNITE', year: '2026' },
  { time: '08:00', name: 'GARCIA LOPEZ JUAN PABLO', model: 'FRONTIER', year: '2023' }
];

interface Appointment {
  time: string;
  name: string;
  model: string;
  year: string;
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 1. Ordenar por hora (aunque ya vienen ordenados, es buena práctica)
    const sortedData = [...mockData].sort((a, b) => a.time.localeCompare(b.time));
    setAppointments(sortedData);

    // 2. Reloj en tiempo real
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Función para capitalizar nombres (Letra Capital)
  const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (appointments.length === 0) return (
    <div className="bg-black h-screen w-screen text-white flex justify-center items-center text-5xl">
      Cargando Citas...
    </div>
  );

  const currentAppointment = appointments[0];
  const upcomingAppointments = appointments.slice(1, 5); // Mostramos solo los siguientes 4 para no saturar la pantalla 1080p

  return (
    <div className="w-screen h-screen bg-[#121212] font-sans flex flex-col overflow-hidden text-white">
      
      {/* SECCIÓN SUPERIOR: ACTUALMENTE ATENDIENDO (45% de la pantalla) */}
      <div className="h-[45vh] bg-gradient-to-br from-[#c3002f] to-[#900020] p-10 flex flex-col justify-between relative shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 border-b-8 border-black">
        
        {/* Header de la tarjeta */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="animate-pulse w-6 h-6 bg-white rounded-full"></div>
            <h1 className="text-4xl font-bold uppercase tracking-widest text-white/90">
              Actualmente Atendiendo
            </h1>
          </div>
          
          {/* Reloj y Logo Nissan (Texto estilizado) */}
          <div className="text-right">
             <div className="text-6xl font-black tracking-tighter mb-2">NISSAN</div>
             <div className="text-3xl text-white/80 font-mono">
                {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
             </div>
          </div>
        </div>

        {/* Datos Principales (Letras Gigantes) */}
        <div className="flex items-center gap-12 mt-auto mb-6">
          <div className="text-[10rem] leading-none font-black text-white drop-shadow-xl bg-black/20 px-8 py-4 rounded-3xl shrink-0">
            {currentAppointment.time}
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl xl:text-7xl font-bold text-white drop-shadow-lg leading-tight pr-4">
              {toTitleCase(currentAppointment.name)}
            </h2>
            <div className="text-4xl xl:text-5xl mt-4 font-semibold text-gray-200 tracking-wide flex items-center gap-4 flex-wrap">
               <span className="bg-white text-[#c3002f] px-4 py-1 rounded-md">{toTitleCase(currentAppointment.model)}</span>
               <span>Modelo {currentAppointment.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: PRÓXIMAS CITAS (55% de la pantalla) */}
      <div className="flex-1 bg-[#1a1a1a] p-10 flex flex-col justify-center">
        <h3 className="text-4xl font-medium text-gray-400 mb-8 border-b-2 border-gray-700 pb-4 uppercase tracking-wider">
          Próximas Citas en Fila
        </h3>
        
        <div className="grid grid-cols-1 gap-4 xl:gap-6">
          {upcomingAppointments.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#242424] border-l-[12px] border-[#c3002f] rounded-r-xl p-4 xl:p-6 flex items-center shadow-lg transform transition-all duration-500"
            >
              <div className="text-5xl xl:text-6xl font-black text-[#c3002f] w-40 xl:w-48 text-center bg-black/30 rounded-lg py-2 shrink-0">
                {item.time}
              </div>
              <div className="flex-1 pl-6 xl:pl-10 text-4xl xl:text-5xl font-bold text-gray-100 leading-tight pr-4">
                {toTitleCase(item.name)}
              </div>
              <div className="text-3xl xl:text-4xl text-gray-400 text-right w-1/4 shrink-0 font-medium">
                {toTitleCase(item.model)} <span className="text-gray-500">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
