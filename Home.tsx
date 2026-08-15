/**
 * Design reminder — Developer's Field Notes:
 * An editorial technical portfolio: warm ivory, charcoal ink, and Coral Signal accents.
 * Favor asymmetric reading paths, section indexing, and precise practical interactions.
 */
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveRight,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const INTRO_SESSION_KEY = "ahmed-bakry-intro-seen";

function shouldShowIntro() {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== "true";
  } catch {
    return false;
  }
}

const projects = [
  {
    number: "01",
    title: "Ledgerly",
    label: "Finance dashboard",
    description:
      "لوحة تحكم مالية تجعل الأرقام المعقدة قابلة للقراءة، عبر نظام بصري واضح وتدفقات استخدام مختصرة.",
    stack: ["React", "TypeScript", "Tailwind"],
    image: "/manus-storage/ahmed-bakry-project-fintech_07b1b5ff.png",
    featured: true,
  },
  {
    number: "02",
    title: "NOVA / STORE",
    label: "E-commerce experience",
    description:
      "تجربة متجر إلكتروني تحريرية تضع المنتج في المقدمة وتحافظ على المسار من الاكتشاف حتى الطلب بسيطًا.",
    stack: ["Next.js", "Framer Motion", "REST API"],
    image: "/manus-storage/ahmed-bakry-project-commerce_3aad999c.png",
    featured: false,
  },
  {
    number: "03",
    title: "STUDIO / SLOTS",
    label: "Booking experience",
    description:
      "تجربة حجز مرنة تختصر اختيار الخدمة والموعد في مسار واحد واضح، وتترك للمستخدم إحساسًا بالسيطرة من أول نقرة.",
    stack: ["React", "Calendar UI", "UX Writing"],
    image: "/manus-storage/ahmed-bakry-project-booking_658c4c18.png",
    featured: false,
  },
];

