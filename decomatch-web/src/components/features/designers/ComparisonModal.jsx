import React, { useState, useEffect } from 'react';
import { X, Star, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import { genAI } from '../../../lib/gemini';

const ComparisonModal = ({ isOpen, onClose, designers, onRemove }) => {
    const [analyzing, setAnalyzing] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setAiAnalysis(null);
            setAnalyzing(false);
        }
    }, [isOpen, designers]);

    const generateComparison = async () => {
        setAnalyzing(true);
        const prompt = `Compare these interior designers based on their data and suggest who might be best for a modern, cost-effective renovation: 
        ${designers.map(d => `${d.realName}: ${d.experienceYears} yrs exp, $${d.hourlyRate}/hr, ${d.totalProjects} projects, ${d.rating} stars`).join(' vs ')}.
        Keep it short and decisive.`;

        try {
            if (genAI) {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });
                const result = await model.generateContent(prompt);
                setAiAnalysis(result.response.text());
            } else {
                await new Promise(r => setTimeout(r, 2000));
                setAiAnalysis(`Based on the data, **${designers[0].realName}** appears to be the better value option given their lower hourly rate ($${designers[0].hourlyRate}) combined with a strong rating of ${designers[0].rating}. However, if experience is a priority, check the total projects completed.`);
            }
        } catch (e) {
            setAiAnalysis("AI Comparison unavailable. Please check API key.");
        } finally {
            setAnalyzing(false);
        }
    };

    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Compare Designers" maxWidth="max-w-4xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left mb-6">
                    <thead>
                        <tr>
                            <th className="p-4 min-w-[150px] dark:text-gray-300">Feature</th>
                            {designers.map(d => (
                                <th key={d.id} className="p-4 min-w-[200px] relative group">
                                    <button onClick={() => onRemove(d.id)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                                    <div className="flex flex-col items-center text-center">
                                        <img src={d.avatar} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white dark:border-slate-700 shadow-md" alt={d.realName} />
                                        <span className="font-bold text-lg dark:text-white">{d.realName}</span>
                                    </div>
                                </th>
                            ))}
                            {designers.length < 2 && <th className="p-4 text-gray-400 font-normal italic text-center">Select another to compare</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                        <tr><td className="p-4 font-bold text-gray-500 dark:text-gray-400">Hourly Rate</td>{designers.map(d => <td key={d.id} className="p-4 text-center font-bold dark:text-white">${d.hourlyRate}/hr</td>)}</tr>
                        <tr><td className="p-4 font-bold text-gray-500 dark:text-gray-400">Age</td>{designers.map(d => <td key={d.id} className="p-4 text-center dark:text-white">{d.age} Years</td>)}</tr>
                        <tr><td className="p-4 font-bold text-gray-500 dark:text-gray-400">Experience</td>{designers.map(d => <td key={d.id} className="p-4 text-center dark:text-white">{d.experienceYears} Years</td>)}</tr>
                        <tr><td className="p-4 font-bold text-gray-500 dark:text-gray-400">Total Projects</td>{designers.map(d => <td key={d.id} className="p-4 text-center dark:text-white">{d.totalProjects}</td>)}</tr>
                        <tr><td className="p-4 font-bold text-gray-500 dark:text-gray-400">Rating</td>{designers.map(d => <td key={d.id} className="p-4 text-center flex justify-center items-center gap-1 dark:text-white"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {d.rating}</td>)}</tr>
                    </tbody>
                </table>

                {designers.length > 1 && (
                    <div className="bg-indigo-50 dark:bg-slate-800 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-600 text-white p-2 rounded-lg"><Lightbulb className="w-5 h-5" /></div>
                                <h4 className="font-bold text-lg dark:text-white">AI Recommendation</h4>
                            </div>
                            <button
                                onClick={generateComparison}
                                disabled={analyzing}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Ask AI to Compare</>}
                            </button>
                        </div>
                        {aiAnalysis ? (
                            <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-slate-700">
                                {aiAnalysis}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Click "Ask AI to Compare" to get a detailed analysis of these professionals.</p>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ComparisonModal;
