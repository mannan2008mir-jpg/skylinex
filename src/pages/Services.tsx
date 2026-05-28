import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Bot, Code as CodeIcon, Megaphone, Gem, ShoppingBag, BarChart3, ArrowRight } from 'lucide-react';

const serviceItems = [
  {
    icon: <Bot size={28} />,
    title: 'Automation',
    description: 'Intelligent workflows and predictive systems. We eliminate friction by architecting autonomous processes that scale without human bottleneck.',
  },
  {
    icon: <CodeIcon size={28} />,
    title: 'Web Dev',
    description: 'High-performance architectures. We build lightning-fast, ultra-secure web applications utilizing the bleeding edge of modern frameworks.',
    yOffset: 'lg:translate-y-8',
  },
  {
    icon: <Megaphone size={28} />,
    title: 'Marketing',
    description: 'Precision-targeted growth engines. Deploy algorithmic campaigns that capture attention and convert elite demographics with zero waste.',
  },
  {
    icon: <Gem size={28} />,
    title: 'Branding',
    description: 'Hyper-premium visual identities. We craft visual languages that communicate absolute authority, establishing your venture as a category of one.',
  },
  {
    icon: <ShoppingBag size={28} />,
    title: 'E-Comm',
    description: 'Frictionless transactional hubs. Engineering high-converting, immersive shopping experiences that maximize lifetime value.',
    yOffset: 'lg:translate-y-8',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Consulting',
    description: 'Strategic operational foresight. Tap into executive-level guidance to align your technological infrastructure with aggressive market capture goals.',
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen pt-40 pb-32">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <header className="mb-24 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">System Capabilities</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-8xl text-on-surface mb-6 leading-tight"
          >
            Engineering the <span className="text-gradient">Future.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed"
          >
            We deploy high-fidelity ecosystems designed to dominate. Explore our interconnected suite of hyper-SaaS services built for visionary founders and elite enterprises.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex flex-col bg-surface-container/30 backdrop-blur-xl border border-white/5 rounded-xl p-8 overflow-hidden transition-all duration-500 min-h-[380px] hover:border-primary/30 hover:shadow-[0_0_40px_-10px_rgba(0,219,233,0.15)] ${service.yOffset || ''}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-lg bg-surface border border-primary/20 flex items-center justify-center mb-8 shadow-[inset_0_0_15px_rgba(0,219,233,0.1)] text-primary transition-transform group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="font-display text-3xl text-on-surface mb-4">{service.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant flex-grow leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  state={{ service: service.title }}
                  className="inline-flex items-center gap-2 mt-8 text-primary font-mono text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all duration-300 w-fit cursor-pointer"
                  id={`view-details-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
