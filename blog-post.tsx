
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
      slug: "interior-design-trends-qatar-2025",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&auto=format&fit=crop&q=60",
      category: "Interior Design",
      author: "Taj Design Experts",
      date: "December 03, 2024",
      title: "Key Trends in Interior Design for Qatar's Commercial and Residential Spaces",
      subtitle: "A research-backed overview of the top trends shaping residential and commercial interiors in Qatar for 2025, from biophilic design to smart technology and cultural fusion.",
      content: [
        { type: 'paragraph', text: "Interior design in Qatar is evolving rapidly, combining luxury, technology, sustainability, and cultural elements to create contemporary spaces that are both functional and visually striking. Here's a research-backed overview of the top trends shaping residential and commercial interiors in Qatar for 2025:" },
        { type: 'heading', text: "1. Biophilic & Eco-Friendly Design" },
        { type: 'paragraph', text: "Connection to nature is a major trend, with designers incorporating indoor plants, living walls, water features, and the extensive use of natural materials such as wood, stone, and marble. These elements promote wellness and support Qatar's environmental goals, while also creating calming and refreshing atmospheres for homes and offices alike. Energy-efficient lighting, eco-friendly finishes, and sustainable materials reflect a growing demand for environmental responsibility." },
        { type: 'heading', text: "2. Cultural Fusion: Modern Meets Heritage" },
        { type: 'paragraph', text: "Contemporary Qatari interiors often blend minimalism, clean lines, open spaces, and neutral color palettes, with Arabic-inspired motifs, majlis-style lounges, arched features, and rich textiles. This seamless fusion honors local traditions while delivering global sophistication, especially prominent in luxury villas, hospitality, and public spaces." },
        { type: 'heading', text: "3. Smart and Tech-Integrated Spaces" },
        { type: 'paragraph', text: "Smart home and office technology is being widely adopted. Automation for lighting, climate control, and security, as well as voice-activated appliances, are standard in new builds. Commercial interiors integrate smart conference rooms and digital wayfinding, ensuring both efficiency and comfort for users." },
        { type: 'image', src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=60', captionTitle: 'Modern & Multifunctional', captionText: 'Adaptable layouts and bespoke touches are defining luxury interiors in Qatar.' },
        { type: 'heading', text: "4. Adaptable and Multifunctional Layouts" },
        { type: 'paragraph', text: "Urban living is driving the demand for adaptable interiors, featuring modular furniture, movable dividers, and spaces that can transition easily from work to relaxation. Flexibility is crucial in both residential apartments and commercial offices to maximize space and meet changing needs." },
        { type: 'heading', text: "5. Wellness-Focused Environments" },
        { type: 'paragraph', text: "Wellness is central to luxury interiors: think spa-like bathrooms, meditation rooms, acoustic insulation, and ergonomic furnishings. These features support physical and mental health, reflecting the growing recognition of the role interiors play in well-being." },
        { type: 'heading', text: "6. Statement Lighting & Bold Colors" },
        { type: 'paragraph', text: "Lighting is more than functional; it's an art form. Dramatic chandeliers, sculptural pendant lights, and LED mood lighting are used to create ambiance and visual interest. Meanwhile, interiors are moving away from only neutrals; deep jewel tones, bold color accents, and maximalism are on the rise in luxury sectors." },
        { type: 'heading', text: "7. Bespoke & Artisanal Touches" },
        { type: 'paragraph', text: "Commissioned furniture, handcrafted mosaics, custom artwork, and unique décor pieces make interiors truly personal and memorable. This desire for exclusivity and individuality is growing among Qatar's high-end clientele." },
        { type: 'heading', text: "8. Open Plan & Seamless Indoor-Outdoor Transitions" },
        { type: 'paragraph', text: "Large windows, glass partitions, and direct access to terraces or gardens blur the lines between interior and exterior. This trend is especially prominent in villas and luxury developments, capitalizing on Qatar's sunny climate and beautiful views." },
        { type: 'blockquote', text: "These interior design trends showcase how innovation and cultural identity can coexist beautifully in Qatar's dynamic environments." },
        { type: 'heading', text: "Key Considerations for Commercial Spaces" },
        { type: 'list', items: [
            "Offices focus on open-plan layouts, collaborative zones, and biophilic elements for productivity and comfort.",
            "Retail and hospitality venues prioritize brand identity, sensory experiences, and operational sustainability.",
            "Public and educational buildings demand resilient finishes, accessibility, and flexible, multifunctional environments."
        ]},
        { type: 'heading', text: "Looking Ahead" },
        { type: 'paragraph', text: "As Qatar continues to develop, these interior design trends showcase how innovation and cultural identity can coexist beautifully. Whether designing a luxury villa or a state-of-the-art office, Taj Design Consultancy remains committed to creating environments that are dynamic, sustainable, and tailored to the needs of modern lifestyles in Qatar." }
      ]
    },
    {
      slug: "bim-digital-innovation-qatar",
      image: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?w=1600&auto=format&fit=crop&q=60",
      category: "Digital Innovation",
      author: "Taj Design Experts",
      date: "November 26, 2024",
      title: "The Role of BIM and Digital Innovation in Transforming Architectural and Engineering Consultancy",
      subtitle: "Exploring how Building Information Modeling (BIM) and digital tools are raising the standard for design, efficiency, and collaboration in the Middle East.",
      content: [
        { type: 'paragraph', text: "The architecture and engineering landscape is rapidly evolving, thanks in large part to digital technologies that are raising the standard for design, efficiency, and collaboration. Among these, Building Information Modeling (BIM) has emerged as a game-changer, fostering a new era of precision and integrated project delivery in Qatar and across the Middle East." },
        { type: 'heading', text: "What is BIM and Why Does It Matter?" },
        { type: 'paragraph', text: "Building Information Modeling (BIM) is more than just 3D design software, it's a holistic process that brings together all project stakeholders and information into a shared digital environment. This allows architects, engineers, and clients to collaborate effectively, visualize the building at every stage, and make informed decisions before a single brick is laid." },
        { type: 'paragraph', text: "By utilizing BIM, firms like Taj Design Consultancy are able to:" },
        { type: 'list', items: [
            "Create highly accurate and coordinated building models",
            "Identify and resolve design clashes early, reducing costly changes during construction",
            "Simulate building performance, allowing for optimization of energy use, sunlight, and airflow",
            "Generate detailed schedules and cost estimates, increasing transparency for clients"
        ]},
        { type: 'image', src: 'https://www.akbconsultants.com/blog/wp-content/uploads/2021/05/structural-engineering-consultants.jpg', captionTitle: 'Shared Digital Environment', captionText: 'BIM brings all project stakeholders and information into a unified digital model, enhancing collaboration.' },
        { type: 'heading', text: "Enhancing Collaboration and Reducing Risk" },
        { type: 'paragraph', text: "One of the most significant benefits of BIM is its ability to minimize miscommunication and duplication of work. All parties, architects, structural engineers, mechanical teams, and contractors, work from the same digital model, ensuring consistency and clarity throughout the project's lifecycle. This not only saves time but helps projects stay on schedule and within budget." },
        { type: 'heading', text: "Driving Sustainable and Efficient Design" },
        { type: 'paragraph', text: "BIM empowers teams to assess sustainability options earlier in the design process. Energy models, material take-offs, and environmental impact studies can be run virtually, supporting eco-friendly design decisions and compliance with Qatar's green building regulations." },
        { type: 'heading', text: "Staying at the Forefront with Digital Innovation" },
        { type: 'paragraph', text: "Beyond BIM, the use of advanced design tools, cloud-based collaboration platforms, and data analytics is transforming how consultancies manage projects and communicate with clients. Digital innovation is enabling architectural and engineering firms in Qatar to deliver smarter, more resilient, and cost-effective buildings." },
        { type: 'blockquote', text: "Firms that embrace these technologies are not only increasing their competitiveness but are laying the foundation for a more sustainable and dynamic built environment." },
        { type: 'heading', text: "Looking to the Future" },
        { type: 'paragraph', text: "As Qatar's construction sector adopts global best practices, the role of BIM and digital innovation will become even more central to successful project delivery. Firms that embrace these technologies are not only increasing their competitiveness but are laying the foundation for a more sustainable and dynamic built environment." }
      ]
    },
    {
      slug: "securing-construction-approvals-qatar",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&auto=format&fit=crop&q=60",
      category: "Approvals",
      author: "Taj Design Experts",
      date: "November 19, 2024",
      title: "Securing Construction Approvals in Qatar: A Practical Guide for Developers",
      subtitle: "Understanding the path from concept to completion, navigating regulations, preparing documentation, and ensuring a smooth journey from vision to reality.",
      content: [
        { type: 'paragraph', text: "For developers eager to bring innovative projects to life in Qatar, understanding the process of securing construction approvals is crucial. The path from concept to completion involves navigating regulations, preparing meticulous documentation, and maintaining clear communication with authorities. With the right guidance, developers can avoid delays and ensure a smooth journey from vision to reality." },
        { type: 'heading', text: "Understanding the Approval Landscape" },
        { type: 'paragraph', text: "Qatar's rapid urban growth means regulatory bodies pay close attention to safety, sustainability, and quality standards. Each construction project, whether commercial, residential, or mixed-use, must comply with national and municipal regulations before work can begin." },
        { type: 'image', src: 'https://www.propertyfinder.qa/blog/wp-content/uploads/2024/05/shutterstock_1938225352-1-600x400.jpg', captionTitle: 'Construction Permit Approved', captionText: 'Securing the right permits is a critical milestone in any construction project in Qatar.' },
        { type: 'heading', text: "Step 1: Initial Project Consultation" },
        { type: 'paragraph', text: "Engaging an experienced architectural and engineering consultancy at the outset can streamline the entire approval process. Consultants help interpret regulatory requirements, offer guidance on project feasibility, and highlight any unique considerations for your development." },
        { type: 'heading', text: "Step 2: Preliminary Design and Compliance Review" },
        { type: 'paragraph', text: "Once a project concept is defined, preliminary drawings are prepared and reviewed against local codes for zoning, safety, energy efficiency, and environmental standards. Adjustments are made early to minimize the risk of rejection at later stages." },
        { type: 'heading', text: "Step 3: Preparing Detailed Submission Documents" },
        { type: 'paragraph', text: "After the concept passes the initial review, the next step is developing comprehensive construction drawings, technical specifications, and supporting reports. This documentation is submitted to the relevant municipal or government authorities for formal appraisal." },
        { type: 'heading', text: "Step 4: Authority Engagement and Feedback" },
        { type: 'paragraph', text: "Authorities may request clarifications, revisions, or additional information. Close collaboration between the developer, consultancy, and relevant agencies ensures timely responses and minimizes back-and-forth." },
        { type: 'heading', text: "Step 5: Securing the Building Permit" },
        { type: 'paragraph', text: "Once all requirements are fulfilled and approvals granted, the official building permit is issued. This clears the way for contractors to mobilize and construction to proceed, with ongoing inspections to ensure compliance throughout the build." },
        { type: 'heading', text: "Step 6: Final Inspection and Handover" },
        { type: 'paragraph', text: "At project completion, authorities carry out final inspections to verify adherence to approved plans and safety standards. Successful sign-off leads to handover and eventual occupancy of the new building." },
        { type: 'heading', text: "Why Expert Guidance Matters" },
        { type: 'paragraph', text: "Partnering with a knowledgeable architectural and engineering consultancy, like Taj Design Consultancy, is invaluable for developers. Their experience navigating Qatar's approval system leads to efficient documentation, faster approvals, and fewer surprises along the way." }
      ]
    },
    { 
      slug: "sustainable-design-middle-east",
      image: "https://constructive-voices.com/wp-content/uploads/2024/02/Saudi-Arabia-Top-Green-Buildings.jpg", 
      category: "Sustainability", 
      author: "Taj Design Experts",
      date: "November 12, 2024", 
      title: "Sustainable Design: Integrating Green Practices in Modern Middle Eastern Construction",
      subtitle: "As urbanization accelerates, eco-conscious architectural and engineering firms are prioritizing environmentally responsible design from project inception to completion.",
      content: [
        { type: 'paragraph', text: "Sustainability is no longer a buzzword, it's a necessity, especially in the fast-evolving construction landscape of the Middle East. As urbanization accelerates across cities like Doha, eco-conscious architectural and engineering firms are leading the way by prioritizing environmentally responsible design choices from project inception to completion." },
        { type: 'heading', text: "The Imperative of Sustainable Building in the Middle East" },
        { type: 'paragraph', text: "With unique climate challenges, the Middle East has a vital role in setting benchmarks for sustainable construction. Leading firms, including Taj Design Consultancy, are responding to the region's needs by introducing advanced energy-saving technologies and resource-efficient designs. This not only aligns with local green building regulations but also reduces operational costs for clients." },
        { type: 'image', src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=60', captionTitle: 'Eco-Conscious Living Spaces', captionText: 'Integrating greenery and natural light is key to sustainable design in modern construction.' },
        { type: 'heading', text: "Materials and Methods for a Greener Tomorrow" },
        { type: 'paragraph', text: "The adoption of locally sourced, recyclable, and low-VOC (volatile organic compound) materials is gaining momentum in Qatar's construction sector. Insulation improvements, innovative facade treatments, and high-performance glazing are modern solutions that enhance indoor comfort while minimizing energy use. Water conservation is another top priority; innovative plumbing fixtures, greywater recycling, and drought-resistant landscaping are increasingly standard in new projects." },
        { type: 'heading', text: "Designing with the Environment in Mind" },
        { type: 'paragraph', text: "Passive design strategies like orientation, natural ventilation, and shading, are at the core of environmentally friendly architecture. Combined with renewable energy systems such as solar panels and smart building management technologies, these approaches enable buildings to achieve greater efficiency and leave a smaller environmental footprint." },
        { type: 'blockquote', text: "The move toward sustainable construction is not only about regulatory compliance, it's about creating healthier, more resilient spaces for future generations." },
        { type: 'heading', text: "Regulatory Support and Client Benefits"},
        { type: 'paragraph', text: "Qatar's national vision promotes sustainability across all industries, with regulations that encourage developers to adopt green practices. Architectural and engineering consultancies guide clients through the certification process, ensuring that buildings meet, and often exceed, requirements for energy, water, and resource efficiency. With every project, firms like Taj Design Consultancy help shape communities that are robust, adaptable, and environmentally responsible."}
      ]
    },
    { 
      slug: "sustainable-renovation-qatar",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&auto=format&fit=crop&q=60", 
      category: "Sustainability", 
      author: "Taj Design Experts",
      date: "November 05, 2024", 
      title: "Building for the Future: Sustainable Renovation and Digital Transformation in Qatar's Construction Sector",
      subtitle: "As Qatar pursues its National Vision 2030, sustainable renovation and digital transformation have moved from trend to necessity, creating smarter, greener, and more resilient spaces.",
      content: [
        { type: 'paragraph', text: "Qatar's construction industry stands at a critical crossroads, balancing ambitious new developments with the urgent need to modernize and upgrade existing properties. As the country pursues its National Vision 2030, sustainable renovation and digital transformation have moved from trend to necessity. Consultancies like Taj Design Consultancy play an important role, supporting clients in their journey towards creating smarter, greener, and more resilient spaces." },
        { type: 'heading', text: 'Sustainable Renovation: Upgrading with Purpose' },
        { type: 'paragraph', text: "Renovating older buildings is no longer just about aesthetics; it's about driving energy performance, occupant comfort, and long-term value." },
        { type: 'list', items: [
            "Energy-efficient retrofits: From high-performance glazing and advanced insulation to LED lighting and HVAC upgrades, reducing energy consumption is a top priority.",
            "Water-saving technologies: Smart plumbing fixtures and integrated rainwater harvesting systems help address water scarcity and cut utilities costs.",
            "Indoor environmental quality: Use of low-VOC materials, improved air filtration, and natural daylighting contribute to healthier spaces for residents and staff.",
            "Heritage preservation: Strategically chosen eco-upgrades can refresh existing structures while honoring Qatar's architectural history."
        ]},
        { type: 'image', src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop&q=60', captionTitle: 'Modern sustainable interior', captionText: 'A blend of natural materials and greenery enhances indoor environmental quality.' },
        { type: 'heading', text: 'Digital Transformation: Enhancing Every Phase' },
        { type: 'paragraph', text: "Modern renovation projects are powered by digital tools that add transparency, reduce risk, and improve collaboration." },
        { type: 'list', items: [
            "Building Information Modeling (BIM): Digital models allow for precise planning, clash detection, and virtual walkthroughs before construction begins, meaning fewer surprises and faster delivery.",
            "Project management platforms: Real-time updates keep stakeholders informed and aligned. Budget tracking, process automation, and document management make projects more predictable and efficient.",
            "Smart building systems: Integration of IoT sensors, automated climate controls, and intelligent security boosts building safety and performance post-renovation."
        ]},
        { type: 'heading', text: 'Real-World Impact: Success Stories in Qatar'},
        { type: 'paragraph', text: 'Leading offices, hotels, and schools in Doha have already benefited from sustainable renovation. For example:'},
        { type: 'list', items: [
            "A business center that retrofitted its façade and HVAC, reducing energy bills by 30%.",
            "A luxury villa upgraded its bathrooms and gardens to water-saving fixtures and native landscaping, promoting community-wide conservation.",
            "Public buildings scheduled for renovation in 2025 are using BIM for pre-construction planning, helping authorities meet new sustainability codes."
        ]},
        { type: 'blockquote', text: 'At every stage, Taj Design Consultancy provides tailored guidance, prioritizing both sustainability and digital excellence, ensuring every investment delivers maximum value and lasting positive impact.' }
      ]
    },
    { 
      slug: "architectural-innovation-qatar",
      image: "https://worldarchitecture.org/cdnimgfiles/extuploadc/347.jpg",
      category: "Architecture",
      author: "Taj Design Experts",
      date: "October 28, 2024",
      title: "How Architectural Innovation is Shaping Qatar's Urban Future",
      subtitle: "Forward-thinking architecture and engineering firms are blending creativity, technical excellence, and sustainability to craft the country's future.",
      content: [
        { type: 'paragraph', text: "Qatar is experiencing a wave of transformation as its cities expand and new districts emerge. Behind this impressive progress are forward-thinking architecture and engineering consultancy firms that blend creativity, technical excellence, and sustainability to craft the country's future." },
        { type: 'heading', text: "Setting the Pace for Urban Excellence" },
        { type: 'paragraph', text: "Architectural innovation in Qatar is about more than impressive skylines, it's about creating spaces that enhance the lives of those who use them. Firms like Taj Design Consultancy are at the forefront, designing commercial towers, residential complexes, and mixed-use developments that define modern Qatar. Their detailed approach ensures that each project reflects local culture, meets client needs, and responds to the environment it inhabits." },
        { type: 'image', src: 'https://media.istockphoto.com/id/1285339126/photo/qatar-national-museum.jpg?s=612x612&w=0&k=20&c=9cZ-twx_lZhd6IxIq8MAYT72TxZjCvRY5N0XZwEDTNM=', captionTitle: "Modern Qatari Architecture", captionText: "Iconic structures are redefining the urban landscape of Doha." },
        { type: 'heading', text: "Focus on Sustainable Urban Development" },
        { type: 'paragraph', text: "Today's leading designs incorporate sustainable practices right from the initial planning stages. Emphasizing eco-friendly materials and energy-efficient systems, Qatar's most successful projects not only adhere to local environmental standards but also reduce long-term costs for property owners. Sustainability has become a cornerstone of modern design, aligning new developments with global best practices and Qatar's national vision." },
        { type: 'heading', text: "Guiding Projects Through Regulatory Challenges" },
        { type: 'paragraph', text: "In a rapidly growing market, understanding and navigating the construction approval process is essential. With years of experience in the Qatari regulatory environment, architectural and engineering consultants help clients secure timely permits, comply with building codes, and avoid costly delays. This expertise leads to smoother project timelines and greater peace of mind for developers." },
        { type: 'heading', text: "A Diverse Portfolio for a Dynamic Market" },
        { type: 'paragraph', text: "From business centers in the heart of Doha to educational and healthcare facilities in expanding suburbs, a strong consultancy portfolio showcases versatility. This diversity means that firms like Taj Design Consultancy can bring innovative solutions to a wide range of projects, always prioritizing quality, safety, and functional aesthetics." },
        { type: 'blockquote', text: "As Qatar continues to invest in its infrastructure and cityscapes, the work of leading architectural and engineering consultancy firms will have a lasting impact. Their ability to combine local knowledge with international standards ensures that new developments contribute positively to the country's urban fabric for generations to come." }
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
                            case 'heading':
                                return <h2 key={index}>{item.text}</h2>;
                            case 'list':
                                return (
                                    <ul key={index}>
                                        {(item.items as string[]).map((li, i) => <li key={i}>{li}</li>)}
                                    </ul>
                                );
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
