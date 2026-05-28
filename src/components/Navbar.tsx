import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface/40 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex justify-between items-center">
        <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-primary">
          Skyline X
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 relative py-1 ${
                location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-primary-container text-on-primary-container px-6 py-2 rounded font-mono text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,219,233,0.4)] transition-all duration-300 active:scale-95"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface-container border-b border-white/5 p-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block font-mono text-xs uppercase tracking-widest ${
                location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-primary-container text-on-primary-container px-6 py-3 rounded font-mono text-[10px] uppercase tracking-widest"
          >
            Book a Call
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
