import imgImage1 from "@/imports/LandingPage/7aebb6101766205487fd76a39ffb36a1af57031a.png";
import imgImage2 from "@/imports/LandingPage/f0401c3935a6ad80d23ac7345e0367daebe02d7a.png";
import imgDescAd from "@/imports/LandingPage/ce03d5a411d84f369873248d86f281f0026b2611.png";
import imgBusinessTravel from "@/imports/LandingPage/5fd8bf8ba478a9de5678d3c860d39410f46831a5.png";
import imgResumify3 from "@/imports/LandingPage/fa85a7b0b24719dd74e7710e35c1c6e2eb6eab9b.png";
import imgGreenflags from "@/imports/LandingPage/579e9c294839243bee44945fca3afc9de3463b62.png";
import imgResumify1 from "@/imports/LandingPage/9b58d35197ef572fea64e5197c8fb4ef92b8de69.png";
import imgTehcHouse from "@/imports/LandingPage/307243d1da3b1f8d0bcdf44fc9fc608548569fd5.png";
import imgMobileApp from "@/imports/LandingPage/0d1cd1e47f2caf439d1cbe66dad3c5b8de657fbf.png";
import imgUploaded_1784916922864 from "@/imports/LandingPage/uploaded_1784916922864.webp";
import imgUploaded_1784917102408 from "@/imports/LandingPage/uploaded_1784917102408.webp";
import imgUploaded_1784917109510 from "@/imports/LandingPage/uploaded_1784917109510.webp";

export interface CaseStudySection {
  id: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  caption?: string;
  images?: string[];
  layout?: "1-column" | "2-column";
  captions?: string[];
  navTitle?: string;
  postImageParagraphs?: string[];
}

export interface CaseStudy {
  challenge: string;
  solution: string;
  timeline?: string;
  deliverables?: string[];
  gallery?: string[];
  overviewText?: string;
  problemHeading?: string;
  problemText?: string[];
  postLaunchHeading?: string;
  postLaunchText?: string[];
  sections?: CaseStudySection[];
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
  client?: string;
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
  author: "Dary Ramadhan",
  year: "2026",
  timezone: "13:31 JKT",
  availability: "Available for freelance projects and remote work",
  headline: "I design digital products that make complex workflows feel simple.",
  description: "Product designer based in Jakarta, helping startups and enterprise teams turn complex requirements into clear, scalable product experiences.",
  ctas: {
    primary: {
      label: "Book a Call",
      url: "#book"
    },
    secondary: {
      label: "Learn About Me",
      url: "#resume"
    }
  }
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com"
  },
  {
    label: "Behance",
    url: "https://behance.net"
  },
  {
    label: "Dribbble",
    url: "https://dribbble.com"
  },
  {
    label: "Fastwork",
    url: "https://fastwork.com"
  }
];

export const clients: Client[] = [
  {
    id: 1,
    logo: imgImage1,
    name: "Client 1"
  },
  {
    id: 2,
    logo: imgImage2,
    name: "Client 2",
    opacity: 20
  },
  {
    id: 3,
    logo: imgImage2,
    name: "Client 3",
    opacity: 20
  },
  {
    id: 4,
    logo: imgImage2,
    name: "Client 4",
    opacity: 20
  },
  {
    id: 5,
    logo: imgImage2,
    name: "Client 5",
    opacity: 20
  },
  {
    id: 6,
    logo: imgImage2,
    name: "Client 6",
    opacity: 20
  }
];

