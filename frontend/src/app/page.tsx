"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./landing.css";

/* ───────── Testimonials Data ───────── */
const testimonials = [
  {
    user: "u/tim_lawtech",
    quote: "I was honestly shocked by how expensive and inflexible their pricing model is. There's no room for customization, and it's way too pricey for smaller teams.",
    product: "harvey" as const,
  },
  {
    user: "u/Severe_Lock8497",
    quote: "Harvey responded to my demo request by saying they don't schedule demos for small firms. The tools are completely out of reach financially.",
    product: "harvey" as const,
  },
  {
    user: "u/tulumtimes2425",
    quote: "At $1,200/seat/mo... it's just way too pricey. Smaller firms can't even dream of getting access, making it incredibly exclusive.",
    product: "harvey" as const,
  },
  {
    user: "u/ZoltarGrantsYourWish",
    quote: "Harvey at $1,200/seat is ridiculously expensive. The cost per seat basically gatekeeps any solo practitioner or small law firm.",
    product: "harvey" as const,
  },
  {
    user: "u/AdorableHovercraft26",
    quote: "When we piloted the small firm version of Harvey, the pricing given to us was so pricey. Totally inaccessible for anyone outside big law.",
    product: "harvey" as const,
  },
  {
    user: "u/Ok-Arm-6736",
    quote: "The price tag is incredibly expensive... way too pricey for a small outfit of 5 lawyers to ever justify the return on investment.",
    product: "harvey" as const,
  },
  {
    user: "u/tulumtimes2425",
    quote: "Legora pricing is extremely high... the whole thing felt optimized for big firms. Too pricey and inaccessible for smaller practices like ours.",
    product: "legora" as const,
  },
  {
    user: "u/GrationLawyer",
    quote: "Got quoted 25k for 4 licenses and they didn't even bother to follow up. Disgustingly pricey and clearly not aimed at us.",
    product: "legora" as const,
  },
  {
    user: "u/Present_Water6950",
    quote: "They do per user pricing, but yeah, both are exceptionally pricey. It's completely alienating to small firms lacking enterprise budgets.",
    product: "both" as const,
  },
  {
    user: "u/Front_Tea_316",
    quote: "To us they both gave a ridiculously pricey offer, but I guess we are too small and don't count for their enterprise business model.",
    product: "both" as const,
  },
  {
    user: "u/jbeezely",
    quote: "It's just really difficult to justify Harvey's exorbitant cost. Far too pricey when we are just an independent, small team.",
    product: "harvey" as const,
  },
  {
    user: "u/LondonZ1",
    quote: "If Harvey wasn't so pricey, maybe we'd try it. But they demand thousands for minimum licenses, making it inaccessible to most lawyers.",
    product: "harvey" as const,
  },
  {
    user: "u/Review_Particular",
    quote: "Right now these AI tools are too pricey. Charging thousands of dollars per user completely locks out the smaller, everyday law firms.",
    product: "both" as const,
  },
  {
    user: "u/Loose_Worker_7360",
    quote: "I'm an attorney in a small law firm. We simply don't have the budget to pay for those overly pricey 'do it all' systems like Harvey.",
    product: "harvey" as const,
  },
  {
    user: "u/yuch85",
    quote: "These tools are just too pricey to be accessible. Why do only the biggest firms with massive budgets get to use modern software?",
    product: "legora" as const,
  },
  {
    user: "u/dangerra",
    quote: "This duopoly makes things so expensive and pricey. Smaller firms are left completely out of the loop and cannot afford this tech.",
    product: "both" as const,
  },
];

const features = [
  {
    title: "Assistant",
    desc: "A chat interface that reads your documents, cites verbatim, runs multi-step workflows, and drafts and edits contracts end-to-end. Plug in your own Claude or Gemini keys, and keep full control of the models you use.",
    mockupType: "assistant"
  },
  {
    title: "Projects",
    desc: "Matter-scoped workspaces. Upload credit agreements, SPAs, leases, and diligence packs into a project; the assistant keeps full context across every conversation and every document.",
    mockupType: "projects"
  },
  {
    title: "Tabular review",
    desc: "Spreadsheet-style extraction across hundreds of documents in parallel. Every cell is verifiably cited back to a page and a quote, with no hallucinated answers or dead links.",
    mockupType: "tabular"
  },
  {
    title: "Workflows",
    desc: "Save proven prompts as reusable workflows, including CP checklists, credit agreement summaries, and change-of-control reviews. Create firm-wide templates your juniors can run in one click.",
    mockupType: "workflows"
  }
];



