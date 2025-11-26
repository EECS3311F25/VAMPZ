import { motion } from 'framer-motion';
import { LineChart, GraduationCap, BarChart3 } from 'lucide-react';

const features = [
    {
        icon: LineChart,
        title: 'Realistic Market Simulation',
        description: 'Trade US equities and crypto with 15-minute delayed prices and $100k virtual balance.',
        color: 'bg-yellow-100 text-yellow-600',
    },
    {
        icon: GraduationCap,
        title: 'Guided Learning Experience',
        description: 'See P/L per trade, risk per position, and warning labels when you over-concentrate.',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        icon: BarChart3,
        title: 'Interactive Portfolio Tracking',
        description: 'Track daily returns, top movers, and allocation by sector in one dashboard.',
        color: 'bg-green-100 text-green-600',
    },
];

export default function Features() {
    return (
        <div id="features" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose StockSprout?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Built for learners who want to practice real markets without real risk.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="glass-card rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
