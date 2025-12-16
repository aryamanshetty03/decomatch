import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Split, Crown, Settings, HelpCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, onNavigate }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 z-[101] shadow-2xl border-r border-gray-100 dark:border-slate-800 flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="font-bold text-xl dark:text-white">Menu</span>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-500 dark:text-gray-400"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-2">Tools</div>
                            <button onClick={() => onNavigate ? onNavigate('estimator') : handleNavigate('/estimator')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <Calculator className="w-5 h-5 text-indigo-500" /> AI Estimator
                            </button>
                            <button onClick={() => onNavigate ? onNavigate('compare') : handleNavigate('/')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <Split className="w-5 h-5 text-blue-500" /> Compare
                            </button>

                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">Platform</div>
                            <button onClick={() => handleNavigate('/pricing')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <Crown className="w-5 h-5 text-yellow-500" /> Pricing & Plans
                            </button>
                            <button onClick={() => handleNavigate('/settings')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <Settings className="w-5 h-5 text-gray-500" /> Settings
                            </button>
                            <button onClick={() => handleNavigate('/help')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <HelpCircle className="w-5 h-5 text-gray-500" /> Help & Support
                            </button>
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                                <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 mb-1"><Sparkles className="w-4 h-4" /> Pro Tip</div>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400">Use our AI Estimator to get instant renovation costs.</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
