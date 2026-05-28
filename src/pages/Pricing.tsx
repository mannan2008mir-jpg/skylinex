import { motion } from 'motion/react';
import { Check, Bot, Zap, Shield, Cpu, Target, Layers } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic Vector',
    price: '$299',
    period: '/mo',
    features: ['2 Automated Workflows', 'Basic CRM Integration', 'Email Support'],
    cta: 'Initialize',
    highlight: false,
  },
  {
    name: 'Pro Vector',
    price: '$699',
    period: '/mo',
    features: [
      '10 Automated Workflows',
      'Advanced API Integrations',
      'Priority Support (24hr)',
      'Custom Trigger Logic',
    ],
    cta: 'Engage Pro',
    highlight: true,
    tag: 'MOST POPULAR',
  },
  {
    name: 'Elite Vector',
    price: '$1499',
    period: '/mo',
    features: [
      'Unlimited Workflows',
      'Custom Enterprise AI Agents',
      'Dedicated Systems Architect',
      '24/7 Slack Connect',
    ],
    cta: 'Deploy Elite',
    highlight: false,
  },
];

const bundles = [
  {
    name: 'Startup Accelerator',
    description: 'The foundational architecture required to launch and gain immediate traction.',
    price: '$1499',
    includes: ['Basic Web Dev Package', 'Foundation Marketing', 'Core Branding Setup'],
    cta: 'Select Accelerator',
    highlight: false,
  },
  {
    name: 'Business Growth System',
    description: 'A synchronized ecosystem designed for rapid scaling and operational efficiency.',
    price: '$3999',
    includes: [
      'Pro Web Dev & E-Comm',
      'Omnichannel Marketing',
      'Pro Automation Vector',
      'Monthly Consulting (2hrs)',
    ],
    cta: 'Deploy System',
    highlight: true,
    tag: 'MOST POPULAR',
  },
  {
    name: 'Domination Suite',
    description: 'Total market saturation. An elite, fully-managed technical and strategic takeover.',
    price: '$7999',
    includes: [
      'Elite Level All Services',
      'Dedicated Squad Leader',
      'Custom BI Dashboards',
      'Priority Server Architecture',
    ],
    cta: 'Initiate Takeover',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="relative min-h-screen pt-40 pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <section className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-8xl text-primary-fixed mb-6"
          >
            Transparent. Scalable. Elite.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto"
          >
            Invest in systemic excellence. Our pricing models are designed for visionary founders ready to dominate their market. Choose your vector.
          </motion.p>
        </section>

        {/* Pricing Grid */}
        <section className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <Bot className="text-primary-container" size={40} />
            <h2 className="font-display text-4xl text-tertiary-fixed">Business Automation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel rounded-xl p-10 flex flex-col relative transition-all duration-300 hover:translate-y-[-8px] group ${
                  plan.highlight ? 'border-primary-container/50 shadow-[0_0_40px_rgba(0,219,233,0.15)] bg-surface-container-high/40' : 'hover:border-primary/30'
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-0 bg-primary-container text-on-primary-fixed px-4 py-1.5 rounded-bl-lg rounded-tr-xl font-mono text-[9px] font-bold tracking-widest uppercase">
                    {plan.tag}
                  </div>
                )}
                <h3 className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-4 ${plan.highlight ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {plan.name}
                </h3>
                <div className="font-display text-5xl text-primary mb-8">
                  {plan.price}<span className="font-sans text-base text-on-surface-variant lowercase">{plan.period}</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-sans text-on-surface">
                      <Check className="text-primary" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-4 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                    plan.highlight 
                    ? 'bg-primary-container text-on-primary-container font-bold hover:shadow-[0_0_20px_rgba(0,219,233,0.5)]' 
                    : 'border border-primary/40 text-primary hover:bg-primary/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bundles Section */}
        <section className="relative pt-32 border-t border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131313] px-10">
            <span className="font-mono text-[10px] text-primary-container tracking-[0.3em] uppercase">Holistic Systems</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl text-center text-primary-fixed mb-20">Complete Business Bundles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bundles.map((bundle, i) => (
              <motion.div
                key={bundle.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel rounded-2xl p-10 flex flex-col relative transition-all duration-500 overflow-hidden group ${
                  bundle.highlight 
                  ? 'scale-105 z-10 border-primary-container/40 shadow-[0_0_50px_rgba(0,219,233,0.15)] bg-surface-container-high/60' 
                  : 'hover:translate-y-[-5px] border-white/5 hover:border-primary/20'
                }`}
              >
                <div className={`absolute inset-0 bg-linear-to-br transition-opacity duration-700 ${bundle.highlight ? 'from-primary/10 via-transparent to-primary-container/10 opacity-60' : 'from-primary/5 to-transparent opacity-0 group-hover:opacity-100'}`} />
                
                {bundle.tag && (
                  <div className="absolute top-0 right-0 bg-primary-container text-on-primary-fixed px-5 py-2 rounded-bl-xl font-mono text-[10px] font-bold tracking-widest">
                    {bundle.tag}
                  </div>
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className={`font-display text-3xl mb-4 ${bundle.name === 'Domination Suite' ? 'text-secondary-accent' : 'text-primary'}`}>{bundle.name}</h3>
                  <p className="font-sans text-xs text-on-surface-variant mb-10 h-10 leading-relaxed">{bundle.description}</p>
                  
                  <div className={`font-display text-5xl mb-12 ${bundle.name === 'Domination Suite' ? 'text-secondary-accent' : 'text-primary-fixed'}`}>{bundle.price}</div>
                  
                  <div className="space-y-6 flex-grow mb-12">
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">Included Assets:</h4>
                    <ul className="space-y-4">
                      {bundle.includes.map((item, idx) => (
                        <li key={item} className="flex items-center gap-3 text-xs tracking-wide">
                          <Cpu size={14} className="text-primary/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className={`w-full py-5 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                    bundle.highlight 
                    ? 'bg-primary-container text-on-primary-container font-black shadow-[0_0_30px_rgba(0,219,233,0.3)]' 
                    : 'border border-primary/30 text-primary hover:bg-primary/5'
                  }`}>
                    {bundle.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
