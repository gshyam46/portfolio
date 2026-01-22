// data/projects.ts
export const PROJECTS = [
    {
        id: 1,
        title: "AIDA — Adaptive Intelligent Data Abstraction",
        summary: "Natural-language analytics platform with deterministic query validation",
        description:
            "Research-driven analytics and visualization platform that translates natural-language business questions into validated analytical queries and interactive dashboards. Designed with a multi-stage intent → validation → compilation pipeline to ensure correctness, low latency, and extensibility across structured and unstructured data sources.",
        images: ["/projects/aida-1.png", "/projects/aida-2.png"],
        tech: [
            "AI Systems",
            "Natural Language Interfaces",
            "Schema-Aware Analytics",
            "Query Compilation",
            "System Architecture",
        ],
        link: "https://github.com/gshyam46/AIDA", // or project page
    },
    {
        id: 2,
        title: "MetaCognitive",
        summary: "Research-driven productivity and planning system",
        description:
            "Metacognitive planning and productivity system enabling structured goal decomposition, auditable task histories, and adaptive execution. Incorporates a decision and reflection framework with performance tracking to improve planning accuracy, prioritization, and execution consistency.",
        images: ["/projects/metacognitive-1.png"],
        tech: [
            "System Design",
            "Decision Frameworks",
            "Metacognitive Models",
            "Performance Tracking",
            "Productivity Systems",
        ],
        link: "https://github.com/gshyam46/MetaCognitive",
    },
    {
        id: 3,
title: "Agentic Founder Intelligence & Decision Analytics Platform",
summary: "Research-driven, agentic AI platform for founder decision-making with integrated LLM observability, cost analytics, and reliability monitoring.",
description:
    "Designed and developed an agentic decision intelligence platform that decomposes early-stage founder challenges into structured analytical stages including profile assessment, market opportunity analysis, founder–market fit evaluation, execution roadmap generation, and tooling recommendations. The system applies data-driven reasoning and benchmarking to reduce ambiguity in startup ideation and execution planning. Integrated end-to-end LLM observability and analytics to track per-agent latency, token usage, cost trends, and reliability signals, enabling auditable AI decision flows and continuous optimization. Ongoing research focuses on open-source and low-cost AI platform benchmarking, funding-aware tooling strategies, and integration with a founder networking and collaboration ecosystem (ReachOut).",
images: ["/projects/founder-intelligence-1.png"],
tech: [
    "System Design",
    "Agentic AI Architectures",
    "Decision Intelligence & Analytics",
    "LLM Observability & Cost Monitoring",
    "Data Visualization & Reliability Scoring",
],
link: "https://github.com/gshyam46/Cost-Guardian",

    },
    {
        id: 4,
        title: "Phishing Website Classification",
        summary: "ML-based phishing detection system",
        description:
            "Machine learning system for phishing website detection achieving 97.4% classification accuracy. Built using gradient boosting techniques with extensive feature engineering, EDA, and hyperparameter tuning to improve accuracy and reduce execution time.",
        images: ["/projects/phishing-1.png"],
        tech: [
            "Machine Learning",
            "XGBoost",
            "CatBoost",
            "scikit-learn",
            "Feature Engineering",
        ],
        link: "https://github.com/gshyam46/URL-alert",
    },
    {
        id: 5,
        title: "AI Assistant with Emotion Detection",
        summary: "Face recognition and emotion-aware AI assistant",
        description:
            "AI assistant integrating face recognition and emotion detection using computer vision and deep learning. Achieved 85% emotion detection accuracy and improved response speed with real-time inference, speech-to-text, and text-to-speech integration.",
        images: ["/projects/emotion-ai-1.png"],
        tech: [
            "Computer Vision",
            "OpenCV",
            "TensorFlow",
            "Face Recognition",
            "Speech Interfaces",
        ],
        link: "https://github.com/gshyam46/Nova",
    },
    {
        id: 6,
        title: "E-Commerce Platform",
        summary: "Full-stack e-commerce application",
        description:
            "Full-stack e-commerce platform with authentication, payment processing, and order management. Built with Next.js, Firebase, and Stripe, featuring optimized session management, responsive UI, and containerized deployment.",
        images: ["/projects/ecommerce-1.png"],
        tech: [
            "Next.js",
            "Firebase",
            "Stripe",
            "Redux",
            "Full-Stack Development",
        ],
        link: "https://github.com/gshyam46/amazonClone",
    },
];
