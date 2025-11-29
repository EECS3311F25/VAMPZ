import { ThemeToggle } from './ThemeToggle';
import { Quote } from 'lucide-react';
import { Logo } from './Logo';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Left Section - Decorative */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765215-0c9397237130?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

                <div className="relative z-10 flex flex-col justify-between w-full p-8 lg:p-12">
                    <div className="text-white">
                        <Logo className="text-white" />
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                                Master the Market <br />
                                <span className="text-teal-400">Without the Risk</span>
                            </h1>
                            <p className="text-base lg:text-lg text-slate-400 max-w-md leading-relaxed">
                                Join thousands of traders who are learning, testing strategies, and building confidence with our advanced paper trading platform.
                            </p>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md">
                            <Quote className="w-8 h-8 text-teal-500/50 mb-3" />
                            <p className="text-slate-300 italic mb-4 text-sm lg:text-base">
                                "This platform completely changed how I approach trading. The risk-free environment is a game changer."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                    AM
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Alex M.</p>
                                    <p className="text-xs text-slate-500">Student Investor</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-teal-400 flex items-center gap-2">
                                <span>🔒</span> No real money required
                            </p>
                            <p className="text-xs text-slate-500">
                                Built for education, not financial advice
                            </p>
                        </div>
                        <div className="text-xs text-slate-600 border-t border-white/10 pt-4">
                            © {new Date().getFullYear()} StockSprout. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse delay-700" />

                <div className="absolute top-6 right-6 z-20">
                    <ThemeToggle />
                </div>
                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            {subtitle}
                        </p>
                    </div>

                    <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
