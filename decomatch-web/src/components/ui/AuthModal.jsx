import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Briefcase, ImageIcon, X } from 'lucide-react';
import Modal from './Modal';
import { supabase } from '../../lib/supabase';
import { getRealImage } from '../../data/mockData';

const Input = ({ label, type = "text", placeholder, value, onChange, required }) => (
    <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        email: '', password: '', name: '',
        hourlyRate: '', age: '', experience: '', bio: '', totalProjects: ''
    });
    const [portfolioFiles, setPortfolioFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const fileUrls = files.map(file => URL.createObjectURL(file));
            setPortfolioFiles(prev => [...prev, ...fileUrls]);
        }
    };

    const removeFile = (index) => {
        setPortfolioFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (supabase) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                const { data: designerData } = await supabase
                    .from('designers')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                let clientData = null;
                if (!designerData) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();
                    clientData = profile;

                    if (!clientData) {
                        const { data: newProfile, error: createError } = await supabase
                            .from('profiles')
                            .upsert([{
                                id: data.user.id,
                                full_name: data.user.user_metadata.full_name || 'Valued Client',
                                role: 'client',
                                avatar_url: `https://i.pravatar.cc/150?u=${data.user.id}`
                            }])
                            .select()
                            .single();

                        if (!createError && newProfile) {
                            clientData = newProfile;
                        }
                    }
                }

                const userData = {
                    id: data.user.id,
                    realName: designerData ? designerData.real_name : (clientData ? clientData.full_name : (data.user.user_metadata.full_name || 'User')),
                    role: designerData ? 'designer' : (clientData ? clientData.role : 'client'),
                    email: data.user.email,
                    avatar: designerData?.avatar || clientData?.avatar_url || `https://i.pravatar.cc/150?u=${data.user.id}`,
                    ...designerData
                };

                onLogin(userData);
            }
        } else {
            setTimeout(() => {
                onLogin({ realName: 'Returning User', role: 'client', avatar: 'https://i.pravatar.cc/150?u=me' });
            }, 1000);
        }
    };

    const handleSignupSubmit = (role) => async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const finalPortfolio = portfolioFiles.length > 0 ? portfolioFiles : [getRealImage(11), getRealImage(12)];

        if (supabase) {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { full_name: formData.name, role: role }
                }
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            if (data.user && !data.session) {
                setError("Action Required: Please disable 'Confirm Email' in your Supabase Dashboard to proceed instantly.");
                setLoading(false);
                return;
            }

            if (data.session) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert([{
                        id: data.user.id,
                        full_name: formData.name,
                        role: role,
                        avatar_url: `https://i.pravatar.cc/150?u=${data.user.id}`
                    }]);

                if (profileError) console.error("Profile Insert Error:", profileError);

                if (role === 'designer') {
                    const { error: dbError } = await supabase
                        .from('designers')
                        .insert([
                            {
                                id: data.user.id,
                                real_name: formData.name,
                                role: 'designer',
                                hourly_rate: formData.hourlyRate || 100,
                                age: formData.age || 30,
                                experience_years: formData.experience || 1,
                                bio: formData.bio,
                                total_projects: formData.totalProjects || 0,
                                full_design_fee: (formData.hourlyRate || 100) * 40,
                                style: 'Modern',
                                location: 'Remote',
                                avatar: `https://i.pravatar.cc/150?u=${data.user.id}`,
                                cover: getRealImage(10),
                                portfolio: finalPortfolio
                            }
                        ]);

                    if (dbError) console.error("Designer DB Insert Error", dbError);
                }
            }

            const newUser = {
                id: data.user.id,
                realName: formData.name,
                role: role,
                email: formData.email,
                avatar: `https://i.pravatar.cc/150?u=${data.user.id}`,
                ...(role === 'designer' ? {
                    hourlyRate: formData.hourlyRate,
                    age: formData.age,
                    experienceYears: formData.experience,
                    bio: formData.bio,
                    totalProjects: formData.totalProjects,
                    fullDesignFee: (formData.hourlyRate || 100) * 40,
                    style: 'Modern', rating: 'New', reviews: 0, location: 'Remote',
                    cover: getRealImage(10), portfolio: finalPortfolio, verified: false
                } : {})
            };
            onLogin(newUser);

        } else {
            const newUser = {
                id: 9999,
                realName: formData.name || 'New User',
                role: role,
                avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
                hourlyRate: formData.hourlyRate || 100,
                age: formData.age || 25,
                experienceYears: formData.experience || 1,
                bio: formData.bio || 'Passionate designer ready to work.',
                totalProjects: formData.totalProjects || 0,
                fullDesignFee: (formData.hourlyRate || 100) * 40,
                style: 'Modern', rating: 'New', reviews: 0,
                location: 'Remote',
                cover: getRealImage(10), portfolio: finalPortfolio,
                verified: false
            };
            onLogin(newUser);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? "Welcome Back" : "Join Decomatch"} maxWidth={mode === 'signup-designer' ? "max-w-2xl" : "max-w-md"}>
            {error && <div className={`p-3 rounded-lg mb-4 text-sm font-bold ${error.includes("Success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{error}</div>}

            {mode === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                    <Input label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} className="w-full py-3 bg-gray-900 dark:bg-indigo-600 text-white rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:opacity-50">
                        {loading ? 'Logging in...' : 'Log In'}
                    </motion.button>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Don't have an account? <button type="button" onClick={() => setMode('select-role')} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign Up</button>
                    </div>
                </form>
            )}

            {mode === 'select-role' && (
                <div className="space-y-4">
                    <motion.button whileHover={{ scale: 1.02 }} onClick={() => setMode('signup-client')} className="w-full p-4 border-2 border-gray-100 dark:border-slate-700 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex items-center gap-4 transition-all text-left group">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform"><UserCircle className="w-6 h-6" /></div>
                        <div>
                            <div className="font-bold text-lg dark:text-white">I'm a Client</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">I want to hire designers</div>
                        </div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} onClick={() => setMode('signup-designer')} className="w-full p-4 border-2 border-gray-100 dark:border-slate-700 rounded-2xl hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 flex items-center gap-4 transition-all text-left group">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform"><Briefcase className="w-6 h-6" /></div>
                        <div>
                            <div className="font-bold text-lg dark:text-white">I'm a Designer</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">I want to find work</div>
                        </div>
                    </motion.button>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        <button type="button" onClick={() => setMode('login')} className="hover:text-gray-900 dark:hover:text-white">Back to Login</button>
                    </div>
                </div>
            )}

            {mode === 'signup-client' && (
                <form onSubmit={handleSignupSubmit('client')}>
                    <h4 className="font-bold text-lg mb-4 dark:text-white">Create Client Account</h4>
                    <Input label="Full Name" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <Input label="Email" type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Password" type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50">{loading ? 'Creating...' : 'Create Account'}</motion.button>
                    <button type="button" onClick={() => setMode('select-role')} className="w-full text-sm text-gray-500 dark:text-gray-400 mt-2">Back</button>
                </form>
            )}

            {mode === 'signup-designer' && (
                <form onSubmit={handleSignupSubmit('designer')} className="space-y-4">
                    <h4 className="font-bold text-lg mb-4 dark:text-white">Create Designer Profile</h4>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Full Name" placeholder="e.g. Jane Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <Input label="Age" type="number" placeholder="28" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} required />
                    </div>

                    <Input label="Email" type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Password" type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Experience (Years)" type="number" placeholder="5" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
                        <Input label="Total Projects" type="number" placeholder="12" value={formData.totalProjects} onChange={e => setFormData({ ...formData, totalProjects: e.target.value })} required />
                    </div>

                    <Input label="Hourly Rate ($)" type="number" placeholder="150" value={formData.hourlyRate} onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })} required />

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Professional Bio</label>
                        <textarea
                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500 h-24 resize-none"
                            placeholder="Tell clients what you do..."
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Upload Portfolio (Preview)</label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-sm">Click to upload works</span>
                        </div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {portfolioFiles.length > 0 && (
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                                {portfolioFiles.map((src, idx) => (
                                    <div key={idx} className="relative w-16 h-16 shrink-0 group">
                                        <img src={src} className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-slate-600" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50">{loading ? 'Creating Profile...' : 'Create Profile'}</motion.button>
                    <button type="button" onClick={() => setMode('select-role')} className="w-full text-sm text-gray-500 dark:text-gray-400 mt-2">Back</button>
                </form>
            )}
        </Modal>
    );
};

export default AuthModal;
