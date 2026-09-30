import { useState, useEffect } from "react";
import { portfolioInfo, socialLinks, clients, projects } from "../data/portfolioData";

interface SkillChipProps {
  children: React.ReactNode;
  className?: string;
}

// Single central component for styling all Skill Chips
function SkillChip({ children, className = "" }: SkillChipProps) {
  return (
    <div className={`px-4 py-2 rounded-md bg-white text-sm font-medium text-[#18181b] flex items-center gap-2.5 transition-all hover:shadow-md cursor-default ${className}`}>
      {children}
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
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-black leading-[1.12] tracking-[-2px] max-w-4xl mb-6">
              High-Agency Product Designer with Empathy currently based in Jakarta
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-lg text-black/65 font-normal leading-[1.5] max-w-2xl mb-10">
              Dary Ramadhan is an Indonesian-based product designer with 2 years of experience focused on helping startups and enterprise teams to simplify complex requirements.
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
                We adapt to the tools and stack your team already uses, keeping the path from design to implementation clear.
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
                  <div className="p-2 sm:p-3 relative w-full aspect-[16/10] bg-[#f4f4f6] rounded-sm overflow-hidden transition-all duration-300 flex items-center justify-center">
                    <div className="w-full h-full rounded-sm overflow-hidden relative">
                      <img
                        src={project.src || "/uploads/uploaded_1785059197708.png"}
                        alt={project.title || "Project Case Study"}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
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
                Wide design variations.
              </h2>
              <p className="text-sm md:text-base text-black/60 leading-relaxed">
                We adapt to the tools and stack your team already uses, keeping the path from design to implementation clear.
              </p>
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
        {/* Subtle Gradient Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f25c0c]/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          {/* Header Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-white">
                As your design partner, I help founders and business owners build great, scalable products.
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
                8+
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                COLLABORATION
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                16+
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                PROJECTS SHIPPED
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                4
              </div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                INDUSTRIES
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#242427]/80 rounded-sm p-6 sm:p-8 text-center hover:border-white/15 transition-colors">
              <div className="text-4xl sm:text-5xl font-regular tracking-tight text-white mb-2">
                4.7
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
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4 self-start">

              <span className="inline-block px-3 py-1 mb-10 bg-white text-xs font-mono font-medium text-black/70 rounded-sm">
                WHAT I WORK WITH DAY-TO-DAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#18181b]">
                Tools &amp; Skills
              </h2>
              <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-sm">
                I adapt to the tools and stack your team already uses, keeping the path from design to implementation clear.
              </p>
            </div>

            {/* Right Column Skills Badges */}
            <div className="lg:col-span-8 space-y-10">
              {/* Category: DESIGN */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  DESIGN
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* Figma */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 38 57">
                      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" />
                      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
                      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
                      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
                      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
                    </svg>
                    <span>Figma</span>
                  </SkillChip>

                  {/* Adobe Illustrator */}
                  <SkillChip>
                    <span className="w-4 h-4 bg-[#18181b] text-white text-[9px] font-bold font-mono rounded flex items-center justify-center shrink-0">Ai</span>
                    <span>Adobe Illustrator</span>
                  </SkillChip>

                  {/* Adobe Photoshop */}
                  <SkillChip>
                    <span className="w-4 h-4 bg-[#18181b] text-white text-[9px] font-bold font-mono rounded flex items-center justify-center shrink-0">Ps</span>
                    <span>Adobe Photoshop</span>
                  </SkillChip>

                  {/* Lottie */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Lottie</span>
                  </SkillChip>

                  {/* Framer */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                    </svg>
                    <span>Framer</span>
                  </SkillChip>

                  {/* ChatGPT */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.28 10.37c-.36-1.57-1.34-2.88-2.73-3.61.16-.7.09-1.46-.22-2.14a3.84 3.84 0 0 0-2.88-2.16 3.92 3.92 0 0 0-3.32.96 3.83 3.83 0 0 0-3.92-.37C8.17 3.63 7.42 4.49 7.15 5.6a3.86 3.86 0 0 0-2.71 2.21c-.4.99-.34 2.1.16 3.05-.9.77-1.41 1.9-1.39 3.08.03 1.25.61 2.41 1.62 3.16a3.84 3.84 0 0 0 1.66 2.97 3.89 3.89 0 0 0 3.73.47c.56.76 1.39 1.3 2.33 1.54a3.91 3.91 0 0 0 3.32-.97 3.82 3.82 0 0 0 3.91.36c1.04-.58 1.79-1.44 2.06-2.55.99-.2 1.9-.77 2.54-1.6.64-.83.94-1.89.84-2.94a3.84 3.84 0 0 0-1.04-3.08z" />
                    </svg>
                    <span>ChatGPT</span>
                  </SkillChip>

                  {/* Claude */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
                    </svg>
                    <span>Claude</span>
                  </SkillChip>
                </div>
              </div>

              {/* Category: RESEARCH */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  RESEARCH
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* User Interview */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>User Interview</span>
                  </SkillChip>

                  {/* Competitive Analysis */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <span>Competitive Analysis</span>
                  </SkillChip>

                  {/* Design Thinking */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-0a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Design Thinking</span>
                  </SkillChip>
                </div>
              </div>

              {/* Category: COLLABORATION */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  COLLABORATION
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* Slack */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                    </svg>
                    <span>Slack</span>
                  </SkillChip>

                  {/* Google Meet */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Google Meet</span>
                  </SkillChip>

                  {/* Notion */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.868c-.42-.326-.98-.513-1.631-.466L3.62 2.474c-.42.047-.56.28-.373.513l1.212 1.221zm.326 3.498v14.133c0 .746.42 1.026 1.166.98l14.755-.886c.746-.047.886-.606.886-1.352V6.446c0-.653-.326-.886-.84-.84L5.672 6.446c-.653.047-.887.326-.887.886zm14.153 1.258c.093.42.093.746-.233.793l-1.073.187v10.31c-.513.28-1.026.42-1.493.42-.746 0-1.026-.233-1.586-.933l-4.572-6.904v6.858l1.773.373c.093.373-.187.746-.7.793l-4.01.233c-.093-.373.14-.746.56-.793l1.166-.233V9.658L7.26 9.425c-.093-.373.187-.746.7-.793l4.384-.28 4.759 7.091V9.285l-1.446-.187c-.093-.42.233-.746.746-.793l3.541-.233z" />
                    </svg>
                    <span>Notion</span>
                  </SkillChip>

                  {/* Figjam */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>Figjam</span>
                  </SkillChip>
                </div>
              </div>

              {/* Category: DEVELOPMENT */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono font-semibold tracking-widest text-black/45 uppercase">
                  DEVELOPMENT
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* React */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2" />
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
                        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
                        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
                      </g>
                    </svg>
                    <span>React</span>
                  </SkillChip>

                  {/* Tailwind */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                    </svg>
                    <span>Tailwind</span>
                  </SkillChip>

                  {/* Webflow */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.8 6.4c-1.6 0-3 .9-3.7 2.2V6.4H12v6.6c0 1.9 1.5 3.4 3.4 3.4 1.6 0 3-.9 3.7-2.2v2.2h3.1V6.4h-3.4zm-1.8 7.4c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM6.9 6.4H3.5v10.1h3.4V6.4zm3.4 0H6.9v10.1h3.4V6.4z" />
                    </svg>
                    <span>Webflow</span>
                  </SkillChip>

                  {/* Wordpress */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.158 0C5.457 0 0 5.457 0 12.158c0 6.701 5.457 12.158 12.158 12.158 6.701 0 12.158-5.457 12.158-12.158C24 5.457 18.859 0 12.158 0zm0 1.157c6.071 0 11.001 4.93 11.001 11.001 0 6.071-4.93 11.001-11.001 11.001C6.087 23.159 1.157 18.229 1.157 12.158 1.157 6.087 6.087 1.157 12.158 1.157z" />
                    </svg>
                    <span>Wordpress</span>
                  </SkillChip>

                  {/* Elementor */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-3 6h2v12H9V6zm6 0h2v3h-2V6zm0 4.5h2v3h-2v-3zm0 4.5h2v3h-2v-3z" />
                    </svg>
                    <span>Elementor</span>
                  </SkillChip>

                  {/* Antigravity */}
                  <SkillChip>
                    <svg className="w-4 h-4 text-[#18181b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 19.5h-13L12 6.5z" />
                    </svg>
                    <span>Antigravity</span>
                  </SkillChip>
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
                {currentTime || "13:31:59"} JKT | Indonesia
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
