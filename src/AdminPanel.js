import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Save, X, Clock, Users, Phone, Mail } from 'lucide-react';

const initialChurches = [
    // SANTIAGO
  { id: 1, name: "Casa de Tránsito", address: "Zenteno 1489, Santiago", city: "Santiago", phone: "(56) 229 040237", email: "casa_transito@saw.salvationarmy.org", lat: -33.4569, lng: -70.6483, schedule: [{ day: "Lunes a Viernes", time: "9:00 - 17:00" }], services: ["Alojamiento Temporal", "Asistencia Social"], image: "", description: "Casa de acogida temporal" },
  
  { id: 2, name: "Iglesia Avenida Matta", address: "Santiago Concha 1465/1473, Santiago", city: "Santiago", phone: "(56) 2322791961", email: "cpo_avmatta@saw.salvationarmy.org", lat: -33.4589, lng: -70.6693, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Programas Juveniles"], image: "", description: "" },
  
  { id: 3, name: "Iglesia Central", address: "Agustinas 3050, Santiago", city: "Santiago", phone: "(56) 22 681 4875", email: "cpo_centralstgo@saw.salvationarmy.org", lat: -33.4489, lng: -70.6893, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }, { day: "Miércoles", time: "19:00 - 21:00" }], services: ["Reunión Dominical", "Escuela Dominical", "Asistencia Social"], image: "", description: "Iglesia principal del Ejército de Salvación en Santiago" },
  
  { id: 4, name: "Escuela Básica Ejército de Salvación", address: "Herrera 185, Santiago", city: "Santiago", phone: "(56) 22 681 7097", email: "escuela_santiago@saw.salvationarmy.org", lat: -33.4419, lng: -70.6583, schedule: [], services: ["Educación Básica"], image: "", description: "" },
  
  { id: 5, name: "Iglesia El Bosque", address: "Las Vizcachas 858, Pobl. Las Acacias, El Bosque", city: "El Bosque", phone: "(56) 22 529 4242", email: "escuela_elbosque@saw.salvationarmy.org", lat: -33.5669, lng: -70.6783, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Reunión Dominical", "Escuela Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 6, name: "El Faro - Residencial para Varones", address: "Santiago Concha 1333, Santiago", city: "Santiago", phone: "(56) 225553409", email: "Resid_ElFaro@saw.salvationarmy.org", lat: -33.4579, lng: -70.6703, schedule: [], services: ["Residencia", "Rehabilitación"], image: "", description: "" },
  
  { id: 7, name: "Iglesia Lo Valledor", address: "Av. Arturo Alessandri 6342, Pedro Aguirre Cerda", city: "Pedro Aguirre Cerda", phone: "(56) 225215575", email: "Cpo_Lovalledor@saw.salvationarmy.org", lat: -33.4969, lng: -70.6893, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Asistencia Social"], image: "", description: "" },
  
  { id: 8, name: "Iglesia Lo Vial", address: "Gaspar de Soto 790, San Miguel", city: "San Miguel", phone: "(56) 227236759", email: "Cpo_Lovial@saw.salvationarmy.org", lat: -33.4969, lng: -70.6493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 9, name: "Iglesia de Maipú", address: "Maipú 284, Maipú", city: "Maipú", phone: "(56) 225312638", email: "Cpo_maipú@saw.salvationarmy.org", lat: -33.5169, lng: -70.7593, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Asistencia Social"], image: "", description: "" },
  
  { id: 10, name: "Iglesia Neptuno", address: "Los Aromos 833, Lo Prado", city: "Lo Prado", phone: "(56) 227735154", email: "Cpo_Neptuno@saw.salvationarmy.org", lat: -33.4469, lng: -70.7293, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 11, name: "Iglesia Nueva Extremadura", address: "El Fundador 13682, La Pintana", city: "La Pintana", phone: "", email: "Cpo_nvaext@saw.salvationarmy.org", lat: -33.6069, lng: -70.6293, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 12, name: "Hogar de Ancianos Otoño Dorado", address: "Av. La Florida 9995, La Florida", city: "La Florida", phone: "(56) 22875280", email: "Hogar_Odorado@saw.salvationarmy.org", lat: -33.5269, lng: -70.5893, schedule: [], services: ["Hogar de Ancianos"], image: "", description: "" },
  
  { id: 13, name: "Iglesia de Pudahuel", address: "La Unión 9044, Pudahuel", city: "Pudahuel", phone: "(56) 226431875", email: "Cpo_pudahuel@saw.salvationarmy.org", lat: -33.4369, lng: -70.7593, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Escuela Básica"], image: "", description: "" },
  
  { id: 14, name: "Iglesia de Puente Alto", address: "Santo Domingo, Puente Alto", city: "Puente Alto", phone: "(56) 228503331", email: "Cpo_ptealto@saw.salvationarmy.org", lat: -33.6169, lng: -70.5793, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 15, name: "Iglesia Quinta Normal", address: "Mapocho 4130, Quinta Normal", city: "Quinta Normal", phone: "(56) 227751566", email: "Cpo_QtaNormal@saw.salvationarmy.org", lat: -33.4269, lng: -70.7093, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Reunión Dominical", "Emergencias"], image: "", description: "" },
  
  { id: 16, name: "Jardín Infantil Rayitos de Sol", address: "Av. Brasil 73, Santiago", city: "Santiago", phone: "(56) 226993595", email: "Jardín_RaydeSol@saw.salvationarmy.org", lat: -33.4439, lng: -70.6693, schedule: [], services: ["Jardín Infantil"], image: "", description: "" },
  
  { id: 17, name: "Iglesia San Gregorio", address: "12 Poniente 8390, La Granja", city: "La Granja", phone: "", email: "Iglesiasangregorio@hotmail.com", lat: -33.5369, lng: -70.6193, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Casa de la Mujer"], image: "", description: "" },
  
  // OTRAS REGIONES
  { id: 18, name: "Iglesia Barrancas", address: "Independencia 2115, Barrancas, San Antonio", city: "San Antonio", phone: "", email: "Cpo_barrancas@saw.salvationarmy.org", lat: -33.5869, lng: -71.6093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 19, name: "Iglesia Rancagua", address: "Iquique 24 esq. Bolivia, Rancagua", city: "Rancagua", phone: "", email: "Cpo_rancagua@saw.salvationarmy.org", lat: -34.1669, lng: -70.7393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Sala Cuna"], image: "", description: "" },
  
  { id: 20, name: "Iglesia Playa Ancha", address: "Río Frío 450, Playa Ancha, Valparaíso", city: "Valparaíso", phone: "(56) 32 3612558", email: "Cpo_P-Ancha@saw.salvationarmy.org", lat: -33.0469, lng: -71.6193, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 21, name: "Hogar de Hombres Valparaíso", address: "Villagrán 9, Valparaíso", city: "Valparaíso", phone: "(56) 32 2214946", email: "HdeH_valpo@saw.salvationarmy.org", lat: -33.0469, lng: -71.6293, schedule: [], services: ["Residencia"], image: "", description: "" },
  
  { id: 22, name: "Iglesia Ancud", address: "Calle Ejército 721, Ancud", city: "Ancud", phone: "(56) 65 2622045", email: "Cpo_Ancud@saw.salvationarmy.org", lat: -41.8669, lng: -73.8293, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Comedor Abierto"], image: "", description: "" },
  
  { id: 23, name: "Iglesia Angol", address: "Berlín 818, Angol", city: "Angol", phone: "(56) 45 2712583", email: "Cpo_Angol@saw.salvationarmy.org", lat: -37.7969, lng: -72.7093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Centro del Adulto Mayor"], image: "", description: "" },
  
  { id: 24, name: "Iglesia Chillán", address: "Hernando de Magallanes 544, Chillán", city: "Chillán", phone: "(56) 42 2232598", email: "Cpo_Chillán@saw.salvationarmy.org", lat: -36.6069, lng: -72.1093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 25, name: "Iglesia Concepción", address: "Hipólito Salas 760, Concepción", city: "Concepción", phone: "(56) 41 3183687", email: "Cpo_Concepcion@saw.salvationarmy.org", lat: -36.8269, lng: -73.0493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 26, name: "Iglesia Hualpencillo", address: "Av. Alemania 3510, Hualpén", city: "Hualpén", phone: "", email: "Cpo_Hualpencillo@saw.salvationarmy.org", lat: -36.7869, lng: -73.1593, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 27, name: "Iglesia Osorno", address: "Zenteno 1015, Osorno", city: "Osorno", phone: "(56) 64 2233141", email: "escuela_osorno@saw.salvationarmy.org", lat: -40.5769, lng: -73.1393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Colegio William Booth"], image: "", description: "" },
  
  { id: 28, name: "Iglesia Puerto Montt", address: "Séptimo de Línea 132, Puerto Montt", city: "Puerto Montt", phone: "", email: "Escuela_ptomontt@saw.salvationarmy.org", lat: -41.4669, lng: -72.9393, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Colegios"], image: "", description: "" },
  
  { id: 29, name: "Iglesia Punta Arenas", address: "Bellavista 577-589, Punta Arenas", city: "Punta Arenas", phone: "(56) 61 2224039", email: "CpoPtaArenas@saw.salvationarmy.org", lat: -53.1569, lng: -70.9093, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 30, name: "Iglesia Temuco", address: "Los Sauces 0202, Temuco", city: "Temuco", phone: "", email: "", lat: -38.7369, lng: -72.5993, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical"], image: "", description: "" },
  
  { id: 31, name: "Iglesia Valdivia", address: "Picarte 1894, Valdivia", city: "Valdivia", phone: "(56) 63 2214404", email: "Jardininf_valdivia@saw.salvationarmy.org", lat: -39.8169, lng: -73.2493, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 32, name: "Iglesia Central Antofagasta", address: "Sucre 866, Antofagasta", city: "Antofagasta", phone: "", email: "Cpo_CentAnto@saw.salvationarmy.org", lat: -23.6469, lng: -70.3993, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Hogar de Ancianos"], image: "", description: "" },
  
  { id: 33, name: "Iglesia Lautaro Antofagasta", address: "Castro 5193, Antofagasta", city: "Antofagasta", phone: "", email: "Cpo_Lautaro@saw.salvationarmy.org", lat: -23.6969, lng: -70.3793, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 34, name: "Avanzada Bonilla", address: "Av. Arturo Pérez Canto 1163, Antofagasta", city: "Antofagasta", phone: "(56) 55 2761312", email: "Ejercitodesalvacion_bonilla@yahoo.cl", lat: -23.6869, lng: -70.4093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Comedor Abierto"], image: "", description: "" },
  
  { id: 35, name: "Iglesia Arica", address: "Av. Cancha Rayada 3839, Arica", city: "Arica", phone: "(56) 58 2211100", email: "Cpo_Arica@saw.salvationarmy.org", lat: -18.4769, lng: -70.3093, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Escuela Básica"], image: "", description: "" },
  
  { id: 36, name: "Iglesia Calama", address: "Antofagasta 62, Calama", city: "Calama", phone: "(56) 55 2311216", email: "Escuela_Calamacen@saw-salvationarmy.org", lat: -22.4569, lng: -68.9293, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Escuela"], image: "", description: "" },
  
  { id: 37, name: "Iglesia Calama Esmeralda", address: "Irene Frei 2875, Calama", city: "Calama", phone: "(56) 55 2312608", email: "Escuela_CalamaCBooth@saw.salvationarmy.org", lat: -22.4669, lng: -68.9193, schedule: [{ day: "Domingo", time: "11:00 - 13:00" }], services: ["Reunión Dominical", "Colegio Catherine Booth"], image: "", description: "" },
  
  { id: 38, name: "Iglesia Copiapó", address: "Av. Carlos Condell 1535, Copiapó", city: "Copiapó", phone: "", email: "Cpo_Copiapo@saw.salvationarmy.org", lat: -27.3669, lng: -70.3393, schedule: [{ day: "Domingo", time: "10:30 - 12:30" }], services: ["Reunión Dominical", "Jardín Infantil"], image: "", description: "" },
  
  { id: 39, name: "Iglesia Iquique", address: "Esmeralda 862, Iquique", city: "Iquique", phone: "(56) 57 2421325", email: "Cpo_iquique@saw.salvationarmy.org", lat: -20.2169, lng: -70.1493, schedule: [{ day: "Domingo", time: "10:00 - 12:00" }], services: ["Reunión Dominical", "Sala Cuna"], image: "", description: "" }
];

export default function AdminPanel() {
  const [churches, setChurches] = useState(initialChurches);
  const [editingChurch, setEditingChurch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterCity, setFilterCity] = useState('all');

  const ADMIN_PASSWORD = 'admin123';
  const cities = [...new Set(churches.map(c => c.city))].sort();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleSaveChurch = (church) => {
    if (church.id) {
      setChurches(churches.map(c => c.id === church.id ? church : c));
    } else {
      setChurches([...churches, { ...church, id: Date.now() }]);
    }
    setEditingChurch(null);
    setShowForm(false);
  };

  const handleDeleteChurch = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta iglesia?')) {
      setChurches(churches.filter(c => c.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(churches, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'iglesias-ejercito-salvacion.json';
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel Administrativo</h1>
            <p className="text-gray-600">Ejército de Salvación</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa la contraseña"
              />
              <p className="text-xs text-gray-500 mt-2">Demo: admin123</p>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredChurches = filterCity === 'all' 
    ? churches 
    : churches.filter(c => c.city === filterCity);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Panel Administrativo</h1>
              <p className="text-blue-100">Gestión de Iglesias - Ejército de Salvación</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Exportar
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <label className="font-semibold text-gray-700">Ciudad:</label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <span className="text-gray-600">
              {filteredChurches.length} iglesia{filteredChurches.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={() => {
              setEditingChurch({
                name: '', address: '', city: '', phone: '', email: '',
                lat: -33.4489, lng: -70.6893,
                schedule: [], services: [], image: '', description: ''
              });
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Iglesia
          </button>
        </div>

        {showForm && editingChurch && (
          <ChurchForm
            church={editingChurch}
            onSave={handleSaveChurch}
            onCancel={() => {
              setShowForm(false);
              setEditingChurch(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChurches.map(church => (
            <div key={church.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              {church.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={church.image} alt={church.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{church.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{church.address}</span>
                  </p>
                  {church.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{church.phone}</span>
                    </p>
                  )}
                  {church.schedule.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        {church.schedule.map((s, i) => (
                          <div key={i}>{s.day}: {s.time}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {church.services.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {church.services.map((service, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingChurch(church);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteChurch(church.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChurchForm({ church, onSave, onCancel }) {
  const [formData, setFormData] = useState(church);
  const [newSchedule, setNewSchedule] = useState({ day: '', time: '' });
  const [newService, setNewService] = useState('');

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.city) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    onSave(formData);
  };

  const addSchedule = () => {
    if (newSchedule.day && newSchedule.time) {
      setFormData({
        ...formData,
        schedule: [...formData.schedule, newSchedule]
      });
      setNewSchedule({ day: '', time: '' });
    }
  };

  const removeSchedule = (index) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index)
    });
  };

  const addService = () => {
    if (newService.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()]
      });
      setNewService('');
    }
  };

  const removeService = (index) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8">
        <div className="bg-blue-600 text-white p-6 rounded-t-lg flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {church.id ? 'Editar Iglesia' : 'Nueva Iglesia'}
          </h2>
          <button onClick={onCancel} className="hover:bg-blue-700 p-2 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nombre *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Ciudad *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Dirección *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Latitud *</label>
              <input
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Busca en Google Maps</p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Longitud *</label>
              <input
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">URL de Imagen</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Horarios de Culto</label>
            <div className="space-y-2 mb-3">
              {formData.schedule.map((sched, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span className="flex-1">{sched.day}: {sched.time}</span>
                  <button
                    onClick={() => removeSchedule(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={newSchedule.day}
                onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Día</option>
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miércoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sábado</option>
                <option>Domingo</option>
              </select>
              <input
                type="text"
                value={newSchedule.time}
                onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                placeholder="Ej: 10:00 - 12:00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addSchedule}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Servicios Disponibles</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.services.map((service, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {service}
                  <button
                    onClick={() => removeService(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addService()}
                placeholder="Ej: Culto, Escuela Dominical"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addService}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar Iglesia
            </button>
            <button
              onClick={onCancel}
              className="px-6 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}