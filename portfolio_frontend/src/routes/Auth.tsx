import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { Logo } from "../components/NavBar";

const AuthRoute = () => {
    const prefersReducedMotion = useReducedMotion();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth logic
        setTimeout(() => {
            toast.info("Authentication system under maintenance");
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                    prefersReducedMotion ? ({ duration: 0 } as const) : undefined
                }
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 ring-1 ring-white/10 shadow-2xl gradient-outline before:rounded-3xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-4 p-4 rounded-2xl bg-white/5 ring-1 ring-white/20 shadow-xl">
                            <Logo width={60} />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
                        <p className="text-white/40 text-sm mt-2">Enter credentials to access control center</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60 uppercase tracking-widest ml-1">
                                Identity
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60 uppercase tracking-widest ml-1">
                                Access Key
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                                required
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${isLoading && !prefersReducedMotion ? 'animate-pulse' : ''}`} />
                            <div className="relative bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                                {isLoading ? (
                                    prefersReducedMotion ? (
                                        <span className="w-5 h-5 rounded-full border-2 border-white/60 border-t-transparent inline-block shrink-0" aria-hidden />
                                    ) : (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    )
                                ) : (
                                    <>
                                        <span>Initialize Session</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-white/20 text-xs">
                            SECURE ACCESS GATEWAY PROTOTYPE V1.0
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthRoute;
