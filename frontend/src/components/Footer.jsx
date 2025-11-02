import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: ['API', 'Pricing', 'Documentation'],
    Company: ['About', 'Careers', 'Contact'],
    Resources: ['Blog', 'Status', 'Support'],
  };

  const socialLinks = [
    { icon: Github, name: 'GitHub', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <h3 className="footer-logo">
                <span className="footer-logo-bold">Stock</span>
                <span className="footer-logo-normal">Sprout</span>
              </h3>
              <p className="footer-description">
                Real-time financial data APIs for developers. Fast, reliable, and scalable.
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer-column-title">{category}</h4>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 StockSprout. All rights reserved.
          </p>
          <div className="footer-social">
            {socialLinks.map(({ icon: Icon, name, href }) => (
              <a
                key={name}
                href={href}
                className="footer-social-link"
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
