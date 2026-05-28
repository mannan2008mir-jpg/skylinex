import { Link } from 'react-router-dom';
import { Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-primary">
            Skyline X
          </Link>
          <p className="font-sans text-sm text-on-surface-variant max-w-xs">
            © 2024 Skyline X Digital. Engineering the future through systemic excellence and automation.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary">Legal</h4>
          <ul className="space-y-3">
            <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary">Info</h4>
          <ul className="space-y-3">
            <li><Link to="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Cookies</Link></li>
            <li><Link to="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-all hover:scale-110">
              <Globe size={18} />
            </a>
            <a href="mailto:sys.admin@skylinex.digital" className="text-on-surface-variant hover:text-primary transition-all hover:scale-110">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
