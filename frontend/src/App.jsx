import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Viewer from './pages/Viewer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '16px',
                background: '#333',
                color: '#fff',
                padding: '12px 24px',
              },
            }}
          />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/viewer/:id" 
                element={
                  <ProtectedRoute>
                    <Viewer />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <footer className="py-12 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DocPortal. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
