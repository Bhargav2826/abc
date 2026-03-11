import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FileText, File as FileIcon, Search, Trash2, Eye, Plus, Loader2, Calendar, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await api.get('/docs');
            setDocs(response.data);
        } catch (error) {
            toast.error('Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        
        try {
            await api.delete(`/docs/${id}`);
            setDocs(docs.filter(doc => doc._id !== id));
            toast.success('Document deleted');
        } catch (error) {
            toast.error('Failed to delete document');
        }
    };

    const filteredDocs = docs.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black text-slate-900 mb-3"
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg font-medium"
                    >
                        Manage your {docs.length} uploaded {docs.length === 1 ? 'document' : 'documents'}.
                    </motion.p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-5 top-5 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Find a document..."
                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none shadow-sm transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center space-x-1">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    <Link to="/upload" className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 flex items-center space-x-2 active:scale-95">
                        <Plus className="w-6 h-6" />
                        <span>Upload New</span>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-600" />
                        </div>
                    </div>
                    <p className="text-slate-400 font-bold mt-6 tracking-wide">INDEXING DOCUMENTS...</p>
                </div>
            ) : docs.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center max-w-4xl mx-auto shadow-sm"
                >
                    <div className="bg-primary-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <FileText className="w-12 h-12 text-primary-400" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">No Documents Found</h3>
                    <p className="text-slate-500 mb-12 text-lg font-medium max-w-sm mx-auto">Your workspace is currently empty. Start by uploading your first PDF or text note.</p>
                    <Link to="/upload" className="inline-flex items-center space-x-3 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95">
                        <Plus className="w-6 h-6" />
                        <span>Upload First Content</span>
                    </Link>
                </motion.div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
                    <AnimatePresence>
                        {filteredDocs.map((doc, index) => (
                            <motion.div
                                key={doc._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`
                                    bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative group overflow-hidden
                                    ${viewMode === 'list' ? 'flex items-center justify-between p-4' : 'p-8'}
                                `}
                            >
                                <div className={viewMode === 'list' ? "flex items-center space-x-6 flex-1" : "space-y-6"}>
                                    <div className={`
                                        p-5 rounded-[24px] shadow-sm flex items-center justify-center transition-transform group-hover:scale-110
                                        ${doc.type === 'pdf' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}
                                    `}>
                                        {doc.type === 'pdf' ? (
                                            <FileIcon className="w-8 h-8" />
                                        ) : (
                                            <FileText className="w-8 h-8" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-black text-slate-900 mb-1 truncate leading-tight">{doc.title}</h3>
                                        <div className="flex items-center text-slate-400 text-sm font-bold space-x-4">
                                            <div className="flex items-center space-x-1.5">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] tracking-widest uppercase border ${doc.type === 'pdf' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                {doc.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={viewMode === 'list' ? "flex items-center space-x-4" : "mt-8 flex items-center space-x-3"}>
                                    <Link 
                                        to={`/viewer/${doc._id}`}
                                        className={`
                                            flex items-center justify-center space-x-2 font-black transition-all active:scale-95
                                            ${viewMode === 'list' 
                                                ? 'bg-primary-50 text-primary-700 px-6 py-3 rounded-2xl hover:bg-primary-100' 
                                                : 'flex-1 bg-slate-900 text-white py-4 rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-100'}
                                        `}
                                    >
                                        <Eye className="w-5 h-5" />
                                        <span>View</span>
                                    </Link>
                                    
                                    <button 
                                        onClick={() => handleDelete(doc._id)}
                                        className={`
                                            flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90
                                            ${viewMode === 'list' ? 'p-3 rounded-2xl border border-slate-100' : 'p-4 rounded-2xl bg-slate-50'}
                                        `}
                                        title="Delete"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
