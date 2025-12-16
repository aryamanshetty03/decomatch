import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Loader2, ArrowRight, MessageSquare } from 'lucide-react';
import { genAI } from '../../../lib/gemini';

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'ai', text: 'Hi! I am Decomatch AI. Ask me about styles, designers, or budget estimates.' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const send = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            if (!genAI) {
                throw new Error("API Key missing");
            }
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });
            const result = await model.generateContent(userMsg);
            const response = await result.response;
            const text = response.text();
            setMessages(prev => [...prev, { role: 'ai', text }]);
        } catch (error) {
            let errMsg = "I'm having trouble connecting right now.";
            if (!genAI) errMsg = "Please configure your API Key in the code to chat.";
            setMessages(prev => [...prev, { role: 'ai', text: errMsg }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden"
                    >
                        <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2 font-bold"><Bot className="w-5 h-5" /> Decomatch AI</div>
                            <button onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
                        </div>
                        <div className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-slate-800 space-y-3 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-bl-none'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="flex justify-start"><div className="bg-white dark:bg-slate-700 p-3 rounded-xl border border-gray-200 dark:border-slate-600"><Loader2 className="w-4 h-4 animate-spin text-gray-500 dark:text-gray-400" /></div></div>}
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-2">
                            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything..." className="flex-1 text-sm outline-none bg-transparent dark:text-white" />
                            <button onClick={send} className="text-indigo-600 dark:text-indigo-400 font-bold"><ArrowRight className="w-5 h-5" /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-full ai-gradient text-white flex items-center justify-center shadow-lg"
            >
                <MessageSquare className="w-7 h-7" />
            </motion.button>
        </div>
    );
};

export default ChatBot;
