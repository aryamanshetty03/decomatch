import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import Modal from './Modal';

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
    const [processingPlan, setProcessingPlan] = useState(null);

    const handleChoose = (planName) => {
        setProcessingPlan(planName);
        setTimeout(() => {
            onSubscribe(planName);
            setProcessingPlan(null);
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Unlock AI Superpowers" maxWidth="max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6 p-2">
                {[
                    { name: 'Free', price: '0', features: ['Browse Designers', 'Basic Search', 'View Profiles'] },
                    { name: 'Pro AI', price: '29', features: ['Unlimited AI Estimates', 'Advanced Comparison', 'Priority Booking', 'AI Style Match'], popular: true },
                    { name: 'Business', price: '99', features: ['All Pro Features', 'Dedicated Support', 'Team Accounts', 'API Access'] }
                ].map(plan => (
                    <motion.div
                        key={plan.name}
                        whileHover={{ scale: 1.03 }}
                        className={`relative p-6 rounded-2xl border ${plan.popular ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 shadow-xl scale-105' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
                    >
                        {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>}
                        <h3 className="text-xl font-bold mb-2 dark:text-white">{plan.name}</h3>
                        <div className="text-3xl font-bold mb-6 dark:text-white">${plan.price}<span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/mo</span></div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle className={`w-4 h-4 ${plan.popular ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`} /> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleChoose(plan.name)}
                            disabled={!!processingPlan}
                            className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                        >
                            {processingPlan === plan.name ? <Loader2 className="w-4 h-4 animate-spin" /> : `Choose ${plan.name}`}
                        </button>
                    </motion.div>
                ))}
            </div>
        </Modal>
    );
};

export default SubscriptionModal;
