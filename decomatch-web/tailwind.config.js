/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'slide-in': 'slideIn 0.3s ease-out forwards',
                'slide-up': 'slideUp 0.3s ease-out forwards',
                'pulse-slow': 'pulse 3s infinite',
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" }
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                },
                slideIn: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" }
                },
                slideUp: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" }
                }
            },
            colors: {
                primary: "#4f46e5",
                ai: "#8b5cf6",
            }
        },
    },
    plugins: [],
}
