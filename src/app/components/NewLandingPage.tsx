import { useState, useEffect, useRef } from "react";
import { portfolioInfo, socialLinks, clients, projects } from "../data/portfolioData";
import ProjectCoverSlideshow from "./ProjectCoverSlideshow";

interface CounterNumberProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

function CounterNumber({
  end,
  duration = 1800,
  decimals = 0,
  suffix = "",
  prefix = "",
}: CounterNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth cubic ease-out
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * end;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface SkillChipProps {
  children?: React.ReactNode;
  icon?: string;
  name?: string;
  className?: string;
}

// Single central component for styling all Skill Chips
function SkillChip({ children, icon, name, className = "" }: SkillChipProps) {
  return (
    <div className={`px-4 py-2 rounded-md bg-white text-sm font-medium text-[#18181b] flex items-center gap-2.5 transition-all hover:shadow-md cursor-default ${className}`}>
      {icon && <img src={icon} alt={name || ""} className="w-4 h-4 object-contain shrink-0" />}
      {name ? <span>{name}</span> : children}
    </div>
  );
}

export default function NewLandingPage() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const bookingUrl = portfolioInfo.ctas.primary.url || "https://cal.com/daryramadhan/discovery-call";
  const selectedProjects = projects.filter((p) => !p.isEmpty).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] font-['Manrope',sans-serif] relative selection:bg-[#f25c0c] selection:text-white">
      {/* Background Texture Layer covering Navbar & Hero */}
      <div className="w-full relative overflow-hidden">
        {/* Background Texture with 50% opacity */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat [background-size:100%_auto] pointer-events-none"
          style={{
            backgroundImage: `url('/hero-bg-texture.jpg')`,
            opacity: 0.5,
          }}
        />
        {/* =========================================================================
            STICKY NAVIGATION BAR (TRANSPARENT & NO BORDER)
           ========================================================================= */}
        <header className="sticky top-0 z-50 w-full bg-transparent py-4 transition-all duration-300">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
            {/* Author Branding */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-medium text-sm text-black/90 group-hover:text-[#f25c0c] transition-colors">
                {portfolioInfo.author} © {portfolioInfo.year}
              </span>
            </a>

            {/* Right Controls: Live Clock, Socials, CTA */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-blackpx-3 py-1.5">
                <span>{currentTime || "13:31:59"} JKT</span>
                <span className="text-black/30">|</span>
                <span>Indonesia</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-1.5 text-black/70">
                <a
                  href="mailto:daryramadhan23@gmail.com"
                  title="Email Dary"
                  className="p-1.5 hover:text-[#f25c0c] hover:bg-black/5 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.find(s => s.label === "Dribbble")?.url || "https://dribbble.com/daryramadhan"}
                  target="_blank"
                  rel="noreferrer"
                  title="Dribbble Profile"
                  className="p-1.5 hover:text-[#f25c0c] hover:bg-black/5 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                    <path strokeLinecap="round" strokeWidth="1.8" d="M8.5 2.75c4.375 3 6.5 9 6.5 18.5M15.5 2.75c-4.375 3-6.5 9-6.5 18.5M2.5 9.5h19M2.5 14.5h19" />
                  </svg>
                </a>
                <a
                  href={socialLinks.find(s => s.label === "LinkedIn")?.url || "https://linkedin.com/in/daryramadhan"}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="p-1.5 hover:text-[#f25c0c] hover:bg-black/5 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
                  </svg>
                </a>
              </div>

              {/* Header CTA */}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary py-2 px-5 text-xs sm:text-sm"
              >
                Book a Call
              </a>
            </div>
          </div>
        </header>
        <div className="max-w-[1240px] mx-auto px-8 sm:px-8 lg:px-12">

          {/* Hero Banner Section */}
          <section className="pt-20 pb-16 md:pt-28 md:pb-24 flex flex-col items-center text-center animate-reveal-up">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white shadow-xs mb-8">
              <span className="w-2 h-2 rounded-full bg-[#f25c0c] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-black/80">
                Available for freelance projects and remote work
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-black leading-[1.125] sm:tracking-[-3px] tracking-[-1.4px] max-w-4xl mb-6">
              UX/UI Designer who thinks beyond the interface
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-md text-black/65 font-normal leading-[1.5] sm:max-w-3xl mb-10">
              Dary is a high-agency UX/UI designer who combines product thinking, UX/UI, design engineering, AI, and business understanding to take complex ideas from problem to shipped product.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#selected-works"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("selected-works");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn-primary px-7 py-3.5 text-base cursor-pointer"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-black font-medium text-sm transition-all hover:border-black/30"
              >
                <svg className="w-4 h-4 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Client Logos Strip */}
            <div className="mt-20 md:mt-24 w-full pt-10">
              <p className="text-xs font-medium text-black/45 tracking-wide mb-8">
                Got experience with all kinds of companies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10 opacity-80 grayscale hover:grayscale-0 transition-all">
                {clients.map((client) => (
                  <img
                    key={client.id}
                    src={client.logo}
                    alt={client.name}
                    className="h-7 md:h-10 object-contain max-w-[120px] transition-transform hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Middle Page Sections (Pure White #ffffff) */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 bg-[#ffffff]">
        {/* =========================================================================
            SELECTED WORKS SECTION
           ========================================================================= */}
        <section id="selected-works" className="py-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Sticky Sidebar info) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 self-start">
              <span className="inline-block px-3 py-1 mb-10 bg-black/[0.02] text-xs font-mono font-medium text-black/70 rounded-sm">
                Case Study
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
                Selected Works
              </h2>
              <p className="text-sm md:text-base text-black/60">
                A selection of products I've worked on across enterprise platforms, AI products, web experiences, and digital products.
              </p>
              <div className="pt-2">
                <a
                  href="/showcase"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#f25c0c] hover:text-[#d44f07] group transition-colors"
                >
                  <span>View Project Showcase</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column (Projects Cards Grid) */}
            <div className="lg:col-span-8 space-y-12">
              {selectedProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.url || `/showcase`}
                  className="block group space-y-4 cursor-pointer"
                >
                  {/* Card Media Preview */}
                  <div className="relative w-full aspect-[16/10] bg-[#f4f4f6] rounded-sm overflow-hidden transition-all duration-300">
                    <ProjectCoverSlideshow
                      coverImages={project.coverImages}
                      src={project.src || "/uploads/uploaded_1785059197708.png"}
                      alt={project.title || "Project Case Study"}
                      className="w-full h-full relative overflow-hidden"
                      imgClassName="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Card Meta Info */}
                  <div className="space-y-1 mt-6">
                    <div className="text-xs font-mono font-medium text-black/45 uppercase">
                      {project.client?.toUpperCase() || "ENTERPRISE"} / {project.category?.toUpperCase() || "PRODUCT DESIGN"}
                    </div>
                    <h3 className="text-xl font-medium text-black transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <svg className="w-5 h-5 text-black/30 opacity-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            WIDE DESIGN VARIATIONS / SHOTS SECTION (STICKY LEFT SIDEBAR)
           ========================================================================= */}
        <section id="shots" className="py-[150px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Sticky Sidebar info) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 self-start">

              <span className="inline-block px-3 py-1 mb-10 bg-black/[0.02] text-xs font-mono font-medium text-black/70 rounded-sm">
                Shots
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
                A collection of UI design</h2>
              <p className="text-sm md:text-base text-black/60 leading-relaxed">
                A collection of UI screens, components, interactions, and design explorations from my projects.</p>
            </div>

            {/* Right Column (2-Column Grid of Design Variations / Shots) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-1">
              {projects.filter((p) => !p.isEmpty).slice(0, 8).map((shot, idx) => (
                <div
                  key={shot.id || idx}
                  className="group relative bg-[#f8f8fa] rounded-sm overflow-hidden transition-all duration-300"
                >
                  <div className="p-2 w-full aspect-[4/3] bg-[#f2f2f5] flex items-center justify-center rounded-sm">
                    <div className="w-full h-full rounded-sm overflow-hidden relative">
                      <img
                        src={shot.src || "/uploads/uploaded_1785059197708.png"}
                        alt={shot.title || "Design Variation Shot"}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          VALUE PROPOSITION & STATS SECTION (FULL WIDTH DARK BLOCK)
         ========================================================================= */}
      <section className="w-full bg-[#18181b] text-white py-20 md:py-[150px] relative z-20 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          {/* Header Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-white max-w-sm">
                Built across products, teams, and industries.
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center lg:justify-end">
              <p className="text-sm md:text-sm text-white font-normal max-w-xs lg:text-right">
                Focusing on clean aesthetics, functional design, and technical precision to bring visions to life.
              </p>
            </div>
          </div>

          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-1">
            {/* Stat 1 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                <CounterNumber end={16} suffix="+" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                PROJECTS SHIPPED
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                <CounterNumber end={8} suffix="+" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                COLLABORATIONS
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                <CounterNumber end={4} />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                INDUSTRIES
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                <CounterNumber end={4.7} decimals={1} />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                FASTWORK RATING
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TOOLS & SKILLS SECTION (FULL WIDTH BG #F8F8FA)
         ========================================================================= */}
      <section className="w-full bg-[#f9f9f9] md:py-28 relative z-20">
        <div className="max-w-[1240px] mx-auto px-5 py-24 sm:py-1 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 self-start">

              <span className="inline-block px-3 py-1 mb-10 bg-white text-xs font-mono font-medium text-black/70 rounded-sm">
                TOOLS
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#18181b]">
                Tools &amp; Skills
              </h2>
              <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-sm">
                I adapt to the tools and stack your team already uses, keeping the path from design to implementation clear.</p>
            </div>

            {/* Right Column Skills Badges */}
            <div className="lg:col-span-8 space-y-10">
              {/* Category: DESIGN */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  DESIGN
                </div>
                <div className="flex flex-wrap gap-3">
                  <SkillChip icon="/icon-tools/icon-figma.svg" name="Figma" />
                  <SkillChip icon="/icon-tools/icon-illustrator.svg" name="Adobe Illustrator" />
                  <SkillChip icon="/icon-tools/icon-photoshop.svg" name="Adobe Photoshop" />
                  <SkillChip icon="/icon-tools/icon-lottie.svg" name="Lottie" />
                  <SkillChip icon="/icon-tools/icon-framer.svg" name="Framer" />
                  <SkillChip icon="/icon-tools/icon-chatgpt.svg" name="ChatGPT" />
                  <SkillChip icon="/icon-tools/icon-claude.svg" name="Claude" />
                </div>
              </div>

              {/* Category: DEVELOPMENT */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  DEVELOPMENT
                </div>
                <div className="flex flex-wrap gap-3">
                  <SkillChip icon="/icon-tools/icon-react.svg" name="React" />
                  <SkillChip icon="/icon-tools/icon-tailwind.svg" name="Tailwind" />
                  <SkillChip icon="/icon-tools/icon-webflow.svg" name="Webflow" />
                  <SkillChip icon="/icon-tools/icon-wordpress.svg" name="Wordpress" />
                  <SkillChip icon="/icon-tools/icon-elementor.svg" name="Elementor" />
                  <SkillChip icon="/icon-tools/icon-antigravity.svg" name="Antigravity" />
                </div>
              </div>

              {/* Category: RESEARCH */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  RESEARCH
                </div>
                <div className="flex flex-wrap gap-3">
                  <SkillChip icon="/icon-tools/icon-userinterview.svg" name="User Interview" />
                  <SkillChip icon="/icon-tools/icon-competitive.svg" name="Competitive Analysis" />
                  <SkillChip icon="/icon-tools/icon-designthinking.svg" name="Design Thinking" />
                </div>
              </div>

              {/* Category: COLLABORATION */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  COLLABORATION
                </div>
                <div className="flex flex-wrap gap-3">
                  <SkillChip icon="/icon-tools/icon-slack.svg" name="Slack" />
                  <SkillChip icon="/icon-tools/icon-meet.svg" name="Google Meet" />
                  <SkillChip icon="/icon-tools/icon-notion.svg" name="Notion" />
                  <SkillChip icon="/icon-tools/icon-figjam.svg" name="Figjam" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER / FINAL CTA SECTION (WITH ROTATED BACKGROUND TEXTURE)
         ========================================================================= */}
      <div className="w-full relative overflow-hidden">
        {/* Rotated background texture layer (white part on top) */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat [background-size:100%_auto] opacity-[50%] rotate-180 pointer-events-none"
          style={{ backgroundImage: `url('/hero-bg-texture.jpg')` }}
        />

        <footer className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 pt-[200px] pb-[50px] flex flex-col items-center text-center">
          {/* Circular Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 bg-zinc-200 relative">
            <img
              src="/avatar.png"
              alt={portfolioInfo.author}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/avatar.webp";
              }}
            />
          </div>

          {/* Heading & Subtitle */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black mb-4 max-w-2xl">
            Thanks for exploring my work!
          </h2>
          <p className="text-base text-black/60 max-w-lg mb-8">
            Have a project or opportunity in mind? Book a free 30-minute discovery call or send me the project details.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-8 py-3.5 text-base"
            >
              Book a Call
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-black font-medium text-sm transition-all hover:border-black/30"
            >
              <svg className="w-4 h-4 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          {/* Bottom Footer Bar */}
          <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-black/50 pt-[200px]">
            <div>
              © 2026 {portfolioInfo.author}. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:block font-mono">
                {currentTime || "13:31:59"} JKT | Indonesia | Available for remote collaboration
              </div>
              <div className="flex items-center gap-3 text-black/70">
                <a
                  href="mailto:daryramadhan23@gmail.com"
                  className="hover:text-[#f25c0c] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.find(s => s.label === "Dribbble")?.url || "https://dribbble.com/daryramadhan"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f25c0c] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                    <path strokeLinecap="round" strokeWidth="1.8" d="M8.5 2.75c4.375 3 6.5 9 6.5 18.5M15.5 2.75c-4.375 3-6.5 9-6.5 18.5M2.5 9.5h19M2.5 14.5h19" />
                  </svg>
                </a>
                <a
                  href={socialLinks.find(s => s.label === "LinkedIn")?.url || "https://linkedin.com/in/daryramadhan"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f25c0c] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
