import imgImage1 from "@/imports/LandingPage/7aebb6101766205487fd76a39ffb36a1af57031a.png";
import imgImage2 from "@/imports/LandingPage/f0401c3935a6ad80d23ac7345e0367daebe02d7a.png";
import imgDescAd from "@/imports/LandingPage/ce03d5a411d84f369873248d86f281f0026b2611.png";
import imgBusinessTravel from "@/imports/LandingPage/5fd8bf8ba478a9de5678d3c860d39410f46831a5.png";
import imgResumify3 from "@/imports/LandingPage/fa85a7b0b24719dd74e7710e35c1c6e2eb6eab9b.png";
import imgGreenflags from "@/imports/LandingPage/579e9c294839243bee44945fca3afc9de3463b62.png";
import imgResumify1 from "@/imports/LandingPage/9b58d35197ef572fea64e5197c8fb4ef92b8de69.png";
import imgTehcHouse from "@/imports/LandingPage/307243d1da3b1f8d0bcdf44fc9fc608548569fd5.png";
import imgMobileApp from "@/imports/LandingPage/0d1cd1e47f2caf439d1cbe66dad3c5b8de657fbf.png";

export interface Project {
  id: string | number;
  src?: string;
  badge?: boolean;
  fit?: "top" | "center";
  isEmpty?: boolean;
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
  { id: "p1", src: imgDescAd, badge: true },
  { id: "p2", src: imgBusinessTravel, badge: true },
  { id: "p3", src: imgResumify3, badge: true },

  // Row 2
  { id: "p4", src: imgResumify3 },
  { id: "p5", src: imgGreenflags, fit: "top" },
  { id: "p6", src: imgResumify1 },

  // Row 3
  { id: "p7", src: imgTehcHouse },
  { id: "p8", src: imgMobileApp },
  { id: "p9", src: imgBusinessTravel },

  // Row 4
  { id: "p10", src: imgResumify3 },
  { id: "p11", src: imgResumify1 },
  { id: "p12", src: imgGreenflags, fit: "top" },

  // Row 5 — empty placeholders
  { id: "e1", isEmpty: true },
  { id: "e2", isEmpty: true },
  { id: "e3", isEmpty: true },
];
