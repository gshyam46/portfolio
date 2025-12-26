export interface Experience {
    company: string;
    logo: string;
    role: string;
    location: string;
    type: "Full-time" | "Contract" | "Internship";
    duration: string;
    description: string[];
    technologies: string[];
}

export const EXPERIENCES: Experience[] = [
    {
        company: "Oracle",
        role: "Associate Consultant",
        logo: "/logos/oracle.png",
        location: "Bengaluru, India (Hybrid)",
        type: "Full-time",
        duration: "Aug 2025 – Present",
        description: [
            "Completed intensive enterprise training in Java, Oracle SQL, Groovy, JUnit, and front-end development, building a strong foundation in large-scale software development and testing.",
            "Earned multiple Oracle certifications including OCI Foundations, OCI AI, Generative AI, Vector Databases, Agentic AI, and RAG systems.",
            "Engaged in Oracle product training and solution design, preparing to deliver client-facing cloud and AI-driven solutions.",
        ],
        technologies: [
            "Java",
            "Oracle SQL",
            "Groovy",
            "JUnit",
            "Oracle Cloud Infrastructure",
            "Generative AI",
            "RAG",
            "Vector Databases",
        ],
    },

    {
        company: "Codifinary Technologies",
        logo: "/logos/oracle.png",
        role: "Software Developer",
        location: "Remote",
        type: "Contract",
        duration: "Jun 2025 – Aug 2025",
        description: [
            "Owned multiple proof-of-concepts end-to-end, from solution research and design to backend implementation, frontend integration, and deployment.",
            "Designed and implemented a generic observability solution using OpenTelemetry, SkyWalking agents, and transformers, applicable across multiple applications.",
            "Collected and standardized metrics, traces, and logs across distributed systems to improve monitoring and diagnostics.",
            "Represented the company at client sites for requirement gathering, solution pitching, deployment, and team training.",
        ],
        technologies: [
            "OpenTelemetry",
            "SkyWalking",
            "Distributed Tracing",
            "Backend Systems",
            "Frontend Integration",
            "System Design",
        ],
    },

    {
        company: "Vizares",
        logo: "/logos/oracle.png",
        role: "Software Developer Intern",
        location: "Bengaluru, India",
        type: "Internship",
        duration: "Jun 2025 – Aug 2025",
        description: [
            "Led end-to-end development of core features for an observability platform using Go, Vue.js, OpenTelemetry, eBPF, and node exporters.",
            "Built real-time telemetry pipelines and dashboards using time-series data, traces, and custom visualizations.",
            "Implemented features such as EUM, Executive Dashboards, Traces, Custom Dashboards, Applications, and Instances.",
            "Developed Docker-based microservices to ensure scalable telemetry ingestion and efficient metric storage.",
            "Mentored interns, participated in interviews, and led feature development under tight delivery timelines.",
        ],
        technologies: [
            "Go",
            "Vue.js",
            "OpenTelemetry",
            "eBPF",
            "Prometheus",
            "ClickHouse",
            "PostgreSQL",
            "Docker",
        ],
    },

    {
        company: "ContentEaseAI",
        logo: "/logos/oracle.png",
        role: "Software Developer Intern",
        location: "Tempe, AZ, USA (Remote)",
        type: "Internship",
        duration: "Jun 2025 – Aug 2025",
        description: [
            "Led development of a key feature for an AI-powered Chrome extension using Vue.js, FastAPI, and AWS.",
            "Implemented interactive website data scraping and AI-driven content summarization.",
            "Optimized summarization for 10k+ token inputs using a MapReduce strategy, reducing processing time from 30–60s to under 10s.",
            "Improved performance with Redis caching to minimize redundant computation.",
            "Single-handedly implemented authentication, authorization, RBAC, payments, and session management within two weeks.",
            "Pair-programmed critical features under tight timelines while maintaining code quality and testing standards.",
        ],
        technologies: [
            "FastAPI",
            "Vue.js",
            "AWS",
            "Redis",
            "LLMs",
            "MapReduce",
            "Authentication",
            "RBAC",
        ],
    },
];
