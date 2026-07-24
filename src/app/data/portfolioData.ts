import imgImage1 from "@/imports/LandingPage/7aebb6101766205487fd76a39ffb36a1af57031a.png";
import imgImage2 from "@/imports/LandingPage/f0401c3935a6ad80d23ac7345e0367daebe02d7a.png";
import imgDescAd from "@/imports/LandingPage/ce03d5a411d84f369873248d86f281f0026b2611.png";
import imgBusinessTravel from "@/imports/LandingPage/5fd8bf8ba478a9de5678d3c860d39410f46831a5.png";
import imgResumify3 from "@/imports/LandingPage/fa85a7b0b24719dd74e7710e35c1c6e2eb6eab9b.png";
import imgGreenflags from "@/imports/LandingPage/579e9c294839243bee44945fca3afc9de3463b62.png";
import imgResumify1 from "@/imports/LandingPage/9b58d35197ef572fea64e5197c8fb4ef92b8de69.png";
import imgTehcHouse from "@/imports/LandingPage/307243d1da3b1f8d0bcdf44fc9fc608548569fd5.png";
import imgMobileApp from "@/imports/LandingPage/0d1cd1e47f2caf439d1cbe66dad3c5b8de657fbf.png";

export interface CaseStudy {
  challenge: string;
  solution: string;
  timeline?: string;
  deliverables?: string[];
  gallery?: string[];
}

export interface Project {
  id: string | number;
  src?: string;
  badge?: boolean;
  fit?: "top" | "center";
  isEmpty?: boolean;
  title?: string;
  category?: string;
  role?: string;
  year?: string;
  url?: string;
  caseStudy?: CaseStudy;
}

export interface Client {
  id: string | number;
  logo: string;
  name: string;
  opacity?: number;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface PortfolioInfo {
  author: string;
  year: string;
  timezone: string;
  availability: string;
  headline: string;
  description: string;
  ctas: {
    primary: {
      label: string;
      url?: string;
    };
    secondary: {
      label: string;
      url?: string;
    };
  };
}

export const portfolioInfo: PortfolioInfo = {
  author: "DARY RAMADHAN",
  year: "2026",
  timezone: "13:31 JKT",
  availability: "Available for freelance projects and remote work",
  headline: "I design digital products that make complex workflows feel simple.",
  description: "Product designer based in Jakarta, helping startups and enterprise teams turn complex requirements into clear, scalable product experiences.",
  ctas: {
    primary: {
      label: "Start a Project",
      url: "#contact",
    },
    secondary: {
      label: "Download Resume",
      url: "#resume",
    },
  },
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "Behance", url: "https://behance.net" },
  { label: "Dribbble", url: "https://dribbble.com" },
];

export const clients: Client[] = [
  { id: 1, logo: imgImage1, name: "Client 1" },
  { id: 2, logo: imgImage2, name: "Client 2", opacity: 20 },
  { id: 3, logo: imgImage2, name: "Client 3", opacity: 20 },
  { id: 4, logo: imgImage2, name: "Client 4", opacity: 20 },
  { id: 5, logo: imgImage2, name: "Client 5", opacity: 20 },
  { id: 6, logo: imgImage2, name: "Client 6", opacity: 20 },
];

export const projects: Project[] = [
  // Row 1 — with Case Study badges
  {
    id: "p1",
    src: imgDescAd,
    badge: true,
    title: "DescAd",
    category: "AI SaaS",
    role: "Product Designer",
    year: "2026",
    url: "#/project/p1",
    caseStudy: {
      challenge: "Startups and marketing teams struggle to generate high-converting visual ad creatives at scale. DescAd wanted to design a workflow that enables users to input target demographics, define brand colors, and generate optimized banner dimensions in minutes.",
      solution: "Designed a streamlined template generator with live sidebar preview panels. Developed interactive branding color sliders and layout controls that allow non-designers to produce high-performing commercial ad layouts rapidly and consistently.",
      timeline: "2 Months (Q4 2025)",
      deliverables: ["Product Strategy", "Figma Design System", "Interactive Prototype"],
      gallery: [imgDescAd, imgTehcHouse]
    }
  },
  {
    id: "p2",
    src: imgBusinessTravel,
    badge: true,
    title: "Business Travel",
    category: "Enterprise",
    role: "UI/UX Designer",
    year: "2026",
    url: "#/project/p2",
    caseStudy: {
      challenge: "Enterprise managers waste significant hours booking corporate travel and auditing manual expense approvals. The client needed a consolidated dashboard checking flight options against company policies, keeping approvals automated, and tracking travel logs.",
      solution: "Created an intuitive policy-compliance workflow with clear color-coded statuses. Designed modular travel logs and visual expense progress indicators that simplify corporate booking and reduce managers' approval times to a single tap.",
      timeline: "4 Months (Q2 2026)",
      deliverables: ["User Research", "Mobile Dashboard UI", "Web Dashboard Design"],
      gallery: [imgBusinessTravel, imgMobileApp]
    }
  },
  {
    id: "p3",
    src: imgResumify3,
    badge: true,
    title: "Resumify",
    category: "AI SaaS",
    role: "Brand & UI/UX Designer",
    year: "2026",
    url: "#/project/p3",
    caseStudy: {
      challenge: "Writing professional resumes is daunting for job seekers. Resumify needed an workspace leveraging generative AI to recommend phrasing, optimize resumes for ATS parsing, and provide guidance without distracting the user's focus.",
      solution: "Designed a dual-pane editor split: a distraction-free live document area on the left, paired with a contextual AI suggestion panel on the right. Added real-time score indicators that update dynamically as users refine their copy.",
      timeline: "3 Months (Q1 2026)",
      deliverables: ["UI/UX Design", "ATS Parser UI", "Interactive Prototypes"],
      gallery: [imgResumify3, imgResumify1]
    }
  },

  // Row 2
  { id: "p4", src: imgResumify3, title: "Resumify Web", category: "AI SaaS", role: "Brand & UI/UX Designer", year: "2026", url: "#/project/p4" },
  { id: "p5", src: imgGreenflags, fit: "top", title: "Greenflags", category: "Mobile App", role: "Lead Product Designer", year: "2025", url: "#/project/p5" },
  { id: "p6", src: imgResumify1, title: "Resumify Mobile", category: "iOS App", role: "Product Designer", year: "2025", url: "#/project/p6" },

  // Row 3
  { id: "p7", src: imgTehcHouse, title: "Tehc House", category: "Web Design", role: "UI Designer", year: "2025", url: "#/project/p7" },
  { id: "p8", src: imgMobileApp, title: "FinTech App", category: "FinTech", role: "UI/UX Designer", year: "2026", url: "#/project/p8" },
  { id: "p9", src: imgBusinessTravel, title: "Business Travel Plus", category: "Enterprise", role: "UI/UX Designer", year: "2026", url: "#/project/p9" },

  // Row 4
  { id: "p10", src: imgResumify3, title: "Resumify Dashboard", category: "AI SaaS", role: "Brand & UI/UX Designer", year: "2026", url: "#/project/p10" },
  { id: "p11", src: imgResumify1, title: "Resumify iOS", category: "iOS App", role: "Product Designer", year: "2025", url: "#/project/p11" },
  { id: "p12", src: imgGreenflags, fit: "top", title: "Greenflags Web", category: "Mobile App", role: "Lead Product Designer", year: "2025", url: "#/project/p12" },

  // Row 5 — empty placeholders
  { id: "e1", isEmpty: true },
  { id: "e2", isEmpty: true },
  { id: "e3", isEmpty: true },
];