/* ───────── Components ───────── */

function BrandLogo({ className, style, variant = "light" }: { className?: string, style?: React.CSSProperties, variant?: "light" | "dark" }) {
  const src = variant === "light" ? "/logo-dark.png" : "/logo-light.png";
  return <img src={src} className={className} style={{ ...style, objectFit: "contain", borderRadius: 4 }} alt="OpenSpecter Logo" />;
}

function GitHubIcon({ className, width = 20, height = 20 }: { className?: string, width?: number, height?: number }) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  const badgeClass =
    testimonial.product === "harvey"
      ? "harvey"
      : testimonial.product === "legora"
      ? "legora"
      : "both";
  const badgeLabel =
    testimonial.product === "both"
      ? "Harvey & Legora"
      : testimonial.product === "harvey"
      ? "Harvey"
      : "Legora";

  const initials = testimonial.user
    .replace("u/", "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="testimonial-card">
      <span className={`testimonial-badge ${badgeClass}`}>
        re: {badgeLabel}
      </span>
      <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{initials}</div>
        <div className="testimonial-meta">
          <div className="testimonial-name">
            {testimonial.user.slice(0, -4)}
            <span style={{ filter: "blur(4px)", userSelect: "none", opacity: 0.5 }}>{testimonial.user.slice(-4)}</span>
          </div>
          <div className="testimonial-source">r/legaltech · Reddit</div>
        </div>
      </div>
    </div>
  );
}

