import React from 'react';

const BackgroundBlobs = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            {/* Soft Ambient Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-pink-200/40 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
    );
};

export default BackgroundBlobs;
