import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-[100px] animate-blob"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white p-12">
                    <div className="text-center mb-12">
                        <div className="bg-primary-600 w-16 h-16 rounded-[20px] mx-auto flex items-center justify-center mb-6 shadow-xl shadow-primary-200">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-3">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input 
                                    type="email"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-500 transition-all outline-none font-medium"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-2">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <button type="button" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                                <input 
                                    type="password"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-500 transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="group w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <LogIn className="w-6 h-6" />}
                            <span className="text-lg font-bold">{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                        </button>
                    </form>

                    <div className="text-center mt-10">
                        <p className="text-slate-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 font-black hover:underline inline-flex items-center space-x-1 group">
                                <span>Create account</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
