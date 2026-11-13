import type { TextContent } from "./types";

export const defaultEn: TextContent = {
  general: {
    siteName: "RAQEEB",
    tagline: "Smarter Care. Safer Treatment. Better Outcomes.",
    identityLabel: "AI-Powered Healthcare Technology",
    languageName: "EN",
  },
  nav: {
    home: "Home",
    about: "About",
    problem: "Problem",
    solution: "Solution",
    howItWorks: "How It Works",
    features: "Features",
    technology: "Technology",
    app: "App Showcase",
    dashboard: "Doctor Dashboard",
    team: "Team",
    contact: "Contact",
  },
  hero: {
    identityLabel: "AI-Powered Healthcare | Graduation Project | October 6 University",
    headline: "Smarter Care. Safer Treatment. Better Outcomes.",
    description:
      "RAQEEB is an AI-powered healthcare platform designed to support cancer treatment monitoring through intelligent toxicity assessment, clinical decision support, and continuous patient follow-up.",
    primaryCta: "Explore Our Solution",
    secondaryCta: "Discover How It Works",
    supportMessage: "Care, Strength, and Hope in Every Step.",
    appCaption: "Patient App",
    dashboardCaption: "Doctor Dashboard",
  },
  about: {
    eyebrow: "About RAQEEB",
    title: "Care, Strength, and Hope in Every Step",
    paragraph1:
      "Cancer treatment is a journey. Between chemotherapy sessions, radiotherapy appointments, and hospital visits, every day brings new questions, symptoms, and needs that deserve continuous medical attention and genuine support.",
    paragraph2:
      "RAQEEB connects patients and physicians between hospital visits, turning everyday symptom reports into structured clinical information — so that care teams can see more, understand more, and respond with confidence.",
    quote: "Behind every reading is a woman, a family, and a story of courage.",
    highlights: [
      { title: "Between visits", text: "Support continues beyond the walls of the clinic." },
      { title: "Structured insight", text: "Everyday reports become clear clinical information." },
      { title: "Human first", text: "Technology that serves the patient and the physician." },
    ],
  },
  problem: {
    eyebrow: "The Problem",
    title: "Understanding the Challenge",
    intro:
      "Chemotherapy and radiotherapy can bring treatment-related side effects that change from day to day. Monitoring them closely — especially between hospital visits — remains one of the most demanding parts of cancer care.",
    items: [
      {
        title: "Treatment-related toxicities",
        text: "Chemotherapy and radiotherapy may cause side effects that affect patient wellbeing and treatment continuity.",
      },
      {
        title: "Delayed identification",
        text: "Concerning symptoms may not be recognized early enough when they appear at home.",
      },
      {
        title: "Gaps between visits",
        text: "Physicians have limited visibility into how patients feel between scheduled appointments.",
      },
      {
        title: "Assessing severity",
        text: "Grading toxicity severity consistently requires time, structure, and clinical expertise.",
      },
      {
        title: "Unstructured information",
        text: "Symptom reports are often scattered, making it hard to build a clear clinical picture.",
      },
    ],
  },
  solution: {
    eyebrow: "Our Solution",
    title: "Introducing RAQEEB",
    intro:
      "An integrated platform that brings patients, physicians, and intelligent assessment together in one continuous loop of care.",
    components: [
      {
        title: "Patient Mobile Application",
        subtitle: "For patients, at home",
        points: [
          "Patient check-ins",
          "Symptom reporting",
          "Health information collection",
          "Treatment follow-up",
        ],
      },
      {
        title: "Doctor Web Dashboard",
        subtitle: "For physicians, in clinic",
        points: [
          "Patient monitoring",
          "Medical history review",
          "Clinical information visualization",
          "Toxicity assessment review",
          "Alerts and notifications",
        ],
      },
      {
        title: "AI-Powered Toxicity Assessment",
        subtitle: "Intelligent clinical support",
        points: [
          "Assess treatment-related toxicity",
          "Identify toxicity grade",
          "Support evaluation of treatment-related risks",
          "Assist doctors in assessing whether the next dose is appropriate and the recommended treatment or reassessment interval according to clinical protocols",
        ],
      },
    ],
    disclaimer:
      "RAQEEB supports clinical decisions — it does not replace the treating physician. Every final medical decision remains with the care team.",
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "A Continuous Circle of Care",
    intro:
      "From the first registration to ongoing follow-up, every step is designed to keep patients and physicians connected.",
    steps: [
      {
        title: "Patient Registration",
        text: "The patient is registered and linked to their treating physician and treatment plan.",
      },
      {
        title: "Continuous Patient Monitoring",
        text: "Regular check-ins keep the care team informed between hospital visits.",
      },
      {
        title: "Health Data Collection",
        text: "Symptoms and health information are collected in a structured, consistent way.",
      },
      {
        title: "AI-Powered Toxicity Assessment",
        text: "Reported data is analyzed to help assess treatment-related toxicity and its grade.",
      },
      {
        title: "Clinical Decision Support",
        text: "Physicians review structured insights to support informed treatment decisions.",
      },
      {
        title: "Follow-up and Monitoring",
        text: "Care continues with ongoing follow-up, alerts, and reassessment when needed.",
      },
    ],
  },
  features: {
    eyebrow: "Key Features",
    title: "Thoughtfully Designed for Every Step",
    intro:
      "Each capability is built to make treatment monitoring clearer for physicians and gentler for patients.",
    items: [
      {
        title: "Toxicity Grade Assessment",
        text: "Helps assess the grade of treatment-related toxicity from reported symptoms.",
      },
      {
        title: "Treatment Decision Support",
        text: "Supports physicians in evaluating the next dose and reassessment interval.",
      },
      {
        title: "Patient Health Monitoring",
        text: "A clear view of each patient's condition throughout treatment.",
      },
      {
        title: "Symptom Tracking",
        text: "Simple, guided symptom reporting from the patient's phone.",
      },
      {
        title: "Doctor Dashboard",
        text: "One organized workspace to review patients, histories, and assessments.",
      },
      {
        title: "Patient Alerts",
        text: "Timely notifications that highlight reports needing attention.",
      },
      {
        title: "Healthcare Data Management",
        text: "Structured clinical information, organized and easy to review.",
      },
      {
        title: "Continuous Patient Follow-up",
        text: "Ongoing connection between patients and their care team.",
      },
    ],
  },
  technology: {
    eyebrow: "Technology",
    title: "Technology Behind RAQEEB",
    intro: "A connected architecture linking the patient's phone to the physician's screen.",
    categories: [
      { title: "Mobile Development", value: "Flutter and Dart" },
      { title: "Backend & Database", value: "To be confirmed" },
      { title: "Artificial Intelligence", value: "To be confirmed" },
      { title: "Healthcare Data", value: "To be confirmed" },
    ],
    architectureTitle: "System Architecture",
    architecture: ["Patient Mobile App", "Backend & Database", "AI Processing", "Doctor Dashboard"],
    note: "Technical details will be updated as the project is finalized.",
  },
  appShowcase: {
    eyebrow: "App Showcase",
    title: "Meet the RAQEEB Patient Application",
    intro:
      "A calm, supportive experience that helps patients share how they feel — simply and consistently.",
    screens: [
      {
        title: "Home Screen",
        text: "Monitor your health, check your risk level, and start your daily check-in.",
      },
      {
        title: "Symptom Reporting",
        text: "Report the symptoms you're experiencing to monitor your health.",
      },
      {
        title: "Follow-up Questions",
        text: "Answer personalized follow-up questions based on your reported symptoms.",
      },
      {
        title: "Example of Risk Assessment Result",
        text: "View your risk assessment result, risk level, and recommended actions.",
      },
      {
        title: "Medications History",
        text: "Review previous Medications records over time.",
      },
      {
        title: "Dose Confirmation",
        text: "Confirm your medication dose and track your adherence to the treatment plan.",
      },
    ],
    placeholderText: "Screenshot coming soon",
    previewHint: "Tap any screen to view it larger",
  },
  dashboard: {
    eyebrow: "Doctor Dashboard",
    title: "Empowering Doctors with Better Insights",
    intro:
      "A focused workspace that turns patient reports into structured, reviewable clinical information.",
    screens: [
      { title: "Patients Overview", text: "Monitor all patients at a glance." },
      { title: "Patient Profile", text: "Review medical history and treatment details." },
      { title: "Toxicity Assessment", text: "Review AI-supported toxicity assessments." },
      { title: "Clinical Visualization", text: "See symptom trends over time." },
      { title: "Alerts & Notifications", text: "Prioritize reports that need attention." },
    ],
    placeholderText: "Dashboard screenshot coming soon",
  },
  impact: {
    eyebrow: "Intended Impact",
    title: "Making Every Step of Care More Meaningful",
    intro:
      "RAQEEB is designed with the hope of creating these benefits for patients and care teams.",
    items: [
      { title: "Structured follow-up", text: "More structured patient follow-up between visits." },
      { title: "Clearer visibility", text: "Better visibility into treatment-related toxicities." },
      { title: "Earlier attention", text: "Earlier identification of concerning conditions." },
      {
        title: "Closer communication",
        text: "Improved communication between patients and doctors.",
      },
      { title: "Informed decisions", text: "More informed clinical decisions." },
      { title: "Supportive care", text: "More supportive healthcare experiences." },
    ],
    note: "These are intended benefits of the project and have not been clinically validated.",
  },
  team: {
    eyebrow: "Our Team",
    title: "The Team Behind RAQEEB",
    intro:
      "A dedicated team of students from October 6 University, united by a shared belief in compassionate healthcare technology.",
    members: Array.from({ length: 8 }, (_, i) => ({
      name: `Team Member ${i + 1}`,
      role: "Role / Position",
      bio: "A short biography will be added here soon.",
    })),
  },
  supervisor: {
    eyebrow: "Guidance",
    label: "Project Supervisor",
    name: "Supervisor Name",
    academicTitle: "Academic Title",
    bio: "A short biography of the project supervisor will be added here soon.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's Connect and Create a Healthier Future",
    description:
      "We welcome research collaborations, healthcare partnerships, innovation opportunities, and conversations that can help advance healthcare technology.",
    emailLabel: "Project Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub Repository",
    demoLabel: "Demo Video",
    notProvided: "Coming soon",
    footerTagline: "RAQEEB — Smarter Care. Safer Treatment. Better Outcomes.",
    footerNote: "Developed as a Graduation Project at October 6 University, Egypt.",
    editLink: "Edit website",
  },
};
