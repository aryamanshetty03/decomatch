import React from 'react';
import { Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center text-white font-bold">D</div>
                        <span className="font-bold text-xl dark:text-white">Decomatch</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Pioneering AI-driven interior design solutions for modern living spaces.</p>
                    <div className="flex gap-4 text-gray-400">
                        <a href="#" className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="w-5 h-5 hover:text-indigo-600 cursor-pointer transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4 dark:text-white">Platform</h4>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link to="/" className="hover:text-indigo-600 cursor-pointer">Find Designers</Link></li>
                        <li><Link to="/estimator" className="hover:text-indigo-600 cursor-pointer">AI Estimator</Link></li>
                        <li><Link to="/pricing" className="hover:text-indigo-600 cursor-pointer">Pricing</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 dark:text-white">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link to="/about" className="hover:text-indigo-600 cursor-pointer">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-indigo-600 cursor-pointer">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-indigo-600 cursor-pointer">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-indigo-600 cursor-pointer">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 dark:text-white">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link to="/privacy" className="hover:text-indigo-600 cursor-pointer">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-indigo-600 cursor-pointer">Terms of Service</Link></li>
                        <li><Link to="/cookies" className="hover:text-indigo-600 cursor-pointer">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <div>&copy; 2025 Decomatch AI Inc. All rights reserved.</div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-900 dark:hover:text-white"><Globe className="w-4 h-4" /> English (US)</span>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
