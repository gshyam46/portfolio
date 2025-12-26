// utils/skills.ts

export type SkillLevel = "Advanced" | "Intermediate" | "Learning";

export interface Skill {
  name: string;
  icon: string; // iconify id
  level?: SkillLevel;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: "mdi:code-tags",
    skills: [
      { name: "Python", icon: "simple-icons:python" },
      { name: "Java", icon: "mdi:language-java" },
      { name: "JavaScript", icon: "simple-icons:javascript" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "C/C++", icon: "simple-icons:cplusplus" },
      { name: "Golang", icon: "simple-icons:go" },
      { name: "Groovy", icon: "simple-icons:apachegroovy" },
    ],
  },

  {
    id: "backend",
    title: "Backend Frameworks",
    icon: "mdi:server",
    skills: [
      { name: "FastAPI", icon: "simple-icons:fastapi" },
      { name: "Flask", icon: "simple-icons:flask" },
      { name: "Django", icon: "simple-icons:django" },
      { name: "Express.js", icon: "simple-icons:express" },
      { name: "Node.js", icon: "simple-icons:nodedotjs" },
      { name: "JUnit", icon: "simple-icons:junit5" },
    ],
  },

  {
    id: "frontend",
    title: "Frontend & Full-Stack",
    icon: "mdi:monitor-dashboard",
    skills: [
      { name: "React", icon: "simple-icons:react" },
      { name: "Next.js", icon: "simple-icons:nextdotjs" },
      { name: "Vue.js", icon: "simple-icons:vuedotjs" },
      { name: "Nuxt.js", icon: "simple-icons:nuxtdotjs" },
    ],
  },

  {
    id: "ai",
    title: "AI & Automation",
    icon: "mdi:brain",
    skills: [
      { name: "LLM Integration", icon: "mdi:robot-outline" },
      { name: "AI Agents", icon: "mdi:robot" },
      { name: "LangChain", icon: "simple-icons:langchain" },
      { name: "LangGraph", icon: "mdi:graph-outline" },
      { name: "CrewAI", icon: "mdi:account-group-outline" },
      { name: "liteLLM", icon: "mdi:flash-outline" },
      { name: "Google ADK", icon: "simple-icons:google" },
      { name: "n8n", icon: "simple-icons:n8n" },
      { name: "RAG", icon: "mdi:database-search-outline" },
    ],
  },

  {
    id: "ml",
    title: "Machine Learning",
    icon: "mdi:chart-scatter-plot",
    skills: [
      { name: "Reinforcement Learning", icon: "mdi:gamepad-variant-outline" },
      { name: "Deep Learning", icon: "mdi:layers-outline" },
      { name: "CNN", icon: "mdi:grid" },
      { name: "RNN", icon: "mdi:timeline-outline" },
      { name: "Classification", icon: "mdi:tag-outline" },
      { name: "Regression", icon: "mdi:chart-line" },
      { name: "NumPy", icon: "simple-icons:numpy" },
      { name: "Pandas", icon: "simple-icons:pandas" },
      { name: "OpenCV", icon: "simple-icons:opencv" },
      { name: "OCR", icon: "mdi:text-recognition" },
    ],
  },

  {
    id: "databases",
    title: "Databases",
    icon: "mdi:database",
    skills: [
      { name: "MySQL", icon: "simple-icons:mysql" },
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Oracle SQL", icon: "simple-icons:oracle" },
      { name: "MongoDB", icon: "simple-icons:mongodb" },
      { name: "DynamoDB", icon: "simple-icons:amazondynamodb" },
      { name: "Firebase", icon: "simple-icons:firebase" },
      { name: "ClickHouse", icon: "simple-icons:clickhouse" },
      { name: "Microsoft SQL", icon: "simple-icons:microsoftsqlserver" },
      { name: "Supabase", icon: "simple-icons:supabase" },
    ],
  },

  {
    id: "cloud",
    title: "Cloud Platforms",
    icon: "mdi:cloud-outline",
    skills: [
      { name: "AWS", icon: "simple-icons:amazonaws" },
      { name: "Azure", icon: "simple-icons:microsoftazure" },
      { name: "Oracle Cloud", icon: "simple-icons:oracle" },
      { name: "Google Cloud", icon: "simple-icons:googlecloud" },
    ],
  },

  {
    id: "devops",
    title: "DevOps & Tools",
    icon: "mdi:cog-outline",
    skills: [
      { name: "Git", icon: "simple-icons:git" },
      { name: "Docker", icon: "simple-icons:docker" },
      { name: "Kubernetes", icon: "simple-icons:kubernetes" },
      { name: "CI/CD", icon: "mdi:source-branch" },
      { name: "Tomcat", icon: "simple-icons:apachetomcat" },
      { name: "Nginx", icon: "simple-icons:nginx" },
    ],
  },

  {
    id: "observability",
    title: "Observability",
    icon: "mdi:chart-timeline-variant",
    skills: [
      { name: "Prometheus", icon: "simple-icons:prometheus" },
      { name: "OpenTelemetry", icon: "simple-icons:opentelemetry" },
      { name: "Datadog", icon: "simple-icons:datadog" },
      { name: "Langfuse", icon: "mdi:magnify-scan" },
      { name: "Node Exporter", icon: "mdi:export" },
      { name: "SkyWalking", icon: "simple-icons:apache" },
      { name: "Grafana", icon: "simple-icons:grafana" },
    ],
  },

  {
    id: "blockchain",
    title: "Blockchain",
    icon: "mdi:cube-outline",
    skills: [
      { name: "Hyperledger Fabric", icon: "simple-icons:hyperledger" },
      { name: "Ethereum / Solidity", icon: "simple-icons:ethereum" },
      { name: "Polkadot SDK", icon: "simple-icons:polkadot" },
      { name: "ZKP", icon: "mdi:shield-lock-outline" },
      { name: "Smart Contracts", icon: "mdi:file-certificate-outline" },
    ],
  },
];



export const SKILLS = [...SKILL_CATEGORIES];