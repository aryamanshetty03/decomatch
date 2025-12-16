import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import ContentPage from '../components/layout/ContentPage';

const EstimatorPage = () => {
    const [step, setStep] = useState(1);
    const [calculating, setCalculating] = useState(false);
    const [result, setResult] = useState(null);
    const [inputs, setInputs] = useState({ room: 'Living Room', quality: 'Standard', sqft: 250 });

    const calculate = () => {
        setCalculating(true);
        setTimeout(() => {
            const base = inputs.sqft * (inputs.quality === 'Luxury' ? 150 : inputs.quality === 'Standard' ? 80 : 40);
            setResult(base);
            setCalculating(false);
            setStep(2);
        }, 1500);
    };

    return (
        <ContentPage title="AI Price Estimator">
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl">
                {step === 1 ? (
                    <div className="space-y-6">
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl flex gap-3">
                            <Bot className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
                            <div className="text-sm text-purple-800 dark:text-purple-200">
                                Our AI analyzes current market rates to estimate your budget.
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Room Type</label>
                            <select className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
                                value={inputs.room} onChange={e => setInputs({ ...inputs, room: e.target.value })}>
                                <option>Living Room</option>
                                <option>Kitchen</option>
                                <option>Bedroom</option>
                                <option>Bathroom</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Quality Level</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Budget', 'Standard', 'Luxury'].map(q => (
                                    <button key={q} onClick={() => setInputs({ ...inputs, quality: q })}
                                        className={`py-3 rounded-xl border font-bold text-sm transition-colors ${inputs.quality === q ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' : 'border-gray-200 dark:border-slate-700 dark:text-gray-300'}`}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Area (Sq Ft)</label>
                            <input type="number" value={inputs.sqft} onChange={e => setInputs({ ...inputs, sqft: e.target.value })}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none" />
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={calculate} disabled={calculating} className="w-full py-4 ai-gradient text-white rounded-xl font-bold mt-4 flex justify-center items-center gap-2">
                            {calculating ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-4 h-4" /> Calculate Estimate</>}
                        </motion.button>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">Estimated Budget</h3>
                        <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">${(result * 0.9).toLocaleString()} - ${(result * 1.1).toLocaleString()}</div>
                        <button onClick={() => setStep(1)} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Calculate Another</button>
                    </div>
                )}
            </div>
        </ContentPage>
    );
};

export default EstimatorPage;
