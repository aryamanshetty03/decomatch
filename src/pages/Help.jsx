import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import { HelpCircle, MessageSquare, FileText } from 'lucide-react';

const Help = () => (
    <ContentPage title="Help & Support">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
                { icon: FileText, title: "Documentation", desc: "Read guides and tutorials" },
                { icon: MessageSquare, title: "Community", desc: "Ask questions in our forum" },
                { icon: HelpCircle, title: "Contact Support", desc: "Get help from our team" }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
            ))}
        </div>

        <h3 className="font-bold text-xl mb-4 dark:text-white">Frequently Asked Questions</h3>
        <div className="space-y-4">
            {[
                "How does the AI matching work?",
                "Is Decomatch free to use?",
                "How do I become a verified designer?"
            ].map((q, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                    <h4 className="font-bold dark:text-white mb-2">{q}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            ))}
        </div>
    </ContentPage>
);

export default Help;
