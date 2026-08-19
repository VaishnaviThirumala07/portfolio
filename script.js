/* ==========================================================================
   DYNAMIC INTERACTIVITY LAYER - VAISHNAVI THIRUMALA PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initTypewriter();
    injectSkills();
    injectProjects();
    initSkillsFilter();
    initProjectsFilter();
    initContactForm();
    initScrollSpy();
});

/* ==========================================================================
   NAVBAR & MOBILE MENU LOGIC
   ========================================================================== */

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================================================================
   TYPEWRITER EFFECT (HERO HERO ROLE)
   ========================================================================== */

const roles = [
    "Production MLOps Pipelines.",
    "Generative AI & LLMs.",
    "Multi-Hop RAG Systems.",
    "Stateful LangGraph Agents.",
    "Deep Learning & Fine-Tuning."
];

function initTypewriter() {
    const textElem = document.getElementById('typewriter-text');
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function type() {
        const currentWord = roles[wordIdx];
        
        if (isDeleting) {
            textElem.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 35;
        } else {
            textElem.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 70;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Pause at the end of the typed word
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % roles.length;
            typingSpeed = 400; // Pause before typing the next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter loop
    setTimeout(type, 800);
}

/* ==========================================================================
   TECHNICAL SKILLS MATRIX DATA & INTEGRATION
   ========================================================================== */

const skillsData = [
    { name: "Python", category: "languages", icon: "bxl-python", level: "Expert" },
    { name: "Java", category: "languages", icon: "bxl-java", level: "Proficient" },
    { name: "C", category: "languages", icon: "bx-code-alt", level: "Core" },
    { name: "SQL", category: "languages", icon: "bx-data", level: "Advanced" },
    { name: "R", category: "languages", icon: "bx-stats", level: "Familiarity" },
    
    { name: "PyTorch (FSDP/DDP)", category: "ml-ai", icon: "bx-brain", level: "Multi-GPU" },
    { name: "LLaMA Fine-Tuning", category: "ml-ai", icon: "bx-slider-alt", level: "QLoRA" },
    { name: "BGE-Large Embeddings", category: "ml-ai", icon: "bx-layer", level: "Dense Rerank" },
    { name: "TensorFlow", category: "ml-ai", icon: "bx-network-chart", level: "Proficient" },
    { name: "Scikit-learn", category: "ml-ai", icon: "bx-scatter-chart", level: "Expert" },
    { name: "NLP", category: "ml-ai", icon: "bx-message-rounded-dots", level: "Lead Domain" },
    { name: "Reinforcement Learning", category: "ml-ai", icon: "bx-bot", level: "Academic" },
    
    { name: "LangGraph", category: "llms", icon: "bx-git-branch", level: "Stateful Agents" },
    { name: "LangChain", category: "llms", icon: "bx-link", level: "Advanced" },
    { name: "LlamaIndex", category: "llms", icon: "bx-select-multiple", level: "Node Parsing" },
    { name: "LlamaParse Vision AI", category: "llms", icon: "bx-file-find", level: "PDF Vision" },
    { name: "Hybrid Search (BM25+FAISS)", category: "llms", icon: "bx-search-alt", level: "Sparse + Dense" },
    { name: "Gemini 2.5 Flash / API", category: "llms", icon: "bx-sparkles", level: "Synthetic QA" },
    { name: "Ragas & ChromaDB", category: "llms", icon: "bx-cabinet", level: "RAG Eval & DB" },
    
    { name: "Pandas & NumPy", category: "data-tools", icon: "bx-table", level: "Expert" },
    { name: "SciPy", category: "data-tools", icon: "bx-calculator", level: "Advanced" },
    { name: "MLflow & DVC", category: "data-tools", icon: "bx-line-chart", level: "Tracking & CT" },
    { name: "Evidently AI", category: "data-tools", icon: "bx-pulse", level: "Drift Detection" },
    { name: "SHAP / LIME", category: "data-tools", icon: "bx-analyse", level: "Explainability" },
    { name: "A/B Testing & Bayesian", category: "data-tools", icon: "bx-test-tube", level: "Monte Carlo" },
    { name: "Git", category: "data-tools", icon: "bxl-git", level: "Advanced" },
    
    { name: "FastAPI", category: "systems", icon: "bx-bolt", level: "Backend API" },
    { name: "Docker", category: "systems", icon: "bxl-docker", level: "Containers" },
    { name: "Prometheus & Grafana", category: "systems", icon: "bx-bar-chart-alt-2", level: "Monitoring" },
    { name: "Streamlit", category: "systems", icon: "bx-slideshow", level: "Visual Apps" }
];

function injectSkills() {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';

    skillsData.forEach(skill => {
        const card = document.createElement('div');
        card.className = `glass-card skill-card`;
        card.setAttribute('data-category', skill.category);
        
        card.innerHTML = `
            <div class="skill-icon"><i class="bx ${skill.icon}"></i></div>
            <div class="skill-info">
                <h4>${skill.name}</h4>
                <span>${skill.level}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initSkillsFilter() {
    const tabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   PROJECTS ARRAY DATA & INTEGRATION
   ========================================================================== */

const projectsData = [
    {
        id: "churnops-mlops",
        title: "ChurnOps: Automated MLOps Pipeline for Churn Prediction",
        description: "A production-grade customer churn predictive ecosystem featuring stacking ensembles with threshold optimization, Evidently AI drift detection, and GitHub Actions automated retraining loop.",
        tags: ["XGBoost", "LightGBM", "Optuna", "SHAP", "DVC", "MLflow", "Evidently AI", "Prometheus", "Grafana", "Docker"],
        category: "mlops",
        type: "Featured MLOps System",
        architecture: "Stacking Ensemble (XGBoost, LightGBM, RF + LR meta-learner, 5-fold CV)",
        metric: "81.2%→90.4% Accuracy, 0.84→0.91 ROC-AUC (~$40,800 net profit / 1k users, 560%+ ROI)",
        resource: "IBM Telco Dataset (7,043 rows)",
        github: "https://github.com/VaishnaviThirumala07/ChurnOps-Automated-ML-Pipeline",
        details: [
            "Built a stacking ensemble (XGBoost, LightGBM, Random Forest + Logistic Regression meta-learner, 5-fold CV) lifting accuracy from 81.2% to 90.4% and ROC-AUC from 0.84 to 0.91 on IBM Telco dataset (7,043 rows).",
            "Designed a threshold optimizer across 100 probability intervals against customer LTV ($500) and campaign cost ($50), maximizing net profit to ~$40,800 per 1,000 customers (yielding 560%+ ROI).",
            "Deployed a self-healing retraining loop via Evidently AI drift detection + Prometheus/Grafana metric exposure + GitHub Actions to auto-trigger DVC retraining and MLflow promotion when drift exceeds 50%."
        ]
    },
    {
        id: "rag-facthop",
        title: "Multi-Hop RAG Fact Verification System",
        description: "An end-to-end multi-hop RAG pipeline verifying complex claims against a Wikipedia corpus, combining sparse BM25 search with FAISS dense reranking under 1GB RAM on CPU.",
        tags: ["BM25Okapi", "FAISS", "SentenceTransformers", "spaCy", "HuggingFace", "FastAPI", "Pyvis", "NetworkX"],
        category: "llm",
        type: "Featured RAG Engine",
        architecture: "2-Hop BM25 Okapi Sparse + FAISS Dense Reranking (all-MiniLM-L6-v2, 384-dim)",
        metric: "66.67% Recall@5 on FEVER benchmark at 1.2s CPU latency",
        resource: "Zero Cloud Dependency (<1GB RAM CPU-only)",
        github: "https://github.com/VaishnaviThirumala07/FactHop",
        details: [
            "Built a multi-hop RAG pipeline over a Wikipedia corpus achieving 66.67% Recall@5 on FEVER benchmarks at 1.2s latency on CPU-only hardware.",
            "Combined BM25 Okapi sparse search with in-memory FAISS dense reranking (all-MiniLM-L6-v2, 384-dim) keeping the full pipeline <1GB RAM with zero cloud dependency.",
            "Used spaCy NER (PERSON, ORG) for dynamic query expansion enabling multi-hop bridging across disjoint documents, fed into cross-encoder/nli-distilroberta-base for 3-class verdict classification (Supports, Refutes, Not Enough Info)."
        ]
    },
    {
        id: "ab-email-generator",
        title: "Personalized Email Campaign Generator with A/B Testing",
        description: "A stateful LangGraph agent orchestrating multi-LLM providers to generate persona-conditioned emails, coupled with a Bayesian A/B engine and closed-loop prompt optimization.",
        tags: ["LangGraph", "LangChain", "Gemini API", "GPT-4o", "Claude API", "FastAPI", "SciPy", "MLflow", "Streamlit", "Docker"],
        category: "llm",
        type: "Featured Agentic System",
        architecture: "Stateful LangGraph Multi-LLM Cycle & Closed-Loop Prompt Optimization",
        metric: "Bayesian Beta-Distribution + Monte Carlo Simulation (N=100,000) at 95% confidence",
        resource: "Multi-LLM (Gemini, GPT-4o, Claude)",
        github: "https://github.com/VaishnaviThirumala07/Personalized-Email-Campaign-Generator",
        details: [
            "Orchestrated a stateful LangGraph agent across multi-LLM providers (Gemini, GPT-4o, Claude) to generate persona-conditioned email variants per CRM segment with structured JSON output.",
            "Built a Bayesian A/B engine using Beta-distribution priors + Monte Carlo simulation (N = 100,000) to evaluate P(CTR A > CTR B), auto-declaring winners at 95% confidence.",
            "Implemented closed-loop prompt optimization appending winning attributes to a per-segment few-shot bank, steering LLM output over up to 5 iterative optimization loops."
        ]
    },
    {
        id: "ai-career-mentor",
        title: "AI Career Mentor & Skill Gap Analyzer",
        description: "An intelligent career advisory platform powered by NLP and RAG architectures, analyzing resumes against live job descriptions to dynamically extract skill gaps and generate personalized learning roadmaps.",
        tags: ["Gemini API", "RAG", "SentenceTransformers", "FastAPI", "Streamlit"],
        category: "llm",
        type: "GenAI Advisory System",
        architecture: "Semantic Resume Matching & Gap Analysis",
        metric: "Semantic Skill Alignment",
        resource: "Powered by Gemini API",
        github: "https://github.com/VaishnaviThirumala07/AI_Career_Mentor",
        details: [
            "Developed an interactive career mentoring system utilizing the Gemini API and a semantic vector similarity index to compare user resumes against high-dimensional embeddings of tech job profiles.",
            "Engineered a semantic skill-gap extraction pipeline using SentenceTransformers, highlighting missing qualifications, keywords, and domain requirements with custom visual mappings.",
            "Orchestrated an agentic roadmap generator creating week-by-week technical learning schedules tailored to bridging the identified gaps and preparing for technical interviews."
        ]
    },
    {
        id: "eeg-dct-comp",
        title: "High-Fidelity EEG Compression & Transfer Learning",
        description: "An advanced Deep Learning and DSP pipeline introducing variational DCT autoencoders for high-ratio multi-channel EEG signal compression and cross-subject transfer learning.",
        tags: ["PyTorch", "AVDCT-Net", "Butterworth", "BCI III"],
        category: "dsp",
        type: "Bio-Signal Research",
        architecture: "Variational DCT Autoencoder",
        metric: "8.62 Compression Ratio, 0.80 QS",
        resource: "BCI Competition III Dataset",
        github: "https://github.com/VaishnaviThirumala07/Edge-Fog-Computing-Enabled-EEG-Data-Compression",
        details: [
            "Enhanced AVDCT-Net (a variational autoencoder combined with discrete cosine transform) achieving a Compression Ratio (CR) of 8.62 and a reconstruction Quality Score (QS) of 0.80, vastly outperforming the 0.46 baseline.",
            "Engineered a cross-subject transfer learning pipeline to address high inter-subject variability and signal non-stationarity across the 64-channel BCI Competition III dataset.",
            "Designed a DSP preprocessing layer employing 5th-order Butterworth bandpass filtering (0.5 - 30 Hz) and subject-wise Z-score normalization to isolate neural activations from ocular artifact noises."
        ]
    },
    {
        id: "fake-news-nlp",
        title: "Robust NLP Fake News Classifier",
        description: "A text analytics classification system built to identify malicious digital articles by isolating lemmatized tf-idf unigram-to-trigram features.",
        tags: ["Scikit-learn", "NLTK", "TF-IDF", "GridSearchCV"],
        category: "nlp",
        type: "NLP Classifier",
        architecture: "TF-IDF + Opt-Naive Bayes",
        metric: "Peak F1-Score of 0.90",
        resource: "WELFake Article Corpus",
        github: "https://github.com/VaishnaviThirumala07/FakeNewsClassifier",
        details: [
            "Engineered a high-throughput natural language preprocessing engine using NLTK for lemmatization, customized stop-word pruning, and RegEx text cleaning.",
            "Extracted semantic content from headlines using n-gram tf-idf matrices (unigrams to trigrams) to retain local context.",
            "Optimized Logistic Regression and Multinomial Naive Bayes models via fine-grained GridSearchCV, validating convergence patterns.",
            "Evaluated downstream classification boundaries using precision-recall contours and confusion matrices, securing a peak F1-score of 0.90."
        ]
    }
];

function injectProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    projectsData.forEach(proj => {
        const card = document.createElement('div');
        card.className = `glass-card project-card`;
        card.setAttribute('data-category', proj.category);

        const techList = proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

        card.innerHTML = `
            <div class="project-body">
                <div class="project-top">
                    <span class="project-type-tag">${proj.type}</span>
                    <div class="project-links">
                        <a href="${proj.github}" target="_blank" class="project-link-icon" aria-label="GitHub Repo">
                            <i class="bx bxl-github" style="font-size: 1.45rem; vertical-align: middle;"></i>
                        </a>
                    </div>
                </div>
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description}</p>
                <div class="project-tech">${techList}</div>
                <div class="project-footer">
                    <button class="project-more-btn" onclick="openProjectModal('${proj.id}')">
                        Explore Details
                        <i class="bx bx-right-arrow-alt" style="font-size: 1.15rem; vertical-align: middle; margin-left: 2px;"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   MODAL WINDOW LOGIC
   ========================================================================== */

function openProjectModal(id) {
    const proj = projectsData.find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('project-modal');
    
    document.getElementById('modal-project-type').textContent = proj.type;
    document.getElementById('modal-project-title').textContent = proj.title;
    document.getElementById('modal-project-arch').textContent = proj.architecture;
    document.getElementById('modal-project-metric').textContent = proj.metric;
    document.getElementById('modal-project-resource').textContent = proj.resource;
    document.getElementById('modal-project-github').setAttribute('href', proj.github);

    const bodyContainer = document.getElementById('modal-project-body');
    const listItems = proj.details.map(d => `<li>${d}</li>`).join('');
    
    bodyContainer.innerHTML = `
        <h4>Engineering Implementation Details</h4>
        <ul>${listItems}</ul>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling behind modal

    // Add close events
    const closeBtn = document.getElementById('modal-close');
    
    const closeModalFn = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        closeBtn.removeEventListener('click', closeModalFn);
        modal.removeEventListener('click', overlayClickFn);
        document.removeEventListener('keydown', escKeyFn);
    };

    const overlayClickFn = (e) => {
        if (e.target === modal) {
            closeModalFn();
        }
    };

    const escKeyFn = (e) => {
        if (e.key === 'Escape') {
            closeModalFn();
        }
    };

    closeBtn.addEventListener('click', closeModalFn);
    modal.addEventListener('click', overlayClickFn);
    document.addEventListener('keydown', escKeyFn);
}

// Attach globally for inline HTML click attributes
window.openProjectModal = openProjectModal;

/* ==========================================================================
   CONTACT FORM INTEGRATION & VALIDATION
   ========================================================================== */

function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Front-end mock validation success
        successMsg.style.display = 'block';
        successMsg.style.opacity = '0';
        
        setTimeout(() => {
            successMsg.style.transition = 'opacity 0.5s ease';
            successMsg.style.opacity = '1';
        }, 50);

        form.reset();

        // Auto-fade simulated message after 6 seconds
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 500);
        }, 6000);
    });
}

/* ==========================================================================
   SCROLL SPY / ACTIVE NAV-LINKS HIGHLIGHTER
   ========================================================================== */

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies main view
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-sec') === id || (id === 'home' && link.getAttribute('data-sec') === 'home')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(sec => observer.observe(sec));
    
    // Fallback active trigger for home when scrolled to very top
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('[data-sec="home"]').classList.add('active');
        }
    });
}
