import { portfolioInfo, socialLinks } from "../data/portfolioData";
import LuxuryImage from "./LuxuryImage";

export default function AboutPage() {
  const experiences = [
    {
      role: "UI/UX Designer (Freelance)",
      company: "PT. Pupuk Indonesia",
      period: "Apr 2026 — Present",
      description: [
        "Designed Sentra’s landing page as a centralized entry point for employees across Pupuk Indonesia’s subsidiaries to access internal corporate services.",
        "Redesigned the existing Document of Files platform within Sentra’s design system, improving complex role-based workflows for drafters, reviewers, approvers, and recipients.",
        "Collaborated closely with Pupuk Indonesia’s internal product and development teams to align operational requirements, design decisions, and implementation constraints."
      ]
    },
    {
      role: "Co-Founder & Product Designer",
      company: "TRD Creative Studio",
      period: "Jan 2024 — Present",
      description: [
        "Co-founded a creative design studio focused on UI/UX, product strategy, and digital experience design for startups and small businesses.",
        "Designed and delivered 20+ digital product concepts and client projects, including websites, mobile apps, and design systems.",
        "Worked directly with founders and stakeholders to define product direction, user flows, and interaction design."
      ]
    },
    {
      role: "UI/UX Designer Lead",
      company: "PT. Synapsis Sinergi Digital (Synapsis)",
      period: "Apr 2025 — May 2026",
      description: [
        "Given the trust from the company to step into a UI/UX Lead role early in my career journey.",
        "Focused on improving team workflows through design playbooks, better documentation, weekly learning sessions, and fostering a high-agency design culture. Also helped introduce AI-enabled workflows for designers."
      ]
    },
    {
      role: "UI/UX Designer",
      company: "PT. Synapsis Sinergi Digital (Synapsis)",
      period: "Apr 2025 — Feb 2026",
      description: [
        "Responsible for end-to-end product design within the mining sector, starting from UX research, client collaboration, wireframing, prototyping, to delivering high-fidelity UI and work closely with PM, BSA, QA Engineers, and Developers.",
        "Key Projects: PT Madhani Talatah Nusantara (e-Recruitment Platform, Learning Management System (LMS), Employee Self Service (ESS), AI Hub Platform, Design System), Surveillance Dashboard System."
      ]
    },
    {
      role: "UI/UX Designer Internship",
      company: "PT. Synapsis Sinergi Digital (Synapsis)",
      period: "Dec 2024 — Apr 2025",
      description: [
        "Key Projects: Synapsis Website 2.0 (https://synapsis.id), Nearon Dashboard."
      ]
    },
    {
      role: "Product Designer",
      company: "Resumify",
      period: "Apr 2025 — Sep 2025",
      description: [
        "Leading the end-to-end product design for Resumify, a resume optimization tool powered by AI, from ideation to pre-launch.",
        "Established the brand’s visual identity from scratch, including logo, typography, and UI components.",
        "Collaborating closely with the founder and engineers to align product vision with technical feasibility and UX best practices."
      ]
    },
    {
      role: "UI/UX Design Lecturer (Contract)",
      company: "CCIT-CEP FT Universitas Indonesia",
      period: "Feb 2025 — Jun 2025",
      description: [
        "Delivered comprehensive UI/UX curriculum to 30+ students, covering design systems, Figma, usability testing, and visual hierarchy.",
        "Mentored students on their capstone projects, guiding them from research to high-fidelity prototyping and design handoffs.",
        "Conducted interactive design critiques and workshops, fostering a collaborative and growth-oriented learning environment."
      ]
    }
  ];

  const expertises = [
    "UI/UX Design",
    "Product Design",
    "UX Research",
    "Figma",
    "Web Development",
    "Collaboration",
    "Teamwork",
    "Leadership"
  ];

  const volunteering = [
    {
      role: "Media Creative – GDG Cloud @Jakarta",
      organization: "Google I/O Cloud Extended 2024",
      period: "July 2024",
      description: "Achieved over 700+ user interactions through engaging, clean, and informative social media content that successfully promoted event visibility and participation for @gdgcloudjakarta."
    },
    {
      role: "Community Lead",
      organization: "Google Developer Students Club @BINUS Malang",
      period: "Oct 2022 — July 2023",
      description: "Pioneered a groundbreaking international event, collaborating with three countries (Philippines, South Korea, and Japan). Organized 12+ events and workshops on UI/UX, Website Development, and Mobile Development."
    }
  ];

  const honors = [
    {
      title: "Participant",
      event: "International Joint Student Research Symposium (IJSRS) 2025",
      period: "Sep 2025"
    },
    {
      title: "2nd Winner",
      event: "Computerun 2022 (International Web Design Competition)",
      period: "Jan 2022"
    },
    {
      title: "Duta Binusian Awardee",
      event: "Bina Nusantara University",
      period: "Jul 2021"
    }
  ];

  const certifications = [
    {
      name: "App Development with Swift - Associate",
      issuer: "Certiport – A Pearson VUE Business",
      period: "Dec 2023",
      credentialId: "wULv9-2F9B"
    }
  ];

  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif] text-black flex flex-col justify-between">
      {/* Main Content Column */}
      <div className="max-w-[1000px] mx-auto px-[24px] md:px-[50px] py-[32px] md:py-[64px] flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] items-start w-full flex-1">

        {/* Left Sticky Column */}
        <div className="w-full lg:w-[220px] shrink-0 lg:sticky lg:top-[64px] lg:self-start flex flex-col gap-[24px] lg:gap-[16px] h-fit animate-reveal-right delay-100">
          <a
            href="#/"
            className="bg-[#f25c0c] hover:bg-[#e0540b] text-white font-regular text-[14px] leading-[1.4] px-[20px] py-[8px] rounded-full inline-flex items-center gap-[6px] transition-colors cursor-pointer w-fit"
          >
            <span>←</span> Back to Portfolio
          </a>

          {/* Profile Circle Frame */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-[16px] lg:gap-[24px] mt-[16px] lg:mt-[32px]">
            <div className="size-[80px] lg:size-[100px] rounded-full overflow-hidden bg-gray-50 shrink-0">
              <LuxuryImage
                src="/potrait.png"
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
              <div className="flex flex-col gap-[12px] text-[13px] text-black">
                <div>
                  <p className="font-semibold text-[13px]">Apple Developer Academy @BINUS</p>
                  <p className="text-gray-500 text-[11px] mt-[1px]">iOS Application Development</p>
                  <p className="text-gray-400 text-[10px] mt-[1px]">Feb 2025 — Jun 2025</p>
                </div>
                <div className="border-t border-gray-100 pt-[8px]">
                  <p className="font-semibold text-[13px]">Bina Nusantara University</p>
                  <p className="text-gray-500 text-[11px] mt-[1px]">B.S. in Computer Science (GPA 3.64/4.00)</p>
                  <p className="text-gray-400 text-[10px] mt-[1px]">Sep 2020 — Nov 2024</p>
                </div>
                <div className="border-t border-gray-100 pt-[8px]">
                  <p className="font-semibold text-[13px]">Bina Nusantara University</p>
                  <p className="text-gray-500 text-[11px] mt-[1px]">UI/UX Designer, KMMI Program</p>
                  <p className="text-gray-400 text-[10px] mt-[1px]">Jul 2021 — Sep 2021</p>
                </div>
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
        <div className="flex-1 flex flex-col gap-[48px] w-full animate-reveal-up delay-150">
          {/* About Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black">
              About Me
            </h2>
            <p className="font-light text-[16px] leading-[1.5] text-black text-justify">
              I am a Product Designer with 2+ years of experience focused on designing with empathy and helping teams
              turn complex ideas into impactful digital products. Combining technical structural precision (with a
              background in Computer Science) and layout empathy, I bring a strong sense of ownership, clear communication,
              and a collaborative approach to every project.
            </p>
            <p className="font-light text-[16px] leading-[1.5] text-black text-justify">
              Having trained at the Apple Developer Academy and led developer communities, I excel at translating raw
              business logic and enterprise requirements into high-performing, clean design solutions. I currently leverage
              AI to sharpen my creative process, optimize workflows, and deliver outstanding, premium-tier digital experiences.
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
                  {Array.isArray(exp.description) ? (
                    <ul className="list-disc list-outside pl-[16px] font-light text-[14px] leading-[1.6] text-gray-600 flex flex-col gap-[6px] mt-[4px]">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-justify">{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-light text-[14px] leading-[1.6] text-gray-600 text-justify mt-[4px]">
                      {exp.description}
                    </p>
                  )}
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
            <div className="flex flex-col gap-[20px]">
              {volunteering.map((vol, index) => (
                <div key={index} className="flex flex-col gap-[6px] text-[14px]">
                  <div className="flex justify-between items-start gap-[12px] flex-wrap">
                    <div>
                      <span className="font-semibold text-black">{vol.role}</span>
                      <span className="text-[#8e8e8e] font-light"> at {vol.organization}</span>
                    </div>
                    <span className="text-[12px] text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-[10px] py-[3px]">
                      {vol.period}
                    </span>
                  </div>
                  {vol.description && (
                    <p className="font-light text-[14px] leading-[1.6] text-gray-600 text-justify">
                      {vol.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Honors & Scholarship Section */}
          <section className="flex flex-col gap-[20px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Honors & Scholarship
            </h2>
            <div className="flex flex-col gap-[16px]">
              {honors.map((honor, index) => (
                <div key={index} className="flex justify-between items-start gap-[12px] flex-wrap text-[14px]">
                  <div>
                    <span className="font-semibold text-black">{honor.title}</span>
                    <span className="text-gray-600 font-light"> — {honor.event}</span>
                  </div>
                  <span className="text-[12px] text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-[10px] py-[3px]">
                    {honor.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="flex flex-col gap-[20px]">
            <h2 className="font-medium text-[24px] leading-[1.2] tracking-[-0.5px] text-black border-b border-[#f4f4f4] pb-[8px]">
              Certifications
            </h2>
            <div className="flex flex-col gap-[16px]">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start gap-[12px] flex-wrap text-[14px]">
                  <div>
                    <span className="font-semibold text-black">{cert.name}</span>
                    <p className="text-[12px] text-[#8e8e8e] mt-[2px]">
                      {cert.issuer} {cert.credentialId && `• Credential ID: ${cert.credentialId}`}
                    </p>
                  </div>
                  <span className="text-[12px] text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-[10px] py-[3px]">
                    {cert.period}
                  </span>
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
