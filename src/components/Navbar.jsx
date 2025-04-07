import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-blue-800 text-white px-6 py-3 shadow-md flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center gap-3">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-300 transition"
          onClick={() => navigate('/dashboard')}
        >
          Notice Board
        </h1>
      </div>

      <div className="flex gap-4 items-center text-sm">
        {user?.role === 'admin' && (
          <>
            {isAdminPage ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="hover:underline text-blue-200"
              >
                ← Go Back to Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/admin/users')}
                className="hover:underline text-blue-200"
              >
                Manage Users
              </button>
            )}
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
