import { CVEducation, CVExperience, CVHeader, CVOtherItem, CVSkillGroup } from "@/lib/types/cv";
import {
  CLARUSWAY_LINK,
  ESPOO_GAME_LAB_LINK,
  INTEGRIFY_LINK,
  NORTHFINA_LINK,
} from "@/constants/links";

export const CV_HEADER: CVHeader = {
  name: "Bekir Kasan",
  title: "Full-stack Software Developer",
  stack: ["TypeScript", "Node.js", "Cloud"],
  contacts: [
    { name: "b.kasan@hotmail.com", url: "mailto:b.kasan@hotmail.com" },
    // No url: the reader is already on the site.
    { name: "bskasan.dev" },
    { name: "Espoo, Finland" },
  ],
};

export const CV_SUMMARY: string[] = [
  "Full-stack Software Developer with hands-on experience building secure, cloud-based applications using TypeScript, Next.js, Azure Functions, SQL, and modern serverless architectures. Experienced in designing REST APIs, implementing secure authentication and validation, integrating third-party services, and monitoring production systems. Comfortable collaborating across distributed Agile teams while owning features from implementation through deployment, observability, and continuous improvement. Passionate about building scalable backend systems, cloud infrastructure, and security-focused software.",
];

export const CV_EXPERIENCE: CVExperience[] = [
  {
    company: { name: "Northfina Oy", url: NORTHFINA_LINK.source },
    role: "Full-stack Web Developer",
    location: "Espoo, Finland",
    period: "Sep 2024 – Feb 2026",
    highlights: [
      "Built and shipped full-stack features using Next.js, TypeScript, and Azure Functions—from responsive UI components to serverless backend logic—supporting Northfina's B2B application and Etufillari Oy bike benefit platform.",
      "Implemented Finnish strong electronic authentication (Telia Tunnistus) by integrating the Telia ID Broker with the application, enabling secure user authentication using Finnish bank credentials and Mobile ID while ensuring compliance with national authentication standards.",
      "Translated Figma designs and product requirements into responsive React components, collaborating with product and design to ship UI updates that improved customer onboarding flow.",
      "Integrated Canyon Bike Store API and Procountor invoicing API, enabling automated order sync and reducing manual data entry for finance operations.",
      "Collaborated with CI/CD workflows to deploy and maintain production features across frontend and Azure serverless services.",
      "Built end-to-end Invoicing and Order Management workflows for Northfina's internal platform, connecting frontend forms to Azure Functions and MS SQL for invoice generation and order tracking.",
      "Strengthened security and data integrity with CSRF protection and Zod schema validation across key flows.",
      "Set up Azure Application Insights dashboards, structured logs, and alerts to monitor API latency and error rates, improving availability and reducing mean time to resolution.",
      "Designed a secure referral/campaign system with custom validation rules, using MS SQL and backend schema validations to ensure database integrity.",
      "Rebuilt the bike benefit claiming flow after regulatory changes—refactoring frontend UI, Azure Functions backend, and invoicing logic to maintain compliance and prevent service disruption for active users.",
      "Built internal tooling (e.g., admin dashboards, debugging utilities) to streamline cross-team workflows and improve developer velocity.",
      "Worked in an Agile/Scrum development process, contributing to team delivery and feature development aligned with business priorities.",
    ],
  },
  {
    company: { name: "Espoo Game LAB", url: ESPOO_GAME_LAB_LINK.source },
    role: "Game Developer & Programmer",
    location: "Espoo, Finland",
    period: "Mar 2024 – Sep 2024",
    highlights: [
      "Built gameplay systems in Unity (C#), emphasizing deterministic behavior and regression-safe refactors through component isolation and repeatable test scenes.",
      "Collaborated with designers and producers to ship features for Twilight Ferry and Finnish Cottage #8, creating technical documentation and task breakdowns to support team delivery.",
    ],
  },
  {
    company: { name: "Integrify Oy", url: INTEGRIFY_LINK.source },
    role: "Software Developer (Full-stack) Intern",
    location: "Helsinki, Finland",
    period: "Jan 2024 – Jun 2024",
    highlights: [
      "Completed intensive full-stack curriculum covering React, TypeScript, Redux, C#/.NET, database design, and cloud deployment (AWS, Azure)—building hands-on projects across frontend, backend, and CI/CD workflows.",
      "Implemented features and unit/integration tests in learning projects; practised API test design and debugging with Postman.",
    ],
  },
  {
    company: { name: "Clarusway", url: CLARUSWAY_LINK.source },
    role: "Full-stack Developer Trainee & Bootcamp Student",
    location: "Virginia, USA",
    period: "Nov 2022 – Jul 2023",
    highlights: [
      "Built 15+ full-stack projects using React/JavaScript frontends and Python/Django backends, including e-commerce sites and API-driven dashboards.",
      "Worked with PostgreSQL and MongoDB; conducted API testing with Postman; adhered to accessibility and responsive design best practices.",
    ],
  },
  {
    // No public link for this employer, so the name renders as plain text.
    company: { name: "Star Dunnage Oy" },
    role: "WordPress Web Developer",
    location: "Vantaa, Finland",
    period: "Aug 2022 – Jan 2023",
    highlights: [
      "Maintained and updated company websites (starsofa.fi, stardunnage.fi).",
      "Implemented content updates with attention to performance and SEO basics.",
    ],
  },
];

// Parenthesised groups from the PDF are split into their own pills so no single
// SkillTag (whitespace-nowrap) is wider than a phone-width sheet.
export const CV_SKILL_GROUPS: CVSkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      "JavaScript/TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Redux Toolkit",
      "HTML",
      "CSS",
      "SASS",
      "Tailwind CSS",
      "Responsive Design",
      "Pixel-Perfect UI",
      "Figma to Code",
      "Component-based Architecture",
    ],
  },
  {
    label: "Backend & Cloud",
    skills: [
      "TypeScript",
      "Node.js",
      "C#",
      ".NET",
      "Azure Functions",
      "REST APIs",
      "Serverless Architecture",
      "Microsoft SQL",
      "SQL",
      "Authentication (OAuth2/OIDC)",
      "CSRF",
      "Zod Validation",
      "API Integrations",
      "Azure Application Insights",
      "Docker",
    ],
  },
  {
    label: "Other",
    skills: [
      "Jest",
      "Git",
      "GitHub",
      "Agile",
      "Scrum",
      "Jira",
      "Product Mindset",
      "AI-assisted Development",
      "Claude",
      "Cursor IDE",
      "GitHub Copilot",
    ],
  },
];

export const CV_EDUCATION: CVEducation[] = [
  {
    institution: { name: "Ozyegin University" },
    degree: "Bachelor's Degree in Law (LLB)",
    location: "Istanbul, Turkey",
    details: [
      "Graduated from one of Turkey's top universities for global employability.",
      "GPA: 3.33/4.00",
    ],
  },
  {
    institution: { name: "Stadin Ammattiopisto" },
    degree: "Information and Communication Technology",
    location: "Helsinki, Finland",
    details: ["Frontend Development, C programming, HTML/CSS, JavaScript, PHP, React"],
  },
];

export const CV_OTHER: CVOtherItem[] = [
  {
    label: "Certifications",
    value:
      "Microsoft Certified Azure Fundamentals, Clarusway Full-stack Development Bootcamp (Nov 2022 – Jul 2023)",
  },
  {
    label: "Languages",
    value: "Turkish (Native), English (Fluent), Finnish (Intermediate)",
  },
];
