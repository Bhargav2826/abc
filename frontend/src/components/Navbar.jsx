import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, FileText, User as UserIcon, PlusCircle, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 border-b border-slate-200/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3 group">
                    <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 rounded-xl shadow-lg shadow-primary-200"
                    >
                        <FileText className="text-white w-6 h-6" />
                    </motion.div>
                    <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        DocPortal
                    </span>
                </Link>

                <div className="flex items-center space-x-2 md:space-x-8">
                    {user ? (
                        <>
                            <div className="hidden md:flex items-center space-x-1">
                                <Link 
                                    to="/dashboard" 
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-semibold ${
                                        isActive('/dashboard') 
                                        ? 'bg-primary-50 text-primary-700' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link 
                                    to="/upload" 
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-semibold ${
                                        isActive('/upload') 
                                        ? 'bg-primary-50 text-primary-700' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Upload</span>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-3 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full"
                                >
                                    <div className="bg-primary-100 p-1.5 rounded-full">
                                        <UserIcon className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 hidden sm:block">{user.name}</span>
                                </motion.div>
                                <button 
                                    onClick={handleLogout}
                                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-primary-600 font-bold px-4 py-2 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                                Create Account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