const toolGroups = [
  {
    id: "UI",
    title: "Interfaces",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "DX",
    title: "Workflow",
    tools: ["Git / GitHub", "Vite", "Figma", "RESTful APIs"],
  },
  {
    id: "QL",
    title: "Quality",
    tools: ["Responsive UI", "Accessibility", "Performance", "Testing"],
  },
];

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-label" aria-label={`${index} ${label}`}>
      <span>{index}</span>
      <i />
      <small>{label}</small>
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isIntroVisible, setIsIntroVisible] = useState(shouldShowIntro);
  const [isIntroLeaving, setIsIntroLeaving] = useState(false);
  const themeTransitionTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isIntroVisible) return;

    document.body.classList.add("intro-active");
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    } catch {
      // The experience remains optional if browser storage is unavailable.
    }

    const exitTimer = window.setTimeout(() => setIsIntroLeaving(true), 900);
    const dismissTimer = window.setTimeout(() => {
      setIsIntroVisible(false);
      document.body.classList.remove("intro-active");
    }, 1320);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(dismissTimer);
      document.body.classList.remove("intro-active");
    };
  }, [isIntroVisible]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.16 },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => () => {
    if (themeTransitionTimer.current) window.clearTimeout(themeTransitionTimer.current);
  }, []);

  const handleThemeToggle = () => {
    if (!toggleTheme) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
      if (themeTransitionTimer.current) window.clearTimeout(themeTransitionTimer.current);
      root.classList.add("theme-transition");
      themeTransitionTimer.current = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 520);
    }

    toggleTheme();
  };

  return (
    <div className="portfolio-shell">
      {isIntroVisible && (
        <div className={`intro-loader ${isIntroLeaving ? "is-leaving" : ""}`} aria-hidden="true">
          <div className="intro-stage">
            <span className="intro-coordinate coordinate-a">AB / 01</span>
            <div className="intro-mark-shell">
              <img src="/manus-storage/ahmed-bakry-mark_af20e7de.png" alt="" className="intro-mark" />
            </div>
            <div className="intro-wordmark">
              <b>AHMED</b><em>/</em><b>BAKRY</b>
            </div>
            <div className="intro-rule"><span /></div>
            <span className="intro-coordinate coordinate-b">INTERFACE / NOTES</span>
          </div>
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ahmed Bakry, top of page">
          <img
            src="/manus-storage/ahmed-bakry-mark_af20e7de.png"
            alt="Ahmed Bakry monogram"
            className="brand-mark"
          />
          <span className="brand-wordmark">
            <b>AHMED</b>
            <em>/</em>
            <b>BAKRY</b>
          </span>
        </a>

        <div className="header-status">
          <span className="status-dot" aria-hidden="true" />
          <span>متاح للفرص</span>
        </div>

        <div className="header-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={handleThemeToggle}
            aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}
            title={theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "light" ? <Moon size={15} /> : <Sun size={16} />}
            </span>
            <span>{theme === "light" ? "DARK" : "LIGHT"}</span>
          </button>
          <a className="mobile-menu" href="#work" aria-label="الانتقال إلى المشاريع">
            <Menu size={20} />
          </a>
        </div>
      </header>

      <aside className="field-index" aria-label="فهرس الأقسام">
        <span className="index-title">INDEX / 04</span>
        <nav>
          <a href="#about"><b>01</b><span>ABOUT</span></a>
          <a href="#work"><b>02</b><span>WORK</span></a>
          <a href="#toolkit"><b>03</b><span>TOOLS</span></a>
          <a href="#contact"><b>04</b><span>CONTACT</span></a>
        </nav>
        <span className="index-stamp">AB / FIELD NOTES</span>
      </aside>

      <main id="top">
        <section className="hero-section">
          <div className="hero-rail" aria-hidden="true">
            <span>AB—2026</span>
            <span className="rail-line" />
            <span>FRONT-END</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              Front-End Developer / Cairo, EG
            </p>
            <h1>
              أصمم واجهاتٍ <em>واضحة.</em>
              <br />
              وأبني تجارب <span>تعمل.</span>
            </h1>
            <p className="hero-intro">
              أنا <strong>Ahmed Bakry</strong>، مطور واجهات أمامية أحوّل الأفكار إلى
              منتجات سريعة، متجاوبة، وممتعة في الاستخدام.
            </p>
            <div className="hero-actions">
              <a href="#work" className="action-button action-primary">
                استكشف الأعمال <ArrowDown size={18} />
              </a>
              <a href="#contact" className="text-link">
                لنتحدث <MoveRight size={18} />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="لقطة تجريدية لمساحة عمل مطور واجهات">
            <div className="hero-image-frame">
              <img
                src="/manus-storage/ahmed-bakry-hero-workspace_dfd61218.png"
                alt="Creative front-end developer workspace with interface panels"
              />
            </div>
            <div className="visual-tag tag-top">BUILD / 01</div>
            <div className="visual-tag tag-bottom">IDEA → INTERFACE</div>
            <div className="hero-orbit orbit-a" aria-hidden="true" />
            <div className="hero-orbit orbit-b" aria-hidden="true" />
          </div>

          <div className="hero-footnote">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={17} />
          </div>
        </section>

        <section className="statement-section" id="about">
          <SectionLabel index="01" label="ABOUT" />
          <div className="statement-layout">
            <p className="statement-kicker">من الفكرة إلى أول تفاعل</p>
            <div>
              <span className="technical-note">NOTE_ A / USER-FIRST INTERFACE SYSTEM</span>
              <h2>
                الواجهة الجيدة لا تلفت الانتباه لنفسها؛ <em>تجعل ما يريد المستخدم
                فعله يبدو طبيعيًا.</em>
              </h2>
              <p className="statement-body">
                أعمل عند تقاطع التصميم والهندسة. أهتم بتفاصيل التسلسل البصري، سرعة
                الأداء، وإتاحة الوصول—لأن هذه التفاصيل هي التي تحول الصفحة إلى
                تجربة يمكن الوثوق بها.
              </p>
            </div>
          </div>
          <div className="fact-strip" aria-label="نبذة سريعة">
            <div><strong>02+</strong><span>سنوات تعلّم وبناء</span></div>
            <div><strong>06</strong><span>تقنيات أساسية</span></div>
            <div><strong>∞</strong><span>فضول نحو التفاصيل</span></div>
          </div>
        </section>

        <section className="work-section" id="work">
          <SectionLabel index="02" label="WORKING EXAMPLES" />
          <div className="work-heading" data-reveal="heading" style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
            <div>
              <span className="technical-note">METHOD_ EXAMPLES / INTERFACE LOG</span>
              <h2>أمثلة على <span>طريقة العمل.</span></h2>
            </div>
            <p>نماذج توضح كيف أرتّب التحدي، وأحوّل الفكرة إلى واجهة واضحة وقابلة للاستخدام.</p>
          </div>

          <div className="projects-list">
            {projects.map((project, index) => (
              <article
                className={`project-card ${project.featured ? "is-featured" : ""}`}
                data-reveal="project"
                style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                key={project.number}
              >
                <div className="project-meta">
                  <span className="project-index">{project.number}</span>
                  <span>{project.label}</span>
                </div>
                <div className="project-image-wrap">
                  <img src={project.image} alt={`واجهة مشروع ${project.title}`} />
                  <a href="#contact" className="project-open" aria-label={`استفسر عن مشروع ${project.title}`}>
                    <ArrowUpRight size={22} />
                  </a>
                </div>
                <div className="project-copy">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <ul className="stack-list" aria-label="التقنيات المستخدمة">
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="toolkit-section" id="toolkit">
          <SectionLabel index="03" label="TOOLKIT" />
          <div className="toolkit-intro" data-reveal="heading" style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
            <div>
              <span className="technical-note">MAP_ B / BUILDING A RELIABLE INTERFACE</span>
              <h2>أدوات مناسبة <br />لواجهات متينة.</h2>
            </div>
            <p>أختار التقنية التي تخدم الهدف، ثم أركز على تجربة نهائية سريعة وقابلة للصيانة.</p>
          </div>
          <div className="toolkit-map" data-reveal="map" style={{ "--reveal-delay": "110ms" } as React.CSSProperties}>
            <div className="map-origin" aria-hidden="true"><i /> ORIGIN / IDEA</div>
            <div className="map-route route-one" aria-hidden="true" />
            <div className="map-route route-two" aria-hidden="true" />
            <span className="map-coordinate coordinate-one" aria-hidden="true">x:01 / y:07</span>
            <span className="map-coordinate coordinate-two" aria-hidden="true">x:11 / y:02</span>
            {toolGroups.map((group, index) => (
              <div
                className="tool-group"
                data-reveal="tool"
                style={{ "--reveal-delay": `${250 + index * 105}ms` } as React.CSSProperties}
                key={group.id}
              >
                <span className="tool-id">{group.id}</span>
                <h3>{group.title}</h3>
                <div className="tool-tags">
                  {group.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="skills-signal" data-reveal="signal" style={{ "--reveal-delay": "520ms" } as React.CSSProperties}>
            <div className="signal-icon"><Braces size={28} /></div>
            <p>كود منظم، تصميم متجاوب، وتجربة مصقولة من أول بكسل حتى آخر تفاعل.</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-gridline" aria-hidden="true" />
          <SectionLabel index="04" label="LET'S BUILD" />
          <div className="contact-layout">
            <div>
              <p className="contact-pretitle">عندك فكرة تستحق واجهة أقوى؟</p>
              <span className="technical-note">NEXT_ WRITE THE FIRST LINE</span>
              <h2>خلّينا نبنيها<br /><em>بشكل صحيح.</em></h2>
            </div>
            <a className="contact-email" href="mailto:abakry644@gmail.com">
              <span>اكتب لي</span>
              <b>abakry644@gmail.com</b>
              <ArrowUpRight size={26} />
            </a>
          </div>
          <div className="contact-footer">
            <p>متاح لمشاريع Freelance، فرص عمل، وتعاونات مفيدة.</p>
            <div className="social-links">
              <a className="whatsapp-link" href="https://wa.me/201099014725" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp <span>+20 10 9901 4725</span></a>
              <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              <a href="mailto:abakry644@gmail.com"><Mail size={17} /> Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Ahmed Bakry. Built with focus.</p>
        <div><Code2 size={15} /> <span>FRONT-END DEVELOPER</span></div>
      </footer>
    </div>
  );
}
