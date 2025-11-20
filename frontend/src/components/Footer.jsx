import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Trading', 'Portfolio', 'Learn'],
    Company: ['About', 'Careers', 'Contact'],
    Resources: ['Tutorials', 'Market Data', 'Support'],
  };

  const socialLinks = [
    { icon: Github, name: 'GitHub', href: 'https://github.com/EECS3311F25/VAMPZ/tree/main' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
  ];

  const techStack = [
    'REST API for quotes and trades',
    'JWT-based authentication',
    'Spring Boot backend',
    'React frontend',
    'PostgreSQL database',
    'Deployed on AWS',
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tech Stack Section */}
        <div className="mb-12 pb-12 border-b border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
            Built for Developers
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 text-lg leading-none">•</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{tech}</span>
              </div>
            ))}
          </div>
          <a
            href="https://github.com/EECS3311F25/VAMPZ/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Github size={18} />
            View on GitHub
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Stock<span className="text-teal-600">Sprout</span>
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Practice trading with virtual money. Learn stock market strategies risk-free in a realistic trading environment.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Disclaimer */}
        <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white">Educational Use Only: </span>
            StockSprout is a paper trading simulator for educational use. It does not provide investment advice and does not execute real trades.
          </p>
        </div>

        {/* Copyright and Social Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 StockSprout. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, name, href }) => (
              <a
                key={name}
                href={href}
                target={name === 'GitHub' ? '_blank' : undefined}
                rel={name === 'GitHub' ? 'noopener noreferrer' : undefined}
                className="text-slate-400 hover:text-teal-600 transition-colors"
                aria-label={name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
