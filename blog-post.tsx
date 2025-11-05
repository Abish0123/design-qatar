
import React, { useState, useEffect, useRef, memo, MouseEventHandler } from 'react';
import { createRoot } from 'react-dom/client';

declare const gsap: any;

// --- DATA & CONFIG ---

const servicesSubLinks = [
  { name: 'Architectural Design', href: 'architectural-design.html', icon: 'fas fa-archway' },
  { name: 'Interior Design & Fit-Out', href: 'interior-design.html', icon: 'fas fa-couch' },
  { name: 'Engineering Consultancy', href: 'engineering-consultancy.html', icon: 'fas fa-cogs' },
  { name: 'Project Management Consultancy', href: 'project-management.html', icon: 'fas fa-tasks' },
  { name: 'Sustainability & Energy', href: 'sustainability-energy.html', icon: 'fas fa-leaf' },
  { name: 'Construction Approval', href: 'construction-approval.html', icon: 'fas fa-check-double' },
];

const navLinks = [
  { name: 'Home', href: '/index.html' },
  { name: 'About Us', href: '/about.html' },
  { name: 'Works/Projects', href: '/works.html' },
  { name: 'Services', href: '/index.html#our-services', subLinks: servicesSubLinks },
  { name: 'Blog', href: '/blog.html' },
  { name: 'Careers', href: '/careers.html' },
  { name: 'Contact', href: '/contact.html' },
];

const blogPosts = [
    { 
      slug: "crafting-tomorrow-sustainable-living",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=60", 
      category: "Sustainability", 
      author: "Jane Doe",
      date: "October 24, 2024", 
      title: "Crafting Tomorrow: Sustainable Living in Residential Architecture",
      subtitle: "Explore the fundamental principles and innovative strategies behind creating eco-friendly homes for a greener future.",
      content: [
        { type: 'paragraph', text: 'Ton,thot,tutts d ann just inf pratice. Tunt de lremoment ad. Cerinsl ercurd tinfimtrk ofilm. The willme to priumne met varim; firal aret btud smimfoe perseily piaste, the henil ltu so intf,nkn he thet timtr asethit elerinsled outsonpest of nkoe elitmlin in ulupotmt lo thestulcr or ecseuvral mlmne iudipisest.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60', captionTitle: 'Harmonious Pendulum: Timeless Design', captionText: 'It tn rnsentic imuria mscrovuh ei stntegiTa stang rnunrn ultids am unchtlaam uturis shreomeli thurois.' },
        { type: 'paragraph', text: 'Architecture lestoujots uiener abomale tnoila lcutigst lrvnbs ttaune hoionnmg. Ytustlet-n unad lne ronepnod, iur ko emnn stall qprisssel grocitrion sinoitems, tiest-s anm ebtimgx flat npeitutnlor oell lunee fan n lma uaremof lesri sterind.' },
        { type: 'blockquote', text: 'Architecture is the just tx un adidinge with then.fues vulfi srken is licseui le ro its upicoon of tesign nt kco enr opest cottinge, the the andat liegats.' },
      ]
    },
    { 
      slug: "the-future-of-bim",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60", 
      category: "Technology", 
      author: "John Smith",
      date: "August 15, 2024", 
      title: "The Future of BIM: AI and Generative Design",
      subtitle: "A detailed look into how Building Information Modeling is evolving with artificial intelligence.",
      content: [
        { type: 'paragraph', text: 'Building Information Modeling (BIM) is undergoing a profound transformation, driven by the integration of artificial intelligence and generative design. These technologies are not merely enhancing existing workflows; they are fundamentally reshaping how we conceive, design, and construct buildings, paving the way for a smarter, more sustainable, and efficient future.' },
        { type: 'blockquote', text: 'Generative design, powered by AI algorithms, can explore thousands of design permutations, optimizing for factors like spatial efficiency, material usage, structural integrity, and energy performance far beyond human capacity.' },
        { type: 'paragraph', text: 'The practical applications are immense. Architects can now input a set of constraints—such as site boundaries, budget, desired adjacencies, and performance targets—and allow the AI to generate a range of optimized design options. This frees designers from repetitive tasks and allows them to focus on higher-level creative and strategic decisions. As we move forward, the synergy between human creativity and machine intelligence will unlock unprecedented possibilities in architecture.' },
      ]
    },
    { 
      slug: "minimalism-and-light",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60", 
      category: "Interior Design", 
      author: "Emily White",
      date: "August 05, 2024", 
      title: "Minimalism and Light: Crafting Serene Spaces",
      subtitle: "Discover the principles of minimalist interior design and the crucial role of light in creating calm and functional spaces.",
      content: [
          { type: 'paragraph', text: 'Minimalist interior design is more than just an aesthetic; it is a philosophy centered on simplicity, functionality, and the intentional use of space. At its core, minimalism seeks to strip away the superfluous to reveal the essential, creating environments that are calm, uncluttered, and conducive to well-being. A key element in achieving this is the masterful manipulation of light, both natural and artificial.'},
          { type: 'image', src: 'https://images.unsplash.com/photo-1556702581-2c7004d4a192?w=800&auto=format&fit=crop&q=60', captionTitle: 'The Play of Shadows', captionText: 'Light is not just for illumination; it is a material that can be used to sculpt space, define form, and evoke emotion.' },
          { type: 'paragraph', text: 'Natural light is paramount. Large, unadorned windows, skylights, and strategically placed mirrors can flood a room with daylight, making it feel larger and more open. Artificial lighting, in turn, should be layered and purposeful. A combination of ambient, task, and accent lighting allows for flexibility, highlighting architectural features, illuminating specific activities, and setting the mood. In a minimalist space, every element must have a purpose, and light is the silent partner that brings the entire composition to life.' }
      ]
    }
];

