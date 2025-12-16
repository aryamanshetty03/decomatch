import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const modalVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg", zIndex = "z-[100]" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4`}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={modalVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full ${maxWidth} overflow-hidden flex flex-col max-h-[90vh] border border-gray-100 dark:border-slate-800`}
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800 shrink-0">
                            <h3 className="text-xl font-bold dark:text-white">{title}</h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-gray-400"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="overflow-y-auto custom-scrollbar flex-1 p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
