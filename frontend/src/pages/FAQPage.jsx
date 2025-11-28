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

export default FAQPage;
