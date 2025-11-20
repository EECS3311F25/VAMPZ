import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const faqs = [
    {
        category: 'Getting Started',
        questions: [
            {
                q: 'What is paper trading?',
                a: 'Paper trading is simulated trading that allows you to practice buying and selling stocks without risking real money. You trade with virtual funds while following real market prices and conditions.'
            },
            {
                q: 'How do I start trading?',
                a: 'After signing up, you\'ll receive a virtual balance of $10,000. Navigate to the Dashboard, select a stock using the Trade Panel, enter the quantity you want to buy or sell, and confirm your order.'
            },
            {
                q: 'Is my data secure?',
                a: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We never store sensitive financial information, and your practice trading data is kept private.'
            }
        ]
    },
    {
        category: 'Trading',
        questions: [
            {
                q: 'What stocks can I trade?',
                a: 'You can trade major U.S. stocks listed on NYSE and NASDAQ. Use the stock symbol search in the Trade Panel to find and trade any supported stock.'
            },
            {
                q: 'Are there trading fees?',
                a: 'No! Since this is paper trading for educational purposes, there are no fees, commissions, or charges. All trades are completely free.'
            },
            {
                q: 'Can I short sell stocks?',
                a: 'Currently, the platform supports buying and selling stocks you own. Short selling and options trading may be added in future updates.'
            },
            {
                q: 'How accurate is the market data?',
                a: 'We use real-time market data feeds to simulate actual market conditions. Prices update dynamically to reflect current market movements.'
            }
        ]
    },
    {
        category: 'Account & Portfolio',
        questions: [
            {
                q: 'Can I reset my portfolio?',
                a: 'Yes, you can reset your portfolio from the Settings page. This will clear all your trades and reset your balance to the initial $10,000.'
            },
            {
                q: 'How is my portfolio value calculated?',
                a: 'Your portfolio value is the sum of your cash balance plus the current market value of all stocks you own (shares × current price).'
            },
            {
                q: 'What are unrealized gains/losses?',
                a: 'Unrealized gains or losses represent the profit or loss on stocks you currently hold, calculated as the difference between the current market price and your purchase price.'
            }
        ]
    },
    {
        category: 'Technical',
        questions: [
            {
                q: 'Which browsers are supported?',
                a: 'The platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
            },
            {
                q: 'Is there a mobile app?',
                a: 'Currently, the platform is web-based and fully responsive. A dedicated mobile app is planned for future release.'
            },
            {
                q: 'Why am I seeing delayed data?',
                a: 'Free users may see 15-minute delayed data. Upgrade to a premium plan for real-time market data access.'
            }
        ]
    }
];

const FAQPage = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (category, index) => {
        const key = `${category}-${index}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <DashboardLayout activeMenu="faq">
            <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
                <div className="p-6 md:p-8 pt-10 md:pt-12">
                    {/* Header */}
                    <div className="mb-8 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 mb-4">
                            <HelpCircle size={32} className="text-teal-600 dark:text-teal-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            Find answers to common questions about paper trading and using the platform
                        </p>
                    </div>

                    {/* FAQ Categories */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        {faqs.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-teal-600 dark:bg-teal-400 rounded-full"></div>
                                    {category.category}
                                </h2>
                                <div className="space-y-3">
                                    {category.questions.map((item, index) => {
                                        const key = `${category.category}-${index}`;
                                        const isOpen = openItems[key];

                                        return (
                                            <div
                                                key={index}
                                                className="glass-card rounded-xl overflow-hidden transition-all duration-300"
                                            >
                                                <button
                                                    onClick={() => toggleItem(category.category, index)}
                                                    className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                                                >
                                                    <span className="font-semibold text-slate-900 dark:text-white pr-4">
                                                        {item.q}
                                                    </span>
                                                    <ChevronDown
                                                        size={20}
                                                        className={`flex-shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-300 mt-1 ${isOpen ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                >
                                                    <div className="px-6 pb-4 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700">
                                                        {item.a}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="glass-card rounded-2xl p-8 mt-12 max-w-4xl mx-auto text-center bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                            Still have questions?
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Can't find the answer you're looking for? Reach out to our support team.
                        </p>
                        <button className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-teal-600/30 hover:shadow-xl">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FAQPage;
