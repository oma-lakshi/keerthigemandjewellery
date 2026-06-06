import { useState, useEffect } from 'react';
import Ring3D from './components/Ring3D';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    // Scroll tracking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Auto slide
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const slides = [
    { title: "Ceylon Sapphires", subtitle: "World's Finest Gemstones" },
    { title: "Handcrafted Gold", subtitle: "Traditional Elegance" },
    { title: "Diamond Collection", subtitle: "Brilliance Redefined" }
  ];

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      color: '#fff',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #d4af37, #f4e4bc)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#0a0a0a'
          }}>
            KGJ
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d4af37' }}>KEERTHI</div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#888' }}>GEM & JEWELLERY</div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['Home', 'Collections', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: '#d4af37',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero Section with 3D Ring */}
      <section style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)'
      }}>
        {/* 3D Ring */}
        <Ring3D mousePosition={mousePosition} scrollY={scrollY} />

        {/* Gradient Overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease',
          padding: '0 2rem'
        }}>
          <div style={{
            fontSize: '0.9rem',
            letterSpacing: '0.5em',
            color: '#d4af37',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Welcome to
          </div>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f4e4bc 0%, #d4af37 50%, #b8941f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            textShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
          }}>
            KEERTHI
          </h1>
          <div style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            letterSpacing: '0.3em',
            color: '#fff',
            marginBottom: '0.5rem'
          }}>
            GEM & JEWELLERY
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#888',
            marginTop: '2rem',
            maxWidth: '600px',
            margin: '2rem auto 0',
            lineHeight: 1.8
          }}>
            {slides[currentSlide].subtitle}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #d4af37, #b8941f)',
              border: 'none',
              color: '#0a0a0a',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
            }}>
              View Collection
            </button>
            <button style={{
              padding: '1rem 2.5rem',
              background: 'transparent',
              border: '2px solid #d4af37',
              color: '#d4af37',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}>
              Book Appointment
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 20
        }}>
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '2rem' : '0.5rem',
                height: '0.5rem',
                background: currentSlide === index ? '#d4af37' : '#444',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '0.5rem'
          }}>
            SCROLL
          </div>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #d4af37, transparent)'
          }} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: '#d4af37', marginBottom: '1rem' }}>
            ABOUT US
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f4e4bc' }}>
            Crafting Excellence Since 1985
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: '💎', title: "Premium Gems", desc: "Finest Ceylon sapphires and ethically sourced diamonds" },
            { icon: '✨', title: "Master Craftsmanship", desc: "Traditional techniques meet modern design excellence" },
            { icon: '🏆', title: "Trusted Legacy", desc: "38+ years serving Sri Lanka's jewellery connoisseurs" }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(10, 10, 10, 0.5) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: '#888', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 10, 0.5) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: '#d4af37', marginBottom: '1rem' }}>
          VISIT US
        </div>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#f4e4bc', marginBottom: '2rem', padding: '0 1rem' }}>
          No. 217/1, Galle Road, Moratuwa
        </h2>
        <p style={{ color: '#888', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Open Monday to Saturday, 9 AM to 7 PM
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+94771254212" style={{
            padding: '1rem 2rem',
            background: '#25d366',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            marginTop: '0.5rem'
          }}>
            📞 077 125 4212
          </a>
          <a href="https://wa.me/94771254212" style={{
            padding: '1rem 2rem',
            background: '#25d366',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            marginTop: '0.5rem'
          }}>
            💬 WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)'
      }}>
        <div style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          KEERTHI GEM & JEWELLERY
        </div>
        <div style={{ color: '#888', fontSize: '0.8rem' }}>
          © 2024 All Rights Reserved | Handcrafted in Sri Lanka
        </div>
      </footer>
    </div>
  );
}