// --- SHARED & LAYOUT COMPONENTS ---

const SkipToContentLink = () => ( <a href="#main-content" className="skip-to-content-link">Skip to main content</a> );
const AppLink = React.forwardRef<HTMLAnchorElement, { href: string; className?: string; children: React.ReactNode; onClick?: MouseEventHandler<HTMLAnchorElement>; [key: string]: any; }>(({ href, className = '', children, onClick, ...props }, ref) => { const isToggle = href === '#'; const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => { if (isToggle) { e.preventDefault(); } if (onClick) { onClick(e); } }; return ( <a ref={ref} href={href} className={className} onClick={onClick ? handleClick : undefined} {...props}>{children}</a> ); });
const MobileNav = ({ isOpen, onClose }) => { const [isServicesOpen, setIsServicesOpen] = useState(false); const navContainerRef = useRef<HTMLDivElement>(null); useEffect(() => { if (isOpen) { document.body.style.overflow = 'hidden'; const focusableElements = navContainerRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])'); if (!focusableElements || focusableElements.length === 0) return; const firstElement = focusableElements[0]; const lastElement = focusableElements[focusableElements.length - 1]; setTimeout(() => firstElement.focus(), 100); const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') { onClose(); return; } if (e.key === 'Tab') { if (e.shiftKey) { if (document.activeElement === firstElement) { lastElement.focus(); e.preventDefault(); } } else { if (document.activeElement === lastElement) { firstElement.focus(); e.preventDefault(); } } } }; const container = navContainerRef.current; container?.addEventListener('keydown', handleKeyDown); return () => container?.removeEventListener('keydown', handleKeyDown); } else { document.body.style.overflow = ''; } return () => { document.body.style.overflow = ''; }; }, [isOpen, onClose]); const handleServicesToggle = () => { setIsServicesOpen(prev => !prev); }; return ( <div ref={navContainerRef} className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen} id="mobile-nav"><nav className="mobile-nav"><ul>{navLinks.map(link => ( <li key={link.name}><AppLink href={link.subLinks ? '#' : link.href} onClick={link.subLinks ? handleServicesToggle : () => onClose()} aria-haspopup={!!link.subLinks} aria-expanded={link.subLinks ? isServicesOpen : undefined} aria-controls={link.subLinks ? `mobile-${link.name}-submenu` : undefined} id={link.subLinks ? `mobile-${link.name}-toggle` : undefined}>{link.name}{link.subLinks && <i className={`fas fa-chevron-down dropdown-indicator ${isServicesOpen ? 'open' : ''}`} aria-hidden="true"></i>}</AppLink>{link.subLinks && ( <ul id={`mobile-${link.name}-submenu`} className={`mobile-submenu ${isServicesOpen ? 'open' : ''}`} aria-hidden={!isServicesOpen}>{link.subLinks.map(subLink => ( <li key={subLink.name}><AppLink href={subLink.href} onClick={() => onClose()}>{subLink.name}</AppLink></li>))}</ul> )}</li>))}</ul></nav></div> ); };
const Header = ({ theme }) => { const [scrolled, setScrolled] = useState(false); const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false); const burgerMenuRef = useRef<HTMLButtonElement>(null); const servicesToggleRef = useRef<HTMLAnchorElement>(null); const servicesDropdownContainerRef = useRef<HTMLLIElement>(null); const toggleMobileNav = () => { setIsMobileNavOpen(prev => !prev); }; const closeMobileNav = () => { setIsMobileNavOpen(false); burgerMenuRef.current?.focus(); }; const closeServicesDropdown = (shouldFocusToggle = true) => { if (isServicesDropdownOpen) { setIsServicesDropdownOpen(false); if (shouldFocusToggle) { servicesToggleRef.current?.focus(); } } }; useEffect(() => { if (isServicesDropdownOpen) { const firstItem = servicesDropdownContainerRef.current?.querySelector<HTMLAnchorElement>('.dropdown-menu a'); firstItem?.focus(); } }, [isServicesDropdownOpen]); useEffect(() => { const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeServicesDropdown(); } }; const handleClickOutside = (event: MouseEvent) => { if (servicesDropdownContainerRef.current && !servicesDropdownContainerRef.current.contains(event.target as Node)) { closeServicesDropdown(false); } }; if (isServicesDropdownOpen) { document.addEventListener('keydown', handleKeyDown); document.addEventListener('mousedown', handleClickOutside); } return () => { document.removeEventListener('keydown', handleKeyDown); document.removeEventListener('mousedown', handleClickOutside); }; }, [isServicesDropdownOpen]); useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []); const handleServicesClick = (e: React.MouseEvent) => { e.preventDefault(); setIsServicesDropdownOpen(prev => !prev); }; const handleDropdownItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => { const items = Array.from(servicesDropdownContainerRef.current?.querySelectorAll<HTMLAnchorElement>('.dropdown-link-item') || []); const currentIndex = items.indexOf(e.currentTarget); if (e.key === 'ArrowDown') { e.preventDefault(); items[(currentIndex + 1) % items.length]?.focus(); } else if (e.key === 'ArrowUp') { e.preventDefault(); items[(currentIndex - 1 + items.length) % items.length]?.focus(); } else if (e.key === 'Tab' && !e.shiftKey && currentIndex === items.length - 1) { closeServicesDropdown(false); } else if (e.key === 'Tab' && e.shiftKey && currentIndex === 0) { closeServicesDropdown(false); } }; const headerClasses = `app-header ${scrolled ? 'scrolled' : ''} on-${theme}`; return ( <header className={headerClasses}><div className="logo"><AppLink href="/index.html"><img src="https://res.cloudinary.com/dj3vhocuf/image/upload/v1762341232/DESign_220_x_60_px_abhv5e.png" alt="Taj Design Consultancy Logo" className="logo-image" /></AppLink></div><nav className="main-nav" aria-label="Main navigation"><ul>{navLinks.map((link) => ( <li key={link.name} className={`${link.subLinks ? 'has-dropdown' : ''} ${link.name === 'Services' && isServicesDropdownOpen ? 'open' : ''}`} ref={link.name === 'Services' ? servicesDropdownContainerRef : null}><AppLink ref={link.name === 'Services' ? servicesToggleRef : null} href={link.href} id={link.name === 'Services' ? 'services-menu-toggle' : undefined} onClick={link.name === 'Services' ? handleServicesClick : undefined} aria-haspopup={!!link.subLinks} aria-expanded={link.name === 'Services' ? isServicesDropdownOpen : undefined} aria-controls={link.name === 'Services' ? 'services-dropdown-menu' : undefined}>{link.name}{link.subLinks && <i className="fas fa-chevron-down dropdown-indicator" aria-hidden="true"></i>}</AppLink>{link.subLinks && ( <div id="services-dropdown-menu" className="dropdown-menu" role="menu" aria-labelledby="services-menu-toggle"><ul className="dropdown-links" role="none">{link.subLinks.map((subLink, index) => ( <li role="presentation" key={subLink.name}><AppLink href={subLink.href} role="menuitem" onKeyDown={handleDropdownItemKeyDown} className="dropdown-link-item" onClick={() => setIsServicesDropdownOpen(false)} style={{ '--delay': `${index * 0.05}s` } as React.CSSProperties}><i className={`${subLink.icon} dropdown-link-icon`} aria-hidden="true"></i><span>{subLink.name}</span></AppLink></li>))}</ul></div> )}</li>))}</ul></nav><button ref={burgerMenuRef} className={`burger-menu ${isMobileNavOpen ? 'open' : ''}`} onClick={toggleMobileNav} aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-nav" aria-expanded={isMobileNavOpen}><span className="burger-bar"></span><span className="burger-bar"></span><span className="burger-bar"></span></button><MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} /></header> ); };
const LeftSidebar = ({ pageName }) => { return ( <aside className="left-sidebar"><div className="sidebar-top"><div className="divider" /><div className="home-text">{pageName}</div></div><div className="social-icons"><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a><a href="#" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a><a href="#" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a><a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a></div><div className="sidebar-footer"><p>© Taj Design Consult 2024</p></div></aside> ); };
const WaveAnimation = memo(() => { const canvasRef = useRef<HTMLCanvasElement | null>(null); useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return; let animationFrameId: number; const waves = [ { amp: 15, freq: 0.02, phase: 0, color: 'rgba(212, 175, 55, 0.2)', speed: 0.01 }, { amp: 20, freq: 0.015, phase: 1, color: 'rgba(212, 175, 55, 0.3)', speed: 0.015 }, { amp: 25, freq: 0.01, phase: 2, color: 'rgba(212, 175, 55, 0.4)', speed: 0.02 }, ]; const resizeCanvas = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }; const draw = () => { if (!ctx) return; ctx.clearRect(0, 0, canvas.width, canvas.height); waves.forEach(wave => { wave.phase += wave.speed; ctx.beginPath(); ctx.moveTo(0, canvas.height); for (let x = 0; x < canvas.width; x++) { const y = Math.sin(x * wave.freq + wave.phase) * wave.amp + (canvas.height / 1.5); ctx.lineTo(x, y); } ctx.lineTo(canvas.width, canvas.height); ctx.closePath(); ctx.fillStyle = wave.color; ctx.fill(); }); animationFrameId = requestAnimationFrame(draw); }; resizeCanvas(); window.addEventListener('resize', resizeCanvas); draw(); return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); }; }, []); return <canvas ref={canvasRef} id="footer-wave-canvas" aria-hidden="true" />; });
const Footer = () => { const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }); return ( <footer id="footer" className="app-footer"><WaveAnimation /><div className="container"><div className="copyright-section"><span>2024 © Taj Design Consult. All rights reserved.</span><button className="to-top" onClick={scrollToTop} aria-label="Scroll back to top">To Top ↑</button></div></div></footer> ) };
const WhatsAppChatWidget = () => ( <a href="https://wa.me/97477123400" className="whatsapp-widget" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"><div className="whatsapp-ring"></div><div className="whatsapp-ring-delay"></div><i className="fab fa-whatsapp whatsapp-icon" aria-hidden="true"></i></a> );

// --- BLOG POST PAGE & COMPONENTS ---

const BlogPost = ({ post }) => {
    // Dynamically set page title
    useEffect(() => {
        document.title = `${post.title} | Taj Design Consultancy`;
    }, [post]);
    
    return (
        <>
            <section className="blog-post-hero" style={{ backgroundImage: `url(${post.image})`}}>
                <div className="hero-content-wrapper">
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-subtitle">{post.subtitle}</p>
                    <div className="post-meta">
                        <span>By {post.author} | {post.date}</span>
                        <span className="category-tag">{post.category}</span>
                    </div>
                </div>
            </section>
            <div className="blog-article-container">
                <article className="blog-article">
                    {post.content.map((item, index) => {
                        switch (item.type) {
                            case 'paragraph':
                                return <p key={index}>{item.text}</p>;
                            case 'image':
                                return (
                                    <div className="inline-image" key={index}>
                                        <figure>
                                            <img src={item.src} alt={item.captionTitle} />
                                            <figcaption>
                                                <strong>{item.captionTitle}</strong>
                                                {item.captionText}
                                            </figcaption>
                                        </figure>
                                    </div>
                                );
                            case 'blockquote':
                                return <blockquote key={index}>{item.text}</blockquote>;
                            default:
                                return null;
                        }
                    })}
                </article>
            </div>
        </>
    )
};

const BlogPostPage = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postSlug = params.get('post');
        const foundPost = blogPosts.find(p => p.slug === postSlug);
        setPost(foundPost);
        setLoading(false);
    }, []);

    if (loading) {
        return null; // Or a loading spinner
    }

    if (!post) {
        return (
            <div className="not-found-container">
                <h2>Post Not Found</h2>
                <p>The article you are looking for does not exist.</p>
                <a href="/blog.html">Return to Blog</a>
            </div>
        );
    }

    return <BlogPost post={post} />;
}

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`app ${loading ? 'loading' : ''}`}>
            <SkipToContentLink />
            <WhatsAppChatWidget />
            <Header theme="dark" />
            <div className="main-container">
                <LeftSidebar pageName="BLOG" />
                <main className="main-content" id="main-content" tabIndex={-1}>
                    <BlogPostPage />
                    <Footer />
                </main>
            </div>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}