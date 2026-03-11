import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Shield, Zap, Search, ArrowRight, MousePointer2 } from 'lucide-react';

const Landing = () => {
    return (
        <div className="relative overflow-hidden pt-20 pb-40">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-1/4 -z-10 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
            <div className="absolute top-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 -z-10 w-[700px] h-[700px] bg-blue-100/30 rounded-full mix-blend-multiply filter blur-[150px] animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold border border-primary-100 mb-8"
                    >
                        <Zap className="w-4 h-4" />
                        <span>The Modern Way to Manage Documents</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1]"
                    >
                        Host & View Documents <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                            Without Friction
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        DocPortal is a high-performance workspace for your PDFs and text content. 
                        No downloads required—just upload once and view from anywhere.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <Link to="/register" className="group w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl hover:shadow-primary-500/20 active:scale-95 flex items-center justify-center space-x-2">
                            <span>Get Started Free</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                            Sign In
                        </Link>
                    </motion.div>
                </div>

                {/* Dashboard Preview Mockup */}
                <motion.div 
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="relative group mb-32"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-[32px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden p-4">
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 h-[500px] flex items-center justify-center relative overflow-hidden">
                            <div className="grid grid-cols-3 gap-6 w-full max-w-4xl p-8 opacity-40">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 h-40 shadow-sm transition-all hover:shadow-lg">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4 animate-pulse"></div>
                                        <div className="w-2/3 h-4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-slate-100 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="bg-white/80 backdrop-blur-md px-8 py-6 rounded-3xl border border-white shadow-2xl flex items-center space-x-4"
                                >
                                    <div className="bg-primary-600 p-3 rounded-2xl text-white">
                                        <MousePointer2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-black text-xl">Interactive Workflow</p>
                                        <p className="text-slate-500 font-medium">Click any document to view immediately.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <FeatureCard 
                        icon={<Shield className="w-8 h-8 text-primary-600" />}
                        title="Hyper-Secure"
                        description="Military-grade security for your private files. Only you have access to your uploaded content."
                    />
                    <FeatureCard 
                        icon={<Zap className="w-8 h-8 text-indigo-600" />}
                        title="Instant Preview"
                        description="Powered by a custom-built viewing engine. Read PDFs and text seamlessly on any device."
                    />
                    <FeatureCard 
                        icon={<Search className="w-8 h-8 text-sky-600" />}
                        title="Smart Indexing"
                        description="Never lose a document again. Our lightning-fast search helps you find anything in milliseconds."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative group"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
        <div className="bg-slate-50 w-20 h-20 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium text-lg">{description}</p>
    </motion.div>
);

export default Landing;
