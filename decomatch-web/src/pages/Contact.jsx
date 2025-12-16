import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
    <ContentPage title="Contact Us">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We'd love to hear from you. Whether you have a question about our platform, need help with a booking, or just want to say hello, our team is ready to assist.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold dark:text-white">Email Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">support@decomatch.ai</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold dark:text-white">Call Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold dark:text-white">Visit Us</h3>
                        <p className="text-gray-500 dark:text-gray-400">123 Design Avenue, Creative City, NY 10012</p>
                    </div>
                </div>
            </div>

            <form className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-xl mb-4 dark:text-white">Send a Message</h3>
                <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-indigo-500 dark:text-white" />
                <input type="email" placeholder="Your Email" className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-indigo-500 dark:text-white" />
                <textarea placeholder="Message" className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:border-indigo-500 h-32 resize-none dark:text-white"></textarea>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Send Message</button>
            </form>
        </div>
    </ContentPage>
);

export default Contact;
