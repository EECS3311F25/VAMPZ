import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

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

    return (<></>);
};

export default HomeNavbar;
