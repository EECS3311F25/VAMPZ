import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['Trading', 'Portfolio', 'Learn'],
    Company: ['About', 'Careers', 'Contact'],
    Resources: ['Tutorials', 'Market Data', 'Support'],
  };

  const socialLinks = [
    { icon: Github, name: 'GitHub', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Stock<span className="text-teal-600">Sprout</span>
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Practice trading with virtual money. Learn stock market strategies risk-free in a realistic trading environment.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-slate-900 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-600 hover:text-teal-600 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 StockSprout. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, name, href }) => (
              <a
                key={name}
                href={href}
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
