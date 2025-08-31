import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const footerSections = [
    {
      title: 'About Us',
      links: [
        'Our Story',
        'Careers',
        'Contact Us',
        'Locate Stores',
        'Own Grown',
        'Garden Services'
      ]
    },
    {
      title: 'Customer Care',
      links: [
        'Track Order',
        'Shipping Policy',
        'Privacy Policy',
        'FAQs',
        'Refund Policy'
      ]
    },
    {
      title: 'Offers & Rewards',
      links: [
        'Plant Parent Club',
        'Coupons'
      ]
    },
    {
      title: 'Get in Touch',
      links: [
        { text: 'WhatsApp: 1234567890', href: 'https://wa.me/1234567890' },
        { text: 'Call: +91-1234567890', href: 'tel:1234567890' },
        { text: 'Email: support@plantify.com', href: 'mailto:support@plantify.com' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook', href: '#' },
    { name: 'Twitter', icon: 'fab fa-x-twitter', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', href: '#' },
    { name: 'YouTube', icon: 'fab fa-youtube', href: '#' }
  ];

  return (
    <footer className="bg-[var(--nav-color)] text-gray-900 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Footer Sections */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-lg uppercase mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={index}>
                  {typeof link === 'string' ? (
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  ) : (
                    <a href={link.href} className="hover:underline">
                      {link.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Section */}
        <div>
          <h3 className="font-semibold text-lg uppercase mb-3">Sign Up for Our Newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className="relative">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-500 hover:text-green-600"
            >
              →
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">Get plant care tips, offers, and updates.</p>

          {/* Social Media */}
          <div className="mt-4 flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-xl text-gray-600 hover:text-green-700 transition"
                aria-label={social.name}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center text-sm text-gray-600">
        <p>
          © 2025, <span className="font-semibold text-green-700">Plantify</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
