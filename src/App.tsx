import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Ring3D from './components/Ring3D';
import ParticleEffects from './components/ParticleEffects';
import { CinematicButton } from './components/ui/CinematicButton';

// Landing Page with 3D Ring
function LandingSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Ring Background */}
      <Ring3D mousePosition={mousePosition} scrollY={scrollY} />

      {/* Particle Effects */}
      <ParticleEffects />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 gold-gradient-text glow-gold">
            KEERTHI
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(43,74%,49%)]" />
            <span className="text-xl md:text-2xl tracking-[0.3em] font-light text-white/80">
              GEM & JEWELLERY
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(43,74%,49%)]" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Where Dreams Become Reality. Handcrafted Excellence in Every Gem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CinematicButton variant="gold" size="lg">
            <span>Explore Collection</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </CinematicButton>

          <CinematicButton variant="outline" size="lg">
            <span>Book Appointment</span>
          </CinematicButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest text-white/40">SCROLL</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-[hsl(43,74%,49%)] to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
      }} />
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <motion.div style={{ opacity, y }}>
          <div className="mb-8">
            <span className="text-[hsl(43,74%,49%)] text-sm tracking-widest">ABOUT US</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 gold-gradient-text">
              Crafting Brilliance Since 1985
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Located at No. 217/1, Galle Road, Moratuwa, Keerthi Gem And Jewellery has been Sri Lanka's
            premier destination for exquisite gems and fine jewellery. Our master craftsmen blend
            traditional techniques with modern design to create pieces that tell your story.
          </p>

          <p className="text-white/70 leading-relaxed mb-8">
            From the finest Ceylon sapphires to handcrafted gold ornaments, every piece in our
            collection reflects our commitment to quality, authenticity, and timeless elegance.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { number: '38+', label: 'Years Experience' },
              { number: '5000+', label: 'Happy Customers' },
              { number: '100%', label: 'Authentic Gems' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[hsl(43,74%,49%)]">
                  {stat.number}
                </div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <CinematicButton variant="gold" size="md">
            Learn Our Story
          </CinematicButton>
        </motion.div>

        {/* Right: Feature Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative glass rounded-2xl p-8 border-glow-animate"
        >
          <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(43,74%,30%)] to-[hsl(43,74%,15%)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💎</div>
              <p className="text-white/60">Premium Gemstone</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main App
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[hsl(220,20%,8%)] z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-6"
            >
              💍
            </motion.div>
            <div className="gold-gradient-text text-2xl font-display">KEERTHI</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <LandingSection />
          <AboutSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
