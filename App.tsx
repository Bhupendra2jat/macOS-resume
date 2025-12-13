import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  User, 
  Briefcase, 
  Code, 
  FileText, 
  X, 
  Minus, 
  Square, 
  Maximize2,
  Cpu,
  Globe,
  Github,
  Linkedin,
  Mail,
  Wifi,
  Battery,
  Search,
  LayoutGrid,
  Folder,
  Award,
  BookOpen,
  Zap,
  Layers,
  Database,
  Cpu as Chip
} from 'lucide-react';

// --- Types ---
interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface AppIcon {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

// --- Comprehensive Data from All Resumes ---
const RESUME_DATA = {
  name: "Bhupendra Jat",
  title: "B.Tech in Engineering Physics | IIT Delhi",
  contact: {
    email: "bhupendra2jat@gmail.com",
    phone: "+91-9610147129",
    location: "New Delhi, India",
    linkedin: "https://www.linkedin.com/in/bhupendra-973453256/", // Placeholder structure
    github: "https://github.com/Bhupendra2jat"        // Placeholder structure
  },
  education: [
    {
      degree: "B.Tech in Engineering Physics",
      school: "Indian Institute of Technology Delhi",
      year: "2021 - 2025",
      grade: "CGPA: 6.81",
      details: "Relevant Coursework: Machine Learning, Deep Learning, NLP, RAG, Data Structures & Algorithms, Quantum Mechanics, Digital Electronics, Vacuum Technology."
    },
    {
      degree: "Class XII (Senior Secondary)",
      school: "VBPS, Itawa Bhopji, Jaipur (Rajasthan Board)",
      year: "2021",
      grade: "98.80%",
      details: "Scholastic Achievement"
    },
    {
      degree: "Class X (Secondary)",
      school: "KVM Public School, Sikar (Rajasthan Board)",
      year: "2019",
      grade: "90.17%",
      details: "Scholastic Achievement"
    }
  ],
  experience: [
    {
      role: "Research Intern",
      company: "The Hebrew University of Jerusalem (HUJI)",
      location: "Jerusalem, Israel",
      date: "June 2025 - July 2025",
      desc: "Advisor: Prof. Freddy Gabbay (VLSI Research Lab)",
      points: [
        "Selected for a highly competitive research internship (<5% acceptance rate).",
        "Studied the theoretical framework of semiconductors, superconductors, and optical properties of solids."
      ]
    },
    {
      role: "AI Engineer Intern",
      company: "ZeTheta Algorithms",
      location: "Remote",
      date: "Oct 2024 - 2024",
      desc: "Automated Defect Detection",
      points: [
        "Automated defect detection tasks to reduce manual inspection errors.",
        "Trained robust YOLOv8 defect detection model with data augmentation and tuning.",
        "Achieved mAP@0.5 score of 0.82 with 15% higher recall and 2x faster inspection speed."
      ]
    },
    {
      role: "AI Model Training & Evaluation",
      company: "Outlier.ai",
      location: "Remote",
      date: "Mar 2024 - Jun 2024",
      desc: "LLM Performance Enhancement",
      points: [
        "Enhanced performance and safety of 6+ LLMs across natural language and code generation domains.",
        "Created and refined 400+ prompts to boost conversational AI capabilities.",
        "Conducted rigorous testing to correct biases and hallucinations."
      ]
    }
  ],
  projects: [
    {
      category: "Machine Learning & AI",
      items: [
        {
          title: "Vortex Detection in Solar Simulations",
          tech: "Random Forest, XGBoost, 3D CNNs, LAVD",
          desc: "Achieved >83% accuracy for vortex classification in MHD simulations. Applied Lagrangian-Averaged Vorticity Deviation to detect coherent structures."
        },
        {
          title: "Multi-Modal AI Wallpaper Generator",
          tech: "Kotlin, Qwen, Wallhaven API",
          desc: "Converts images into descriptive captions via Qwen to auto-generate diverse galleries. Automates wallpaper refresh using Kotlin."
        },
        {
          title: "Retrieval-Augmented Generation (RAG) Analysis",
          tech: "LangChain, FAISS, Hugging Face",
          desc: "Built a modular RAG pipeline for PDF analysis using PyPDFLoader and recursive splitting. Improved query relevance by 35%."
        },
        {
          title: "Fake News Detector",
          tech: "Python, Scikit-learn, TF-IDF, Logistic Regression",
          desc: "Implemented Logistic Regression to classify news articles as genuine or fabricated using vectorization techniques."
        }
      ]
    },
    {
      category: "Data Structures & Algorithms",
      items: [
        {
          title: "Social Network Analysis Tool",
          tech: "Java, Graph Algorithms, BFS, PageRank",
          desc: "Built a network model with O(1) node lookups. Applied BFS for community detection and PageRank to identify influencers."
        },
        {
          title: "Intelligent Library Management System",
          tech: "Java, Binary Search Tree (BST), Levenshtein Distance",
          desc: "Console app with efficient retrieval using BST. Implemented fuzzy search (4 character edits) and graph-based recommendations."
        },
        {
          title: "Restaurant Locator",
          tech: "2D Range Tree, AVL Trees",
          desc: "Engineered a spatial query system achieving O(n log n) preprocessing and O((log n)²) query time for scalable search."
        }
      ]
    },
    {
      category: "Analytics & SQL",
      items: [
        {
          title: "StockSmart: Inventory Platform",
          tech: "SQL, XGBoost, Analytics",
          desc: "Designed analytics engine for snapshots, alerts, and turnover. Integrated XGBoost (74% accuracy) to classify forecast deviations."
        }
      ]
    },
    {
      category: "Hardware & Electronics",
      items: [
        {
          title: "Battery Level Simulation",
          tech: "Verilog, D-Flip Flops, Karnaugh Maps",
          desc: "Simulated battery indicators using sequential circuits. Optimized combinational logic using K-maps to reduce circuit complexity."
        }
      ]
    }
  ],
  skills: {
    languages: ["Python", "Java", "SQL", "Verilog", "C++", "Kotlin", "LaTeX"],
    frameworks: ["Scikit-learn", "TensorFlow", "LangChain", "Hugging Face", "Pandas", "NumPy", "FAISS"],
    tools: ["MySQL", "GitHub", "Figma", "Blender", "AutoDesk Inventor", "Jupyter Notebook"],
    core: ["Data Structures & Algorithms", "Machine Learning", "NLP", "Retrieval-Augmented Generation", "Circuit Design"]
  },
  achievements: [
    { title: "Flipkart GRID 7.0", desc: "National Semi Finalist among participants across India, shortlisted for PPI (2025)." },
    { title: "JEE Advanced 2022", desc: "Secured AIR 1885 among ~250,000 candidates." },
    { title: "JEE Mains 2022", desc: "Secured AIR 3396 among ~1.2 Million candidates." }
  ],
  positionsOfResponsibility: [
    "Coordinator, Physics Society (PhySoc), CAIC (Jan 2024 - Jan 2025)",
    "Infra Coordinator, TRYST'25, CAIC (Jan 2024 - Jan 2025)",
    "Kaizen Publicity Coordinator, NSS (Jan 2024 - Jan 2025)",
    "Activity Head, RendezvousX, BRCA (June 2023 - May 2024)",
    "Executive, Physics Society, CAIC (June 2023 - May 2024)",
    "Team Head, RDV'23, BRCA (June 2022 - May 2023)"
  ],
  extracurriculars: [
    "Advanced to Flipkart GRID 7.0 Semi-Finals (Top 5% of 160K+).",
    "Special Mention, Charcoal Painting Competition.",
    "Member, Delineate - Design Society.",
    "Core Team Member, Resonance.",
    "Volunteer, Vibhinn 2025 (LGBTQIA+ Pride Fest)."
  ]
};

// --- Components ---

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 bg-black/40 backdrop-blur-md text-white flex items-center justify-between px-4 fixed top-0 w-full z-50 select-none text-sm font-medium">
      <div className="flex items-center gap-4">
        <span className="font-bold"></span>
        <span className="hidden sm:inline">BhupendraOS</span>
        <span className="hidden sm:inline opacity-80 hover:opacity-100 cursor-pointer">File</span>
        <span className="hidden sm:inline opacity-80 hover:opacity-100 cursor-pointer">Edit</span>
        <span className="hidden sm:inline opacity-80 hover:opacity-100 cursor-pointer">View</span>
      </div>
      <div className="flex items-center gap-4">
        <Battery size={16} />
        <Wifi size={16} />
        <Search size={16} />
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

// --- App Content Components ---

const ProfileApp = () => (
  <div className="bg-white h-full overflow-y-auto text-slate-800 flex flex-col md:flex-row">
    {/* Sidebar */}
    <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 text-center md:text-left">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl mx-auto md:mx-0 mb-4">
        BJ
      </div>
      <h1 className="text-2xl font-bold text-slate-900">{RESUME_DATA.name}</h1>
      <p className="text-sm font-medium text-blue-600 mb-6">{RESUME_DATA.title}</p>
      
      <div className="space-y-3 mb-8">
        <button className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
          <Mail size={16} className="text-red-500" /> {RESUME_DATA.contact.email}
        </button>
        <button className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-[#0077b5] text-white rounded-lg shadow-sm hover:bg-[#006396] transition-all text-sm font-semibold">
          <Linkedin size={16} /> LinkedIn Profile
        </button>
        <button className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-[#333] text-white rounded-lg shadow-sm hover:bg-[#242424] transition-all text-sm font-semibold">
          <Github size={16} /> GitHub Profile
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Achievements</h3>
        <div className="space-y-3">
          {RESUME_DATA.achievements.map((ach, i) => (
            <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <div className="text-sm font-bold text-slate-800">{ach.title}</div>
              <div className="text-xs text-slate-500 mt-1">{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="text-blue-600" size={20} /> Education
        </h2>
        <div className="space-y-6">
          {RESUME_DATA.education.map((edu, idx) => (
            <div key={idx} className="relative pl-4 border-l-2 border-slate-200">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg text-slate-900">{edu.school}</h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{edu.year}</span>
              </div>
              <p className="text-blue-600 font-medium text-sm mb-1">{edu.degree}</p>
              <p className="text-slate-500 text-sm italic mb-2">{edu.grade}</p>
              {edu.details && <p className="text-slate-600 text-sm leading-relaxed">{edu.details}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="text-purple-600" size={20} /> Positions of Responsibility
        </h2>
        <ul className="grid grid-cols-1 gap-2">
          {RESUME_DATA.positionsOfResponsibility.map((pos, i) => (
            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              {pos}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Zap className="text-yellow-600" size={20} /> Extracurriculars
        </h2>
        <ul className="grid grid-cols-1 gap-2">
          {RESUME_DATA.extracurriculars.map((act, i) => (
            <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              {act}
            </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

const ProjectsApp = () => {
  const [activeCategory, setActiveCategory] = useState("Machine Learning & AI");

  const CategoryIcon = ({ cat }: { cat: string }) => {
    if (cat.includes("Machine")) return <Cpu size={16} />;
    if (cat.includes("Data")) return <Layers size={16} />;
    if (cat.includes("Analytics")) return <Database size={16} />;
    if (cat.includes("Hardware")) return <Chip size={16} />;
    return <Folder size={16} />;
  };

  return (
    <div className="bg-white h-full flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-slate-100 border-r border-slate-200 p-4 flex flex-col gap-1 shrink-0">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Project Categories</h2>
        {RESUME_DATA.projects.map((section) => (
          <button
            key={section.category}
            onClick={() => setActiveCategory(section.category)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === section.category 
                ? "bg-blue-100 text-blue-700" 
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CategoryIcon cat={section.category} />
            {section.category}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">{activeCategory}</h2>
            <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full font-bold">
              {RESUME_DATA.projects.find(c => c.category === activeCategory)?.items.length} Items
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {RESUME_DATA.projects
              .find(c => c.category === activeCategory)
              ?.items.map((proj, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Folder size={20} />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{proj.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tech.split(',').map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceApp = () => (
  <div className="bg-white h-full overflow-y-auto p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800">
        <Briefcase className="text-purple-600" /> Professional Experience
      </h2>
      <div className="relative border-l-2 border-purple-100 ml-3 space-y-12">
        {RESUME_DATA.experience.map((exp, idx) => (
          <div key={idx} className="relative pl-8">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-sm ring-1 ring-purple-100"></span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
              <span className="text-sm font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">{exp.date}</span>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium text-slate-700">{exp.company}</p>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <Globe size={12} /> {exp.location} {exp.desc && `• ${exp.desc}`}
              </p>
            </div>
            <ul className="space-y-3">
              {exp.points.map((point, pIdx) => (
                <li key={pIdx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                   <span className="text-purple-400 mt-1.5">•</span>
                   <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SkillsApp = () => (
  <div className="bg-[#1e1e1e] h-full overflow-y-auto p-6 font-mono text-sm md:text-base text-green-400 selection:bg-green-900 selection:text-white">
    <div className="mb-6">
      <span className="text-blue-400">bhupendra@iitd</span>:<span className="text-purple-400">~/skills</span>$ cat technical_stack.json
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Languages */}
      <div className="bg-black/20 p-4 rounded-lg border border-white/5 hover:border-green-500/30 transition-colors">
        <h3 className="text-white border-b border-gray-700 pb-2 mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
          <Code size={16} /> Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {RESUME_DATA.skills.languages.map(s => (
            <span key={s} className="px-3 py-1 border border-green-800 bg-green-900/20 rounded hover:bg-green-500/20 cursor-default transition-colors">
              "{s}"
            </span>
          ))}
        </div>
      </div>

      {/* Frameworks */}
      <div className="bg-black/20 p-4 rounded-lg border border-white/5 hover:border-purple-500/30 transition-colors">
        <h3 className="text-white border-b border-gray-700 pb-2 mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
          <Layers size={16} /> Frameworks & Libs
        </h3>
        <div className="flex flex-wrap gap-2">
          {RESUME_DATA.skills.frameworks.map(s => (
            <span key={s} className="px-3 py-1 border border-purple-800 text-purple-300 bg-purple-900/20 rounded hover:bg-purple-500/20 cursor-default transition-colors">
              "{s}"
            </span>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="bg-black/20 p-4 rounded-lg border border-white/5 hover:border-yellow-500/30 transition-colors">
        <h3 className="text-white border-b border-gray-700 pb-2 mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
          <Terminal size={16} /> Tools & Software
        </h3>
        <div className="flex flex-wrap gap-2">
          {RESUME_DATA.skills.tools.map(s => (
            <span key={s} className="px-3 py-1 border border-yellow-800 text-yellow-300 bg-yellow-900/20 rounded hover:bg-yellow-500/20 cursor-default transition-colors">
              "{s}"
            </span>
          ))}
        </div>
      </div>

      {/* Core */}
      <div className="bg-black/20 p-4 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors">
        <h3 className="text-white border-b border-gray-700 pb-2 mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
          <Cpu size={16} /> Core Competencies
        </h3>
        <ul className="space-y-2">
          {RESUME_DATA.skills.core.map(s => (
            <li key={s} className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-500">{'>'}</span> {s}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-8 animate-pulse">
      <span className="text-blue-400">bhupendra@iitd</span>:<span className="text-purple-400">~/skills</span>$ <span className="w-2 h-4 bg-gray-400 inline-block align-middle"></span>
    </div>
  </div>
);

// --- Window System Components ---

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  onUpdateWindow 
}: { 
  window: WindowState; 
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdateWindow: (id: string, updates: Partial<WindowState>) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onUpdateWindow(window.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, onUpdateWindow]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus(window.id);
    if (!window.isMaximized) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.x,
        y: e.clientY - window.y
      });
    }
  };

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? { top: 32, left: 0, width: '100%', height: 'calc(100% - 80px)', zIndex: window.zIndex }
    : { top: window.y, left: window.x, width: window.width, height: window.height, zIndex: window.zIndex };

  return (
    <div 
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl border border-gray-200/50 overflow-hidden flex flex-col transition-all duration-75 ease-out ${window.isMaximized ? 'rounded-none' : ''}`}
      style={{ ...style, position: 'absolute' }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-9 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 shrink-0 cursor-default"
        onDoubleClick={() => onMaximize(window.id)}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 group">
          <button onClick={(e) => { e.stopPropagation(); onClose(window.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-[8px] text-red-900 opacity-80 hover:opacity-100 transition-opacity">
             <X size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-yellow-900 opacity-80 hover:opacity-100 transition-opacity">
            <Minus size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-green-900 opacity-80 hover:opacity-100 transition-opacity">
            {window.isMaximized ? <MinimizeIcon size={8} className="opacity-0 group-hover:opacity-100" /> : <Maximize2 size={8} className="opacity-0 group-hover:opacity-100" />}
          </button>
        </div>
        <div className="text-xs font-semibold text-gray-600 flex-1 text-center truncate px-4">
          {window.title}
        </div>
        <div className="w-14"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white relative">
        {window.component}
      </div>
    </div>
  );
};

const MinimizeIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);

// --- Main App Logic ---

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [launcherOpen, setLauncherOpen] = useState(false);

  // App Definitions
  const apps: AppIcon[] = [
    { id: 'profile', title: 'Profile', icon: <User size={24} />, color: 'bg-blue-600' },
    { id: 'projects', title: 'Projects', icon: <Code size={24} />, color: 'bg-indigo-600' },
    { id: 'experience', title: 'Experience', icon: <Briefcase size={24} />, color: 'bg-purple-600' },
    { id: 'skills', title: 'Skills', icon: <Terminal size={24} />, color: 'bg-slate-800' },
    { id: 'resume', title: 'Resume PDF', icon: <FileText size={24} />, color: 'bg-red-500' },
  ];

  const openWindow = (appId: string) => {
    setLauncherOpen(false);
    
    // Focus if already open
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      if (existing.isMinimized) {
        onUpdateWindow(appId, { isMinimized: false });
      }
      onFocus(appId);
      return;
    }

    const app = apps.find(a => a.id === appId);
    if (!app) return;

    let component;
    switch(appId) {
      case 'profile': component = <ProfileApp />; break;
      case 'experience': component = <ExperienceApp />; break;
      case 'projects': component = <ProjectsApp />; break;
      case 'skills': component = <SkillsApp />; break;
      case 'resume': component = <ProfileApp />; break; 
      default: component = <div className="p-4">Content for {app.title}</div>;
    }

    const newWindow: WindowState = {
      id: appId,
      title: app.title,
      component,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 50 + (windows.length * 30),
      y: 50 + (windows.length * 30),
      width: Math.min(window.innerWidth * 0.8, 900),
      height: Math.min(window.innerHeight * 0.8, 650),
      zIndex: maxZIndex + 1
    };

    setWindows([...windows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
    setActiveWindowId(appId);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const onUpdateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const onFocus = (id: string) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    onUpdateWindow(id, { zIndex: newZ });
    setActiveWindowId(id);
  };

  const toggleMinimize = (id: string) => {
    const w = windows.find(win => win.id === id);
    if (w) onUpdateWindow(id, { isMinimized: !w.isMinimized });
  };

  const toggleMaximize = (id: string) => {
    const w = windows.find(win => win.id === id);
    if (w) onUpdateWindow(id, { isMaximized: !w.isMaximized });
  };

  return (
    <div className="h-screen w-screen bg-cover bg-center overflow-hidden relative font-sans text-gray-900 select-none" 
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80")' }}>
      
      <TopBar />

      {/* Desktop Icons */}
      <div className="pt-12 p-4 flex flex-col gap-6 w-32 items-center absolute top-0 left-0 bottom-16 z-10">
        {apps.map(app => (
          <div 
            key={app.id}
            onDoubleClick={() => openWindow(app.id)}
            className="flex flex-col items-center gap-1 group cursor-pointer w-24 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className={`w-14 h-14 ${app.color} rounded-xl shadow-lg flex items-center justify-center text-white text-opacity-95 shadow-black/20 transform group-active:scale-95 transition-transform`}>
              {app.icon}
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded shadow-sm drop-shadow-md text-center bg-black/20 group-hover:bg-blue-600/80 transition-colors">
              {app.title}
            </span>
          </div>
        ))}
      </div>

      {/* Windows Layer */}
      {windows.map(win => (
        <Window 
          key={win.id} 
          window={win} 
          onClose={closeWindow}
          onMinimize={toggleMinimize}
          onMaximize={toggleMaximize}
          onFocus={onFocus}
          onUpdateWindow={onUpdateWindow}
        />
      ))}

      {/* Launchpad Overlay */}
      {launcherOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl z-[90] flex items-center justify-center animate-in fade-in duration-200" onClick={() => setLauncherOpen(false)}>
           <div className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-16 p-8">
              {apps.map(app => (
                <button 
                  key={app.id} 
                  onClick={(e) => { e.stopPropagation(); openWindow(app.id); }}
                  className="flex flex-col items-center gap-4 group transition-transform hover:scale-110 duration-200"
                >
                  <div className={`w-20 h-20 ${app.color} rounded-2xl shadow-2xl flex items-center justify-center text-white ring-2 ring-white/10`}>
                    {React.cloneElement(app.icon as React.ReactElement, { size: 40 })}
                  </div>
                  <span className="text-white font-medium tracking-wide text-lg drop-shadow-lg">{app.title}</span>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* Dock */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-[100] pointer-events-none">
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl px-4 pb-2 pt-3 flex items-end gap-2 md:gap-4 shadow-2xl mb-2 pointer-events-auto transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
          
          {/* Launcher Button */}
          <div 
            className="group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:-translate-y-2 active:scale-95"
            onClick={() => setLauncherOpen(!launcherOpen)}
          >
             <div className="w-12 h-12 bg-gradient-to-b from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg ring-1 ring-white/20">
                <LayoutGrid size={24} />
             </div>
             <div className="w-1 h-1 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="w-[1px] h-10 bg-white/20 mx-1 self-center" />

          {/* App Icons */}
          {apps.map((app) => {
            const isOpen = windows.some(w => w.id === app.id);
            return (
              <div 
                key={app.id}
                className="group relative flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:-translate-y-3 origin-bottom active:scale-95"
                onClick={() => openWindow(app.id)}
              >
                {/* Tooltip */}
                <span className="absolute -top-12 bg-gray-900/90 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-white/10">
                  {app.title}
                </span>

                <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden ring-1 ring-white/20`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
                  {React.cloneElement(app.icon as React.ReactElement, { size: 24 })}
                </div>
                {/* Dot indicator */}
                <div className={`w-1 h-1 rounded-full bg-white transition-opacity ${isOpen ? 'opacity-90' : 'opacity-0'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
