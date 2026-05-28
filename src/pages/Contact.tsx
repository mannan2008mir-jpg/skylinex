import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const selectedService = location.state?.service || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('SaaS / Hyper-SaaS');
  const [message, setMessage] = useState(
    selectedService 
      ? `Hi Skyline X Team,\n\nI am interested in Booking a Call for the "${selectedService}" service. Please let me know your availability for a deep-dive technical blueprinting session.\n\nBest,`
      : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const path = 'contact_submissions';
    try {
      const newDocRef = doc(collection(db, path));
      await setDoc(newDocRef, {
        name,
        email,
        phone: phone || null,
        sector: sector || null,
        message,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSector('SaaS / Hyper-SaaS');
      setMessage('');
    } catch (error) {
      setErrorMessage('Transmission protocol failure. Critical data node failed to synchronize.');
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-40 pb-32 bg-mesh">
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <header className="mb-16 md:mb-24">
          <div className="inline-block px-3 py-1 rounded border border-outline-variant/30 bg-surface-container-low mb-6">
            <span className="font-mono text-[10px] text-primary uppercase flex items-center gap-2 tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              System Open
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-8xl text-primary mb-6"
          >
            Initialize Connection.
          </motion.h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Deploy our engineering resources to solve your most complex architectural challenges. Select a protocol below to begin transmission.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <section className="lg:col-span-7 glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup 
                      label="Full Designation" 
                      placeholder="Jane Doe" 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                    <InputGroup 
                      label="Comm Link (Email)" 
                      placeholder="jane@enterprise.co" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Sector</label>
                      <select 
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:border-primary-container outline-none appearance-none transition-all"
                      >
                        <option>SaaS / Hyper-SaaS</option>
                        <option>Fintech Infrastructure</option>
                        <option>AI / Machine Learning</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <InputGroup 
                      label="Secure Line (Phone)" 
                      placeholder="+1 (555) 000-0000" 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Encrypted Payload (Message)</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:border-primary-container outline-none transition-all resize-none min-h-[150px]"
                      placeholder="Describe the architectural parameters..."
                      required
                    />
                  </div>
                  {errorMessage && (
                    <div className="text-red-500 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                      {errorMessage}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary-container text-on-primary-container font-mono text-[10px] uppercase font-bold tracking-[0.2em] py-5 px-10 rounded-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'Transmit Data'} <Send size={16} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Send size={32} />
                  </div>
                  <h3 className="font-display text-4xl text-primary font-bold">Transmission Successful</h3>
                  <p className="text-on-surface-variant max-w-sm">
                    Your architectural parameters have been received. A systems architect will initialize contact within 24 standard cycles.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-[10px] uppercase text-primary tracking-widest hover:underline"
                  >
                    Reset Connection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Info */}
          <section className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard icon={<Phone size={20} />} label="Book Call" />
              <ContactCard icon={<MessageSquare size={20} />} label="WhatsApp" color="text-[#25D366]" />
            </div>

            <div className="glass-panel p-8 rounded-xl border-l-4 border-primary-container space-y-6">
              <h3 className="font-display text-2xl text-primary font-bold">Global Nexus</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-outline shrink-0 mt-1" />
                  <div className="text-sm font-sans">
                    <p className="text-on-surface font-semibold mb-1">Skyline X Core Infrastructure</p>
                    <p className="text-on-surface-variant">1010 Quantum Way, Sector 7<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-outline shrink-0" />
                  <p className="text-sm text-on-surface">sys.admin@skylinex.digital</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 rounded-xl overflow-hidden glass-panel border border-white/5 group">
              <div className="absolute inset-0 bg-surface-dim mix-blend-multiply opacity-60" />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeNhMS02S1CjWF_28rjDdvAT0kk4Q2UJI7eoqN-7-1mUr9NR-am9NQG-AuM8UqVjKazIQg0PNB4fQVYAcruip2yV86oKTeh4COm8JztW8-5RS3qm7KmMvC7CVUyiPc4PVp89xEAZUdOlZ216CdA6FBPEL1wKLOlyvohCnSt6GwI3gif3JF-x8oSOz45_BPlo8QNFp7hGzdHEluD7TwKv5ZMV-87LYNPon2izq4Du9NSNU8XPNxFiXuVgRcyFc1PVqMOJPKjXUV6Cbf" 
                alt="Map"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-primary-container rounded-full shadow-[0_0_20px_#00f0ff] animate-pulse" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ 
  label, 
  placeholder, 
  type, 
  value, 
  onChange, 
  required 
}: { 
  label: string, 
  placeholder: string, 
  type: string, 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  required?: boolean 
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-outline focus:border-primary-container outline-none transition-all"
        id={`input-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  );
}

function ContactCard({ icon, label, color = 'text-primary' }: { icon: any, label: string, color?: string }) {
  return (
    <div className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-all hover:bg-white/5 hover:border-white/20 cursor-pointer group">
      <div className={`p-4 rounded-full bg-white/3 transition-transform group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest">{label}</span>
    </div>
  );
}
