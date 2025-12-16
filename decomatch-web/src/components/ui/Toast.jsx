import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Toast = ({ message, type = 'success' }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-slate-800 dark:border dark:border-slate-700 text-white px-6 py-3 rounded-full shadow-2xl z-[200] flex items-center gap-3"
    >
        {type === 'error' ? <AlertCircle className="w-5 h-5 text-red-400" /> : <CheckCircle className="w-5 h-5 text-green-400" />}
        <span className="font-medium text-sm">{message}</span>
    </motion.div>
);

export default Toast;
