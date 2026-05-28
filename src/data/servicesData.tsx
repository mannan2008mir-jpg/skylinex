import React from 'react';
import { Bot, Code, Palette, Megaphone, ShoppingCart, HelpCircle } from 'lucide-react';

export interface PricingPackage {
  name: string;
  price: string;
  badge?: string;
  features: string[];
}

export interface WorkflowStep {
  phase: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: 'automation' | 'webdev' | 'branding' | 'marketing' | 'ecommerce' | 'consultancy';
  overview: string;
  description: string;
  features: string[];
  workflow: WorkflowStep[];
  deliverables: string[];
  technologies: string[];
  benefits: string[];
  packages: PricingPackage[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    iconName: 'automation',
    overview: 'Accelerate your production lines and daily tasks using AI agencies and workflow intelligence pipelines.',
    description: 'We eliminate cognitive overhead and manual friction by architecting custom autonomous systems. From complex lead scoring processes to custom WhatsApp CRM flows, we bridge your operations with advanced AI agents that run 24/7/365 with perfect precision.',
    features: [
      'Multi-platform cloud-based API integrations',
      'AI chatbot development & prompt engineering',
      'Autonomous CRM syncs & lead routing systems',
      'Intelligent report auto-generation pipelines'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'Operational Audit', description: 'Analyze existing processes, isolate waste loops, and design initial automation blueprints.' },
      { phase: 'Phase 02', title: 'System Architecture', description: 'Build state machines, data pathways, and configure custom agent triggers.' },
      { phase: 'Phase 03', title: 'Sync & Test', description: 'Connect live production APIs, dry-run failure loops, and refine agent memory caches.' },
      { phase: 'Phase 04', title: 'Handover & Logs', description: 'Activate automated triggers, hand over configuration keys, and enable status logging.' }
    ],
    deliverables: [
      'Interactive visual workflows and workflow diagrams',
      'Configured API integration tokens and keys',
      'AI agent guidelines & instruction templates',
      'Custom database reporting system'
    ],
    technologies: ['n8n', 'Make.com', 'OpenAI API', 'Claude', 'Firebase', 'Zapier', 'Python'],
    benefits: [
      'Save average 20+ hours of physical workflow overhead every single week',
      'Achieve absolute consistency with close-to-zero operational human-errors',
      'Instantly scale handling capacity up to thousands of messages per minute'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '149',
        features: [
          'Basic automation setup',
          'Workflow optimization',
          'Lead capture automation',
          'Email integration',
          '3-day deployment cycle'
        ]
      },
      {
        name: 'PRO',
        price: '499',
        badge: 'Most Popular',
        features: [
          'CRM automation',
          'WhatsApp automation',
          'AI chatbot integration',
          'Multi-platform workflows',
          'Analytics dashboard',
          '7-day deployment cycle',
          'Priority VIP support'
        ]
      },
      {
        name: 'ELITE',
        price: '999',
        features: [
          'Full business automation system',
          'AI agent integrations',
          'Custom automation architecture',
          'Team workflows',
          'Enterprise optimization',
          'Bi-weekly scaling review',
          '24/7 technical fallback desk'
        ]
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    iconName: 'webdev',
    overview: 'High-performance interactive storefronts, custom digital systems, and fully-optimized high-scale web platforms.',
    description: 'We build ultra-polished, visually magnificent applications and SaaS architectures. Powered by custom frameworks, our focus is blazing-fast rendering speeds, flawless structural design, and responsive layouts that convert views into high-value equity.',
    features: [
      'Stutter-free motion transitions & responsive fluidity',
      'Custom content management systems (CMS)',
      'Highly secure JWT or OAuth user authentication',
      'SEO-perfect technical search-ranking configurations'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'UI UX Blueprint', description: 'Establish user-flow boundaries, wireframes, typography pairs, and interactive layouts.' },
      { phase: 'Phase 02', title: 'Front-end Crafting', description: 'Implement design files into robust, reusable custom React layouts.' },
      { phase: 'Phase 03', title: 'Full Stack Stitching', description: 'Deploy serverless API endpoints, database sync states, and user login pipelines.' },
      { phase: 'Phase 04', title: 'CDN Edge Deploy', description: 'Optimize static files bundles, load-test server instances, and activate SSL endpoints.' }
    ],
    deliverables: [
      'Clean modular production-ready Git code repo',
      'Polished and tested interactive user interfaces',
      'Database access keys, configuration plans',
      'Custom API endpoints documentation'
    ],
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Node.js', 'Firebase'],
    benefits: [
      'Perfect 100/100 Core Web Vitals Lighthouse metrics',
      'Flawless responsive behavior across desktop & smart screens',
      'Ultra-secure container nodes protected from standard risks'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '199',
        features: [
          'Landing page',
          'Responsive design',
          'Contact forms',
          'Basic animations',
          '5-day turnaround'
        ]
      },
      {
        name: 'PRO',
        price: '599',
        badge: 'Most Popular',
        features: [
          'Multi-page website',
          'Premium UI/UX experience',
          'Firebase integration',
          'Advanced animations',
          'SEO optimization & sitemaps',
          '10-day turnaround'
        ]
      },
      {
        name: 'ELITE',
        price: '999',
        features: [
          'Full custom web app',
          'AI integrations included',
          'Dashboard systems included',
          'Backend setup',
          'Advanced performance optimization',
          '1 month dedicated maintenance support'
        ]
      }
    ]
  },
  {
    id: 'branding-brand-identity',
    title: 'Branding & Brand Identity',
    iconName: 'branding',
    overview: 'Luxury category-defining aesthetic standards for elite tech ventures, corporate brands, and high-growth projects.',
    description: 'Branding is how we define absolute authority. We refine your identity into an elite visual system, providing robust cohesive style guides, typography systems, vector assets, and bespoke guidelines that position your brand as the obvious industry leader.',
    features: [
      'Custom high-contrast displaying typography styling',
      'Detailed logo design and custom vector layout sets',
      'Interactive guidelines & digital design documentation',
      'Social media kits and marketing layout patterns'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'Persona Discovery', description: 'Extract core ethos parameters, competitor spacing, and brand mission targets.' },
      { phase: 'Phase 02', title: 'Visual Explorations', description: 'Draft alternative design directions, palette combinations, and logo concepts.' },
      { phase: 'Phase 03', title: 'Identity Refinement', description: 'Anchor choice directions, perfect vectors grid geometry, and match font families.' },
      { phase: 'Phase 04', title: 'Delivery & System', description: 'Package raw vector layers, structure style manuals, and ship digital branding packs.' }
    ],
    deliverables: [
      'High-resolution vector files (SVG, PDF, PNG)',
      'Cohesive interactive style manuals containing guidelines',
      'Complete typography family selections & web licenses',
      'Social asset layout templates'
    ],
    technologies: ['Figma', 'Adobe Illustations', 'WebGL Shader Designs', 'Spline Pro', 'Bespoke Type Foundries'],
    benefits: [
      'Command a higher luxury premium on your standard market packages',
      'Ensure perfect multi-channel consistency for all layouts',
      'Establish memorable affinity within first 3-seconds of target views'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '129',
        features: [
          'Logo design (2 concepts)',
          'Color palette selection',
          'Typography pairing guidelines',
          '4-day turnaround time'
        ]
      },
      {
        name: 'PRO',
        price: '399',
        badge: 'Most Popular',
        features: [
          'Full brand identity package',
          'Social media asset kit',
          'Comprehensive brand guidelines',
          'Premium SVG assets delivery',
          '8-day turnaround time'
        ]
      },
      {
        name: 'ELITE',
        price: '799',
        features: [
          'Complete luxury branding system',
          'Custom marketing templates',
          'Modern packaging concepts',
          'Bespoke brand strategy',
          'Premium visual identity assets',
          'Dedicated creative director review'
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    iconName: 'marketing',
    overview: 'High-leverage paid campaign architectures, algorithmic retargeting, and full-funnel customer acquisition systems.',
    description: 'We don\'t believe in vanity clicks or standard low-value agency reports. We deploy analytical growth tunnels designed to convert premium demographics. By implementing modern ad tracking systems, we fuel optimized growth and hyper-efficient scale.',
    features: [
      'Multi-platform paid traffic management',
      'High-converting landing page layouts',
      'Dynamic CRM lead routing architectures',
      'Algorithmic retargeting & LTV scaling engines'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'Audience Mapping', description: 'Deconstruct ideal user parameters and study historical cost metrics.' },
      { phase: 'Phase 02', title: 'Tunnel Structuring', description: 'Build customized landing pages, copy directives, and test tracking pixels.' },
      { phase: 'Phase 03', title: 'Live Beta Launch', description: 'Activate targeted beta runs to map dynamic tracking attributes.' },
      { phase: 'Phase 04', title: 'Optimized Scale', description: 'Plow capital into best-yielding creatives and maximize positive ROI.' }
    ],
    deliverables: [
      'Paid campaigns dashboard structure & access',
      'Bespoke high-impact landing page system',
      'Custom copywriting template vaults',
      'Weekly data-auditing report updates'
    ],
    technologies: ['Google adwords', 'Meta Business Manager', 'LinkedIn Ads', 'Google Analytics 4', 'Hotjar Tracking'],
    benefits: [
      'Slash your cost per acquisition metrics across digital ads channels',
      'Gain real-time insights into user acquisition flows and tracking',
      'Establish highly-repeatable pipelines built to print leads'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '149',
        features: [
          'Social media channel setup',
          'Basic content direction',
          '1 paid ad campaign',
          '3-day turnaround time'
        ]
      },
      {
        name: 'PRO',
        price: '499',
        badge: 'Most Popular',
        features: [
          'Paid advertising setups',
          'Conversion optimization',
          'Lead generation tunnels',
          'Content marketing systems',
          '7-day activation window'
        ]
      },
      {
        name: 'ELITE',
        price: '999',
        features: [
          'Full-scale marketing ecosystem',
          'Multi-platform campaigns',
          'AI-powered ad optimization',
          'Real-time metrics dashboard',
          'Aggressive scaling roadmap',
          'Weekly strategy calls'
        ]
      }
    ]
  },
  {
    id: 'ecommerce-launch-scale-systems',
    title: 'E-Commerce Launch & Scale',
    iconName: 'ecommerce',
    overview: 'High-efficiency digital retail engines, optimized checkout systems, and transactional pipeline scaling.',
    description: 'We optimize the entire retail checkout pathway to capture abandoned revenue. By integrating secure storefront architectures with automated stock, shipment tracking, and user retention workflows, we scale e-commerce metrics to the millions.',
    features: [
      'Sub-second cart & checkout load optimization',
      'Omnichannel support and dynamic reviews widget',
      'Automated inventory & supplier routing APIs',
      'Bespoke abandoned checkout reactivation sequences'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'Staging Audit', description: 'Audit purchase friction loops, catalog sizing, and payment flows.' },
      { phase: 'Phase 02', title: 'Storefront Crafting', description: 'Build ultra-responsive custom landing templates and catalog feeds.' },
      { phase: 'Phase 03', title: 'Fulfillment Bridges', description: 'Connect payment gateways, shipping platforms, and transactional alerts.' },
      { phase: 'Phase 04', title: 'Revenue Scaling', description: 'Optimize cart up-sells, live user analytics, and activate retention flows.' }
    ],
    deliverables: [
      'High-performance e-commerce storefront',
      'Fully set up and working payment processor integrations',
      'Abandoned-cart email copy templates',
      'Live dynamic sales and operations tracker'
    ],
    technologies: ['Shopify Plus', 'Stripe Systems', 'React Storefront', 'Klaviyo Automation', 'Firebase DB'],
    benefits: [
      'Boost Average Order Value (AOV) via strategic up-sells',
      'Cut shopping-cart exit and checkout bounce metrics',
      'Automated tracking keeps human shipping errors minimal'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '249',
        features: [
          'Shopify store setup',
          'Up to 10 product listings',
          'Secure payment gateway link',
          '5-day delivery window'
        ]
      },
      {
        name: 'PRO',
        price: '699',
        badge: 'Most Popular',
        features: [
          'Premium bespoke Shopify store',
          'Speed & conversion auditing',
          'Klaviyo email flows',
          'Inventory sync systems',
          '10-day delivery window'
        ]
      },
      {
        name: 'ELITE',
        price: '999',
        features: [
          'Full e-commerce ecosystem',
          'High scaling pipelines',
          'AI-powered product sync',
          'Dynamic custom checkouts',
          'Automated metrics setup'
        ]
      }
    ]
  },
  {
    id: 'consultancy',
    title: 'Consultancy',
    iconName: 'consultancy',
    overview: 'High-level business architectural scaling roadmaps, technology implementation systems, and audit models.',
    description: 'Bespoke strategic and technological guidance for ambitious organizations. We break down complex systemic bottlenecks and architect comprehensive plans to integrate predictive technology models, automated staffing, and hyper-scalable operations.',
    features: [
      'Executive strategic resource planning audits',
      'Bottleneck calculation and scaling maps',
      'Technology choices & compliance audits',
      'AI & LLM deployment blueprint guidelines'
    ],
    workflow: [
      { phase: 'Phase 01', title: 'Deep Discovery', description: 'Deconstruct internal team workflows, revenue constraints, and tooling.' },
      { phase: 'Phase 02', title: 'Friction Analysis', description: 'Calculate team capacity, system leaks, and code-debt blocks.' },
      { phase: 'Phase 03', title: 'System Strategy', description: 'Draft comprehensive technology choice roadmaps and implementation steps.' },
      { phase: 'Phase 04', title: 'Continuous Review', description: 'Bi-weekly checkpoints to review milestone metrics and adapt plans.' }
    ],
    deliverables: [
      'Thorough custom Technology Implementation Strategy manual',
      'Visual timeline architecture blueprint PDF guides',
      'Comprehensive database of tool evaluations',
      'Tailored recommended team learning catalogs'
    ],
    technologies: ['Technology Roadmaps', 'Operational Auditing', 'Machine Learning Blueprints', 'Cloud Scale Architecture'],
    benefits: [
      'Establish a crystal-clear technological execution path for team members',
      'Avoid wasting capital on overhyped, unsuited software stacks',
      'Get unbiased professional architect reviews on your current setups'
    ],
    packages: [
      {
        name: 'STARTER',
        price: '99',
        features: [
          '1 Strategy planning session (60m)',
          'Tech infrastructure audit',
          'Custom recommendation guide',
          '2-day delivery'
        ]
      },
      {
        name: 'PRO',
        price: '299',
        badge: 'Most Popular',
        features: [
          'Agressive growth roadmap document',
          'Scaling consultation access',
          'Detailed systems analytics',
          '2 Strategy sessions included'
        ]
      },
      {
        name: 'ELITE',
        price: '799',
        features: [
          'Long-term operational consultancy',
          'Full-scale AI strategy blueprint',
          'Scale systems architecture draft',
          '4 Strategy sessions & Slack sync channel'
        ]
      }
    ]
  }
];

export const getServiceIcon = (name: string, className = "text-primary") => {
  switch (name) {
    case 'automation':
      return <Bot className={className} />;
    case 'webdev':
      return <Code className={className} />;
    case 'branding':
      return <Palette className={className} />;
    case 'marketing':
      return <Megaphone className={className} />;
    case 'ecommerce':
      return <ShoppingCart className={className} />;
    case 'consultancy':
      return <HelpCircle className={className} />;
    default:
      return <Bot className={className} />;
  }
};
