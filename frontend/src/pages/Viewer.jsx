import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ChevronLeft, Loader2, Download, FileText, Calendar, Maximize2, Minimize2, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// PDF Viewer
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ViewerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doc, setDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        fetchDocument();
    }, [id]);

    const fetchDocument = async () => {
        try {
            const response = await api.get(`/docs/${id}`);
            setDoc(response.data);
        } catch (error) {
            toast.error('Document not found');
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                toast.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-slate-900" />
                    </div>
                </div>
                <p className="mt-10 text-slate-400 font-black tracking-widest text-sm uppercase">PREPARING WORKSPACE...</p>
            </div>
        );
    }

    if (!doc) return null;

    return (
        <div className={`transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100] bg-slate-900' : 'max-w-7xl mx-auto px-6 py-12'}`}>
            {/* Action Bar */}
            <div className={`
                flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-200/50
                ${isFullscreen ? 'hidden' : ''}
            `}>
                <div className="flex items-center space-x-6">
                    <motion.button 
                        whileHover={{ scale: 1.1, x: -5 }}
                        onClick={() => navigate('/dashboard')}
                        className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{doc.title}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-slate-400 text-sm font-bold space-x-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] tracking-widest font-black uppercase border ${doc.type === 'pdf' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                {doc.type}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button 
                        onClick={toggleFullscreen}
                        className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all shadow-sm"
                        title="Toggle Fullscreen"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                    {doc.type === 'pdf' ? (
                        <a 
                            href={`${api.defaults.baseURL.replace('/api', '')}${doc.fileUrl}`} 
                            download 
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                        >
                            <Download className="w-5 h-5" />
                            <span>DOWNLOAD PDF</span>
                        </a>
                    ) : (
                        <button 
                            onClick={() => window.print()}
                            className="flex items-center justify-center space-x-3 bg-primary-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95"
                        >
                            <Printer className="w-5 h-5" />
                            <span>PRINT CONTENT</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Container */}
            <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                    bg-white shadow-2xl overflow-hidden relative
                    ${isFullscreen ? 'w-full h-full rounded-0' : 'rounded-[40px] border border-slate-100 min-h-[80vh]'}
                `}
            >
                {isFullscreen && (
                    <button 
                        onClick={() => {
                            document.exitFullscreen();
                            setIsFullscreen(false);
                        }}
                        className="absolute top-8 right-8 z-[110] p-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-all"
                    >
                        <Minimize2 className="w-6 h-6" />
                    </button>
                )}

                {doc.type === 'text' ? (
                    <div className="max-w-4xl mx-auto px-10 py-16 md:px-20 md:py-24">
                        <div className="prose prose-slate prose-xl max-w-none">
                            <div className="flex items-center space-x-3 mb-12 opacity-30">
                                <div className="h-px bg-slate-900 flex-1"></div>
                                <FileText className="w-6 h-6" />
                                <div className="h-px bg-slate-900 flex-1"></div>
                            </div>
                            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap font-medium text-xl first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                                {doc.textContent}
                            </p>
                            <div className="mt-20 flex justify-center opacity-30">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`${isFullscreen ? 'h-screen' : 'h-[850px]'} w-full overflow-hidden`}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={`${api.defaults.baseURL.replace('/api', '')}${doc.fileUrl}`}
                                plugins={[defaultLayoutPluginInstance]}
                                theme="light"
                            />
                        </Worker>
                    </div>
                )}
            </motion.div>
            
            {/* Footer space */}
            {!isFullscreen && <div className="h-20"></div>}
        </div>
    );
};

export default ViewerPage;
