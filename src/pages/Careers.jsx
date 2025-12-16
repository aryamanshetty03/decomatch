import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import { Briefcase } from 'lucide-react';

const Careers = () => (
    <ContentPage title="Join Our Team">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We're building the future of interior design. If you're passionate about AI, design, and creating beautiful user experiences, we want to hear from you.
        </p>

        <div className="space-y-4">
            {['Senior Frontend Engineer', 'AI Research Scientist', 'Product Designer', 'Marketing Manager'].map((job) => (
                <div key={job} className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                            <Briefcase className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg dark:text-white">{job}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Remote • Full-time</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 font-bold text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all dark:text-white">Apply Now</button>
                </div>
            ))}
        </div>
    </ContentPage>
);

export default Careers;
