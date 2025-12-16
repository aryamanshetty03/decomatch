import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import ContentPage from '../components/layout/ContentPage';

const Pricing = () => (
    <ContentPage title="Pricing Plans">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
            Choose the perfect plan for your design journey.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
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
                        className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                    >
                        Choose {plan.name}
                    </button>
                </motion.div>
            ))}
        </div>
    </ContentPage>
);

export default Pricing;
