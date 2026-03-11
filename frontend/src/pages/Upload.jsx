import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FileText, File as FileIcon, Upload as UploadIcon, Type, CheckCircle2, ChevronLeft, Loader2, Sparkles, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = () => {
    const [uploadType, setUploadType] = useState('text'); // 'text' or 'pdf'
    const [title, setTitle] = useState('');
    const [textContent, setTextContent] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            toast.error('Please select a PDF file');
            return;
        }
        if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }
        setFile(selectedFile);
    };

    const clearFile = () => setFile(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (uploadType === 'text') {
                await api.post('/docs/upload-text', { title, textContent });
            } else {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('pdf', file);
                await api.post('/docs/upload-pdf', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            toast.success('Document uploaded successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <motion.button 
                whileHover={{ x: -5 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-slate-500 hover:text-primary-600 font-bold tracking-tight transition-colors mb-12"
            >
                <ChevronLeft className="w-5 h-5" />
                <span>BACK TO DASHBOARD</span>
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column - Form */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-10 md:p-14 relative">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                        
                        <div className="relative mb-12">
                            <h1 className="text-4xl font-black text-slate-900 mb-4">Create Content</h1>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                Fill in the details below to add a new document to your secure workspace.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 relative">
                            {/* Type Switcher */}
                            <div className="bg-slate-50 p-2 rounded-[28px] flex space-x-2 border border-slate-100">
                                <button 
                                    type="button"
                                    onClick={() => setUploadType('text')}
                                    className={`
                                        flex-1 flex items-center justify-center space-x-3 py-4 rounded-2xl font-black transition-all
                                        ${uploadType === 'text' ? 'bg-white shadow-xl shadow-slate-200/50 text-slate-900' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    <Type className="w-5 h-5" />
                                    <span>TEXT CONTENT</span>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setUploadType('pdf')}
                                    className={`
                                        flex-1 flex items-center justify-center space-x-3 py-4 rounded-2xl font-black transition-all
                                        ${uploadType === 'pdf' ? 'bg-white shadow-xl shadow-slate-200/50 text-slate-900' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    <FileIcon className="w-5 h-5" />
                                    <span>PDF DOCUMENT</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-black text-slate-700 tracking-wider ml-2">DOCUMENT TITLE</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-500 outline-none transition-all font-bold text-lg placeholder:text-slate-300"
                                    placeholder="Enter a descriptive title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {uploadType === 'text' ? (
                                    <motion.div 
                                        key="text-form"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-4"
                                    >
                                        <label className="text-sm font-black text-slate-700 tracking-wider ml-2">TEXT CONTENT</label>
                                        <textarea 
                                            required
                                            rows="12"
                                            className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-500 outline-none transition-all font-medium text-lg leading-relaxed placeholder:text-slate-300 resize-none"
                                            placeholder="Type or paste your content here..."
                                            value={textContent}
                                            onChange={(e) => setTextContent(e.target.value)}
                                        ></textarea>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="pdf-form"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-4">
                                            <label className="text-sm font-black text-slate-700 tracking-wider ml-2 uppercase">Selective Upload</label>
                                            <div className="relative">
                                                {!file ? (
                                                    <>
                                                        <input 
                                                            type="file"
                                                            accept=".pdf"
                                                            required
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                            id="file-upload"
                                                        />
                                                        <label 
                                                            htmlFor="file-upload"
                                                            className="flex flex-col items-center justify-center w-full h-[320px] border-4 border-dashed border-slate-100 rounded-[40px] hover:border-primary-400 hover:bg-primary-50/20 transition-all cursor-pointer group bg-slate-50/50"
                                                        >
                                                            <div className="bg-white p-6 rounded-[28px] shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6">
                                                                <UploadIcon className="w-10 h-10 text-primary-500" />
                                                            </div>
                                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & Drop PDF</h3>
                                                            <p className="text-slate-400 font-medium">Size limit: 10MB per file</p>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <div className="relative flex flex-col items-center justify-center w-full h-[320px] bg-primary-50 border-2 border-primary-200 rounded-[40px]">
                                                        <button 
                                                            onClick={clearFile}
                                                            className="absolute top-6 right-6 p-2 bg-white text-slate-400 hover:text-red-500 rounded-full shadow-md transition-all"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                        <div className="bg-white p-8 rounded-[32px] shadow-xl mb-6 border border-primary-100">
                                                            <FileIcon className="w-16 h-16 text-primary-600" />
                                                        </div>
                                                        <p className="text-primary-900 font-black text-xl mb-1 truncate max-w-[80%]">{file.name}</p>
                                                        <p className="text-primary-600 font-bold text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB • READY TO SHIP</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                type="submit"
                                disabled={isLoading || (uploadType === 'pdf' && !file)}
                                className="w-full bg-slate-900 text-white font-black py-6 rounded-[32px] hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] group"
                            >
                                {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadIcon className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />}
                                <span className="text-xl">PUBLISH DOCUMENT</span>
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Right Column - Info */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <Sparkles className="w-12 h-12 mb-6 text-primary-200" />
                        <h3 className="text-2xl font-black mb-4 leading-tight">Pro Tips for Uploading</h3>
                        <ul className="space-y-4 font-bold text-primary-100">
                            <li className="flex items-start space-x-3">
                                <CheckCircle2 className="w-5 h-5 mt-1 text-primary-300 flex-shrink-0" />
                                <span>Use clear, searchable titles for better indexing.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle2 className="w-5 h-5 mt-1 text-primary-300 flex-shrink-0" />
                                <span>Ensure PDFs are not password-protected for viewing.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle2 className="w-5 h-5 mt-1 text-primary-300 flex-shrink-0" />
                                <span>Text notes are best for temporary content.</span>
                            </li>
                        </ul>
                    </motion.div>

                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-black text-slate-900 tracking-widest">ENCRYPTION ACTIVE</span>
                        </div>
                        <p className="text-slate-500 font-medium">
                            Your files are encrypted mid-transit and stored in our high-availability cloud cluster.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
