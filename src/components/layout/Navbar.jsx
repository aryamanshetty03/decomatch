import React from 'react';
import { Menu, Sparkles, Sun, Moon, LogOut } from 'lucide-react';

const Navbar = ({
    setIsSidebarOpen,
    userPlan,
    toggleDarkMode,
    darkMode,
    user,
    onLogout,
    onLoginClick
}) => {
    return (
        <nav className="fixed w-full z-50 top-0 pt-4 px-4">
            <div className="max-w-7xl mx-auto glass-panel dark:bg-slate-900/90 dark:border-slate-800 rounded-full px-6 py-3 shadow-sm flex justify-between items-center relative">

                {/* Left: Hamburger Menu */}
                <div className="flex items-center">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center text-white font-bold"><Sparkles className="w-5 h-5" /></div>
                    <span className="font-bold text-lg tracking-tight dark:text-white">Decomatch <span className="ai-text">AI</span></span>
                </div>

                {/* Right: Controls & Auth */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {userPlan !== 'Free' && (
                        <span className="hidden sm:inline-block px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {userPlan === 'Pro AI' ? 'PRO' : 'BIZ'}
                        </span>
                    )}
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-slate-700">
                            <img src={user.avatar} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 dark:border-slate-700" alt="User Avatar" />
                            <div className="hidden md:block text-right">
                                <div className="text-xs font-bold dark:text-white">{user.realName}</div>
                            </div>
                            <button onClick={onLogout} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><LogOut className="w-4 h-4 text-red-500" /></button>
                        </div>
                    ) : (
                        <button onClick={onLoginClick} className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg ml-2">Sign In</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
