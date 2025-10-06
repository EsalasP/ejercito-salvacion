import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import PublicApp from './PublicApp';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => setShowAdmin(!showAdmin)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        {showAdmin ? 'Ver App Pública' : 'Panel Admin'}
      </button>
      
      {showAdmin ? <AdminPanel /> : <PublicApp />}
    </div>
  );
}

export default App;