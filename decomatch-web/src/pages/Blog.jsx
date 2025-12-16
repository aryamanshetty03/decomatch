import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import { getRealImage } from '../data/mockData';

const Blog = () => (
    <ContentPage title="Design Blog">
        <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden mb-4 h-64">
                        <img src={getRealImage(i + 5)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog post" />
                    </div>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-bold mb-2">Design Trends</div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-indigo-600 transition-colors">Top 10 Interior Design Trends for 2025</h3>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2">Discover the latest styles that are taking the design world by storm, from biophilic elements to sustainable luxury.</p>
                </div>
            ))}
        </div>
    </ContentPage>
);

export default Blog;
