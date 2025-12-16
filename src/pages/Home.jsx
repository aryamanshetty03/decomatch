import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MapPin, Search, Sparkles, ShieldCheck, ImageIcon, ThumbsUp, Star, X } from 'lucide-react';
import { INITIAL_DESIGNERS, getRealImage } from '../data/mockData';
import { supabase } from '../lib/supabase';
import DesignerCard from '../components/features/designers/DesignerCard';
import ComparisonModal from '../components/features/designers/ComparisonModal';
import Modal from '../components/ui/Modal';
import BookingModal from '../components/ui/BookingModal';
import ReviewModal from '../components/features/designers/ReviewModal';

import BackgroundBlobs from '../components/ui/BackgroundBlobs';

const Home = ({ user, showToast }) => {
    // ... existings state ...
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("All");
    const [designers, setDesigners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comparisonList, setComparisonList] = useState([]);

    // ... modals state ...
    const [selectedDesigner, setSelectedDesigner] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    useEffect(() => {
        const fetchDesigners = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('designers')
                    .select('*');

                if (error) throw error;

                if (data && data.length > 0) {
                    // Normalize keys if needed or rely on matching Schema
                    setDesigners(data);
                } else {
                    console.log("No data in DB, using mock");
                    setDesigners(INITIAL_DESIGNERS);
                }
            } catch (error) {
                console.error("Supabase fetch error:", error);
                // Fallback to mock data for demo purposes
                setDesigners(INITIAL_DESIGNERS);
                showToast("Loaded demo data (DB Connection issues)", "info");
            } finally {
                setLoading(false);
            }
        };

        fetchDesigners();
    }, []);

    // Filter logic
    const filteredDesigners = designers.filter(d =>
        (selectedStyle === "All" || d.style === selectedStyle) &&
        (d.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Helpers
    const toggleComparison = (designer) => {
        if (comparisonList.find(d => d.id === designer.id)) {
            setComparisonList(prev => prev.filter(d => d.id !== designer.id));
            showToast(`Removed ${designer.realName} from comparison`, 'success');
        } else {
            if (comparisonList.length >= 3) {
                showToast("You can compare up to 3 designers", 'error');
                return;
            }
            setComparisonList(prev => [...prev, designer]);
            showToast(`Added ${designer.realName} to comparison`, 'success');
        }
    };

    const handleReviewSubmit = (id, rating, comment) => {
        setDesigners(prev => prev.map(d => {
            if (d.id === id) {
                const newCount = d.reviews + 1;
                const newRating = ((parseFloat(d.rating) * d.reviews + rating) / newCount).toFixed(1);
                return { ...d, rating: newRating, reviews: newCount };
            }
            return d;
        }));
        setIsReviewOpen(false);
        showToast("Review submitted successfully!");
    };

    const TRENDING_STYLES = [
        { name: "Japandi", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80", desc: "Japanese rustic minimalism meets Scandinavian functionality." },
        { name: "Biophilic", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=400&q=80", desc: "Bringing the outdoors in with natural materials and greenery." },
        { name: "Maximalism", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80", desc: "Bold colors, patterns, and textures for a unique statement." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="pb-20 relative">
            <BackgroundBlobs />

            {/* --- Alive Hero Section --- */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-bold mb-6 border border-indigo-100 dark:border-indigo-800 backdrop-blur-md">
                            ✨ AI-Powered Interior Design
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1] dark:text-white drop-shadow-sm">
                            Reimagine Your Home <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">Intelligent Design</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                            Connect with top-tier designers, visualize styles with AI, and transform your space effortlessly.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div variants={itemVariants} className="max-w-2xl mx-auto relative group z-20">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center p-2 border border-white/20 dark:border-slate-700/50">
                                <Search className="w-6 h-6 text-gray-400 ml-3" />
                                <input
                                    type="text"
                                    placeholder="Search by style, location, or designer name..."
                                    className="w-full p-4 outline-none text-lg bg-transparent dark:text-white placeholder-gray-400 font-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg transform active:scale-95">
                                    Search
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- Trending Styles Section (New Feature) --- */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white mb-2">Trending Styles</h2>
                        <p className="text-gray-500 dark:text-gray-400">Popular aesthetics this month</p>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View All</button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {TRENDING_STYLES.map((style, idx) => (
                        <motion.div
                            key={style.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                            onClick={() => { setSelectedStyle(style.name === "Biophilic" ? "Bohemian" : style.name); setSearchTerm(""); }} // Map to closest mock style
                        >
                            <img src={style.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-white text-xl font-bold mb-1">{style.name}</h3>
                                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{style.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Main Content --- */}
            <main className="max-w-7xl mx-auto px-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-10 justify-center">
                    {["All", ...new Set(INITIAL_DESIGNERS.map(d => d.style))].map(style => (
                        <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${selectedStyle === style
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500'
                                }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>

                {/* Comparison Bar */}
                <AnimatePresence>
                    {comparisonList.length > 0 && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
                        >
                            <div className="flex -space-x-3">
                                {comparisonList.map(d => (
                                    <img key={d.id} src={d.avatar} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
                                ))}
                            </div>
                            <div className="text-sm font-bold dark:text-white">
                                {comparisonList.length} Selected
                            </div>
                            <button
                                onClick={() => setIsComparisonOpen(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                            >
                                Compare Now
                            </button>
                            <button onClick={() => setComparisonList([])} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Designer Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl h-96 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredDesigners.map((designer, index) => (
                                <DesignerCard
                                    key={designer.id}
                                    designer={designer}
                                    index={index}
                                    onSelect={() => setSelectedDesigner(designer)}
                                    onCompare={() => toggleComparison(designer)}
                                    isComparing={comparisonList.some(d => d.id === designer.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredDesigners.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No designers found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
                        <button onClick={() => { setSearchTerm(""); setSelectedStyle("All"); }} className="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
                    </div>
                )}
            </main>

            {/* Modals */}
            <Modal isOpen={!!selectedDesigner} onClose={() => setSelectedDesigner(null)} title="" maxWidth="max-w-4xl">
                {selectedDesigner && (
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="h-64 md:h-auto relative">
                            <img src={selectedDesigner.cover} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{selectedDesigner.realName}</h2>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <MapPin className="w-4 h-4" /> {selectedDesigner.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">{selectedDesigner.style} Specialist</div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="font-bold text-lg dark:text-white">{selectedDesigner.rating}</span>
                                        <span className="text-gray-400">({selectedDesigner.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${selectedDesigner.hourlyRate}</div>
                                    <div className="text-sm text-gray-500">per hour</div>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                {selectedDesigner.bio}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-1">Experience</div>
                                    <div className="font-bold text-lg dark:text-white">{selectedDesigner.experienceYears} Years</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase mb-1">Projects</div>
                                    <div className="font-bold text-lg dark:text-white">{selectedDesigner.totalProjects}+ Done</div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => { setIsBookingOpen(true); setSelectedDesigner(null); }} className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg">
                                    Book Consultation
                                </button>
                                <button onClick={() => { setIsReviewOpen(true); setSelectedDesigner(null); }} className="px-6 py-4 border-2 border-gray-100 dark:border-slate-700 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors dark:text-white">
                                    Review
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} designer={selectedDesigner || designers[0]} onSubmit={handleReviewSubmit} />
            <ComparisonModal isOpen={isComparisonOpen} onClose={() => setIsComparisonOpen(false)} designers={comparisonList} onRemove={toggleComparison} />
        </div>
    );
};

export default Home;
