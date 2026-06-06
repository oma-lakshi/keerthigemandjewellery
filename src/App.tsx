import { useState, useEffect } from 'react';

// Simple elegant jewellery website
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    { title: "Ceylon Sapphires", subtitle: "World's Finest Gemstones", image: "https://images.pexels.com/photos/2695825/pexels-photo-2695825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Handcrafted Gold", subtitle: "Traditional Elegance", image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Diamond Collection", subtitle: "Brilliance Redefined", image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
  ];

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      color: '#fff'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        background: 'rgba(10, 10, 10, 0.9)',
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

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {slides.map((slide, index) => (
          <div key={index} style={{
            position: 'absolute',
            inset: 0,
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)'
            }} />
          </div>
        ))}

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease'
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
            fontSize: '5rem',
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
            fontSize: '2rem',
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

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
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
              transition: 'all 0.3s ease'
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
          zIndex: 3
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
          <h2 style={{ fontSize: '3rem', color: '#f4e4bc' }}>
            Crafting Excellence Since 1985
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem'
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
              textAlign: 'center'
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
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(10, 10, 10, 0.5) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: '#d4af37', marginBottom: '1rem' }}>
          VISIT US
        </div>
        <h2 style={{ fontSize: '3rem', color: '#f4e4bc', marginBottom: '2rem' }}>
          No. 217/1, Galle Road, Moratuwa
        </h2>
        <p style={{ color: '#888', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Open Monday to Saturday, 9 AM to 7 PM
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="tel:+94771254212" style={{
            padding: '1rem 2rem',
            background: '#25d366',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            letterSpacing: '0.1em'
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
            letterSpacing: '0.1em'
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
