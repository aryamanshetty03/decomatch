import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import { Bell, Lock, User, Moon } from 'lucide-react';

const Settings = () => (
    <ContentPage title="Settings">
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white"><User className="w-5 h-5" /> Account</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Profile Visibility</span>
                        <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Email Notifications</span>
                        <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white"><Lock className="w-5 h-5" /> Security</h3>
                <button className="text-indigo-600 font-bold hover:underline">Change Password</button>
            </div>
        </div>
    </ContentPage>
);

export default Settings;
