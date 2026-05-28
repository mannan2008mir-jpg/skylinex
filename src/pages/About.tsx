import { motion } from 'motion/react';
import { Boxes, Zap, Gem } from 'lucide-react';

const coreProtocols = [
  {
    icon: <Boxes size={32} className="text-primary" />,
    title: 'Systemic Excellence',
    description: "We don't build fragmented solutions. Every module is a meticulously engineered component of a larger, scalable architecture.",
  },
  {
    icon: <Zap size={32} className="text-primary" />,
    title: 'Ruthless Automation',
    description: "Manual processes are points of failure. We leverage autonomous agents and automated pipelines to ensure absolute efficiency.",
  },
  {
    icon: <Gem size={32} className="text-primary" />,
    title: 'Invisible Complexity',
    description: "The most sophisticated technology feels effortless. We hide enterprise-grade complexity behind ultra-premium, intuitive interfaces.",
  },
];

const timeline = [
  {
    date: 'Q1 2022',
    title: 'Inception',
    description: 'Skyline X initialized. The first architectural blueprints for automated SaaS scaling are drafted.',
    highlight: false,
  },
  {
    date: 'Q3 2023',
    title: 'The Hyper-SaaS Protocol',
    description: 'Deployed our proprietary AI-driven automation framework to initial enterprise cohorts, yielding a 400% efficiency increase.',
    highlight: false,
  },
  {
    date: 'PRESENT',
    title: 'Global Infrastructure',
    description: 'Expansion into deep-tech consulting. Designing the digital nervous systems for decentralized organizations globally.',
    highlight: true,
  },
];

const founders = [
  {
    name: 'J. Vance',
    role: 'Lead Systems Architect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFT-1X-ZYTZ28wgWjPjbQrbwdC_JQ82nuuxqzXKYggEQGgniDg4mvlE33MBMU3OiOKb_sBZnVehPOYm5i3X1QJWPTEa87Mg-4CKVaJhdQPmoIzhBGwjHXm45Me8BSlwEAcmarAXeqKqGHe1t-4k7D0Kpm3lkV0pPN_-NfGnlaIzZ9cjWtlGoQL6MnOy9UaY6iqjtx5cDMZqm5wBbjVLD3EOn9Lnppy_lySTtMzw4VpfEhuEGYqmSeJ782BgdSirv31m044zh_bt8lR'
  },
  {
    name: 'A. Chen',
    role: 'Head of Automation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-mbnOlX8HTGPVj8cOQCLkjy8l8cFnxeKiNJu2DQ2gAdlrsa13jJT5nNAbCp7I5DWXsXACU3DzpK_tSKMaxH-pK_iYOjfB1SK_NB7Ck-nck5QNdBPyzBTXTnjy6mUulOprJ7uFR_105KPxmbftISUj6VW0r5jesfI-gr0UobegKzxnd5_KkHp-DJpZ2-tDw2GBXCgNfh3UQRq-Mozv8mKNCeTIlyzpnXPcMXWmhEFL6kzBHjiqpWktI6nxOOHVJlFBDT8QrwBTq_jk'
  }
];

import { ExternalLink, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <div className="relative min-h-screen pt-40 pb-32">
      <div className="absolute inset-0 holographic-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <section className="flex flex-col md:flex-row gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Who We Are</span>
            </div>
            <h1 className="font-display text-4xl md:text-7xl mb-8 tracking-tight leading-tight">
              Engineering the <span className="text-gradient">next era</span> of digital.
            </h1>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              We are an elite collective of systems architects, designers, and automation specialists. Skyline X wasn't built to just create software; it was forged to architect unfair advantages for high-ticket enterprise clients and visionary founders.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 aspect-square relative rounded-xl overflow-hidden glass-panel border border-white/10"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLO-Hf3m0ralUrW91jzBTIFIOlewuOA6TVyoh-Ua_4WCvVQdujrldSFH3yz9N_XeFh8vcCNwutT34oZb7STu2SvrcRqdTwngBpOCz2BCJN8HD6GF3mSJTMadGvYi7UAFOn3up_e7EjldR7DAidcs7qzPT_rxnvfOpssf0SiLRBaPAu__lkttIWo9jLbhKEbc6Ue4p2ZAsy3EOgbI_0SeU4d4FFmWuxPojxlZuMt0Kx61F7UCrawRJRG7yZcDUR5csb5zC8d8sbQDhN" 
              alt="System Grid" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </motion.div>
        </section>

        <section className="relative py-32 mb-40 glass-panel border-x-0 border-white/5 text-center">
           <h2 className="font-display text-4xl md:text-6xl max-w-5xl mx-auto leading-tight">
            "Helping businesses scale through <span className="text-primary italic font-medium">systems</span> and <span className="text-primary italic font-medium">automation</span>."
          </h2>
        </section>

        <section className="mb-40">
          <h2 className="font-display text-5xl mb-16">Core Protocols.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreProtocols.map((protocol, i) => (
              <motion.div
                key={protocol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-xl relative group overflow-hidden border border-white/5 transition-all hover:bg-white/5"
              >
                <div className="mb-8">{protocol.icon}</div>
                <h3 className="font-display text-2xl mb-4">{protocol.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{protocol.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
