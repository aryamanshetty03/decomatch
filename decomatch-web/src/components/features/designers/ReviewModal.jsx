import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Modal from '../../ui/Modal';

const ReviewModal = ({ isOpen, onClose, designer, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return;
        onSubmit(designer.id, rating, comment);
        setRating(0);
        setComment("");
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Rate ${designer?.realName}`} zIndex="z-[150]">
            <form onSubmit={handleSubmit} className="text-center space-y-6">
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl inline-block">
                    <img src={designer?.avatar} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white dark:border-slate-700 shadow-sm" alt={designer?.realName} />
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">How was your experience?</p>
                </div>

                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)}
                            className={`transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-200 dark:text-slate-700'}`}
                        >
                            <Star className={`w-10 h-10 ${rating >= star ? 'fill-current' : 'fill-none'}`} strokeWidth={1.5} />
                        </motion.button>
                    ))}
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold h-6">{rating > 0 ? (rating === 5 ? "Excellent!" : rating > 3 ? "Good" : "Thanks for feedback") : ""}</p>

                <textarea
                    className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-colors h-32 resize-none dark:text-white"
                    placeholder="Share details about your collaboration (optional)..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={rating === 0} className={`w-full py-3 rounded-xl font-bold text-white shadow-lg ${rating > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 dark:bg-slate-700 cursor-not-allowed shadow-none'}`}>
                    Submit Review
                </motion.button>
            </form>
        </Modal>
    );
};

export default ReviewModal;