function ShepardizingMockup() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"checking" | "good">("checking");

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2500);
    const timer3 = setTimeout(() => {
      setStep(3);
      setStatus("good");
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="shepardizing-mockup">
      <div className="shepardizing-header">
        <div className="shepardizing-citation">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Miranda v. Arizona <em>384 U.S. 436 (1966)</em>
        </div>
        <div className={`shepardizing-status-tag ${status === "good" ? "good" : "caution"}`}>
          {status === "good" ? (
            <><CheckIcon /> GOOD LAW</>
          ) : (
            <>VERIFYING...</>
          )}
        </div>
      </div>
      <div className="shepardizing-content">
        <div className={`shepardizing-step ${step >= 0 ? "active" : ""} ${step > 0 ? "completed" : ""}`}>
          <div className="shepardizing-step-icon">
            {step > 0 ? <CheckIcon /> : "1"}
          </div>
          <div className="shepardizing-step-text">
            <h5>Analyzing Citation</h5>
            <p>Identifying case ID and primary jurisdiction...</p>
          </div>
        </div>
        <div className={`shepardizing-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
          <div className="shepardizing-step-icon">
            {step > 1 ? <CheckIcon /> : "2"}
          </div>
          <div className="shepardizing-step-text">
            <h5>Cross-referencing Database</h5>
            <p>Scanning 15.6M US case law records for subsequent history...</p>
          </div>
        </div>
        <div className={`shepardizing-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
          <div className="shepardizing-step-icon">
            {step > 2 ? <CheckIcon /> : "3"}
          </div>
          <div className="shepardizing-step-text">
            <h5>Verifying Treatment</h5>
            <p>Checking for negative treatment, overrules, or limitations...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Main Page ───────── */

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [stars, setStars] = useState<string>("");

  useEffect(() => {
    fetch("https://api.github.com/repos/QuanteraAI/OpenSpecter")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          const count = data.stargazers_count;
          const formatted = count > 999 ? (count / 1000).toFixed(1) + "k" : count.toString();
          setStars(formatted);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setToastMessage("Coming soon");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Duplicate testimonials for infinite scroll
  const row1 = [...testimonials.slice(0, 8), ...testimonials.slice(0, 8)];
  const row2 = [...testimonials.slice(8), ...testimonials.slice(0, 8 - testimonials.slice(8).length), ...testimonials.slice(8), ...testimonials.slice(0, 8 - testimonials.slice(8).length)];

  return (
    <div className="landing-page-body">
      {/* ──── Navbar ──── */}
      <nav className="navbar" id="navbar">
        <div className="navbar-logo">
          <BrandLogo style={{ width: 32, height: 32 }} />
          OpenSpecter
        </div>
        
        <div className="navbar-cta" style={{ marginLeft: "auto" }}>
          <a href="https://github.com/QuanteraAI/OpenSpecter" target="_blank" rel="noopener noreferrer" className="navbar-cta-btn">
            <StarIcon /> {stars ? `Star ${stars}` : "Star on GitHub"}
          </a>
        </div>
      </nav>

      {/* ──── Hero ──── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <Image 
            src="/hero-bg.png" 
            alt="Hero background" 
            fill 
            priority 
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={90}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot"></span>
            Source Available · Free Forever
          </div>
          <h1>
            Law is attractive, but it shouldn&apos;t
            <br />
            <span className="highlight">cost millions of dollars.</span>
          </h1>
          <p className="hero-subtitle">
            Enterprise-grade document analysis, legal research, and contract
            review, without the $1,200/seat price tag. Free, self-hosted, and
            built by Quantera.
          </p>

          <div className="hero-terminal" id="get-started">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-body">
              <span>
                <span className="prompt">$</span>
                <span className="command">
                  git clone https://github.com/QuanteraAI/OpenSpecter
                </span>
              </span>
              <button
                className="terminal-copy"
                aria-label="Copy command"
                onClick={() => {
                  navigator.clipboard.writeText("git clone https://github.com/QuanteraAI/OpenSpecter");
                  setToastMessage("Copied to clipboard");
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Testimonials ──── */}
      <section className="testimonials-section section-alt" id="testimonials" style={{ paddingTop: "80px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "80px" }}>
          <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-tertiary)", marginBottom: "20px", fontWeight: 600, fontFamily: "var(--font-secondary)" }}>
            As seen on
          </h3>
          <img 
            src="/juris-review-logo.png?v=3" 
            alt="Juris Review" 
            style={{ height: "160px", width: "auto", opacity: 0.6, filter: "grayscale(100%)", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.95"; e.currentTarget.style.filter = "none"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.filter = "grayscale(100%)"; }}
          />
        </div>
        <div className="section-header fade-in">
          <h2>The problem is real.</h2>
          <p>
            Real lawyers. Real complaints. These are unedited voices from
            Reddit&apos;s r/legaltech, frustrated by pricing that locks out
            everyone except Big Law.
          </p>
          <div className="reddit-tag">
            <RedditIcon />
            Sourced from r/legaltech
          </div>
        </div>
        <div className="carousel-container">
          <div className="carousel-track carousel-track-left">
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="carousel-track carousel-track-right">
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ──── Features ──── */}
      <section className="section" id="features">
        <div className="section-header fade-in">
          <h2>Everything you need to practice smarter.</h2>
          <p>
            The capabilities that enterprise tools charge thousands for,
            source-available, self-hosted, and yours to customize.
          </p>
        </div>
        <div className="features-bento-grid">
          {features.map((f, i) => (
            <div key={i} className="bento-card fade-in">
              <div className="bento-mockup-wrapper">
                {f.mockupType === "assistant" && (
                  <div className="mockup-window mockup-assistant">
                    <div className="assistant-header">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0a0b0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                    </div>
                    <div className="assistant-content">
                      <div className="assistant-bullet">Read SPV-Credit-Agt.pdf</div>
                      <div className="assistant-bullet">Applied Workflow Generate CP Checklist</div>
                      <div className="assistant-bullet">Created Conditions Precedent Checklist.docx</div>
                      <div className="assistant-text">I have generated the Conditions Precedent Checklist based on the credit agreement provided. The document has been drafted in landscape orientation with the required sections and table columns. You can download it directly from the interface.</div>
                      <div className="assistant-attachment">
                        <div>
                          <span className="doc-title">Conditions Precedent Checklist</span>
                          <span className="doc-type">DOCX</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                      </div>
                    </div>
                    <div className="assistant-input">
                      <div className="input-placeholder">Ask a question about your documents...</div>
                      <div className="input-actions">
                        <span>+ Documents</span>
                        <span>✨ Workflows</span>
                        <div className="model-selector">Claude Sonnet 4.5 ▾</div>
                        <div className="send-btn">→</div>
                      </div>
                    </div>
                  </div>
                )}
                {f.mockupType === "projects" && (
                  <div className="mockup-window mockup-projects">
                    <div className="projects-breadcrumbs">Projects <span style={{color: "#a0a0b0"}}>›</span> <strong>NDAs</strong></div>
                    <div className="projects-tabs">
                      <span className="active">Documents</span>
                      <span>Assistant</span>
                      <span>Tabular Reviews</span>
                    </div>
                    <div className="projects-list">
                      <div className="projects-header"><div className="checkbox"></div> Name</div>
                      {['TSC-Mutual-Multi-party-NDA-Explainer.pdf', 'Annex-1-NDA.pdf', 'Mutual NDA Template ECVC.pdf', 'nda-confidentiality_2.21.2020.pdf', 'recht-useful-information-on-business-secrets-english-data.pdf', 'NDA.pdf', 'annex-2-sample-non-disclosure-agreement.pdf'].map((name, idx) => (
                        <div key={idx} className="project-item">
                          <div className="checkbox"></div>
                          <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {f.mockupType === "tabular" && (
                  <div className="mockup-window mockup-tabular">
                    <div className="table-header">
                      <div className="col-1"><div className="checkbox"></div> Document</div>
                      <div className="col-2">Direction</div>
                      <div className="col-3">Definition of Confidential Information</div>
                    </div>
                    <div className="table-body">
                      {[
                        { doc: "nda-confidentiality_2.21.2020.pdf", dir: "Mutual", def: "Broadly defined to include any information abou..." },
                        { doc: "recht-useful-information-on-business-secrets-...", dir: "Mutual", def: "The definition is broadly drafted and include..." },
                        { doc: "annex-2-sample-non-disclosure-agreement.pdf", dir: "Unilateral", def: "The definition is broadly drafted, covering..." },
                        { doc: "Annex-1-NDA.pdf", dir: "Unilateral", def: "Confidential Information is defined as oral or..." },
                        { doc: "NDA.pdf", dir: "Unilateral", def: "The definition is broadly drafted to include all..." },
                        { doc: "Mutual NDA Template ECVC.pdf", dir: "Mutual", def: "The definition is broad, covering \"all non-public..." }
                      ].map((row, idx) => (
                        <div key={idx} className="table-row">
                          <div className="col-1"><div className="checkbox"></div> <span className="truncate">{row.doc}</span></div>
                          <div className="col-2"><span className="badge">{row.dir}</span></div>
                          <div className="col-3"><span className="dot"></span> {row.def}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {f.mockupType === "workflows" && (
                  <div className="mockup-window mockup-workflows">
                    <div className="projects-breadcrumbs"><strong>Workflows</strong></div>
                    <div className="projects-tabs">
                      <span className="active">All Workflows</span>
                      <span>Built-in</span>
                      <span>Custom</span>
                      <span>Hidden</span>
                    </div>
                    <div className="projects-list">
                      <div className="projects-header"><div className="checkbox"></div> Name</div>
                      {['Change of Control Review', 'Credit Agreement Review', 'E-Discovery Review', 'Supply Agreement Review', 'SPA Review', 'NDA Review', 'Commercial Lease Review', 'Limited Partnership Agreement Review', 'Shareholder Agreement Summary'].map((name, idx) => (
                        <div key={idx} className="project-item">
                          <div className="checkbox"></div>
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bento-content">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Jurisdictions & Shepardizing ──── */}
      <section className="jurisdictions-section section" id="jurisdictions">
        <div className="jurisdictions-container">
          <div className="jurisdictions-left fade-in">
            <h2>Every citation. Verified across 178 jurisdictions.</h2>
            <p className="jurisdictions-subtitle">
              OpenSpecter cross-references 31 million+ legal documents to ensure every case you cite is still good law. Instant Shepardizing, built into every workflow.
            </p>
            
            <div className="jurisdictions-stats">
              <div className="stat-item">
                <span className="stat-number">178</span>
                <span className="stat-label">Jurisdictions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">31M+</span>
                <span className="stat-label">Documents</span>
              </div>
            </div>

            <ShepardizingMockup />
          </div>
          <div className="jurisdictions-right">
            <div className="jurisdiction-group">
              <h4>Global Powerhouses</h4>
              <div className="jurisdiction-chips">
                <span className="j-chip" style={{ "--density": "100%" } as any}>🇺🇸 US <em>15.6M</em></span>
                <span className="j-chip" style={{ "--density": "45%" } as any}>🇫🇷 France <em>2.7M</em></span>
                <span className="j-chip" style={{ "--density": "30%" } as any}>🇦🇹 Austria <em>1.4M</em></span>
                <span className="j-chip" style={{ "--density": "25%" } as any}>🇨🇭 Switzerland <em>947k</em></span>
                <span className="j-chip" style={{ "--density": "20%" } as any}>🇧🇷 Brazil <em>881k</em></span>
              </div>
            </div>
            <div className="jurisdiction-group">
              <h4>Common Law Systems</h4>
              <div className="jurisdiction-chips">
                {[
                  { n: "🇺🇸 US", d: "100%" },
                  { n: "🇬🇧 UK", d: "35%" },
                  { n: "🇮🇳 India", d: "25%" },
                  { n: "🇦🇺 Australia", d: "20%" },
                  { n: "🇨🇦 Canada", d: "18%" },
                  { n: "🇸🇬 Singapore", d: "12%" },
                  { n: "🇳🇿 NZ", d: "8%" },
                  { n: "🇭🇰 HK", d: "10%" }
                ].map((c, i) => (
                  <span key={i} className="j-chip small" style={{ "--density": c.d } as any}>{c.n}</span>
                ))}
              </div>
            </div>
            <div className="jurisdiction-group">
              <h4>Civil Law Systems</h4>
              <div className="jurisdiction-chips">
                {[
                  { n: "🇫🇷 France", d: "45%" },
                  { n: "🇩🇪 Germany", d: "40%" },
                  { n: "🇮🇹 Italy", d: "25%" },
                  { n: "🇪🇸 Spain", d: "22%" },
                  { n: "🇧🇪 Belgium", d: "15%" },
                  { n: "🇳🇱 Netherlands", d: "18%" },
                  { n: "🇵🇱 Poland", d: "12%" },
                  { n: "🇧🇷 Brazil", d: "20%" }
                ].map((c, i) => (
                  <span key={i} className="j-chip small" style={{ "--density": c.d } as any}>{c.n}</span>
                ))}
              </div>
            </div>
            <div className="jurisdiction-group">
              <h4>Supranational & International</h4>
              <div className="jurisdiction-chips">
                <span className="j-chip" style={{ "--density": "15%" } as any}>🌐 INTL <em>494k</em></span>
                <span className="j-chip" style={{ "--density": "10%" } as any}>🇺🇳 UN <em>285k</em></span>
                <span className="j-chip" style={{ "--density": "8%" } as any}>🏛️ CoE <em>118k</em></span>
                <span className="j-chip" style={{ "--density": "8%" } as any}>🇪🇺 EU <em>115k</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ──── Footer CTA ──── */}
      <section className="footer-cta">
        <div className="footer-cta-bg"></div>
        <div className="footer-cta-overlay"></div>
        <div className="footer-cta-content">
          <h2>Legal AI shouldn&apos;t be a luxury.</h2>
          <p>
            Source available. Self-hosted. Free forever. Start building with
            OpenSpecter today.
          </p>

        </div>
      </section>

      {/* ──── Footer ──── */}
      <footer className="footer">
        <div className="footer-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="footer-brand">
            <div className="navbar-logo" style={{ color: "white" }}>
              <BrandLogo style={{ width: 32, height: 32 }} />
              OpenSpecter
            </div>
            <p style={{ marginTop: 12 }}>Self-hosted legal AI for everyone.</p>
          </div>
          <div className="footer-links" style={{ display: "flex", gap: 24 }}>
            <a
              href="https://github.com/QuanteraAI/OpenSpecter"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", transition: "color 0.2s" }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* ──── Toast Notification ──── */}
      <div className={`toast-notification ${toastMessage ? "visible" : ""}`}>
        {toastMessage}
      </div>
    </div>
  );
}