export const projects: Project[] = [
  {
    id: "resumify-ai-powered-resume-builder",
    title: "Resumify | AI-Powered Resume Builder",
    category: "AI SaaS",
    role: "Brand & Product Designer",
    year: "2026",
    url: "#/project/resumify-ai-powered-resume-builder",
    src: "/uploads/uploaded_1784983523166.webp",
    badge: true,
    fit: "center",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "2 Months (Q4 2025)",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "An AI-powered web tool that helps job seekers rewrite their resume into a more structured, professional, and recruiter-friendly format using modern UX patterns."
          ],
          images: [
            "/uploads/uploaded_1784983863127.webp"
          ],
          image: "/uploads/uploaded_1784983863127.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784983569648",
          heading: "Project Background",
          paragraphs: [
            "This project started after observing how many fresh graduates struggle to create a strong resume. Most resumes are text-heavy, unstructured, and fail ATS checks. Job seekers often don't know how to phrase achievements, quantify impact, or highlight strengths.\n\nI built Resumify to solve this: a simple tool that transforms messy resume text into a clean, structured, and professional format in seconds."
          ],
          navTitle: "Background"
        },
        {
          id: "section-1784983602130",
          heading: "Problem Statement",
          paragraphs: [
            "Job seekers often submit resumes that lack structure, clarity, and measurable impact. Many don't understand how to highlight achievements or tailor content. This leads to low interview conversion rates and frustration."
          ],
          navTitle: "Problem"
        },
        {
          id: "section-1784983879048",
          heading: "Target Users",
          paragraphs: [
            "- Fresh graduates\n- Career switchers\n- Junior professionals"
          ],
          navTitle: "Target Users"
        },
        {
          id: "section-1784983617446",
          heading: " Brand Design",
          paragraphs: [
            "A strategic brand design system that translates Resumify’s positioning into a distinctive and recognizable visual language."
          ],
          navTitle: "Brand Design",
          images: [
            "/uploads/uploaded_1784983651242.webp"
          ],
          image: "/uploads/uploaded_1784983651242.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784983655509",
          heading: " Side Bar Interaction",
          paragraphs: [
            "Users need to be encouraged their discovery skills, we learn that showing sneakpeek increase the willingness of the users for trying the new features."
          ],
          navTitle: "Feature #1",
          images: [
            "/uploads/uploaded_1784986596876.gif"
          ],
          image: "/uploads/uploaded_1784986596876.gif",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784983687420",
          heading: "Resume Editor Main Page",
          paragraphs: [
            "Users need to be encouraged their discovery skills, we learn that showing sneakpeek increase the willingness of the users for trying the new features."
          ],
          navTitle: "Feature #2",
          images: [
            "/uploads/uploaded_1784983715301.webp"
          ],
          image: "/uploads/uploaded_1784983715301.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784983688014",
          heading: "Tailor Your Resume",
          paragraphs: [
            "Before getting into the features, the least familiar features will have an quick onboarding to explain how and why this features exist."
          ],
          navTitle: "Feature #3",
          images: [
            "/uploads/uploaded_1784983767093.webp"
          ],
          image: "/uploads/uploaded_1784983767093.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784983783387",
          heading: "What I Learned",
          paragraphs: [
            "In this section, I’ll walk you through how I organize Figma files to ensure developers can easily follow the flow and translate the design into code."
          ],
          navTitle: "Learning",
          images: [
            "/uploads/uploaded_1784983828383.webp",
            "/uploads/uploaded_1784983842453.webp"
          ],
          image: "/uploads/uploaded_1784983828383.webp",
          captions: [
            "Figma Files Organization",
            "Component Foundations"
          ],
          caption: "Figma Files Organization"
        }
      ]
    },
    client: "Resumify"
  },
  {
    id: "pos-system-mobile",
    title: "POS System Mobile",
    category: "Mobile POS ",
    role: "Product Designer",
    year: "2026",
    url: "#/project/pos-system-mobile",
    src: "/uploads/uploaded_1784977551659.webp",
    badge: true,
    fit: "top",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "1 week",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "In this project, I was challenged to optimize the cashier’s experience while serving buyers. I designed this POS flow to make the cashier process more effective and efficient."
          ],
          navTitle: "Overview",
          images: [
            "/uploads/uploaded_1784978093187.webp"
          ],
          image: "/uploads/uploaded_1784978093187.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784977613766",
          heading: "Project Background",
          paragraphs: [
            "In this design, the POS mobile flow was optimized to minimize effort and speed up transactions for cashiers. The focus was on reducing unnecessary taps and providing instant clarity of what’s happening in the cart."
          ],
          navTitle: "Background",
          images: [
            "/uploads/uploaded_1784978311063.webp"
          ],
          image: "/uploads/uploaded_1784978311063.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784977705906",
          heading: "Quick Item Selection",
          paragraphs: [
            "Instead of requiring cashiers to tap “+” repeatedly, they can simply tap directly on the product image. Each tap instantly adds the item to the cart, which feels more natural and saves precious seconds during peak hours."
          ],
          navTitle: "Quick Item",
          images: [
            "/uploads/uploaded_1784978227780.webp"
          ],
          image: "/uploads/uploaded_1784978227780.webp",
          captions: [
            "Quick Item Selection"
          ],
          caption: "Quick Item Selection"
        },
        {
          id: "section-1784977730064",
          heading: "Recent Item Drawer",
          paragraphs: [
            "A small, collapsible drawer just above the checkout button shows the most recently added items. This allows cashiers to instantly confirm what they’ve just scanned/selected without breaking their flow or switching screens."
          ],
          navTitle: "Recent Item",
          images: [
            "/uploads/uploaded_1784978209275.webp"
          ],
          image: "/uploads/uploaded_1784978209275.webp",
          captions: [
            "Recent Item Drawer"
          ],
          caption: "Recent Item Drawer"
        },
        {
          id: "section-1784977776628",
          heading: "Error Handling with Empathy",
          paragraphs: [
            "Even in cases like unstable internet, the design provides a clear retry flow. This reduces stress for cashiers who are often under pressure to keep the line moving."
          ],
          navTitle: "Error Handling",
          images: [
            "/uploads/uploaded_1784978254760.webp"
          ],
          image: "/uploads/uploaded_1784978254760.webp",
          captions: [
            "Error Handling with Empathy"
          ],
          caption: "Error Handling with Empathy"
        },
        {
          id: "section-1784977814762",
          heading: "Streamlined Checkout",
          paragraphs: [
            "Payment screens are simplified with minimal steps, giving cashiers confidence that transactions are moving smoothly and consistently."
          ],
          navTitle: "Checkout",
          images: [
            "/uploads/uploaded_1784978280746.webp"
          ],
          image: "/uploads/uploaded_1784978280746.webp",
          captions: [
            "Streamlined Checkout"
          ],
          caption: "Streamlined Checkout"
        },
        {
          id: "section-1784977833909",
          heading: "Highlighted POS Mobile Screen Pages",
          paragraphs: [
            ""
          ],
          navTitle: "Highlight",
          images: [
            "/uploads/uploaded_1784978297417.webp"
          ],
          image: "/uploads/uploaded_1784978297417.webp",
          captions: [
            "Highlighted POS Mobile Screen Pages"
          ],
          caption: "Highlighted POS Mobile Screen Pages"
        }
      ]
    },
    client: "Exploration Design"
  },
  {
    id: "surveillance-system",
    title: "Surveillance System",
    category: "Exploration Design",
    role: "UI/UX Designer",
    year: "2026",
    url: "#/project/surveillance-system",
    src: "/uploads/uploaded_1784982660340.webp",
    badge: false,
    fit: "top",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "1 week",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "An overview of the design challenges and results for the Surveillance System project."
          ],
          images: [
            "/uploads/uploaded_1784982825613.webp"
          ],
          image: "/uploads/uploaded_1784982825613.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784982728048",
          heading: "Project Responsibility",
          paragraphs: [
            "Main Responsibility – In this opportunity, I was given task to help founder to define the brand and designing the end-to-end platform and make sure seamless deliverables for the developers"
          ],
          navTitle: "Responsibility"
        },
        {
          id: "section-1784982781770",
          heading: "Project Highlight",
          paragraphs: [
            ""
          ],
          navTitle: "Gallery",
          images: [
            "/uploads/uploaded_1784982798918.webp",
            "/uploads/uploaded_1784982799090.webp",
            "/uploads/uploaded_1784982799208.webp"
          ],
          image: "/uploads/uploaded_1784982798918.webp",
          captions: [
            "",
            "",
            ""
          ]
        }
      ]
    },
    client: "Exploration Design"
  },
  {
    id: "greenflags",
    title: "Greenflags Landing Page",
    category: "Landing Page",
    role: "UI/UX Designer",
    year: "2026",
    url: "#/project/greenflags",
    src: "/uploads/uploaded_1784975965661.webp",
    badge: false,
    fit: "top",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "3 weeks",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "Greenflags — Your journey to finding love with us is simple and meaningful, in just three steps: apply for access, receive curated matches, and build real connections."
          ],
          navTitle: "Overview",
          images: [
            "/uploads/uploaded_1784976111723.webp"
          ],
          image: "/uploads/uploaded_1784976111723.webp",
          captions: [
            "Showcase Greenflags Landing Page"
          ],
          caption: "Showcase Greenflags Landing Page"
        },
        {
          id: "section-1784976045166",
          heading: "Project Background",
          paragraphs: [
            "The brand needs to be optimized for stronger positioning. We helped Greenflags define their brand position: Greenflags — Your journey to finding love with us is simple and meaningful, in just three steps: apply for access, receive curated matches, and build real connections."
          ],
          navTitle: "Background",
          images: [
            "/uploads/uploaded_1784976159218.webp",
            "/uploads/uploaded_1784976248267.webp",
            "/uploads/uploaded_1784976248320.webp",
            "/uploads/uploaded_1784983210728.webp",
            "/uploads/uploaded_1784983245244.webp"
          ],
          image: "/uploads/uploaded_1784976159218.webp",
          captions: [
            "",
            "",
            "",
            "",
            ""
          ]
        },
        {
          id: "section-1784983278143",
          heading: "Gallery",
          paragraphs: [
            ""
          ],
          images: [
            "/uploads/uploaded_1784983367353.webp",
            "/uploads/uploaded_1784983299931.webp"
          ],
          image: "/uploads/uploaded_1784983367353.webp",
          captions: [
            "",
            "Landing page for Greenflags"
          ],
          caption: ""
        }
      ]
    },
    client: "Greenflags"
  },
  {
    id: "techhouse-software-house-ai-solutions-for-your-small-biz-until-enterprises",
    title: "TechHouse Brand Design",
    category: "Software",
    role: "Brand Designer",
    year: "2026",
    url: "#/project/techhouse-software-house-ai-solutions-for-your-small-biz-until-enterprises",
    src: "/uploads/uploaded_1784985969372.webp",
    badge: false,
    fit: "center",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "1 month",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "We’ve been quietly building something with purpose.  Not just software, but solutions designed with care,  crafted by people who believe in excellence through detail. This is TEHC House. A collective built to redefine how technology feels."
          ],
          images: [
            "/uploads/uploaded_1784986102013.webp"
          ],
          image: "/uploads/uploaded_1784986102013.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784985868160",
          heading: "Why This Project Exists",
          paragraphs: [
            "This project exists to create a brand identity that reflects the client’s vision of empowering enterprises through AI-driven innovation."
          ],
          navTitle: "Background",
          images: [
            "/uploads/uploaded_1784985916413.webp",
            "/uploads/uploaded_1784986042624.webp",
            "/uploads/uploaded_1784986042673.webp"
          ],
          image: "/uploads/uploaded_1784985916413.webp",
          captions: [
            "",
            "",
            ""
          ]
        }
      ]
    },
    client: "TehcHouse"
  },
  {
    id: "e-recruitment-minimalits-end-to-end-hiring-pipeline-saas-web-app",
    title: "Minimalits End-to-End Hiring Pipeline SaaS Web App",
    category: "Web App",
    role: "Product Designer",
    year: "2025",
    url: "#/project/e-recruitment-minimalits-end-to-end-hiring-pipeline-saas-web-app",
    src: "/uploads/uploaded_1784984227911.webp",
    badge: false,
    fit: "top",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "2 Months (Q4 2025)",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "In this project, I need to cover the end-to-end flow from Recruiter, Candidate and Head Office to make sure the hiring pipeline works really seamless."
          ],
          images: [
            "/uploads/uploaded_1784984348460.webp"
          ],
          image: "/uploads/uploaded_1784984348460.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1784984259580",
          heading: "Recruiter Workspace — From Post to Offer",
          paragraphs: [
            "Own the pipeline: post roles, screen at speed, schedule interviews, and issue offers with clear audit trails."
          ],
          navTitle: "Recruiter Flow",
          images: [
            "/uploads/uploaded_1784984338258.webp",
            "/uploads/uploaded_1784984338420.webp",
            "/uploads/uploaded_1784984338544.webp"
          ],
          image: "/uploads/uploaded_1784984338258.webp",
          captions: [
            "",
            "",
            ""
          ]
        },
        {
          id: "section-1784984412750",
          heading: "Candidate Portal — Apply, Track, Accept",
          paragraphs: [
            "A clear step-by-step path from application to offer with real-time status, messaging, and document upload."
          ],
          navTitle: "Candidate Flow",
          images: [
            "/uploads/uploaded_1784984483396.webp",
            "/uploads/uploaded_1784984483505.webp",
            "/uploads/uploaded_1784984503994.webp",
            "/uploads/uploaded_1784984483188.webp"
          ],
          image: "/uploads/uploaded_1784984483396.webp",
          captions: [
            "",
            "",
            "",
            ""
          ]
        }
      ]
    },
    client: "PT. Madhani Talatah Nusantara"
  },
  {
    id: "illustration",
    title: "Illustration Design for Resumify",
    category: "AI SaaS",
    role: "Product Designer",
    year: "2026",
    url: "#/project/illustration",
    src: "/uploads/uploaded_1784986270100.webp",
    badge: false,
    fit: "center",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "2 Months (Q4 2025)",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "This project started after observing how many fresh graduates struggle to create a strong resume. Most resumes are text-heavy, unstructured, and fail ATS checks. Job seekers often don't know how to phrase achievements, quantify impact, or highlight strengths."
          ],
          images: [
            "/uploads/uploaded_1784986322779.webp"
          ],
          image: "/uploads/uploaded_1784986322779.webp",
          captions: [
            ""
          ],
          navTitle: "Resumify"
        }
      ]
    }
  },
  {
    id: "sentra-landing-page",
    title: "Sentra Landing Page",
    client: "Pupuk Indonesia",
    category: "Corporate",
    role: "Product Designer",
    year: "2026",
    url: "#/project/sentra-landing-page",
    src: "/uploads/uploaded_1785056495164.webp",
    badge: false,
    fit: "top",
    isEmpty: false,
    caseStudy: {
      challenge: "",
      solution: "",
      timeline: "1 week",
      sections: [
        {
          id: "overview",
          heading: "Overview",
          paragraphs: [
            "An overview of the design challenges and results for the Sentra Landing Page project."
          ],
          images: [
            "/uploads/uploaded_1785056710988.webp"
          ],
          image: "/uploads/uploaded_1785056710988.webp",
          captions: [
            ""
          ]
        },
        {
          id: "section-1785056515647",
          heading: "Project Background",
          paragraphs: [
            "PT Pupuk Indonesia (Persero) is Indonesia's largest state-owned fertilizer company and serves as the holding group for over 10 subsidiaries — including PT Petrokimia Gresik, PT Pupuk Kalimantan Timur, PT Pupuk Sriwidjaja Palembang, and several others spanning fertilizer production, logistics, engineering, and trade. As a BUMN (state-owned enterprise), Pupuk Indonesia operates at a national scale with thousands of employees spread across its group companies.",
            "Sentra is Pupuk Indonesia's internal digital workplace platform — built to centralize and digitize all employee activities across the group. From legal submissions and vehicle bookings to consumption orders and risk management, every daily work process runs through Sentra. This makes the landing page not just an entry point, but a tool employees return to every single working day."
          ],
          navTitle: "Background "
        },
        {
          id: "section-1785056556502",
          heading: "Problem",
          paragraphs: [
            "The initial design of Sentra's landing page was functional, but feedback surfaced a recurring issue: it didn't feel personal or intuitive to use. Every employee — regardless of their role, department, or daily workflows — saw the exact same interface. There was no sense of ownership over the workspace.",
            "The missing piece was personalization. For a platform used every day, the landing experience should adapt to the user, not the other way around. I identified several UX gaps: the quick access section had no way to be customized, the favorites feature lacked proper empty state guidance, and the overall page didn't give users a clear path to the services most relevant to them.",
            "From there, I moved into research: studying Sentra's existing design system to understand its behaviors, component patterns, and visual language. This was critical — any new design needed to feel like it belonged in Sentra, not bolted on from the outside."
          ],
          navTitle: "Problem"
        },
        {
          id: "section-1785056594817",
          heading: "Process",
          paragraphs: [
            "My process started with conversations — lots of them. I spent time talking directly with users to understand their habits, frustrations, and what they actually needed from the platform on a daily basis. This qualitative approach helped me identify patterns that weren't visible from the interface alone.",
            "Below is the old design."
          ],
          navTitle: "Process",
          images: [
            "/uploads/uploaded_1785056625041.webp"
          ],
          image: "/uploads/uploaded_1785056625041.webp",
          captions: [
            ""
          ]
        }
      ]
    }
  }
];
