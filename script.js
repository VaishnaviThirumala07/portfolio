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
    "Artificial Intelligence Agents.",
    "Deep Learning Models.",
    "Machine Learning Solutions.",
    "Reinforcement Learning Systems.",
    "Data Science Architectures."
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
    
    { name: "PyTorch", category: "ml-ai", icon: "bx-brain", level: "Advanced" },
    { name: "TensorFlow", category: "ml-ai", icon: "bx-network-chart", level: "Proficient" },
    { name: "Scikit-learn", category: "ml-ai", icon: "bx-scatter-chart", level: "Expert" },
    { name: "NLP", category: "ml-ai", icon: "bx-message-rounded-dots", level: "Lead Domain" },
    { name: "Reinforcement Learning", category: "ml-ai", icon: "bx-bot", level: "Academic" },
    
    { name: "LangChain", category: "llms", icon: "bx-link", level: "Advanced" },
    { name: "LangGraph", category: "llms", icon: "bx-git-branch", level: "Agents" },
    { name: "RAG & Retrieval", category: "llms", icon: "bx-search-alt", level: "Advanced" },
    { name: "Gemini API", category: "llms", icon: "bx-sparkles", level: "Context-Aware" },
    { name: "Vector DBs (FAISS)", category: "llms", icon: "bx-cabinet", level: "Dense Indexing" },
    
    { name: "Pandas & NumPy", category: "data-tools", icon: "bx-table", level: "Expert" },
    { name: "SciPy", category: "data-tools", icon: "bx-calculator", level: "Advanced" },
    { name: "MLflow", category: "data-tools", icon: "bx-line-chart", level: "Tracking" },
    { name: "DVC", category: "data-tools", icon: "bx-package", level: "Data Versioning" },
    { name: "Git", category: "data-tools", icon: "bxl-git", level: "Advanced" },
    
    { name: "FastAPI", category: "systems", icon: "bx-bolt", level: "Backend API" },
    { name: "Docker", category: "systems", icon: "bxl-docker", level: "Containers" },
    { name: "Streamlit", category: "systems", icon: "bx-slideshow", level: "Visual Apps" },
    
    { name: "SHAP / LIME", category: "data-tools", icon: "bx-analyse", level: "Explainability" },
    { name: "A/B Testing", category: "data-tools", icon: "bx-test-tube", level: "Bayesian Methods" },
    { name: "Bayesian Inference", category: "data-tools", icon: "bx-pie-chart-alt-2", level: "Monte Carlo" }
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
        id: "ai-career-mentor",
        title: "AI Career Mentor",
        description: "An intelligent career advisory platform powered by NLP and RAG architectures, analyzing resumes against live job descriptions to dynamically extract skill gaps and generate personalized learning roadmaps.",
        tags: ["Gemini API", "RAG", "SentenceTransformers", "FastAPI", "Streamlit"],
        category: "llm",
        type: "GenAI Advisory System",
        architecture: "Semantic Resume Matching & Gap Analysis",
        metric: "Semantic Skill Alignment",
        resource: "Powered by Gemini-1.5-Pro",
        github: "https://github.com/VaishnaviThirumala07/AI_Career_Mentor",
        details: [
            "Developed an interactive career mentoring system utilizing the Gemini API and a semantic vector similarity index to compare user resumes against high-dimensional embeddings of tech job profiles.",
            "Engineered a semantic skill-gap extraction pipeline using SentenceTransformers, highlighting missing qualifications, keywords, and domain requirements with custom visual mappings.",
            "Orchestrated an agentic roadmap generator creating week-by-week technical learning schedules tailored to bridging the identified gaps and preparing for technical interviews."
        ]
    },
    {
        id: "churnops-mlops",
        title: "ChurnOps: Automated MLOps Pipeline",
        description: "A production-grade customer churn predictive ecosystem featuring stacking ensembles with optimized decision thresholds, Continuous Training (CT) triggers, and automated model promotion.",
        tags: ["XGBoost", "LightGBM", "Optuna", "MLflow", "DVC", "Docker", "Evidently AI", "Prometheus"],
        category: "mlops",
        type: "Featured Project",
        architecture: "Predictive Stacking Ensemble (via 5-fold CV)",
        metric: "90.4% Accuracy, 0.91 ROC-AUC (560%+ ROI)",
        resource: "IBM Telco dataset (7,043 rows)",
        github: "https://github.com/VaishnaviThirumala07/ChurnOps-Automated-ML-Pipeline",
        details: [
            "Engineered a production-grade stacking ensemble (XGBoost, LightGBM, Random Forest + Logistic Regression meta-learner via 5-fold CV), boosting accuracy from 81.2% to 90.4% and ROC-AUC from 0.84 to 0.91 on the IBM Telco dataset (7,043 rows).",
            "Designed a business-aware decision threshold optimizer evaluating 100 probability intervals against customer LTV ($500) and campaign cost ($50), maximizing net profit to $40,800 per 1,000 customers (yielding a 560%+ ROI).",
            "Built a closed-loop, self-healing retraining system using Evidently AI for drift detection, Prometheus for metric exposure, and GitHub Actions to auto-trigger DVC retraining and MLflow model registry promotion when drift share exceeds 50%."
        ]
    },
    {
        id: "rag-facthop",
        title: "Multi-Hop RAG Fact Verification Engine",
        description: "An end-to-end, zero-cloud multi-hop RAG pipeline verifying complex claims against a Wikipedia corpus, optimized to run locally under 1GB RAM on CPU.",
        tags: ["FAISS", "BM25 Okapi", "spaCy NER", "HuggingFace", "FastAPI"],
        category: "llm",
        type: "Featured Project",
        architecture: "2-Hop Iterative Hybrid Index",
        metric: "66.67% Recall@5 on FEVER",
        resource: "CPU-Only, <1GB RAM",
        github: "https://github.com/VaishnaviThirumala07/FactHop",
        details: [
            "Developed an end-to-end multi-hop RAG pipeline verifying complex claims against a Wikipedia corpus, achieving a peak 66.67% Recall@5 on FEVER benchmark claims with a 1.2s average latency on CPU-only hardware.",
            "Engineered a 2-hop iterative retrieval engine combining sparse BM25 Okapi search with dynamic in-memory FAISS dense reranking (all-MiniLM-L6-v2, 384-dim vectors), maintaining a highly localized pipeline under <1GB RAM with zero cloud dependency.",
            "Integrated spaCy Named Entity Recognition (NER) for dynamic query expansion across entity types (PERSON, ORG) to bridge semantic context across disjoint documents, feeding a cross-encoder (nli-distilroberta-base) for three-class verdict classification (Supports, Refutes, Not Enough Info)."
        ]
    },
    {
        id: "ab-email-generator",
        title: "Personalized Email Generator & A/B Tester",
        description: "A generative AI campaign system powered by LLM agent graphs that drafts targeted marketing email variants and runs simulated, statistically sound Bayesian A/B tests.",
        tags: ["LangGraph", "LangChain", "Gemini API", "SciPy", "MLflow", "Streamlit", "Docker"],
        category: "llm",
        type: "Generative AI System",
        architecture: "LangGraph LLM Agent Cycle",
        metric: "Bayesian Monte Carlo CTR Verification",
        resource: "Dynamic User Persona Synthesis",
        github: "https://github.com/VaishnaviThirumala07/Personalized-Email-Campaign-Generator",
        details: [
            "Orchestrated a stateful LangGraph agent workflow across multi-LLM providers (Gemini, GPT-4o, Claude) to generate persona-conditioned email variants per CRM segment (young professional, executive, retiree) with structured JSON output parsing.",
            "Implemented a Bayesian A/B testing engine using Beta-distribution conjugate priors and Monte Carlo simulation (N = 100,000) to evaluate P(CTR A > CTR B), automatically declaring a winning variant at a 95% confidence threshold.",
            "Built a closed-loop prompt optimization system appending winning variant attributes to a dynamic few-shot JSON bank per segment, iteratively steering the LLM toward higher-performing copy styles across up to 5 optimization loops."
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
    },
    {
        id: "traffic-control",
        title: "Adaptive Intersections Traffic Control",
        description: "A smart cities ML simulation predicting optimal traffic light intervals by analyzing vehicle congestion patterns in real-time.",
        tags: ["Jupyter Notebook", "Scikit-learn", "Pandas", "Regression"],
        category: "mlops",
        type: "Smart Cities ML",
        architecture: "Predictive Congestion Regressor",
        metric: "Minimizes Queue Overhead",
        resource: "Synthetic Traffic Stream Model",
        github: "https://github.com/VaishnaviThirumala07/Adaptive-Traffic-Control",
        details: [
            "Built regression-based light interval selectors adapting cycles dynamic to simulated lanes congestion thresholds.",
            "Demonstrated theoretical delays reductions across major intersections under intensive stress tests."
        ]
    },
    {
        id: "bias-detection",
        title: "Algorithmic Bias in AI Content Detectors",
        description: "A systematic study evaluating native biases across standard AI detectors (like GPTZero clones) against non-native English writing profiles.",
        tags: ["Jupyter Notebook", "NLTK", "Scikit-learn", "Hypothesis"],
        category: "nlp",
        type: "Algorithmic Audit",
        architecture: "Statistical Bias Auditor",
        metric: "False Positive Ratio Audit",
        resource: "Diverse L2 English Writing Samples",
        github: "https://github.com/VaishnaviThirumala07/Algorithmic-Bias-in-AI-Content-Detection",
        details: [
            "Conducted extensive statistical auditing measuring false positive rates across diverse text corpuses.",
            "Proved systemic over-classification of L2 English writers due to sentence structural perplexity thresholds, presenting mitigation adjustments."
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
