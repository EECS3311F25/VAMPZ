import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';

const HomeNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('features');
    const [isScrolling, setIsScrolling] = useState(false);

    // Unified scroll tracking
    useEffect(() => {
        let scrollTimeout;

        const updateActiveSection = () => {
            // Don't update if user just clicked (let the click handler control it briefly)
            if (isScrolling) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Get all sections
            const featuresSection = document.getElementById('features');
            const pricingSection = document.getElementById('pricing');
            const footer = document.querySelector('footer');

            // Check if we're at the very top
            if (scrollY < 100) {
                setActiveSection('features');
                return;
            }

            // Check footer (About section)
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                // If footer is in the upper half of the viewport
                if (footerRect.top < windowHeight / 2 && footerRect.bottom > 0) {
                    setActiveSection('about');
                    return;
                }
            }

            // Check pricing
            if (pricingSection) {
                const pricingRect = pricingSection.getBoundingClientRect();
                // If pricing section is in the upper half of viewport
                if (pricingRect.top < windowHeight / 2 && pricingRect.bottom > windowHeight / 4) {
                    setActiveSection('pricing');
                    return;
                }
            }

            // Check features
            if (featuresSection) {
                const featuresRect = featuresSection.getBoundingClientRect();
                // If features section is in the viewport
                if (featuresRect.top < windowHeight / 2 && featuresRect.bottom > 0) {
                    setActiveSection('features');
                    return;
                }
            }
        };

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateActiveSection();
            }, 50); // Small debounce for performance
        };

        // Set initial state
        updateActiveSection();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [isScrolling]);

    const scrollToSection = (sectionId) => {
        // Immediately update for instant visual feedback
        setActiveSection(sectionId);
        setIsScrolling(true);

        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });

        // Allow automatic tracking to resume after scroll completes
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000);

        setIsMenuOpen(false);
    };

    const scrollToFooter = () => {
        // Immediately update for instant visual feedback
        setActiveSection('about');
        setIsScrolling(true);

        const footerSection = document.querySelector('footer');
        footerSection?.scrollIntoView({ behavior: 'smooth' });

        // Allow automatic tracking to resume after scroll completes
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000);

        setIsMenuOpen(false);
    };

    const navItems = [
        { id: 'features', label: 'Features' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'about', label: 'About' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-1.5 group">
                        <img
                            src="/images/logo-icon.png"
                            alt="StockSprout Logo"
                            className="h-11 w-auto md:h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] leading-none">
                            Stock<span className="text-teal-600 dark:text-teal-400">Sprout</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => item.id === 'about' ? scrollToFooter() : scrollToSection(item.id)}
                                className={`text-sm font-medium transition-all duration-300 relative ${activeSection === item.id
                                    ? 'text-teal-600 dark:text-teal-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                                    }`}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 transition-all duration-300" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Consistent position: Search | Theme | Auth */}
                    <div className="flex items-center gap-3">
                        {/* Search - optional, hidden on small screens */}
                        <button className="hidden sm:flex p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <Search size={20} />
                        </button>

                        {/* Theme Toggle - consistent position across all navbars */}
                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>

                        {/* Auth Buttons - desktop only */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-slate-200 dark:border-slate-800">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === item.id
                                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20'
                                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                const footerSection = document.querySelector('footer');
                                footerSection?.scrollIntoView({ behavior: 'smooth' });
                                setIsMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            About
                        </button>
                        <div className="pt-3 space-y-2">
                            <Link
                                to="/login"
                                className="block px-4 py-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="block px-4 py-2 text-center bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-teal-600/30 transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HomeNavbar;
