import { portfolioInfo, socialLinks } from "../data/portfolioData";

export default function AboutPage() {
  const experiences = [
    {
      role: "Lead Product Designer",
      company: "TRD Creative Studio",
      period: "2025 — Present",
      description: "Leading end-to-end design for complex enterprise software, SaaS platforms, and AI-powered interfaces. Establishing scalable design systems and collaborating with product teams to translate complex technical architectures into intuitive user workflows."
    },
    {
      role: "Co-Founder & Lead Designer",
      company: "Resumify",
      period: "2025",
      description: "Designed and launched an AI-powered resume builder helper, scaling it to 1,000+ users in the first month. Focused on user research, interactive suggestions, and crafting a distraction-free copywriting experience."
    },
    {
      role: "Freelance UI/UX Designer",
      company: "Exploration Design & Client Projects",
      period: "2023 — 2025",
      description: "Collaborated with startups and local companies to design high-converting landing pages, point-of-sale mobile apps, and interactive SaaS platforms."
    }
  ];

  const expertises = [
    "Product Strategy & Research",
    "Figma Design Systems",
    "User Interface (UI) Design",
    "User Experience (UX) Design",
    "Interactive Prototyping",
    "Web & App Development Layouts",
    "Micro-Animations & Motion"
  ];

  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif] text-black flex flex-col justify-between">
      {/* Main Content Column */}
      <div className="max-w-[1000px] mx-auto px-[24px] md:px-[50px] py-[64px] flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-start w-full flex-1">
        
        {/* Left Sticky Column */}
        <div className="w-full lg:w-[220px] shrink-0 lg:sticky lg:top-[64px] lg:self-start flex flex-col gap-[32px] h-fit">
          <a
            href="#/"
            className="bg-[#f25c0c] hover:bg-[#e0540b] text-white font-regular text-[14px] leading-[1.4] px-[20px] py-[8px] rounded-full inline-flex items-center gap-[6px] transition-colors cursor-pointer w-fit"
          >
            <span>←</span> Back Home
          </a>

          {/* Profile Circle Frame */}
          <div className="flex flex-col gap-[16px]">
            <div className="size-[120px] rounded-full border border-[#f0f0f0] overflow-hidden bg-gray-50 shadow-md">
              <img
                src="/avatar.png"
                alt="Dary Ramadhan"
                className="size-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-black tracking-tight">{portfolioInfo.author}</h1>
              <p className="text-[13px] text-[#8e8e8e] mt-[2px]">Product Designer</p>
              <p className="text-[13px] text-[#8e8e8e] mt-[2px]">Based in Jakarta, ID</p>
            </div>
          </div>

          <hr className="border-[#f4f4f4]" />

          {/* Contact Details */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-[1px]">Contact & Links</p>
            <div className="flex flex-col gap-[8px] text-[13px] text-black">
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

        {/* Right Details Stream */}
        <div className="flex-1 flex flex-col gap-[48px] w-full">
          {/* About Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black">
              About Me
            </h2>
            <p className="font-light text-[16px] leading-[1.6] text-black text-justify">
              I am a digital product designer with a passion for designing workflows that make complex processes simple. 
              By partnering with startups and enterprise companies, I help build clean, scalable web and mobile software 
              products that address raw user challenges directly.
            </p>
            <p className="font-light text-[16px] leading-[1.6] text-black text-justify">
              My methodology balances visual premium polish with strict logical structures. I believe that design should 
              not only look visually outstanding, but must be built on unified systems that make engineering implementation 
              and product growth seamless.
            </p>
          </section>

          {/* Work Experience Section */}
          <section className="flex flex-col gap-[24px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Work Experience
            </h2>
            <div className="flex flex-col gap-[32px]">
              {experiences.map((exp, index) => (
                <div key={index} className="flex flex-col gap-[8px]">
                  <div className="flex justify-between items-start gap-[12px] flex-wrap">
                    <div>
                      <h3 className="text-[16px] font-bold text-black">{exp.role}</h3>
                      <p className="text-[14px] font-medium text-[#f25c0c] mt-[2px]">{exp.company}</p>
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
