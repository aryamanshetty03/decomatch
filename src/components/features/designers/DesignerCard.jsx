import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin, Zap } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const DesignerCard = ({ designer, onCompare, isComparing, onViewProfile }) => {
    return (
        <motion.div
            variants={fadeIn}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 rounded-[24px] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full relative"
        >
            <div className="h-60 relative overflow-hidden">
                <img src={designer.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Designer+Image'} alt={designer.realName} />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-slate-900 dark:text-white">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" /> {designer.rating}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-1 dark:text-white">
                            {designer.realName}
                            {designer.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                        </h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {designer.location}
                        </div>
                    </div>
                    <img src={designer.avatar} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm -mt-10" alt={designer.realName} />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 mt-2">{designer.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{designer.style}</span>
                    {designer.availabilityStatus === 'Available' ? (
                        <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1"><Zap className="w-3 h-3" /> Available</span>
                    ) : (
                        <span className="text-[10px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full">Busy</span>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                        onClick={() => onCompare(designer)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${isComparing ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                    >
                        {isComparing ? 'Comparing' : 'Compare'}
                    </button>
                    <button
                        onClick={() => onViewProfile(designer)}
                        className="flex-1 py-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default DesignerCard;
