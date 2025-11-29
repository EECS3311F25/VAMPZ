import { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

const TermsModal = ({ isOpen, onAccept, loading }) => {
    const [agreed, setAgreed] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Terms & Conditions</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Please read and accept our terms to continue
                    </p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 dark:text-slate-300 text-sm">
                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">1. Paper Trading Disclaimer</h3>
                        <p>
                            StockSprout is a paper trading platform for educational and practice purposes only. All trades executed on this platform are simulated and do not involve real money or actual securities trading.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">2. No Financial Advice</h3>
                        <p>
                            The information provided on this platform does not constitute financial advice. We do not recommend or endorse any specific securities, investment strategies, or trading decisions. Users should conduct their own research and consult with qualified financial advisors before making any real investment decisions.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">3. Data Accuracy</h3>
                        <p>
                            While we strive to provide accurate market data, we do not guarantee the completeness, accuracy, or timeliness of any information displayed. Stock prices and market data may be delayed or simulated for demonstration purposes.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">4. User Account</h3>
                        <p>
                            You are responsible for maintaining the confidentiality of your account credentials. You agree not to share your account with others and to notify us immediately of any unauthorized access.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">5. Risk Warning</h3>
                        <p className="font-medium text-amber-700 dark:text-amber-400">
                            Real stock trading involves significant risk, including the loss of principal. Past performance does not guarantee future results. Practice trading success does not ensure real trading success.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">6. Privacy Policy</h3>
                        <p>
                            We collect and store user information as described in our Privacy Policy. By using this platform, you consent to our data collection and usage practices. We do not sell your personal information to third parties.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">7. Prohibited Activities</h3>
                        <p>
                            Users must not engage in any activity that violates laws, infringes on intellectual property rights, or disrupts the platform's operation. We reserve the right to suspend or terminate accounts that violate these terms.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">8. Changes to Terms</h3>
                        <p>
                            We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms. We will notify users of significant changes via email or platform notification.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                disabled={loading}
                                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-all duration-200">
                            I have read and agree to the Terms & Conditions and understand that this is a paper trading platform for educational purposes only.
                        </span>
                    </label>

                    <button
                        onClick={onAccept}
                        disabled={!agreed || loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${agreed && !loading
                                ? 'bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40'
                                : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Creating account...
                            </span>
                        ) : agreed ? (
                            <span className="flex items-center justify-center gap-2">
                                <Check size={20} />
                                Accept & Continue
                            </span>
                        ) : (
                            'Please accept to continue'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
