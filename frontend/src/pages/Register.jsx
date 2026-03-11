import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, UserPlus, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        
        setIsLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-20 flex items-center justify-center px-6 relative">
            <div className="absolute top-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white p-12 md:p-16">
                    <div className="text-center mb-12">
                        <div className="bg-indigo-600 w-16 h-16 rounded-[20px] mx-auto flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
                            <ShieldCheck className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-3">Create Account</h2>
                        <p className="text-slate-500 font-medium">Join thousands of users managing documents effortlessly</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-2">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="group md:col-span-2 bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95 mt-4"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UserPlus className="w-6 h-6" />}
                            <span className="text-lg font-bold">{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                        </button>
                    </form>

                    <div className="text-center mt-12 pt-8 border-t border-slate-100">
                        <p className="text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 font-black hover:underline inline-flex items-center space-x-1 group">
                                <span>Sign in now</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
