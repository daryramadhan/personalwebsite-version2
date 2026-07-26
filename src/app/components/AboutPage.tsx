import { portfolioInfo, socialLinks } from "../data/portfolioData";

export default function AboutPage() {
  const experiences = [
    {
      role: "Creative Director & Lead Product Designer",
      company: "TRD Creative Studio",
      period: "2025 — Present",
      description: "Directing brand identity and UI/UX strategy for startups, SaaS platforms, and enterprise digital solutions. Partnering directly with founders to translate business models into high-agency, visually premium, and conversion-focused web layouts."
    },
    {
      role: "UI/UX Designer",
      company: "PT. Synapsis Sinergi Digital",
      period: "Dec 2024 — Present",
      description: "Designing end-to-end flows for complex enterprise applications and digital transformation software. Establishing consistent UI libraries, conducting heuristic audits, and aligning design outcomes with product engineering specifications."
    },
    {
      role: "Product Designer & iOS Developer",
      company: "Apple Developer Academy (Cohort 6)",
      period: "2023 — 2024",
      description: "Researched, designed, and built interactive iOS applications under direct Apple mentorship. Conducted extensive target audience research, rapid interactive prototyping, and usability testing to craft accessible app experiences."
    },
    {
      role: "Community Lead",
      company: "Google Developer Student Club (BINUS Malang)",
      period: "2022 — 2023",
      description: "Led a developer community of 150+ student members. Organized design and coding workshops, speaker panels, and hackathons, advocating for user-centered design and bridging the gap between developers and designers."
    },
    {
      role: "UI/UX Trainer",
      company: "Bina Nusantara Computer Club (BNCC)",
      period: "2021 — 2022",
      description: "Mentored aspiring UI/UX designers, designed progressive training curricula, and instructed students in design fundamentals, typography, grid layouts, and Figma prototyping workflows."
    }
  ];

  const expertises = [
    "Product Strategy & UX Research",
    "Figma Design Systems",
    "User Interface (UI) Design",
    "Mobile & Web Prototyping",
    "iOS Application Design",
    "Front-End Engineering Alignment",
    "Micro-Animations & Motion Design"
  ];

  const volunteering = [
    {
      role: "Media Creative Lead / Volunteer",
      organization: "Google I/O Cloud Extended 2024",
      period: "2024"
    },
    {
      role: "Design Volunteer",
      organization: "GoogleDevsID Community Projects",
      period: "2023"
    }
  ];

  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif] text-black flex flex-col justify-between">
      {/* Main Content Column */}
      <div className="max-w-[1000px] mx-auto px-[24px] md:px-[50px] py-[32px] md:py-[64px] flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] items-start w-full flex-1">

        {/* Left Sticky Column */}
        <div className="w-full lg:w-[220px] shrink-0 lg:sticky lg:top-[64px] lg:self-start flex flex-col gap-[24px] lg:gap-[16px] h-fit">
          <a
            href="#/"
            className="bg-[#f25c0c] hover:bg-[#e0540b] text-white font-regular text-[14px] leading-[1.4] px-[20px] py-[8px] rounded-full inline-flex items-center gap-[6px] transition-colors cursor-pointer w-fit"
          >
            <span>←</span> Back to Portfolio
          </a>

          {/* Profile Circle Frame */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-[16px] lg:gap-[24px] mt-[16px] lg:mt-[32px]">
            <div className="size-[80px] lg:size-[100px] rounded-full overflow-hidden bg-gray-50 shrink-0">
              <img
                src="/avatar.webp"
                alt="Dary Ramadhan"
                className="size-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-[20px] font-medium text-black tracking-[-0.5px]">{portfolioInfo.author}</h1>
              <p className="text-[13px] text-[#8e8e8e] mt-[2px]">High-Agency Product Designer</p>
              <p className="text-[13px] text-[#8e8e8e] mt-[2px]">Based in Jakarta, ID</p>
            </div>
          </div>

          <hr className="hidden lg:block border-[#f4f4f4]" />

          {/* Combined Info Panel */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-[24px] lg:gap-[16px] w-full">
            {/* Education */}
            <div className="flex-1 flex flex-col gap-[8px]">
              <p className="text-[10px] font-semibold text-[#8e8e8e] uppercase tracking-[1px]">Education</p>
              <div className="text-[14px] text-black">
                <p className="font-medium">BINUS University</p>
                <p className="text-gray-500 text-[12px] mt-[1px]">B.S. in Computer Science</p>
                <p className="text-gray-400 text-[11px] mt-[1px]">2020 — 2024</p>
              </div>
            </div>

            <hr className="hidden sm:block lg:hidden border-r border-[#f4f4f4] h-[60px] self-center" />

            {/* Contact Details */}
            <div className="flex-1 flex flex-col gap-[8px] lg:gap-[12px]">
              <p className="text-[10px] font-semibold text-[#8e8e8e] uppercase tracking-[1px]">Contact & Links</p>
              <div className="flex flex-wrap sm:flex-col gap-[12px] sm:gap-[8px] text-[13px] text-black">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#f25c0c] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Stream */}
        <div className="flex-1 flex flex-col gap-[48px] w-full">
          {/* About Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black">
              About Me
            </h2>
            <p className="font-light text-[16px] leading-[1.5] text-black text-justify">
              I am a High-Agency Product Designer with a background in Computer Science, combining technical structural
              precision with layout empathy. I specialize in designing web applications, enterprise dashboards, SaaS systems,
              and mobile apps that turn complex datasets and processes into simple, elegant digital workflows.
            </p>
            <p className="font-light text-[16px] leading-[1.5] text-black text-justify">
              Having trained at the Apple Developer Academy and led developers at the Google Developer Student Club,
              I excel at translating raw business logic into high-performing interfaces. My goal is to build clean, premium-tier
              design solutions that feel outstanding and empower developers to execute quickly and efficiently.
            </p>
          </section>

          {/* Work Experience Section */}
          <section className="flex flex-col gap-[24px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Work Experience
            </h2>
            <div className="relative flex flex-col gap-[32px] pl-[24px]">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex flex-col gap-[8px]">
                  {/* Vertical timeline segment to next dot */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-[-19px] top-[12px] bottom-[-36px] w-[2px] bg-[#f0f0f0]" />
                  )}

                  {/* Milestone dot indicator */}
                  <span
                    className={`absolute -left-[24px] top-[6px] size-[12px] rounded-full bg-white z-10 transition-all duration-300 ${
                      index === 0
                        ? "border-[3px] border-[#f25c0c] shadow-sm shadow-[#f25c0c]/20"
                        : "border-[2px] border-gray-300"
                    }`}
                  />

                  <div className="flex justify-between items-start gap-[12px] flex-wrap">
                    <div>
                      <h3 className="text-[16px] font-medium text-black">{exp.role}</h3>
                      <p className="text-[14px] font-regular text-[#f25c0c] mt-[2px]">{exp.company}</p>
                    </div>
                    <span className="text-[12px] font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-[10px] py-[3px]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-light text-[14px] leading-[1.6] text-gray-600 text-justify mt-[4px]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Expertise Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Core Expertise
            </h2>
            <div className="flex flex-wrap gap-[10px] pt-[8px]">
              {expertises.map((skill, index) => (
                <span
                  key={index}
                  className="text-[13px] text-black bg-[#f9f9f9] border border-[#f0f0f0] rounded-[6px] px-[12px] py-[6px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Tools & Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px] pt-[8px]">
              <div className="flex flex-col gap-[6px]">
                <p className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">Design & Motion</p>
                <p className="text-[14px] font-light leading-[1.5] text-black">Figma, Framer, Principle, Adobe Creative Suite</p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">Development & Code</p>
                <p className="text-[14px] font-light leading-[1.5] text-black">Xcode, Swift/SwiftUI, React, VS Code, Git, HTML/CSS/JS</p>
              </div>
              <div className="flex flex-col gap-[6px]">
                <p className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[0.5px]">Productivity & Ops</p>
                <p className="text-[14px] font-light leading-[1.5] text-black">Notion, Slack, Linear, Jira</p>
              </div>
            </div>
          </section>

          {/* Volunteering Section */}
          <section className="flex flex-col gap-[20px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Community & Volunteering
            </h2>
            <div className="flex flex-col gap-[16px]">
              {volunteering.map((vol, index) => (
                <div key={index} className="flex justify-between items-center gap-[12px] flex-wrap text-[14px]">
                  <div>
                    <span className="font-bold text-black">{vol.role}</span>
                    <span className="text-[#8e8e8e] font-light"> at {vol.organization}</span>
                  </div>
                  <span className="text-[12px] text-gray-400">{vol.period}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#f4f4f4] py-[32px] px-[24px] md:px-[50px] bg-white mt-[64px]">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[24px] w-full text-[12px] text-gray-400">
          <p>© {portfolioInfo.year} {portfolioInfo.author}. All rights reserved.</p>
          <p className="font-light">Designed in Jakarta, Built with React</p>
        </div>
      </footer>
    </div>
  );
}
