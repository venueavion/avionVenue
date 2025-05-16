import { useState } from 'react'; // Add this import
import AdminAuth from './AdminAuth';
import ImageManager from './ImageManager';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="admin-container">
      {!isLoggedIn ? (
        <AdminAuth onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <ImageManager onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}
