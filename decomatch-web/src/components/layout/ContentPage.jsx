import React from 'react';
import { motion } from 'framer-motion';

const ContentPage = ({ title, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            <h1 className="text-4xl font-extrabold mb-8 dark:text-white">{title}</h1>
            <div className="prose dark:prose-invert max-w-none">
                {children}
            </div>
        </motion.div>
    );
};

export default ContentPage;
