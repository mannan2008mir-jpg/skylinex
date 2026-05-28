import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Code, Palette, Megaphone, ShoppingCart, HelpCircle,
  TrendingUp, ThumbsUp, Layout, ChevronLeft, ChevronRight, Quote, 
  ArrowRight, Send, Calendar, Mic, Volume2, Play, Check, Plus, 
  Search, Sparkles, Cpu, Layers, Wifi, User, DollarSign, Activity, 
  Clock, X, MessageSquare, AlertCircle, Laptop, Settings, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData, ServiceDetail, getServiceIcon } from '../data/servicesData';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

const AUTOPLAY_INTERVAL = 8000;

export default function Home() {
  // Navigation & general interactive states
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isHoveredStory, setIsHoveredStory] = useState(false);
  
  // Service modal details state
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  
  // Interactive Pricing Estimator states
  const [estimateServices, setEstimateServices] = useState<string[]>(['ai-automation']);
  const [estimateBudget, setEstimateBudget] = useState<number>(499);
  const [estimateBusiness, setEstimateBusiness] = useState<string>('saas');
  const [estimateGoals, setEstimateGoals] = useState<string>('automation');

  // FAQ Accordion states
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);

  // Booking scheduler state
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [hasBooked, setHasBooked] = useState<boolean>(false);

  // Lead Submission
  const [leadMail, setLeadMail] = useState<string>('');
  const [newsletterSubbed, setNewsletterSubbed] = useState<boolean>(false);

  // Firebase Submissions states & handlers
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false);
  const [newsletterError, setNewsletterError] = useState<string>('');
  const [voiceLoading, setVoiceLoading] = useState<boolean>(false);
  const [voiceError, setVoiceError] = useState<string>('');

  const handleBookingSubmit = async () => {
    if (!bookingName || !bookingEmail) {
      alert("Please provide name and email to block slot safely.");
      return;
    }
    setBookingLoading(true);
    setBookingError('');
    const path = 'bookings';
    try {
      const newDocRef = doc(collection(db, path));
      await setDoc(newDocRef, {
        name: bookingName,
        email: bookingEmail,
        selectedDate,
        selectedTimeSlot,
        message: leadForm.message || null,
        createdAt: serverTimestamp(),
      });
      setHasBooked(true);
      setDataLogs(prev => [`BOOKING: Blocked timezone slot for ${bookingName} on ${selectedDate} at ${selectedTimeSlot}`, ...prev]);
    } catch (err) {
      setBookingError('Failsafe trigger. Failed to secure virtual slot.');
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleNewsletterSubscribe = async () => {
    if (!leadMail) return;
    setNewsletterLoading(true);
    setNewsletterError('');
    const path = 'newsletter_subscriptions';
    try {
      const newDocRef = doc(collection(db, path));
      await setDoc(newDocRef, {
        email: leadMail,
        createdAt: serverTimestamp(),
      });
      setNewsletterSubbed(true);
      setLeadMail('');
      setDataLogs(prev => [`MARKETING: Staged newsletter subscription for ${leadMail}`, ...prev]);
    } catch (err) {
      setNewsletterError('Buffer failed.');
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleVoiceMemoSubmit = async () => {
    setVoiceLoading(true);
    setVoiceError('');
    const path = 'voice_memos';
    try {
      const newDocRef = doc(collection(db, path));
      await setDoc(newDocRef, {
        duration: voiceDuration,
        createdAt: serverTimestamp(),
      });
      setVoiceRecordedBlob(false);
      setDataLogs(prev => [`SYSTEM: Voice memo lead submitted successfully. Processing parameters...`, ...prev]);
    } catch (err) {
      setVoiceError('Signal synchronization failed.');
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setVoiceLoading(false);
    }
  };

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user', text: string, time: string }>>([
    { sender: 'bot', text: 'Greetings! I am the Skyline X Core Intelligence system. How can we optimize your operations today?', time: '12:00' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Voice Lead Recording simulation
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordedBlob, setVoiceRecordedBlob] = useState<boolean>(false);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const voiceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live Dashboard simulator states
  const [liveTraffic, setLiveTraffic] = useState<number>(314);
  const [activeAutomations, setActiveAutomations] = useState<number>(1829);
  const [dataLogs, setDataLogs] = useState<string[]>([
    'SYSTEM: Initializing automated AI dispatch sequence...',
    'INTEGRATION: Syncing Salesforce with Meta API endpoints',
    'AI_AGENT: Executed dynamic lead qualification flow [#8392]',
  ]);

  // Lead capture State
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Automation',
    message: ''
  });

  // Autoplay for testimonials
  useEffect(() => {
    if (isHoveredStory) return;
    const timer = setInterval(() => {
      setActiveStoryIdx((prev) => (prev + 1) % successStories.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHoveredStory]);

  // Simulated AI logs generator
  useEffect(() => {
    const handleLog = setInterval(() => {
      const logs = [
        `SYSTEM: Dynamic scale buffer routing verified.`,
        `AI_AGENT: Prompt cache hit ratio: 94.6%`,
        `INTEGRATION: Firebase authentication session verified safely.`,
        `WEB_DEV: CDN cache flushed on edge nodes.`,
        `MARKETING: Computed optimal multi-armed bandit weights.`,
        `CRM: WhatsApp lead automated pipeline sync completed.`,
        `SYSTEM: Connected to active multi-region data node.`,
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setDataLogs(prev => [randomLog, prev[0], prev[1]]);
      setLiveTraffic(prev => Math.floor(prev + (Math.random() * 8 - 4)));
      setActiveAutomations(prev => prev + 1);
    }, 4500);
    return () => clearInterval(handleLog);
  }, []);

  // Voice recording simulation timer
  const startVoiceRecording = () => {
    setIsVoiceRecording(true);
    setVoiceRecordedBlob(false);
    setVoiceDuration(0);
    voiceTimerRef.current = setInterval(() => {
      setVoiceDuration(prev => {
        if (prev >= 15) {
          stopVoiceRecording();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopVoiceRecording = () => {
    if (voiceTimerRef.current) {
      clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    setIsVoiceRecording(false);
    setVoiceRecordedBlob(true);
  };

  // chatbot simulation replies
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = "That sounds fascinating! Our system operations architects will take closer look. Leave your email so we can reach out with customized structural blueprint.";
      const query = userMsg.toLowerCase();
      if (query.includes('price') || query.includes('pricing') || query.includes('cost')) {
        botReply = "Our pricing starts at $99 for specialized Strategy sessions, all the way to $999 for fully integrated Enterprise AI Automation pipelines or Full Custom SaaS suites. You can try our real-time Estimator tool on the page below!";
      } else if (query.includes('service') || query.includes('what do you do')) {
        botReply = "Skyline X engineers multi-million dollar Digital Systems: AI Workflows, Responsive Web Platform Development, Custom Branding, E-Commerce Scale Ecosystems, and Tech Consultancy. Click 'View Details' on any service card to check our granular deliverables!";
      } else if (query.includes('hire') || query.includes('contact') || query.includes('book')) {
        botReply = "We advise booking a strategic slot right through our fully-integrated booking schedule calendar located right below our Pricing Estimator. We sync live sessions directly!";
      } else if (query.includes('about') || query.includes('who are you')) {
        botReply = "Skyline X is an elite cyber-systems agency engineering high-throughput automation pipelines and high-end digital platforms. We transform technical chaos into automated cash flow.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply, time: now }]);
    }, 1000);
  };

  // Pricing calculator formula
  const calculateEstimate = () => {
    let serviceTotal = estimateServices.reduce((sum, serviceId) => {
      const s = servicesData.find(x => x.id === serviceId);
      if (s) {
        // pick corresponding package based on budget
        if (estimateBudget <= 200) return sum + parseInt(s.packages[0].price);
        if (estimateBudget <= 600) return sum + parseInt(s.packages[1].price);
        return sum + parseInt(s.packages[2].price);
      }
      return sum;
    }, 0);

    const timelineWeeks = Math.max(2, Math.ceil(estimateServices.length * 1.5));
    return {
      total: serviceTotal,
      timeline: `${timelineWeeks} to ${timelineWeeks + 2} Weeks`,
      recommended: estimateBudget <= 200 ? 'STARTER Suite Setup' : estimateBudget <= 600 ? 'PRO Synchronized Systems' : 'ELITE Custom Infrastructure Architecture'
    };
  };

  const results = calculateEstimate();

  const successStories = [
    {
      company: "Aetheron Systems",
      quote: "Skyline X translated our legacy engineering chaos into pure, autonomous precision. Our deployment velocity has quadrupled, and systems-related downtime is effectively zero.",
      client: "Marcus Vance",
      role: "VP of Software Engineering",
      metric: "+340% Speed",
      badgeColor: "from-[#00f0ff]/20 to-[#00f0ff]/5",
      logo: "AETHERON SYSTEMS"
    },
    {
      company: "Veloce SaaS",
      quote: "The automated core agent pipelines they deployed transformed our dispatch queue operations. Within weeks, manual escalations plummeted by 82% and our scheduling overhead evaporated.",
      client: "Serena Thorne",
      role: "Chief Operating Officer",
      metric: "18.5 Hrs Saved/Wk",
      badgeColor: "from-[#CA72FF]/20 to-[#CA72FF]/5",
      logo: "VELOCE DIGITAL"
    },
    {
      company: "Quantum Ledger",
      quote: "Most elite tech agencies sell boilerplate. Skyline X engineered a custom high-throughput transactional cluster matching our intensive financial safety and concurrency metrics perfectly.",
      client: "Elias Kael",
      role: "Lead Systems Architect",
      metric: "3.2x Scale Ingest",
      badgeColor: "from-cyan-500/10 to-blue-500/5",
      logo: "QUANTUM TRADING"
    }
  ];

  return (
    <div className="relative min-h-screen text-on-surface bg-background overflow-hidden relative selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Aurora backdrop glow paths */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-primary/10 via-secondary-container/5 to-transparent filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] -right-20 w-96 h-96 rounded-full bg-primary-container/5 filter blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[60%] -left-20 w-96 h-96 rounded-full bg-secondary-container/5 filter blur-[120px] pointer-events-none -z-10" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#131313_90%)] pointer-events-none -z-10" />

      {/* ==================== SECTION 1: CINEMATIC HERO ==================== */}
      <header className="relative pt-44 pb-32 flex items-center min-h-screen border-b border-white/5" id="hero-sec">
        <div className="absolute inset-0 bg-linear-to-b from-[#131313]/0 via-[#131313]/40 to-[#131313]" />
        
        {/* Animated grid decoration */}
        <div className="absolute inset-0 holographic-grid opacity-15 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-8 flex flex-col justify-center space-y-8"
          >
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">
                PRO ACTIVE DEPLOYMENTS CURRENTLY ONLINE
              </span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none">
              Building <span className="bg-gradient-to-r from-primary via-primary-fixed-dim to-[#CA72FF] bg-clip-text text-transparent">AI-Powered</span> Digital Systems
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
              We help elite businesses automate operations, architect high-performance custom infrastructure, scale transactions, and grow through advanced computational AI. Step out of the chaos and into cinematic excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <a
                href="#booking"
                className="bg-primary-container text-on-primary-container px-10 py-5 rounded-lg font-mono text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_40px_rgba(0,240,255,0.45)] transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2"
                id="hero-book-btn"
              >
                Book Free Consultation <ArrowUpRight size={16} />
              </a>
              <a
                href="#services"
                className="glass-panel text-on-surface hover:text-primary-container px-10 py-5 rounded-lg border border-white/10 font-mono text-xs uppercase tracking-widest tracking-widest hover:bg-white/10 hover:border-primary-container/50 transition-all duration-300 active:scale-95 text-center"
                id="hero-explore-btn"
              >
                Explore Services
              </a>
            </div>

            {/* Quick stats grid inside section 1 */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5 max-w-lg">
              <div>
                <div className="font-display text-3xl font-bold text-white">99.9%</div>
                <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">Uptime Reliability</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">20h+</div>
                <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">Saved Per Client/Wk</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">100%</div>
                <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">Secure Infrastructure</div>
              </div>
            </div>

          </motion.div>

          {/* Cinematic floating card / Dashboard visual preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-4 flex items-center justify-center relative"
          >
            {/* Holographic Glowing Orbit Node */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-container to-secondary-container opacity-20 blur-xl animate-pulse" />
            <div className="glass-panel w-full max-w-md rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-transparent p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[8px] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  SKYLINE Core V4.8
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">System Throughput</span>
                    <span className="font-mono text-[9px] text-primary">849 ops/s</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container w-[82%] rounded-full shadow-[0_0_10px_#00f0ff]" />
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="text-primary w-4 h-4 animate-spin" />
                    <span className="font-mono text-[10px] text-white uppercase tracking-wider font-bold">Active System Agent Execution</span>
                  </div>
                  <p className="font-mono text-[9px] text-on-surface-variant leading-relaxed">
                    &raquo; Initializing neural-pipeline vectors... OK<br/>
                    &raquo; Instantiating dynamic database cache layers... OK<br/>
                    &raquo; Scaling transactional node #CX-902... LIVE
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/3 rounded p-3 border border-white/5 text-center">
                    <div className="font-mono text-[8px] text-on-surface-variant">NODE LOSS RATIO</div>
                    <div className="font-display text-xl font-bold text-[#00f0ff]">0.02%</div>
                  </div>
                  <div className="bg-white/3 rounded p-3 border border-white/5 text-center">
                    <div className="font-mono text-[8px] text-on-surface-variant">LENS COEFF</div>
                    <div className="font-display text-xl font-bold text-[#CA72FF]">1.944</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-mono text-[9px] text-red-400">AUTOMATION BUFFER SATURATION: EXCELLENT</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* ==================== SECTION 2: TRUSTED BY LOGO MARQUEE ==================== */}
      <section className="py-16 bg-[#0e0e0e]/70 border-b border-white/5 relative overflow-hidden" id="social-proof">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant mb-10 font-bold">
            Trusted by ambitious brands and fast-growing businesses worldwide
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {['AETHERON', 'VELOCE DIGITAL', 'QUANTUM', 'STRIPE', 'LINEAR', 'APPLE'].map((logo, index) => (
              <div 
                key={index} 
                className="font-display text-sm font-black tracking-widest text-[#849495] hover:text-white hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 py-3 px-6 rounded border border-white/5 bg-white/2 cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: SERVICES SECTION & DETAILS MODAL ==================== */}
      <section className="py-32 relative scroll-mt-20 border-b border-white/5" id="services">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#CA72FF] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-widest font-bold">Interconnected Capabilities</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
                Our Systemized <span className="bg-gradient-to-r from-primary to-[#CA72FF] bg-clip-text text-transparent underline decoration-[#00f0ff]/30">Offerings.</span>
              </h2>
              <p className="text-on-surface-variant font-light text-lg">
                Explore our elite programmatic suites. Click <strong className="text-white font-medium">View Details</strong> on any service card to open its micro-overview modal containing workflow timelines and exactly 3 targeted pricing options.
              </p>
            </div>
            <div className="font-mono text-xs text-primary bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 font-bold tracking-widest uppercase shrink-0">
              SOLUTIONS DIRECTORY
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-surface-container/25 hover:bg-surface-container/45 backdrop-blur-2xl border border-white/5 hover:border-primary-container/30 rounded-2xl p-8 overflow-hidden transition-all duration-500 min-h-[360px] flex flex-col justify-between shadow-lg"
              >
                {/* Visual hover glowing background */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent filter blur-[50px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white/2 border border-white/10 flex items-center justify-center mb-8 shadow-inner text-[#00f0ff] transition-transform group-hover:scale-110 duration-300">
                    {getServiceIcon(service.iconName, "w-6 h-6")}
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6 font-light">
                    {service.overview}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-wider font-bold">
                    PACKS FROM ${service.packages[0].price}
                  </span>
                  
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-white font-mono text-[9px] uppercase tracking-widest border border-[#00f0ff]/20 hover:border-white hover:bg-white/5 py-2 px-4 rounded transition-all duration-300 cursor-pointer"
                    id={`view-details-btn-${service.id}`}
                  >
                    View Details <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SCREEN MODAL: SERVICE DELIVERABLES & PRICING PACKAGES ==================== */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="bg-[#181818] border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 bg-white/5 border border-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all duration-300 cursor-pointer"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              {/* Modal Body */}
              <div className="max-h-[85vh] overflow-y-auto">
                
                {/* Hero Banner */}
                <div className="p-8 md:p-12 border-b border-white/5 bg-linear-to-b from-primary/10 to-transparent relative">
                  <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-[#00f0ff]/5 filter blur-[100px]" />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 mb-6">
                    <Sparkles className="text-[#00f0ff]" size={12} />
                    <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">DELIVERABLE ARCHITECTURE</span>
                  </div>
                  
                  <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                    {selectedService.title}
                  </h2>
                  <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-3xl leading-relaxed font-light">
                    {selectedService.description}
                  </p>
                </div>

                {/* Sub-details grid */}
                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-white/5">
                  
                  {/* Left: What's included, timeline, benefits */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Check size={18} className="text-[#00f0ff]" /> Core Focus Points
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.features.map((feat, idx) => (
                          <li key={idx} className="font-sans text-xs text-on-surface-variant flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CA72FF] shrink-0 mt-1.5" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4">
                        Workflow Lifecycle Timeline
                      </h4>
                      <div className="space-y-4 border-l border-white/10 pl-6 ml-2">
                        {selectedService.workflow.map((flow, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-[#00f0ff] ring-4 ring-[#131313]" />
                            <div className="font-mono text-[9px] text-[#CA72FF] uppercase font-bold tracking-wider mb-0.5">{flow.phase}</div>
                            <div className="font-sans text-xs text-white font-medium mb-1">{flow.title}</div>
                            <div className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">{flow.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Technologies, Benefits */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4">
                        Enterprise Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.technologies.map((tech, idx) => (
                          <span key={idx} className="font-mono text-[9px] text-[#00f0ff] bg-primary/5 border border-primary/20 hover:border-primary-container px-3 py-1.5 rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4">
                        Key Strategic Outcome Benefits
                      </h4>
                      <ul className="space-y-3">
                        {selectedService.benefits.map((ben, idx) => (
                          <li key={idx} className="font-sans text-xs text-on-surface-variant flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shrink-0 mt-1.5" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-3">
                        Deliverable Audit Pack Includes:
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        {selectedService.deliverables.join(' • ')}
                      </p>
                    </div>
                  </div>

                </div>

                {/* PRICING SYSTEM PACKAGES (Exactly 3 pricing packages as structured) */}
                <div className="p-8 md:p-12 bg-black/40">
                  <h3 className="font-display text-2xl font-bold text-center text-white mb-2">
                    Systemized Implementation Pricing Packages
                  </h3>
                  <p className="text-center font-sans text-xs text-on-surface-variant mb-12 max-w-lg mx-auto">
                    Select the operational capacity tier that matches your current business growth requirements.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedService.packages.map((pack, idx) => {
                      const isPopular = pack.badge === 'Most Popular';
                      return (
                        <div
                          key={idx}
                          className={`relative glass-panel rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                            isPopular 
                              ? 'border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-linear-to-b from-white/[0.05] to-transparent scale-[1.02] md:scale-105' 
                              : 'border-white/5 hover:border-white/20 hover:scale-102'
                          }`}
                        >
                          {isPopular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00f0ff] text-background font-mono text-[9px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                              Most Popular
                            </span>
                          )}

                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">{pack.name}</span>
                              <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">USD One-time</span>
                            </div>

                            <div className="flex items-baseline gap-1 mb-6">
                              <span className="font-display text-4xl md:text-5xl font-black text-white">${pack.price}</span>
                              <span className="font-sans text-xs text-on-surface-variant font-light">USD</span>
                            </div>

                            <ul className="space-y-3.5 mb-8">
                              {pack.features.map((feat, fIdx) => (
                                <li key={fIdx} className="font-sans text-xs text-on-surface-variant flex items-center gap-2">
                                  <Check size={14} className="text-[#00f0ff] shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href="#booking"
                            onClick={() => {
                              setSelectedService(null);
                              setLeadForm(prev => ({
                                ...prev,
                                service: selectedService.title,
                                message: `I'm interested in the ${pack.name} package for ${selectedService.title}.`
                              }));
                            }}
                            className={`w-full text-center font-mono text-[10px] uppercase font-bold py-3.5 rounded-lg tracking-wider transition-all duration-300 ${
                              isPopular 
                                ? 'bg-primary-container text-on-primary-container hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
                                : 'bg-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            SELECT THIS PACKAGE
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Modal CTA */}
                <div className="p-8 text-center border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="font-sans text-xs text-on-surface-variant">
                    Require absolute custom enterprise logic setup?
                  </span>
                  <a
                    href="#booking"
                    onClick={() => setSelectedService(null)}
                    className="text-[#00f0ff] hover:underline font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-1"
                  >
                    Discuss Custom Contract <ChevronRight size={16} />
                  </a>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== SECTION 4: AI SHOWCASE & LIVE SYSTEM CONSOLE ==================== */}
      <section className="py-32 relative border-b border-white/5 bg-linear-to-b from-[#131313] to-[#0e0e0e]" id="ai-showcase">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual AI processing brain / diagram */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute w-80 h-80 rounded-full bg-[#CA72FF]/5 filter blur-[70px] pointer-events-none" />
              
              <div className="glass-panel border border-white/10 rounded-2xl p-6 w-full max-w-md relative overflow-hidden bg-black/40">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-[#00f0ff] animate-pulse" />
                    <span className="font-mono text-[9px] text-white uppercase tracking-wider font-bold">NEURAL PIPELINES STAGE</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>

                {/* Dynamic Brain visual structure */}
                <div className="h-48 flex items-center justify-center relative bg-black/20 rounded-lg p-4 border border-white/5 mb-6">
                  
                  {/* Glowing center orb */}
                  <span className="absolute w-12 h-12 rounded-full bg-[#CA72FF]/25 filter blur-md animate-ping" />
                  <span className="absolute w-6 h-6 rounded-full bg-[#00f0ff]/50 flex items-center justify-center">
                    <Cpu className="text-white w-3 h-3 animate-spin duration-350" />
                  </span>

                  {/* Connected outer nodes */}
                  <div className="absolute top-6 left-1/4 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
                    <span className="font-mono text-[7px] text-on-surface-variant uppercase mt-1">CRM API</span>
                  </div>
                  <div className="absolute top-12 right-1/4 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CA72FF]" />
                    <span className="font-mono text-[7px] text-on-surface-variant uppercase mt-1">Chat LLM</span>
                  </div>
                  <div className="absolute bottom-6 left-1/3 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CA72FF]" />
                    <span className="font-mono text-[7px] text-on-surface-variant uppercase mt-1">Dispatch</span>
                  </div>
                  <div className="absolute bottom-10 right-1/5 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
                    <span className="font-mono text-[7px] text-on-surface-variant uppercase mt-1">Auto Reports</span>
                  </div>

                  {/* Animated canvas SVG line pathways */}
                  <svg className="absolute inset-0 w-full h-full opacity-35" fill="none">
                    <path d="M 120 40 L 195 90" stroke="#00f0ff" strokeWidth="1" strokeDasharray="5,5" />
                    <path d="M 283 50 L 195 90" stroke="#CA72FF" strokeWidth="1" />
                    <path d="M 150 160 L 195 90" stroke="#CA72FF" strokeWidth="1" />
                    <path d="M 300 140 L 195 90" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                </div>

                {/* Live debugging logs console */}
                <div className="bg-black/80 rounded-lg p-4 border border-white/5 font-mono text-[8px] space-y-2 leading-relaxed h-28 overflow-hidden select-none">
                  <div className="text-[#00f0ff] font-bold uppercase pb-1 tracking-wider border-b border-white/5 flex justify-between">
                    <span>LIVE PIPELINE INTERCEPT LOGS</span>
                    <span className="text-[7px]">LATENCY: 12ms</span>
                  </div>
                  {dataLogs.map((log, idx) => (
                    <div key={idx} className={`${idx === 0 ? 'text-white font-medium' : 'text-on-surface-variant/75'}`}>
                      &raquo; {log}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* AI showcase text info */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Showcase Engine</span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
                Immersive Autonomous <span className="bg-gradient-to-r from-primary to-[#CA72FF] bg-clip-text text-transparent">Decision Engines.</span>
              </h3>

              <div className="space-y-4 text-on-surface-variant text-base font-light leading-relaxed">
                <p>
                  At Skyline X, we do not build simple integrations or static software apps. We engineer full cybernetic intelligence blocks capable of analyzing, scoring, and acting upon your business live lead patterns in real-time.
                </p>
                <p>
                  Deploy custom agents equipped with deep contextual business memory that coordinate across departments: qualifying pipelines instantly, WhatsApp-triggering customers, synchronizing secure backend catalogs, and generating complex balance summaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="glass-panel p-5 rounded-xl border border-white/5">
                  <span className="font-mono text-xs text-white uppercase tracking-wider font-bold block mb-1">94% Core Compression</span>
                  <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                    Optimize computation memory by utilizing modular pipeline state managers and prompt guidelines.
                  </p>
                </div>
                <div className="glass-panel p-5 rounded-xl border border-white/5">
                  <span className="font-mono text-xs text-white uppercase tracking-wider font-bold block mb-1">0ms Queue Blocking</span>
                  <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                    Event-driven async execution guarantees zero thread blocks across thousands of real-time pipeline flows.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION 5: PORTFOLIO SHOWCASE ==================== */}
      <section className="py-32 border-b border-white/5" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Case Audit Portfolios</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-none text-white mb-6">
                Systems in <span className="text-gradient">Production.</span>
              </h2>
              <p className="text-on-surface-variant font-light text-base max-w-2xl leading-relaxed">
                We design fully tested production infrastructure. Witness real metrics captured live from our deployed systems.
              </p>
            </div>
            
            <button className="font-mono text-xs text-on-surface hover:text-[#00f0ff] border border-white/10 hover:border-[#00f0ff]/40 px-5 py-3 rounded-lg bg-white/2 hover:bg-white/5 transition-all duration-300">
              AUDIT CASE ARCHIVE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Project Card 1 */}
            <div className="group glass-panel rounded-2xl border border-white/5 hover:border-primary-container/30 overflow-hidden bg-[#181818]/50 transition-all duration-500">
              <div className="h-64 bg-linear-to-br from-primary/10 via-secondary-container/5 to-transparent flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-35" />
                <div className="glass-panel p-6 rounded-xl border border-white/10 w-3/4 transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[8px] text-white">LIVE SAAS METRICS CLUSTER</span>
                  </div>
                  <div className="h-2 w-1/2 bg-white/10 rounded mb-3" />
                  <div className="h-16 w-full bg-white/5 rounded flex items-center justify-center font-mono text-[10px] text-primary">
                    DATA ENG STATUS: EXCELLENT
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-wider font-bold">AI Automation Suite</span>
                  <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    ACTIVE PRODUCTION
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                  Aetheron Lead Flow Pipeline
                </h3>

                <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                  Deconstruct manual sales pipelines. This system auto-captures CRM nodes, qualifies lead attributes via custom OpenAI triggers, and alerts sales executives on Slack in under 9 seconds.
                </p>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 pt-2">
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">AUDITED OUTCOME</span>
                    <span className="font-display text-xl font-bold text-white">+340% Pipeline Velocity</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">TECHNOLOGIES</span>
                    <span className="font-sans text-xs text-white">n8n, Salesforce, OpenAI API</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#00f0ff] group-hover:underline">
                  View Verified Results Case <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group glass-panel rounded-2xl border border-white/5 hover:border-primary-container/30 overflow-hidden bg-[#181818]/50 transition-all duration-500">
              <div className="h-64 bg-linear-to-br from-[#CA72FF]/10 via-primary/5 to-transparent flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-35" />
                <div className="glass-panel p-6 rounded-xl border border-white/10 w-3/4 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-[8px] text-white">TRANSACTION ENGINE MODULE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 bg-white/10 rounded" />
                    <div className="h-8 bg-white/5 rounded col-span-2" />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-wider font-bold">E-Commerce Ecosystem</span>
                  <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    ACTIVE PRODUCTION
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                  Veloce Retail Order Routing
                </h3>

                <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                  High-speed synchronization pipeline linked with Shopify Plus. Converts abandoned checking patterns immediately, syncing inventory in real-time and routing delivery dispatch workflows smoothly.
                </p>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 pt-2">
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">AUDITED OUTCOME</span>
                    <span className="font-display text-xl font-bold text-white">18.5 Hrs Saved Weekly</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">TECHNOLOGIES</span>
                    <span className="font-sans text-xs text-white">Shopify Plus, Stripe, Node</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#00f0ff] group-hover:underline">
                  View Verified Results Case <ArrowRight size={14} />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION 6: PROCESS TIMELINE ==================== */}
      <section className="py-32 relative bg-[#0e0e0e]/50 border-b border-white/5" id="process">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Operational Protocol</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              The <span className="text-gradient">X-Protocol</span> Lifecycle
            </h2>
            <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              We deploy systematic methodologies to ensure world-class delivery speeds and flawless operational security.
            </p>
          </div>

          <div className="relative border-l border-white/15 pl-8 md:pl-16 space-y-16 max-w-4xl mx-auto">
            
            {/* Steps discovery -> scale */}
            {[
              { num: '01', title: 'Discovery & Parameter Definition', desc: 'Isolate existing process debt and build comprehensive technological blueprints customized around your requirements.', theme: '#00f0ff' },
              { num: '02', title: 'Strategy Architecture & Flow-maps', desc: 'Establish granular timeline bounds and build interactive logic maps, specifying integration API targets.', theme: '#CA72FF' },
              { num: '03', title: 'System Styling & UI UX Wrapping', desc: 'Craft modern, visually polished, premium designs utilizing responsive frameworks and high contrast layouts.', theme: '#00f0ff' },
              { num: '04', title: 'Modular Engineering & Dynamic Build', desc: 'Implement clean modular TS configurations, setting up custom DB triggers and deploying APIs.', theme: '#CA72FF' },
              { num: '05', title: 'AI Integration & Agent Training', desc: 'Inject intelligent prompts, LLM parameters, memory caching loops, and dry-run potential pipeline failures.', theme: '#00f0ff' },
              { num: '06', title: 'Synchronized Launch Sequence', desc: 'Seamless migration of production records, activate real-time server instances, and enable monitoring logs.', theme: '#CA72FF' },
              { num: '07', title: 'Continuous Scaling & Optimizations', desc: 'Continuous weekly review checkpoints to analyze lead values, compute optimal ad structures, and expand queues.', theme: '#00f0ff' },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing check point circle */}
                <span 
                  className="absolute -left-[41px] md:-left-[73px] top-1 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold bg-[#131313] text-white group-hover:border-primary-container group-hover:text-[#00f0ff] transition-all duration-300"
                >
                  {step.num}
                </span>

                <div className="space-y-2">
                  <h4 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ==================== SECTION 7: LIVE DASHBOARD DEMO ==================== */}
      <section className="py-32 relative border-b border-white/5 bg-linear-to-b from-[#131313] to-[#0e0e0e]" id="live-demo">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 font-sans">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CA72FF]/20 bg-[#CA72FF]/5">
                <span className="w-2 h-2 rounded-full bg-[#CA72FF] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-widest font-bold">Interactive Sandbox</span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Interactive Systems <span className="text-gradient">Control Room.</span>
              </h3>

              <p className="text-on-surface-variant font-light text-base leading-relaxed">
                Take the dashboard for a spin. Monitor simulated active telemetry outputs below, which represent structural automation metrics engineered for Skyline X clients. Double-click simulation nodes to test performance triggers.
              </p>
            </div>

            {/* Quick dashboard interactive selector summary */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-xl border border-white/5 bg-black/40">
                <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider block mb-2">TELEMETRY CLIENT NODE</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="font-mono text-sm text-white font-black">NODE_SKY_#281</span>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 bg-black/40">
                <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider block mb-2">ACTIVE AUTOS LIVE</span>
                <div className="font-mono text-lg text-[#00f0ff] font-bold">
                  {activeAutomations.toLocaleString()} Executions
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Dashboard Interface */}
          <div className="glass-panel rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.03] to-transparent p-6 relative overflow-hidden">
            
            {/* Header frame */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00f0ff]/5 flex items-center justify-center border border-[#00f0ff]/25 text-primary">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white mb-0.5">SKYLINE X SIMULATED CLIENT WORKSPACE</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider">SECURE DATA STREAM SYNCED (UTC)</span>
                  </div>
                </div>
              </div>

              {/* Sim Controls */}
              <div className="flex items-center gap-4 shrink-0">
                <button 
                  onClick={() => {
                    setActiveAutomations(prev => prev + 150);
                    setDataLogs(prev => [`INTEGRATION: Manual benchmark trigger executed successfully. +150 flows`, ...prev]);
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[9px] uppercase tracking-wider py-2 px-4 rounded transition-all active:scale-95 cursor-pointer"
                >
                  TRIGGER RE-ROUTE PIPELINES
                </button>
              </div>
            </div>

            {/* Dashboard Workspace content items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Tracker 1 */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 bg-black/20 flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider">Live Active Visitors</span>
                    <Wifi size={12} className="text-green-500" />
                  </div>
                  <div className="font-display text-4xl font-extrabold text-white mb-1">
                    {liveTraffic}
                  </div>
                </div>
                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  Real-time client connections routed through Cloudflare CDN Edge.
                </p>
              </div>

              {/* Tracker 2 */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 bg-black/20 flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider">AI Lead Generation conversion</span>
                    <Sparkles size={12} className="text-purple-400" />
                  </div>
                  <div className="font-display text-4xl font-extrabold text-[#00f0ff] mb-1">
                    23.8%
                  </div>
                </div>
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container w-[72%] rounded-full" />
                </div>
              </div>

              {/* Tracker 3 */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 bg-black/20 flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider">Operational Cost reduction multiplier</span>
                    <TrendingUp size={12} className="text-[#00f0ff]" />
                  </div>
                  <div className="font-display text-4xl font-extrabold text-[#CA72FF] mb-1">
                    4.8x
                  </div>
                </div>
                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  Calculated against average manual workflow expenditures.
                </p>
              </div>

            </div>

            {/* Charts visualization simulator */}
            <div className="mt-8 bg-black/30 border border-white/5 rounded-xl p-5">
              <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-widest font-bold block mb-6">DAILY TRANSLATION THROUGHPUT INDEX (LAST 10 HOURS)</span>
              
              <div className="h-28 flex items-end justify-between gap-2.5">
                {[45, 62, 53, 85, 90, 72, 65, 88, 79, 94].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-primary/15 via-[#00f0ff]/40 to-[#00f0ff] rounded-t-sm relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#181818] border border-white/10 text-[8px] font-mono text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                        {height * 10} flows
                      </div>
                    </div>
                    <span className="font-mono text-[7px] text-on-surface-variant/50 mt-2">{10 - idx}h ago</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION 8: TESTIMONIALS ==================== */}
      <section 
        className="py-32 relative border-b border-white/5 bg-surface-container/5"
        id="testimonials"
        onMouseEnter={() => setIsHoveredStory(true)}
        onMouseLeave={() => setIsHoveredStory(false)}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Client Validation</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight lead-none mb-6">
                Client <span className="text-gradient">Affidavits.</span>
              </h2>
              <p className="text-on-surface-variant font-light text-base">
                Concrete high-fidelity reviews from authentic digital organizations. Hover over cards to freeze automatic rotate slider.
              </p>
            </div>

            <div className="font-mono text-xs text-on-surface-variant uppercase tracking-widest font-bold shrink-0">
              AUDITED PARTNERS 0{activeStoryIdx + 1} &mdash; 03
            </div>
          </div>

          <div className="relative">
            {/* Carousel Inner Panel */}
            <div className="glass-panel p-8 md:p-14 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col lg:flex-row lg:items-center gap-12 min-h-[420px]">
              
              {/* Text side */}
              <div className="flex-1 space-y-8 relative z-10">
                <Quote className="text-primary-container/10 w-16 h-16 shrink-0" strokeWidth={1} />
                
                <p className="font-sans text-lg md:text-2xl text-on-surface font-light leading-relaxed">
                  "{successStories[activeStoryIdx].quote}"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-0.5">
                      {successStories[activeStoryIdx].client}
                    </h4>
                    <span className="font-mono text-[8px] text-[#CA72FF] uppercase font-bold tracking-widest">
                      {successStories[activeStoryIdx].role}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-[#00f0ff] border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg font-bold">
                    {successStories[activeStoryIdx].company}
                  </span>
                </div>
              </div>

              {/* Metric audited Spotlight */}
              <div className="w-full lg:w-72 shrink-0 relative z-10">
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-linear-to-b from-white/[0.04] to-transparent flex flex-col items-center justify-center text-center relative overflow-hidden h-64">
                  <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold mb-4">AUDITED MULTIPLIER</span>
                  <div className="font-display text-4xl font-black text-white leading-tight">
                    {successStories[activeStoryIdx].metric}
                  </div>
                  <span className="font-sans text-[10px] text-on-surface-variant mt-4 font-light">Verified Operational Result</span>
                </div>
              </div>

            </div>

            {/* Testimonial Controls bar */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                onClick={() => setActiveStoryIdx(prev => (prev - 1 + successStories.length) % successStories.length)}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-primary-container hover:text-[#00f0ff] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5">
                {successStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeStoryIdx ? 'bg-primary-container w-6' : 'bg-white/10'}`}
                    aria-label={`Go to story ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setActiveStoryIdx(prev => (prev + 1) % successStories.length)}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-primary-container hover:text-[#00f0ff] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION 9: PRICING ESTIMATOR INTERACTIVE WIDGET ==================== */}
      <section className="py-32 relative border-b border-white/5" id="estimator">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-[#CA72FF] animate-pulse"></span>
              <span className="font-mono text-[9px] text-[#CA72FF] uppercase tracking-widest font-bold">Real-time Computation</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              Pricing <span className="text-gradient">Estimator</span>
            </h2>
            <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              Dynamically estimate your architectural investment. Pick your suite elements, goals, and budget to compute recommended paths immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            
            {/* Left: Input Selection criteria */}
            <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/5 bg-black/30 p-8 space-y-8">
              
              {/* Choose Services */}
              <div>
                <label className="font-mono text-[10px] text-[#CA72FF] uppercase tracking-wider font-bold block mb-4">
                  1. SELECT BUSINESS SYSTEMS CAPABILITIES REQUIRED
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesData.map((service) => {
                    const isSelected = estimateServices.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        onClick={() => {
                          if (isSelected) {
                            if (estimateServices.length > 1) {
                              setEstimateServices(prev => prev.filter(id => id !== service.id));
                            }
                          } else {
                            setEstimateServices(prev => [...prev, service.id]);
                          }
                        }}
                        className={`text-left p-4 rounded-xl border font-sans text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-primary bg-primary/5 text-white' 
                            : 'border-white/5 bg-white/2 text-on-surface-variant hover:border-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {getServiceIcon(service.iconName, isSelected ? 'text-primary w-4 h-4' : 'text-on-surface-variant w-4 h-4')}
                          <span className="font-medium">{service.title}</span>
                        </div>
                        <span className={`w-4 h-4 rounded flex items-center justify-center border text-[9px] font-bold ${
                          isSelected ? 'bg-primary-container border-primary text-black' : 'border-white/20'
                        }`}>
                          {isSelected ? <Check size={10} strokeWidth={3} /> : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Set budget metric */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-mono text-[10px] text-[#CA72FF] uppercase tracking-wider font-bold">
                    2. TARGET PROJECT BUDGET TARGET
                  </label>
                  <span className="font-display text-base font-bold text-white">${estimateBudget} USD</span>
                </div>
                <input 
                  type="range"
                  min="99"
                  max="1200"
                  step="50"
                  value={estimateBudget}
                  onChange={(e) => setEstimateBudget(parseInt(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-white/5 rounded-full outline-none focus:outline-none focus:ring-1 focus:ring-primary h-2"
                />
                <div className="flex justify-between font-mono text-[8px] text-on-surface-variant/50 mt-2">
                  <span>$99 STARTER SCALE</span>
                  <span>$600 ENTERPRISE SCALE</span>
                  <span>$1,200 LUXURY COMPLEX CONCURRENT</span>
                </div>
              </div>

              {/* Choose business type */}
              <div>
                <label className="font-mono text-[10px] text-[#CA72FF] uppercase tracking-wider font-bold block mb-3">
                  3. SECTOR CLASSIFICATION
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'saas', label: 'B2B SaaS' },
                    { id: 'ecommerce', label: 'E-Commerce' },
                    { id: 'professional', label: 'Professional Service' },
                    { id: 'enterprise', label: 'Enterprise/Other' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEstimateBusiness(item.id)}
                      className={`font-mono text-[9px] uppercase tracking-wider p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        estimateBusiness === item.id 
                          ? 'border-primary bg-primary/10 text-white' 
                          : 'border-white/5 bg-white/2 text-on-surface-variant hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Dynamic Output Calculations widget */}
            <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-transparent p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 filter blur-3xl pointer-events-none" />
              
              <h4 className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold border-b border-white/5 pb-4 mb-4">
                COMPUTED ARCHITECTURAL ESTIMATE
              </h4>

              <div className="space-y-4">
                
                <div>
                  <span className="font-mono text-[8px] text-on-surface-variant block mb-1">RECOMMENDED CONFIGURATION LEVEL</span>
                  <div className="font-display text-lg font-bold text-white leading-tight">
                    {results.recommended}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">ESTIMATED CYCLE</span>
                    <span className="font-mono text-xs text-white uppercase font-bold tracking-wider">{results.timeline}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-on-surface-variant block">COMPILATION STATE</span>
                    <span className="font-mono text-[8px] text-green-400 font-bold flex items-center gap-1 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SOLVABLE SYSTEM
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[8px] text-on-surface-variant block mb-1">TOTAL PROJECT ESTIMATE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl font-black text-[#00f0ff] tracking-tight">${results.total}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">One-Time USD</span>
                  </div>
                </div>

                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  *This index is a systemized estimate computed automatically. Final dynamic project scopes may vary based on structural API integrations.
                </p>

                <div className="pt-4">
                  <a
                    href="#booking"
                    onClick={() => {
                      setLeadForm(prev => ({
                        ...prev,
                        message: `Pricing Estimator custom computed plan details: recommended "${results.recommended}" for total budget $${results.total} with services: ${estimateServices.join(', ')}.`
                      }));
                    }}
                    className="w-full text-center block bg-primary-container text-on-primary-container font-mono text-[10px] uppercase font-bold py-4 rounded-xl tracking-widest hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all duration-300 active:scale-95"
                  >
                    SELECT PLAN & BOOK BLUEPRINT
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================== PRICING SCHEDULER / BOOKING CALENDAR SYSTEM ==================== */}
      <section className="py-32 scroll-mt-20 border-b border-white/5" id="booking">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start max-w-5xl mx-auto">
            
            {/* Left side detail info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
                <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">Live Synchronized Sessions</span>
              </div>

              <h3 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Lock Your Strategic <span className="text-gradient">Blueprint Slot.</span>
              </h3>

              <p className="text-on-surface-variant font-light text-base leading-relaxed">
                Connect live with our technology operations team. Lock in a free 30-minute operational blueprint architectural call over Zoom to deconstruct process bottlenecks.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/2 border border-white/10 flex items-center justify-center text-[#00f0ff]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-white uppercase font-bold tracking-wider">30m Strategy Call</span>
                    <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">Complimentary systems analysis & live consultation.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/2 border border-white/10 flex items-center justify-center text-[#9c27b0]">
                    <Activity size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-white uppercase font-bold tracking-wider">Simulated Firebase Syncing</span>
                    <p className="font-sans text-xs text-on-surface-variant font-light mt-0.5">Slots are guaranteed via immediate token block reservations.</p>
                  </div>
                </div>
              </div>

              {/* VOICE NOTE SUBMISSION SYSTEM */}
              <div className="bg-black/40 rounded-2xl border border-white/5 p-6 space-y-4">
                <span className="font-mono text-[9px] text-[#CA72FF] uppercase font-bold tracking-wider block">
                  FAST VOICE NOTE LEAD SUBMISSION (Simulated Capture)
                </span>
                <p className="font-sans text-[11px] text-on-surface-variant font-light leading-relaxed">
                  Too busy to write custom messages? Record a quick 15-second memo explaining your operational bottlenecks and submit our system team right away!
                </p>

                <div className="flex items-center gap-4">
                  {!isVoiceRecording && !voiceRecordedBlob && (
                    <button
                      onClick={startVoiceRecording}
                      className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/30 py-2.5 px-5 rounded-lg font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 duration-300 cursor-pointer"
                    >
                      <Mic size={14} /> START RECORDING
                    </button>
                  )}
                  {isVoiceRecording && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={stopVoiceRecording}
                        className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-5 rounded-lg font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 animate-pulse duration-300 cursor-pointer"
                      >
                        <Volume2 size={14} /> STOP RECORDING ({voiceDuration}s)
                      </button>
                      <span className="font-mono text-[9px] text-red-400">Recording live... (Max 15s)</span>
                    </div>
                  )}
                  {voiceRecordedBlob && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] text-green-400 animate-pulse font-bold flex items-center gap-1">
                          <Check size={12} /> MEMO RECORDED
                        </span>
                        <button
                          onClick={handleVoiceMemoSubmit}
                          disabled={voiceLoading}
                          className="text-white hover:text-[#00f0ff] disabled:opacity-50 font-mono text-[9px] uppercase tracking-wider underline cursor-pointer"
                        >
                          {voiceLoading ? 'SUBMITTING...' : 'SUBMIT MEMO NOTE NOW'}
                        </button>
                      </div>
                      {voiceError && (
                        <span className="font-mono text-[8px] text-red-500 block">{voiceError}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right side interactive Calendar Picker */}
            <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-transparent p-8">
              
              {!hasBooked ? (
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-2">
                        CHOOSE BOOKING DATE
                      </label>
                      <input 
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:border-primary outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-2">
                        AVAILABLE TIME SLOT (UTC)
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:border-primary outline-none text-xs"
                      >
                        <option value="09:00">09:00 AM UTC (MORNING)</option>
                        <option value="11:30">11:30 AM UTC</option>
                        <option value="14:00">14:00 PM UTC (AFTERNOON)</option>
                        <option value="16:30">16:30 PM UTC</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-2">
                      YOUR HUMAN NAME
                    </label>
                    <input 
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface text-xs focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider block mb-2">
                      COMMUNICATION EMAIL
                    </label>
                    <input 
                      type="email"
                      placeholder="jane@company.com"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 text-on-surface text-xs focus:border-primary outline-none"
                    />
                  </div>

                  {bookingError && (
                    <div className="text-red-500 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                      {bookingError}
                    </div>
                  )}

                  <button
                    onClick={handleBookingSubmit}
                    disabled={bookingLoading}
                    className="w-full text-center bg-primary-container text-on-primary-container font-mono text-[10px] uppercase tracking-widest font-extrabold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-95 duration-400 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {bookingLoading ? 'SECURING BLUEPRINT...' : 'LOCK IN BLUEPRINT CONSULTATION SESSION'}
                  </button>

                  <span className="font-sans text-[9px] text-on-surface-variant/50 text-center block mt-2">
                    *Instant confirmation tokens will be tracked on local storage sandbox.
                  </span>

                </div>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto text-green-400 border border-green-500/30">
                    <Check size={28} />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white">timezone Slot Secured!</h4>
                  <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                    Greetings, <strong className="text-white">{bookingName}</strong>. Your strategic call on <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTimeSlot} UTC</strong> has been locked successfully inside our scheduling databases. A session link has been dispatch routed.
                  </p>
                  <button 
                    onClick={() => {
                      setHasBooked(false);
                      setBookingName('');
                      setBookingEmail('');
                    }}
                    className="text-xs text-[#00f0ff] hover:underline uppercase tracking-wider font-mono cursor-pointer"
                  >
                    Reschedule or Book Another Slot
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ==================== SECTION 10: FAQ SECTION ==================== */}
      <section className="py-32 relative bg-[#0e0e0e]/50 border-b border-white/5" id="faq">
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Answers &amp; <span className="text-gradient">Protocol Details</span>
            </h2>
            <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              Clear dynamic audit guidelines regarding how Skyline X executes high-availability digital architectures.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How does the automated business assessment cycle begin?', a: 'We start with a thorough deep-discovery operational audit of your existing manual processes or SaaS bottleneck logs, capturing actual tool inputs. Once we isolate waste loops, we draft structural state flow-maps detailing precise deliverables and pricing integrations before writing a single line of Git code.' },
              { q: 'Are we locked into using specific workflow tools like Zapier or Make?', a: 'No. While we leverage Make, n8n, and custom node.js serverless API routes for speed, we architect fully open custom python and javascript workflow runners that can be securely self-hosted on your own AWS or Cloud Run instance clusters, guaranteeing absolute data equity.' },
              { q: 'What database frameworks do you natively sync with?', a: 'We natively design integrations with MongoDB, Firestore, Spanner, PostgreSQL, and lightweight Redis storage buffers. We configure secure rules vectors checking access permissions securely, protecting user transactions from standard data leaks.' },
              { q: 'How long before my bespoke automation system goes live?', a: 'Starter configurations deploy in 3 to 5 business days, while highly complex Elite multi-region systems containing neural LLM structures and automated whatsapp CRMs can take between 12 to 24 business days. All cycles are detailed cleanly inside our custom Estimator tool.' },
              { q: 'Do you offer operational fallback technical support contract deals?', a: 'Yes. Our Pro and Elite implementation workflows include active support periods, with optional SLA coverage backing continuous operation, CDNs monitoring logs, and bi-weekly security audits.' },
            ].map((item, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="glass-panel rounded-xl border border-white/5 bg-black/20 overflow-hidden"
                >
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left py-5 px-6 flex justify-between items-center text-white hover:text-[#00f0ff] transition-all cursor-pointer"
                  >
                    <span className="font-display text-base font-bold tracking-tight">{item.q}</span>
                    <span className="text-xs text-[#00f0ff]">{isOpen ? '[-] COLLAPSE' : '[+] EXPAND'}</span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-white/5 pt-4 text-xs md:text-sm text-on-surface-variant font-sans font-light leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================== SECTION 11: FINAL CTA & LEAD CAPTURE FORM ==================== */}
      <section className="py-32 relative overflow-hidden text-center border-b border-white/5" id="cta">
        <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 filter blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-6 md:px-20 relative z-10 space-y-8">
          
          <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-tight">
            Ready To Build Your Next <span className="italic bg-gradient-to-r from-primary via-primary-fixed-dim to-[#CA72FF] bg-clip-text text-transparent">Digital Empire?</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed">
            Stop letting manual task debt and fragmented software pipelines slow down your growth velocity. Deploy autonomous systems today.
          </p>

          {/* Inline capture / newsletter block */}
          <div className="max-w-md mx-auto relative glass-panel p-2 rounded-xl border border-white/10 flex items-center justify-between">
            <input 
              type="email"
              placeholder="Enter your system email..."
              value={leadMail}
              onChange={(e) => setLeadMail(e.target.value)}
              className="bg-transparent text-white placeholder:text-outline border-none outline-none focus:outline-none focus:none px-4 py-3 flex-grow text-xs w-1/2"
            />
            <button
              onClick={handleNewsletterSubscribe}
              disabled={newsletterLoading}
              className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-mono text-[9px] uppercase tracking-widest font-extrabold hover:shadow-lg transition-all active:scale-95 duration-300 shrink-0 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {newsletterLoading ? 'SUBBING...' : (newsletterSubbed ? 'SUBBED!' : 'START PROJECT')}
            </button>
          </div>
          {newsletterError && (
            <div className="text-red-500 font-mono text-[10px] uppercase tracking-widest text-center mt-2">
              {newsletterError}
            </div>
          )}

          <div className="flex justify-center gap-6 pt-4 font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/50">
            <span>• SECURE SYNC GUARANTEE</span>
            <span>• NO MOCKS DEPLOYED</span>
            <span>• REAL-TIME CLOCK SYNCED</span>
          </div>

        </div>
      </section>

      {/* ==================== SECTION 12: Advanced FUTURISTIC FOOTER ==================== */}
      <footer className="py-20 relative bg-[#090909] overflow-hidden" id="footer-frame">
        <div className="absolute inset-0 holographic-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5 mb-12">
            
            <div className="space-y-6">
              <span className="font-display text-2xl font-black text-[#00f0ff] tracking-tighter block">
                Skyline X
              </span>
              <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                We design and engineer bespoke AI-driven autonomous client workflows, responsive platforms, luxury branding, and synchronized backend database systems for tech-forward visionaries.
              </p>
              <div className="font-mono text-[8px] text-green-400 font-bold bg-green-500/10 border border-green-500/30 w-fit px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> GLOBAL INFRASTRUCTURE ONLINE
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-white uppercase tracking-widest block mb-4 font-bold">Systems Directory</span>
              <ul className="space-y-2 font-sans text-xs text-on-surface-variant font-light">
                {servicesData.map((s) => (
                  <li key={s.id} className="hover:text-[#00f0ff] duration-300">
                    <button onClick={() => setSelectedService(s)} className="text-left hover:underline cursor-pointer">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs text-white uppercase tracking-widest block mb-4 font-bold">Navigation Node</span>
              <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                <li><Link to="/" className="hover:text-white duration-300">/ HOME BASE</Link></li>
                <li><Link to="/services" className="hover:text-white duration-300">/ CAPABILITIES</Link></li>
                <li><Link to="/pricing" className="hover:text-white duration-300">/ PRICING PATHS</Link></li>
                <li><Link to="/about" className="hover:text-white duration-300">/ TEAM PROTOCOL</Link></li>
                <li><Link to="/contact" className="hover:text-white duration-300">/ DISPATCH COMMUNICATIONS</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-xs text-white uppercase tracking-widest block font-bold">Connect Hub</span>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed font-light">
                Secure communications hub monitored around-the-clock. Dispatch details direct to our architects.
              </p>
              <span className="font-mono text-[10px] text-white font-bold block">
                INFO@SKYLINEX.SYSTEMS
              </span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-on-surface-variant/40">
            <span>&copy; 2026 SKYLINE X AGENCY INTELLIGENCE. ALL RIGHTS RESERVED SECTORS.</span>
            <div className="flex gap-4">
              <span className="hover:text-white transition-opacity cursor-pointer">PRIVACY PROTOCOL</span>
              <span className="hover:text-white transition-opacity cursor-pointer">SECURITY SHIELD MATRIX</span>
              <span className="hover:text-white transition-opacity cursor-pointer">STATUS: LIVE</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ==================== EXTRA FLOATING FEATURE: AI CONTEXT CHATBOT ==================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-primary-container text-on-primary-container p-4 rounded-full shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300"
            id="chat-toggle-btn"
            aria-label="Open AI Systems Assistant"
          >
            <MessageSquare size={22} />
          </button>
        ) : (
          <div className="bg-[#181818] border border-white/10 rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden flex flex-col">
            
            {/* Chat header */}
            <div className="p-4 bg-linear-to-r from-primary/10 to-secondary-container/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider">AI Operations Desk (Live)</span>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-on-surface-variant hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 font-sans text-xs flex flex-col">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-container text-on-primary-container ml-auto rounded-tr-none'
                      : 'bg-white/5 text-on-surface mr-auto rounded-tl-none border border-white/5'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="font-mono text-[7px] opacity-50 block mt-1 text-right">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Predefined Quick Prompts to save time */}
            <div className="px-4 pb-2 pt-1 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap">
              {['Pricing Plan Info', 'Services List', 'Book Consult'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setChatInput(prompt);
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 text-white py-1 px-3 rounded-full font-mono text-[8px] uppercase tracking-wider cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/5 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Ask about pricing or booking..."
                className="bg-black/40 border border-white/5 text-white placeholder:text-outline text-xs rounded-lg px-4 py-2.5 flex-grow outline-none focus:border-primary"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary/10 hover:bg-primary/20 border border-primary/30 p-2.5 rounded-lg text-primary cursor-pointer active:scale-95 duration-200"
              >
                <Send size={14} />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
