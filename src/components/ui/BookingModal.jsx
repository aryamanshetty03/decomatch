import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

const BookingModal = ({ isOpen, onClose, designer, onSubmit }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !time) return;
        onSubmit(designer.id, date, time);
        setDate('');
        setTime('');
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Book a Consultation" zIndex="z-[150]">
            <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Schedule a 1-on-1 consultation with <span className="font-bold">{designer?.realName}</span>.
                </p>
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
                    <input
                        type="date"
                        required
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time</label>
                    <input
                        type="time"
                        required
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg dark:shadow-none mt-6">
                    Confirm Booking
                </motion.button>
            </form>
        </Modal>
    );
};

export default BookingModal;
