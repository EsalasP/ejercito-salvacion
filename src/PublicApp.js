import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, AlertCircle, Filter, X, Church, Info } from 'lucide-react';

const churches = [// SANTIAGO
  { id: 1, name: "Casa de Tránsito", address: "Zenteno 1489, Santiago", city: "Santiago", phone: "(56) 229 040237", email: "casa_transito@saw.salvationarmy.org", lat: -33.4569, lng: -70.6483, schedule: [{ day: "Lunes a Viernes", time: "9:00 - 17:00" }], services: ["Alojamiento Temporal", "Asistencia Social"], image: "", description: "Casa de acogida temporal" },
  
  { id: 2, name: "Cuerpo Avenida Matta", address: "Santiago Concha 1465/1473, Santiago", city: "Santiago", phone: "(56) 2322791961", email: "cpo_avmatta@saw.salvationarmy.org", lat: -33.4589, lng: -70.6693, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Programas Juveniles"], image: "", description: "" },
  
  { id: 3, name: "Cuerpo Central", address: "Agustinas 3050, Santiago", city: "Santiago", phone: "(56) 22 681 4875", email: "cpo_centralstgo@saw.salvationarmy.org", lat: -33.4489, lng: -70.6893, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }, { day: "Miércoles", time: "19:00 - 21:00" }], services: ["Culto", "Escuela Dominical", "Asistencia Social"], image: "", description: "Iglesia principal del Ejército de Salvación en Santiago" },
  
  { id: 4, name: "Escuela Básica Ejército de Salvación", address: "Herrera 185, Santiago", city: "Santiago", phone: "(56) 22 681 7097", email: "escuela_santiago@saw.salvationarmy.org", lat: -33.4419, lng: -70.6583, schedule: [], services: ["Educación Básica"], image: "", description: "" },
  
  { id: 5, name: "Cuerpo El Bosque", address: "Las Vizcachas 858, Pobl. Las Acacias, El Bosque", city: "El Bosque", phone: "(56) 22 529 4242", email: "escuela_elbosque@saw.salvationarmy.org", lat: -33.5669, lng: -70.6783, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Culto", "Escuela Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 6, name: "El Faro - Residencial para Varones", address: "Santiago Concha 1333, Santiago", city: "Santiago", phone: "(56) 225553409", email: "Resid_ElFaro@saw.salvationarmy.org", lat: -33.4579, lng: -70.6703, schedule: [], services: ["Residencia", "Rehabilitación"], image: "", description: "" },
  
  { id: 7, name: "Cuerpo Lo Valledor", address: "Av. Arturo Alessandri 6342, Pedro Aguirre Cerda", city: "Pedro Aguirre Cerda", phone: "(56) 225215575", email: "Cpo_Lovalledor@saw.salvationarmy.org", lat: -33.4969, lng: -70.6893, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Asistencia Social"], image: "", description: "" },
  
  { id: 8, name: "Cuerpo Lo Vial", address: "Gaspar de Soto 790, San Miguel", city: "San Miguel", phone: "(56) 227236759", email: "Cpo_Lovial@saw.salvationarmy.org", lat: -33.4969, lng: -70.6493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 9, name: "Cuerpo de Maipú", address: "Maipú 284, Maipú", city: "Maipú", phone: "(56) 225312638", email: "Cpo_maipú@saw.salvationarmy.org", lat: -33.5169, lng: -70.7593, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Asistencia Social"], image: "", description: "" },
  
  { id: 10, name: "Cuerpo Neptuno", address: "Los Aromos 833, Lo Prado", city: "Lo Prado", phone: "(56) 227735154", email: "Cpo_Neptuno@saw.salvationarmy.org", lat: -33.4469, lng: -70.7293, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Culto"], image: "", description: "" },
  
  { id: 11, name: "Cuerpo Nueva Extremadura", address: "El Fundador 13682, La Pintana", city: "La Pintana", phone: "", email: "Cpo_nvaext@saw.salvationarmy.org", lat: -33.6069, lng: -70.6293, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 12, name: "Hogar de Ancianos Otoño Dorado", address: "Av. La Florida 9995, La Florida", city: "La Florida", phone: "(56) 22875280", email: "Hogar_Odorado@saw.salvationarmy.org", lat: -33.5269, lng: -70.5893, schedule: [], services: ["Hogar de Ancianos"], image: "", description: "" },
  
  { id: 13, name: "Cuerpo de Pudahuel", address: "La Unión 9044, Pudahuel", city: "Pudahuel", phone: "(56) 226431875", email: "Cpo_pudahuel@saw.salvationarmy.org", lat: -33.4369, lng: -70.7593, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Escuela Básica"], image: "", description: "" },
  
  { id: 14, name: "Cuerpo de Puente Alto", address: "Santo Domingo, Puente Alto", city: "Puente Alto", phone: "(56) 228503331", email: "Cpo_ptealto@saw.salvationarmy.org", lat: -33.6169, lng: -70.5793, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 15, name: "Cuerpo Quinta Normal", address: "Mapocho 4130, Quinta Normal", city: "Quinta Normal", phone: "(56) 227751566", email: "Cpo_QtaNormal@saw.salvationarmy.org", lat: -33.4269, lng: -70.7093, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Culto", "Emergencias"], image: "", description: "" },
  
  { id: 16, name: "Jardín Infantil Rayitos de Sol", address: "Av. Brasil 73, Santiago", city: "Santiago", phone: "(56) 226993595", email: "Jardín_RaydeSol@saw.salvationarmy.org", lat: -33.4439, lng: -70.6693, schedule: [], services: ["Jardín Infantil"], image: "", description: "" },
  
  { id: 17, name: "Cuerpo San Gregorio", address: "12 Poniente 8390, La Granja", city: "La Granja", phone: "", email: "Cuerposangregorio@hotmail.com", lat: -33.5369, lng: -70.6193, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Casa de la Mujer"], image: "", description: "" },
  
  // OTRAS REGIONES
  { id: 18, name: "Cuerpo Barrancas", address: "Independencia 2115, Barrancas, San Antonio", city: "San Antonio", phone: "", email: "Cpo_barrancas@saw.salvationarmy.org", lat: -33.5869, lng: -71.6093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 19, name: "Cuerpo Rancagua", address: "Iquique 24 esq. Bolivia, Rancagua", city: "Rancagua", phone: "", email: "Cpo_rancagua@saw.salvationarmy.org", lat: -34.1669, lng: -70.7393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Sala Cuna"], image: "", description: "" },
  
  { id: 20, name: "Cuerpo Playa Ancha", address: "Río Frío 450, Playa Ancha, Valparaíso", city: "Valparaíso", phone: "(56) 32 3612558", email: "Cpo_P-Ancha@saw.salvationarmy.org", lat: -33.0469, lng: -71.6193, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 21, name: "Hogar de Hombres Valparaíso", address: "Villagrán 9, Valparaíso", city: "Valparaíso", phone: "(56) 32 2214946", email: "HdeH_valpo@saw.salvationarmy.org", lat: -33.0469, lng: -71.6293, schedule: [], services: ["Residencia"], image: "", description: "" },
  
  { id: 22, name: "Cuerpo Ancud", address: "Calle Ejército 721, Ancud", city: "Ancud", phone: "(56) 65 2622045", email: "Cpo_Ancud@saw.salvationarmy.org", lat: -41.8669, lng: -73.8293, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Comedor Abierto"], image: "", description: "" },
  
  { id: 23, name: "Cuerpo Angol", address: "Berlín 818, Angol", city: "Angol", phone: "(56) 45 2712583", email: "Cpo_Angol@saw.salvationarmy.org", lat: -37.7969, lng: -72.7093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Centro del Adulto Mayor"], image: "", description: "" },
  
  { id: 24, name: "Cuerpo Chillán", address: "Hernando de Magallanes 544, Chillán", city: "Chillán", phone: "(56) 42 2232598", email: "Cpo_Chillán@saw.salvationarmy.org", lat: -36.6069, lng: -72.1093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 25, name: "Cuerpo Concepción", address: "Hipólito Salas 760, Concepción", city: "Concepción", phone: "(56) 41 3183687", email: "Cpo_Concepcion@saw.salvationarmy.org", lat: -36.8269, lng: -73.0493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 26, name: "Cuerpo Hualpencillo", address: "Av. Alemania 3510, Hualpén", city: "Hualpén", phone: "", email: "Cpo_Hualpencillo@saw.salvationarmy.org", lat: -36.7869, lng: -73.1593, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 27, name: "Cuerpo Osorno", address: "Zenteno 1015, Osorno", city: "Osorno", phone: "(56) 64 2233141", email: "escuela_osorno@saw.salvationarmy.org", lat: -40.5769, lng: -73.1393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Colegio William Booth"], image: "", description: "" },
  
  { id: 28, name: "Cuerpo Puerto Montt", address: "Séptimo de Línea 132, Puerto Montt", city: "Puerto Montt", phone: "", email: "Escuela_ptomontt@saw.salvationarmy.org", lat: -41.4669, lng: -72.9393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Colegios"], image: "", description: "" },
  
  { id: 29, name: "Cuerpo Punta Arenas", address: "Bellavista 577-589, Punta Arenas", city: "Punta Arenas", phone: "(56) 61 2224039", email: "CpoPtaArenas@saw.salvationarmy.org", lat: -53.1569, lng: -70.9093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 30, name: "Cuerpo Temuco", address: "Los Sauces 0202, Temuco", city: "Temuco", phone: "", email: "", lat: -38.7369, lng: -72.5993, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto"], image: "", description: "" },
  
  { id: 31, name: "Cuerpo Valdivia", address: "Picarte 1894, Valdivia", city: "Valdivia", phone: "(56) 63 2214404", email: "Jardininf_valdivia@saw.salvationarmy.org", lat: -39.8169, lng: -73.2493, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 32, name: "Cuerpo Central Antofagasta", address: "Sucre 866, Antofagasta", city: "Antofagasta", phone: "", email: "Cpo_CentAnto@saw.salvationarmy.org", lat: -23.6469, lng: -70.3993, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Hogar de Ancianos"], image: "", description: "" },
  
  { id: 33, name: "Cuerpo Lautaro Antofagasta", address: "Castro 5193, Antofagasta", city: "Antofagasta", phone: "", email: "Cpo_Lautaro@saw.salvationarmy.org", lat: -23.6969, lng: -70.3793, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 34, name: "Avanzada Bonilla", address: "Av. Arturo Pérez Canto 1163, Antofagasta", city: "Antofagasta", phone: "(56) 55 2761312", email: "Ejercitodesalvacion_bonilla@yahoo.cl", lat: -23.6869, lng: -70.4093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Comedor Abierto"], image: "", description: "" },
  
  { id: 35, name: "Cuerpo Arica", address: "Av. Cancha Rayada 3839, Arica", city: "Arica", phone: "(56) 58 2211100", email: "Cpo_Arica@saw.salvationarmy.org", lat: -18.4769, lng: -70.3093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Escuela Básica"], image: "", description: "" },
  
  { id: 36, name: "Cuerpo Calama", address: "Antofagasta 62, Calama", city: "Calama", phone: "(56) 55 2311216", email: "Escuela_Calamacen@saw-salvationarmy.org", lat: -22.4569, lng: -68.9293, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Escuela"], image: "", description: "" },
  
  { id: 37, name: "Cuerpo Calama Esmeralda", address: "Irene Frei 2875, Calama", city: "Calama", phone: "(56) 55 2312608", email: "Escuela_CalamaCBooth@saw.salvationarmy.org", lat: -22.4669, lng: -68.9193, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Culto", "Colegio Catherine Booth"], image: "", description: "" },
  
  { id: 38, name: "Cuerpo Copiapó", address: "Av. Carlos Condell 1535, Copiapó", city: "Copiapó", phone: "", email: "Cpo_Copiapo@saw.salvationarmy.org", lat: -27.3669, lng: -70.3393, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Culto", "Jardín Infantil"], image: "", description: "" },
  
  { id: 39, name: "Cuerpo Iquique", address: "Esmeralda 862, Iquique", city: "Iquique", phone: "(56) 57 2421325", email: "Cpo_iquique@saw.salvationarmy.org", lat: -20.2169, lng: -70.1493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Culto", "Sala Cuna"], image: "", description: "" }
];

export default function ChurchLocator() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestChurch, setNearestChurch] = useState(null);
  const [allChurches, setAllChurches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  const cities = [...new Set(churches.map(c => c.city))].sort();
  const allServices = [...new Set(churches.flatMap(c => c.services))].sort();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          findNearestChurch(userPos);
          setLoading(false);
        },
        (err) => {
          setError("No pudimos acceder a tu ubicación. Mostrando todas las iglesias.");
          setAllChurches(churches.map(c => ({ ...c, distance: 0 })));
          setLoading(false);
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
      setAllChurches(churches.map(c => ({ ...c, distance: 0 })));
      setLoading(false);
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findNearestChurch = (userPos) => {
    const churchesWithDistance = churches.map(church => ({
      ...church,
      distance: calculateDistance(userPos.lat, userPos.lng, church.lat, church.lng)
    }));

    churchesWithDistance.sort((a, b) => a.distance - b.distance);
    setNearestChurch(churchesWithDistance[0]);
    setAllChurches(churchesWithDistance);
    setSelectedChurch(churchesWithDistance[0]);
  };

  const openInGoogleMaps = (church) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const filteredChurches = allChurches.filter(church => {
    if (filterCity !== 'all' && church.city !== filterCity) return false;
    if (filterService !== 'all' && !church.services.includes(filterService)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Obteniendo tu ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header con Logo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="bg-white rounded-full p-3">
              <Church className="w-10 h-10 text-blue-600" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold">Ejército de Salvación</h1>
              <p className="text-blue-100">Encuentra la iglesia más cercana</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between text-gray-700 font-semibold"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filtrar Iglesias</span>
            </div>
            <span className="text-sm text-gray-500">
              {filteredChurches.length} resultado{filteredChurches.length !== 1 ? 's' : ''}
            </span>
          </button>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las ciudades</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos los servicios</option>
                  {allServices.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Iglesia más cercana */}
        {nearestChurch && userLocation && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 border-t-4 border-green-500">
            <div className="bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Más Cercana a Ti</h2>
                  <p className="text-sm text-gray-600">A {nearestChurch.distance.toFixed(1)} km de distancia</p>
                </div>
              </div>
            </div>
            
            {nearestChurch.image && (
              <div className="h-48 overflow-hidden">
                <img src={nearestChurch.image} alt={nearestChurch.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{nearestChurch.name}</h3>
              
              {nearestChurch.description && (
                <p className="text-gray-600 mb-4">{nearestChurch.description}</p>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{nearestChurch.address}</span>
                </div>

                {nearestChurch.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a href={`tel:${nearestChurch.phone}`} className="text-blue-600 hover:underline">
                      {nearestChurch.phone}
                    </a>
                  </div>
                )}

                {nearestChurch.schedule.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">Horarios de Culto:</p>
                        {nearestChurch.schedule.map((s, i) => (
                          <div key={i} className="text-gray-700">
                            <span className="font-medium">{s.day}:</span> {s.time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {nearestChurch.services.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Servicios disponibles:</p>
                    <div className="flex flex-wrap gap-2">
                      {nearestChurch.services.map((service, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => openInGoogleMaps(nearestChurch)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition flex items-center justify-center gap-3 shadow-lg"
              >
                <Navigation className="w-6 h-6" />
                Cómo Llegar (Google Maps)
              </button>
            </div>
          </div>
        )}

        {/* Lista de todas las iglesias */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Church className="w-6 h-6 text-blue-600" />
            Todas las Iglesias
          </h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="border border-gray-200 rounded-lg hover:shadow-md transition overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {church.image && (
                    <div className="md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                      <img src={church.image} alt={church.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{church.name}</h3>
                      {userLocation && church.distance > 0 && (
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-2 bg-gray-100 px-3 py-1 rounded-full">
                          {church.distance.toFixed(1)} km
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                      <span>{church.address}</span>
                    </p>

                    {church.schedule.length > 0 && (
                      <div className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                        <div>
                          {church.schedule.slice(0, 2).map((s, i) => (
                            <div key={i}>{s.day}: {s.time}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {church.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {church.services.slice(0, 3).map((service, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedChurch(church);
                          setShowDetails(true);
                        }}
                        className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Info className="w-4 h-4" />
                        Ver Detalles
                      </button>
                      <button
                        onClick={() => openInGoogleMaps(church)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Navigation className="w-4 h-4" />
                        Ir Ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Church className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Ejército de Salvación</h3>
            </div>
            <p className="text-gray-600 mb-2">Sirviendo con amor y dedicación desde 1865</p>
            <p className="text-sm text-gray-500">Dios te bendiga 🙏</p>
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      {showDetails && selectedChurch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedChurch.name}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="hover:bg-blue-700 p-2 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedChurch.image && (
              <div className="h-64 overflow-hidden">
                <img src={selectedChurch.image} alt={selectedChurch.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6 space-y-6">
              {selectedChurch.description && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Acerca de Nosotros</h3>
                  <p className="text-gray-600">{selectedChurch.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Información de Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{selectedChurch.address}</span>
                  </div>
                  {selectedChurch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <a href={`tel:${selectedChurch.phone}`} className="text-blue-600 hover:underline">
                        {selectedChurch.phone}
                      </a>
                    </div>
                  )}
                  {selectedChurch.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a href={`mailto:${selectedChurch.email}`} className="text-blue-600 hover:underline break-all">
                        {selectedChurch.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {selectedChurch.schedule.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Horarios de Culto</h3>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    {selectedChurch.schedule.map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{s.day}</span>
                        <span className="text-gray-700">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedChurch.services.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Servicios Disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedChurch.services.map((service, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => openInGoogleMaps(selectedChurch)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition flex items-center justify-center gap-3 shadow-lg"
              >
                <Navigation className="w-6 h-6" />
                Cómo Llegar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}