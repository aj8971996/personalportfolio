import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-7OJRPJ4B.js";
import {
  CommonModule,
  ElementRef,
  NgZone,
  provideZoneChangeDetection,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DAYZMGJ6.js";
import "./chunk-YP43Q66R.js";

// src/app/features/home/home.component.ts
var _c0 = () => ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Supabase", "Drizzle ORM", "Anthropic API", "Stripe", "PostHog", "Vercel"];
var _c1 = () => ["Angular 19", "FastAPI", "SQL Server", "Python", "Azure AD / MSAL", "Docker", "nginx", "Playwright", "Prometheus", "Grafana", "GitHub Actions"];
var _c2 = () => ["Angular", "FastAPI", "SQL Server", "Python", "Highcharts", "Docker", "Tableau", "ETL Pipelines"];
var _forTrack0 = ($index, $item) => $item.group;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.company;
function HomeComponent_For_68_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1);
  }
}
function HomeComponent_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 93);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 94);
    \u0275\u0275repeaterCreate(4, HomeComponent_For_68_For_5_Template, 2, 1, "span", 72, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r2.group);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r2.items);
  }
}
function HomeComponent_For_106_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function HomeComponent_For_106_Template_button_click_0_listener() {
      const \u0275$index_192_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeShot = \u0275$index_192_r4);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const shot_r6 = ctx.$implicit;
    const \u0275$index_192_r4 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("shot-tab-active", ctx_r4.activeShot === \u0275$index_192_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", shot_r6.label, " ");
  }
}
function HomeComponent_For_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 96);
  }
  if (rf & 2) {
    const shot_r7 = ctx.$implicit;
    const \u0275$index_213_r8 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("shot-img-active", ctx_r4.activeShot === \u0275$index_213_r8);
    \u0275\u0275property("src", shot_r7.src, \u0275\u0275sanitizeUrl)("alt", shot_r7.alt);
  }
}
function HomeComponent_For_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r9);
  }
}
function HomeComponent_For_175_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r10);
  }
}
function HomeComponent_For_205_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r11);
  }
}
function HomeComponent_For_215_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 99);
  }
}
function HomeComponent_For_215_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("timeline-tag-current", role_r12.current);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r12.tag);
  }
}
function HomeComponent_For_215_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r13);
  }
}
function HomeComponent_For_215_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 107);
    \u0275\u0275repeaterCreate(1, HomeComponent_For_215_Conditional_15_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(role_r12.bullets);
  }
}
function HomeComponent_For_215_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "div", 97);
    \u0275\u0275element(2, "div", 98);
    \u0275\u0275template(3, HomeComponent_For_215_Conditional_3_Template, 1, 0, "div", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 100)(5, "div", 101)(6, "div")(7, "div", 102);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 103);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 104)(12, "span", 105);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, HomeComponent_For_215_Conditional_14_Template, 2, 3, "span", 106);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, HomeComponent_For_215_Conditional_15_Template, 3, 0, "ul", 107);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r12 = ctx.$implicit;
    const \u0275$index_377_r14 = ctx.$index;
    const \u0275$count_377_r15 = ctx.$count;
    \u0275\u0275advance(2);
    \u0275\u0275classProp("timeline-node-current", role_r12.current);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_377_r14 === \u0275$count_377_r15 - 1) ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(role_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r12.company);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r12.period);
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r12.tag ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r12.bullets.length > 0 ? 15 : -1);
  }
}
var HomeComponent = class _HomeComponent {
  el;
  ngZone;
  terminalText = "";
  fullTerminalText = "> building at the intersection of systems and stakeholders";
  activeShot = 0;
  expandedCase = 0;
  shots = [
    { label: "Dashboard", url: "scopeornope.app/dashboard", src: "assets/images/dashboard.png", alt: "ScopeOrNope dashboard showing scope risk across active projects" },
    { label: "Request", url: "scopeornope.app/check", src: "assets/images/request_input.png", alt: "Client change request input and classification form" },
    { label: "Results", url: "scopeornope.app/check#result", src: "assets/images/request_output.png", alt: "Scope classification result with generated tone-matched response" }
  ];
  typeInterval;
  observer;
  capabilities = [
    { group: "Frontend", items: ["Angular 19", "TypeScript", "RxJS", "Tailwind CSS"] },
    { group: "Backend & APIs", items: ["FastAPI", "Python", "REST API Design", "JWT Auth"] },
    { group: "Data & ETL", items: ["SQL Server", "PostgreSQL", "ETL Pipelines", "Tableau"] },
    { group: "Auth & Security", items: ["Azure AD / Entra ID", "MSAL", "RBAC", "SAST", "GitHub Actions"] },
    { group: "Infrastructure", items: ["Docker", "docker-compose", "nginx", "Linux", "VM Deployment"] },
    { group: "Observability & QA", items: ["Prometheus", "Grafana", "Playwright E2E", "CI/CD"] },
    { group: "Process", items: ["Lean Six Sigma Black Belt", "Technical Documentation", "Stakeholder Communication"] }
  ];
  experience = [
    {
      title: "Forward Deployed Engineer",
      company: "Sphere Entertainment Co.",
      period: "Oct 2025 \u2013 Present",
      tag: "Contract \u2192 FTE \xB7 Current",
      current: true,
      bullets: [
        "Built a 4-repo production platform: Angular 19 SPA, FastAPI/SQL Server backend, Python ETL suite, Playwright QA repo",
        "Enterprise auth: Azure AD / Entra ID with MSAL + backend JWT revalidation on every request",
        "Deployed Prometheus + Grafana observability (3 dashboards); configured nginx, DNS, and HTTPS on production VM",
        "Secured executive buy-in to expand QC tooling across additional venue departments"
      ]
    },
    {
      title: "Data Visualization Analyst II",
      company: "Clark County School District",
      period: "Nov 2023 \u2013 Sep 2025",
      tag: "",
      current: false,
      bullets: [
        "Sole engineer on a ground-up internal web platform at one of the largest school districts in the US",
        "Designed schema, built FastAPI backend, developed Angular frontend, managed Docker deployment to VM",
        "Reduced data request fulfillment from months to days via custom ETL pipelines",
        "Built geographic staff tenure visualizations across Clark County using SQL Server + Highcharts"
      ]
    },
    {
      title: "Customer Experience & Shopper Care Team Lead",
      company: "Instacart",
      period: "Feb 2021 \u2013 Jun 2023",
      tag: "",
      current: false,
      bullets: [
        "Built cross-functional dashboards in MySQL, Snowflake, Mode, and Python for CX analytics",
        "Identified and resolved a process driving 22% of DSAT KPI scores"
      ]
    },
    {
      title: "Customer & Shopper Support Specialist",
      company: "Instacart",
      period: "Jul 2020 \u2013 Feb 2021",
      tag: "Contract",
      current: false,
      bullets: []
    }
  ];
  // ── Background art fields ──────────────────────────────────
  bgCanvas;
  bgCtx;
  bgRafId;
  bgT = 0;
  bgParticles = [];
  BG_COUNT = 160;
  BG_SPEED = 1.5;
  bgResizeRef = () => this.bgResize();
  bgVisibilityRef = () => {
    if (document.hidden)
      cancelAnimationFrame(this.bgRafId);
    else
      this.bgTick();
  };
  constructor(el, ngZone) {
    this.el = el;
    this.ngZone = ngZone;
  }
  ngOnInit() {
    setTimeout(() => this.startTypewriter(), 900);
  }
  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        this.observer.unobserve(e.target);
      }
    }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    this.el.nativeElement.querySelectorAll(".reveal").forEach((el) => this.observer.observe(el));
    this.setupBackground();
  }
  ngOnDestroy() {
    clearInterval(this.typeInterval);
    this.observer?.disconnect();
    cancelAnimationFrame(this.bgRafId);
    window.removeEventListener("resize", this.bgResizeRef);
    document.removeEventListener("visibilitychange", this.bgVisibilityRef);
    this.bgCanvas?.remove();
  }
  toggleCase(index) {
    this.expandedCase = this.expandedCase === index ? -1 : index;
  }
  scrollToWork() {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }
  // ── Background art methods ─────────────────────────────────
  setupBackground() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;";
    document.body.prepend(canvas);
    this.bgCanvas = canvas;
    this.bgCtx = canvas.getContext("2d");
    this.bgResize();
    window.addEventListener("resize", this.bgResizeRef);
    document.addEventListener("visibilitychange", this.bgVisibilityRef);
    this.ngZone.runOutsideAngular(() => this.bgTick());
  }
  bgResize() {
    const c = this.bgCanvas;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    this.bgCtx.fillStyle = "#09090B";
    this.bgCtx.fillRect(0, 0, c.width, c.height);
    const w = c.width, h = c.height;
    this.bgParticles = Array.from({ length: this.BG_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      age: Math.floor(Math.random() * 60),
      maxAge: 60 + Math.random() * 100
    }));
  }
  bgField(x, y, t) {
    const s = 32e-4;
    const phi = 1.6180339887;
    return (Math.sin(x * s + t * 0.28) * Math.cos(y * s * 0.78 - t * 0.2) + Math.sin(x * s * phi - y * s * 0.88 + t * 0.16) * 0.55 + Math.cos(x * s * 0.52 + y * s * phi - t * 0.11) * 0.32) * Math.PI * 2;
  }
  bgThreshold(x, t) {
    const h = this.bgCanvas.height;
    const phi = 1.6180339887;
    const cx = x / this.bgCanvas.width;
    const amp = 0.09 * h;
    return h * 0.5 + amp * Math.sin(cx * 2.5 * Math.PI + t * 0.35) + amp * 0.5 * Math.sin(cx * 2.5 * phi * Math.PI - t * 0.35 * phi) + amp * 0.25 * Math.sin(cx * 2.5 * phi * phi * Math.PI + t * 0.24);
  }
  bgTick() {
    this.bgRafId = requestAnimationFrame(() => this.bgTick());
    const ctx = this.bgCtx;
    const c = this.bgCanvas;
    const w = c.width, h = c.height;
    const t = this.bgT;
    ctx.fillStyle = "rgba(9,9,11,0.055)";
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.025)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 5) {
      const y = this.bgThreshold(x, t);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    for (const p of this.bgParticles) {
      const angle = this.bgField(p.x, p.y, t);
      p.x += Math.cos(angle) * this.BG_SPEED;
      p.y += Math.sin(angle) * this.BG_SPEED;
      p.age++;
      if (p.x < 0)
        p.x = w;
      if (p.x > w)
        p.x = 0;
      if (p.y < 0)
        p.y = h;
      if (p.y > h)
        p.y = 0;
      if (p.age > p.maxAge) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.age = 0;
        p.maxAge = 60 + Math.random() * 100;
      }
      const fadeIn = Math.min(1, p.age / 20);
      const fadeOut = Math.max(0, 1 - p.age / p.maxAge);
      const alpha = fadeIn * fadeOut * 0.55;
      const thresh = this.bgThreshold(p.x, t);
      const dist = Math.abs(p.y - thresh);
      const band = 22;
      let r, g, b;
      if (dist < band) {
        const mix = dist / band;
        if (p.y < thresh) {
          r = Math.round(140 + (245 - 140) * mix);
          g = Math.round(140 + (158 - 140) * mix);
          b = Math.round(145 + (11 - 145) * mix);
        } else {
          r = Math.round(140 + (99 - 140) * mix);
          g = Math.round(140 + (102 - 140) * mix);
          b = Math.round(145 + (241 - 145) * mix);
        }
      } else if (p.y < thresh) {
        r = 245;
        g = 158;
        b = 11;
      } else {
        r = 99;
        g = 102;
        b = 241;
      }
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.6, 1.6);
    }
    this.bgT += 4e-3;
  }
  startTypewriter() {
    let i = 0;
    this.typeInterval = setInterval(() => {
      if (i < this.fullTerminalText.length) {
        this.terminalText += this.fullTerminalText[i++];
      } else {
        clearInterval(this.typeInterval);
      }
    }, 46);
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 241, vars: 20, consts: [[1, "hero"], [1, "hero-inner"], [1, "hero-badge", "animate-fade-in", 2, "animation-delay", "0.05s"], [1, "hero-badge-dot"], [1, "hero-name", "animate-fade-up", 2, "animation-delay", "0.15s"], [1, "gradient-text"], [1, "hero-statement", "animate-fade-up", 2, "animation-delay", "0.28s"], [1, "terminal-line", "animate-fade-up", 2, "animation-delay", "0.42s"], [1, "terminal-text"], [1, "terminal-cursor", "animate-blink"], [1, "hero-ctas", "animate-fade-up", 2, "animation-delay", "0.56s"], [1, "btn-primary", 3, "click"], ["routerLink", "/resume", 1, "btn-secondary"], [1, "section"], [1, "section-inner"], [1, "section-header", "reveal"], [1, "section-label"], [1, "section-heading"], [1, "section-sub"], [1, "pillars-grid"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-1"], [1, "pillar-icon"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["points", "16 18 22 12 16 6"], ["points", "8 6 2 12 8 18"], [1, "pillar-title"], [1, "pillar-body"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-2"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-3"], ["points", "22 7 13.5 15.5 8.5 10.5 2 17"], ["points", "16 7 22 7 22 13"], [1, "section", 2, "padding-top", "0"], [1, "capabilities-grid"], [1, "cap-group", "reveal"], ["id", "work", 1, "section"], [1, "case-study", "glass-card-amber", "reveal"], [1, "case-header-row"], [1, "case-trigger", 3, "click"], [1, "case-trigger-left"], [1, "case-company"], [1, "case-title"], [1, "case-meta"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "case-chevron"], ["points", "6 9 12 15 18 9"], [1, "case-header-actions"], [1, "case-outcome-badge"], ["href", "https://www.scopeornope.com", "target", "_blank", "rel", "noopener noreferrer", 1, "btn-live"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.25", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["d", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"], ["points", "15 3 21 3 21 9"], ["x1", "10", "y1", "14", "x2", "21", "y2", "3"], [1, "case-body"], [1, "case-body-inner"], [1, "case-context"], [1, "screenshot-showcase"], [1, "shot-tabs"], [1, "shot-tab", 3, "shot-tab-active"], [1, "shot-browser"], [1, "shot-chrome"], [1, "shot-dots"], [1, "dot-close"], [1, "dot-min"], [1, "dot-max"], [1, "shot-url"], [1, "shot-frame"], [1, "shot-img", 3, "src", "alt", "shot-img-active"], [1, "case-bullets"], [1, "case-stack"], [1, "tech-badge"], [1, "case-trigger-right"], [1, "case-repos"], [1, "section-label", 2, "margin-bottom", "0.5rem"], [1, "repo-tags"], [1, "repo-tag"], [1, "timeline"], [1, "timeline-item", "reveal"], [1, "timeline-cta", "reveal"], ["id", "contact", 1, "section", "contact-section"], [1, "contact-card", "glass-card", "reveal"], [1, "contact-heading"], [1, "contact-sub"], [1, "contact-links"], ["href", "mailto:alexander.barkus96@gmail.com", 1, "contact-link"], ["width", "17", "height", "17", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"], ["href", "https://www.linkedin.com/in/alexander-barkus/", "target", "_blank", "rel", "noopener noreferrer", 1, "contact-link"], ["d", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"], ["href", "https://github.com/aj8971996/", "target", "_blank", "rel", "noopener noreferrer", 1, "contact-link"], ["fill-rule", "evenodd", "d", "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", "clip-rule", "evenodd"], [1, "cap-group-label"], [1, "cap-badges"], [1, "shot-tab", 3, "click"], [1, "shot-img", 3, "src", "alt"], [1, "timeline-track"], [1, "timeline-node"], [1, "timeline-line"], [1, "timeline-content"], [1, "timeline-header"], [1, "timeline-title"], [1, "timeline-company"], [1, "timeline-right"], [1, "timeline-period"], [1, "timeline-tag", 3, "timeline-tag-current"], [1, "timeline-bullets"], [1, "timeline-tag"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275text(4, " Forward Deployed Engineer ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 4)(6, "span", 5);
      \u0275\u0275text(7, "Alex Barkus");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, " I sit at the intersection of engineering and the customer. Close enough to understand the real problem, technical enough to build the right solution. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "span", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 9);
      \u0275\u0275text(14, "|");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 10)(16, "button", 11);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_16_listener() {
        return ctx.scrollToWork();
      });
      \u0275\u0275text(17, "See My Work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "a", 12);
      \u0275\u0275text(19, "View Resume \u2192");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "section", 13)(21, "div", 14)(22, "div", 15)(23, "span", 16);
      \u0275\u0275text(24, "The Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "h2", 17);
      \u0275\u0275text(26, "What Forward Deployed Means");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 18);
      \u0275\u0275text(28, " FDEs optimize for outcomes. That takes fluency in the code and the org that runs it. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 19)(30, "div", 20)(31, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(32, "svg", 22);
      \u0275\u0275element(33, "polyline", 23)(34, "polyline", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(35, "h3", 25);
      \u0275\u0275text(36, "Technical Depth");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p", 26);
      \u0275\u0275text(38, " Production-grade systems built in-house: full-stack apps, ETL pipelines, enterprise auth infrastructure, real observability. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 27)(40, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(41, "svg", 22);
      \u0275\u0275element(42, "path", 28)(43, "circle", 29)(44, "path", 30)(45, "path", 31);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(46, "h3", 25);
      \u0275\u0275text(47, "Customer Proximity");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 26);
      \u0275\u0275text(49, " Embedded alongside stakeholders. Their workflow, their constraints, their org chart, their unwritten rules, all mapped before writing a line of code. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 32)(51, "div", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(52, "svg", 22);
      \u0275\u0275element(53, "polyline", 33)(54, "polyline", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(55, "h3", 25);
      \u0275\u0275text(56, "Tangible Outcomes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "p", 26);
      \u0275\u0275text(58, " Measured by what changed in the business: months \u2192 days, manual \u2192 automated, fragile \u2192 observable. The measure is what's still running six months later. ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(59, "section", 35)(60, "div", 14)(61, "div", 15)(62, "span", 16);
      \u0275\u0275text(63, "Technical Arsenal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "h2", 17);
      \u0275\u0275text(65, "Core Capabilities");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div", 36);
      \u0275\u0275repeaterCreate(67, HomeComponent_For_68_Template, 6, 1, "div", 37, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(69, "section", 38)(70, "div", 14)(71, "div", 15)(72, "span", 16);
      \u0275\u0275text(73, "Featured Work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "h2", 17);
      \u0275\u0275text(75, "Case Studies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "p", 18);
      \u0275\u0275text(77, " Three builds, all designed, architected, and shipped solo: ScopeOrNope, an indie SaaS taken from zero to production; a multi-department operations platform at Sphere Entertainment; and data infrastructure for one of the five largest school districts in the US. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div", 39)(79, "div", 40)(80, "button", 41);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_80_listener() {
        return ctx.toggleCase(0);
      });
      \u0275\u0275elementStart(81, "div", 42)(82, "div", 43);
      \u0275\u0275text(83, "Personal Project \xB7 Indie SaaS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "h3", 44);
      \u0275\u0275text(85, "ScopeOrNope");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "div", 45);
      \u0275\u0275text(87, "Founder & Sole Engineer \xB7 2026 \xB7 Full-Stack TypeScript");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(88, "svg", 46);
      \u0275\u0275element(89, "polyline", 47);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(90, "div", 48)(91, "div", 49);
      \u0275\u0275text(92, "Zero \u2192 production");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "a", 50);
      \u0275\u0275text(94, " Visit ScopeOrNope ");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(95, "svg", 51);
      \u0275\u0275element(96, "path", 52)(97, "polyline", 53)(98, "line", 54);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(99, "div", 55)(100, "div", 56)(101, "p", 57);
      \u0275\u0275text(102, " A SaaS tool for freelance creatives that classifies client change requests as in-scope, out-of-scope, or unclear, then generates a professional, tone-matched response in seconds. One focused tool for scope creep. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "div", 58)(104, "div", 59);
      \u0275\u0275repeaterCreate(105, HomeComponent_For_106_Template, 2, 3, "button", 60, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "div", 61)(108, "div", 62)(109, "div", 63);
      \u0275\u0275element(110, "span", 64)(111, "span", 65)(112, "span", 66);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "div", 67);
      \u0275\u0275text(114);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(115, "div", 68);
      \u0275\u0275repeaterCreate(116, HomeComponent_For_117_Template, 1, 4, "img", 69, _forTrack1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(118, "ul", 70)(119, "li");
      \u0275\u0275text(120, "Hybrid classification engine: a rule-based classifier (token matching + substitution-phrase detection, fully offline) escalates to claude-haiku-4-5 with prompt caching only on ambiguous requests or Pro-tier users; graceful degradation to offline if the API is unavailable");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "li");
      \u0275\u0275text(122, "AI response refinement detects secondary risk signals (revision_risky, timeline_impacting, fee_impacting) surfaced as inline warnings alongside the tone-matched draft; a separate scope gap detector flags vague boundaries in the project scope document");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(123, "li");
      \u0275\u0275text(124, "Full SaaS billing pattern: Stripe webhook handler is the sole writer of subscription_tier (enforced at the RLS level); feature gates are verified in server actions against the Supabase user object. Client input is never trusted.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "li");
      \u0275\u0275text(126, "Security-first database design: Row-Level Security on every table, FOR UPDATE locking for concurrent revision-log writes, unique constraint on (project_id, revision_number) backed by a transaction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "li");
      \u0275\u0275text(128, "Privacy-first analytics: PostHog with an explicit property allowlist that blocks any key matching /scope/, /client/, or /content/ patterns and auto-redacts long strings before they reach third-party telemetry");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(129, "div", 71);
      \u0275\u0275repeaterCreate(130, HomeComponent_For_131_Template, 2, 1, "span", 72, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(132, "div", 39)(133, "button", 41);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_133_listener() {
        return ctx.toggleCase(1);
      });
      \u0275\u0275elementStart(134, "div", 42)(135, "div", 43);
      \u0275\u0275text(136, "Sphere Entertainment Co. \u2014 Las Vegas, NV");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "h3", 44);
      \u0275\u0275text(138, "Internal Operations Platform");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(139, "div", 45);
      \u0275\u0275text(140, "Forward Deployed Engineer \xB7 Oct 2025 \u2013 Present \xB7 Contract \u2192 FTE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(141, "div", 73)(142, "div", 49);
      \u0275\u0275text(143, "Buy-in secured");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(144, "svg", 46);
      \u0275\u0275element(145, "polyline", 47);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(146, "div", 55)(147, "div", 56)(148, "p", 57);
      \u0275\u0275text(149, " Sole embedded engineer at a venue where the operations stack had outgrown the tools managing it. Scope expanded from a legacy data audit to a full multi-department internal platform. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "div", 74)(151, "span", 75);
      \u0275\u0275text(152, "Architecture \u2014 4 repositories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(153, "div", 76)(154, "span", 77);
      \u0275\u0275text(155, "swiki");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(156, "span", 77);
      \u0275\u0275text(157, "swiki-api");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(158, "span", 77);
      \u0275\u0275text(159, "etls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(160, "span", 77);
      \u0275\u0275text(161, "testing-suite");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(162, "ul", 70)(163, "li");
      \u0275\u0275text(164, "Angular 19 SPA with five role-gated stakeholder portals (Exec, Security, HSE, Guest Services, Dev) using Microsoft Entra ID / Azure AD with MSAL and backend JWT revalidation on every request");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "li");
      \u0275\u0275text(166, "FastAPI backend on SQL Server with HTTPS enforcement, full ticketing system, ETL health monitoring endpoints, and Docker/docker-compose deployment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(167, "li");
      \u0275\u0275text(168, "Python ETL suite extracting, cleansing, and loading operational workforce data from scrapers to SQL Server on automated schedules");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(169, "li");
      \u0275\u0275text(170, "Centralized QA repo with Playwright E2E coverage across all portals, SAST in GitHub Actions, and Page Object Model architecture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(171, "li");
      \u0275\u0275text(172, "Prometheus + Grafana observability stack (3 dashboards) for real-time API and ETL monitoring; nginx reverse proxy with DNS alias and HTTPS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(173, "div", 71);
      \u0275\u0275repeaterCreate(174, HomeComponent_For_175_Template, 2, 1, "span", 72, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(176, "div", 39)(177, "button", 41);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_177_listener() {
        return ctx.toggleCase(2);
      });
      \u0275\u0275elementStart(178, "div", 42)(179, "div", 43);
      \u0275\u0275text(180, "Clark County School District \u2014 Las Vegas, NV");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(181, "h3", 44);
      \u0275\u0275text(182, "Internal Web Platform & Data Infrastructure");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(183, "div", 45);
      \u0275\u0275text(184, "Data Visualization Analyst II \xB7 Nov 2023 \u2013 Sep 2025");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(185, "div", 73)(186, "div", 49);
      \u0275\u0275text(187, "Months \u2192 days");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(188, "svg", 46);
      \u0275\u0275element(189, "polyline", 47);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(190, "div", 55)(191, "div", 56)(192, "p", 57);
      \u0275\u0275text(193, " Sole engineer on a ground-up internal platform at one of the largest school districts in the United States. Clark County's data lived across Oracle, Workforce, Google Sheets, and Excel. None of those systems talk to each other. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(194, "ul", 70)(195, "li");
      \u0275\u0275text(196, "Designed the database schema, built the FastAPI backend, developed the Angular frontend, and managed Docker deployment to a VM. Full ownership, end to end.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(197, "li");
      \u0275\u0275text(198, "Built geographic data visualizations mapping staff tenure across Clark County using SQL Server spatial queries and Highcharts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(199, "li");
      \u0275\u0275text(200, "Reduced data request fulfillment from months to days via custom ETL pipelines and a unified data layer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(201, "li");
      \u0275\u0275text(202, "Integrated Highcharts for dynamic leadership tracking dashboards with role-based access and PDF report generation");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(203, "div", 71);
      \u0275\u0275repeaterCreate(204, HomeComponent_For_205_Template, 2, 1, "span", 72, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(206, "section", 35)(207, "div", 14)(208, "div", 15)(209, "span", 16);
      \u0275\u0275text(210, "Experience");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(211, "h2", 17);
      \u0275\u0275text(212, "Work History");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(213, "div", 78);
      \u0275\u0275repeaterCreate(214, HomeComponent_For_215_Template, 16, 8, "div", 79, _forTrack2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(216, "div", 80)(217, "a", 12);
      \u0275\u0275text(218, "Full resume with all roles \u2192");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(219, "section", 81)(220, "div", 14)(221, "div", 82)(222, "span", 16);
      \u0275\u0275text(223, "Get in Touch");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(224, "h2", 83);
      \u0275\u0275text(225, "Let's talk.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(226, "p", 84);
      \u0275\u0275text(227, " Open to FDE roles, embedded engineering engagements, and conversations about hard technical problems in customer-facing environments. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(228, "div", 85)(229, "a", 86);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(230, "svg", 87);
      \u0275\u0275element(231, "path", 88);
      \u0275\u0275elementEnd();
      \u0275\u0275text(232, " alexander.barkus96@gmail.com ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(233, "a", 89);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(234, "svg", 87);
      \u0275\u0275element(235, "path", 90);
      \u0275\u0275elementEnd();
      \u0275\u0275text(236, " LinkedIn ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(237, "a", 91);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(238, "svg", 87);
      \u0275\u0275element(239, "path", 92);
      \u0275\u0275elementEnd();
      \u0275\u0275text(240, " GitHub ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.terminalText);
      \u0275\u0275advance(55);
      \u0275\u0275repeater(ctx.capabilities);
      \u0275\u0275advance(11);
      \u0275\u0275classProp("case-expanded", ctx.expandedCase === 0);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.expandedCase === 0);
      \u0275\u0275advance(19);
      \u0275\u0275classProp("case-body-open", ctx.expandedCase === 0);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.shots);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.shots[ctx.activeShot].url);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.shots);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(17, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275classProp("case-expanded", ctx.expandedCase === 1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.expandedCase === 1);
      \u0275\u0275advance(13);
      \u0275\u0275classProp("case-body-open", ctx.expandedCase === 1);
      \u0275\u0275advance(28);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(18, _c1));
      \u0275\u0275advance(2);
      \u0275\u0275classProp("case-expanded", ctx.expandedCase === 2);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.expandedCase === 2);
      \u0275\u0275advance(13);
      \u0275\u0275classProp("case-body-open", ctx.expandedCase === 2);
      \u0275\u0275advance(14);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(19, _c2));
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.experience);
    }
  }, dependencies: [RouterModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100svh;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.hero-inner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 6rem 1.5rem 5rem;\n  width: 100%;\n}\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0.35rem 0.875rem;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.22);\n  border-radius: 100px;\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  color: var(--accent-bright);\n  text-transform: uppercase;\n  margin-bottom: 1.75rem;\n}\n.hero-badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--accent-bright);\n  animation: pulse-slow 2s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.hero-name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(3.5rem, 8vw, 6rem);\n  font-weight: 700;\n  letter-spacing: -0.04em;\n  line-height: 1.05;\n  margin-bottom: 1.75rem;\n}\n.hero-statement[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 2vw, 1.1875rem);\n  color: var(--text-secondary);\n  line-height: 1.75;\n  max-width: 560px;\n  margin-bottom: 2rem;\n}\n.terminal-line[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-family: var(--font-mono);\n  font-size: 0.875rem;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 0.625rem 1rem;\n  margin-bottom: 2.5rem;\n  min-height: 2.5rem;\n}\n.terminal-cursor[_ngcontent-%COMP%] {\n  color: var(--accent-bright);\n  margin-left: 1px;\n  animation: blink 1s step-end infinite;\n}\n.hero-ctas[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.875rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.pillars-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.25rem;\n}\n@media (min-width: 768px) {\n  .pillars-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.pillar-card[_ngcontent-%COMP%] {\n  padding: 1.75rem 1.5rem;\n}\n.pillar-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  border-radius: 10px;\n  color: var(--accent-bright);\n  margin-bottom: 1.25rem;\n}\n.pillar-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.0625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 0.625rem;\n}\n.pillar-body[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n}\n.capabilities-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.5rem;\n}\n@media (min-width: 640px) {\n  .capabilities-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .capabilities-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.cap-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.625rem;\n}\n.cap-group-label[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  font-weight: 500;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.cap-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.case-study[_ngcontent-%COMP%] {\n  padding: 2rem 2rem 1.75rem;\n  margin-bottom: 1.5rem;\n}\n.case-study[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.case-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.case-header-row[_ngcontent-%COMP%]   .case-trigger[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  width: auto;\n}\n.case-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n.case-trigger[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  width: 100%;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  text-align: left;\n  color: inherit;\n  font: inherit;\n}\n.case-trigger-left[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.case-trigger-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n.case-chevron[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  transition: transform 0.3s ease, color 0.2s ease;\n  flex-shrink: 0;\n}\n.case-expanded[_ngcontent-%COMP%]   .case-chevron[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  color: var(--accent-amber);\n}\n.case-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: 0fr;\n  transition: grid-template-rows 0.35s ease;\n}\n.case-body-open[_ngcontent-%COMP%] {\n  grid-template-rows: 1fr;\n}\n.case-body-inner[_ngcontent-%COMP%] {\n  overflow: hidden;\n  padding-top: 1.25rem;\n}\n.case-company[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  font-weight: 500;\n  letter-spacing: 0.06em;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 0.375rem;\n}\n.case-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.3125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 0.3rem;\n}\n.case-meta[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--text-muted);\n}\n.case-outcome-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.3rem 0.75rem;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.25);\n  border-radius: 6px;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 500;\n  color: var(--accent-amber);\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.case-context[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n  margin-bottom: 1.5rem;\n}\n.case-repos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1.25rem;\n}\n.repo-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.repo-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.2rem 0.625rem;\n  background: rgba(6, 182, 212, 0.06);\n  border: 1px solid rgba(6, 182, 212, 0.2);\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  color: var(--accent-cyan);\n  letter-spacing: 0.04em;\n}\n.case-bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.625rem;\n}\n.case-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n  line-height: 1.65;\n}\n.case-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2192";\n  color: var(--accent-amber);\n  flex-shrink: 0;\n  font-family: var(--font-mono);\n  font-size: 0.8rem;\n  margin-top: 0.15em;\n}\n.case-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  padding-top: 1.25rem;\n  border-top: 1px solid var(--border);\n}\n.screenshot-showcase[_ngcontent-%COMP%] {\n  margin: 0 0 1.75rem;\n}\n.shot-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.375rem;\n  margin-bottom: 0.625rem;\n  flex-wrap: wrap;\n}\n.shot-tab[_ngcontent-%COMP%] {\n  padding: 0.275rem 0.8rem;\n  background: var(--bg-raised);\n  border: 1px solid var(--border);\n  border-radius: 5px;\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  letter-spacing: 0.04em;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition:\n    color 0.18s ease,\n    border-color 0.18s ease,\n    background 0.18s ease;\n}\n.shot-tab[_ngcontent-%COMP%]:hover:not(.shot-tab-active) {\n  color: var(--text-secondary);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.shot-tab-active[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.07);\n  border-color: rgba(245, 158, 11, 0.32);\n  color: var(--accent-amber);\n}\n.shot-browser[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow:\n    0 0 0 1px rgba(245, 158, 11, 0.04),\n    0 8px 32px rgba(0, 0, 0, 0.35),\n    0 20px 60px rgba(245, 158, 11, 0.05);\n}\n.shot-chrome[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem 0.75rem;\n  background: var(--bg-surface);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.shot-dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-shrink: 0;\n}\n.shot-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n}\n.dot-close[_ngcontent-%COMP%] {\n  background: #FF5F57;\n}\n.dot-min[_ngcontent-%COMP%] {\n  background: #FFBD2E;\n}\n.dot-max[_ngcontent-%COMP%] {\n  background: #28C840;\n}\n.shot-url[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  color: var(--text-muted);\n  background: var(--bg-raised);\n  border: 1px solid var(--border);\n  border-radius: 4px;\n  padding: 0.175rem 0.6rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  min-width: 0;\n  transition: color 0.25s ease;\n}\n.shot-frame[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  background: var(--bg-base);\n  overflow: hidden;\n}\n.shot-img[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: top center;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  display: block;\n}\n.shot-img-active[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.shot-live-cta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 0.625rem;\n}\n.btn-live[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 1rem;\n  background: rgba(245, 158, 11, 0.09);\n  border: 1px solid rgba(245, 158, 11, 0.35);\n  border-radius: 6px;\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  color: var(--accent-amber);\n  text-decoration: none;\n  transition:\n    background 0.18s ease,\n    border-color 0.18s ease,\n    color 0.18s ease;\n}\n.btn-live[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.16);\n  border-color: rgba(245, 158, 11, 0.55);\n  color: #fbbf24;\n}\n.timeline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  margin-bottom: 2rem;\n}\n.timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.25rem;\n}\n.timeline-track[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-shrink: 0;\n  padding-top: 0.2rem;\n}\n.timeline-node[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: var(--bg-raised);\n  border: 2px solid var(--text-muted);\n  flex-shrink: 0;\n  transition: border-color 0.2s ease;\n}\n.timeline-node-current[_ngcontent-%COMP%] {\n  background: var(--accent-dim);\n  border-color: var(--accent-bright);\n  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);\n}\n.timeline-line[_ngcontent-%COMP%] {\n  width: 1px;\n  flex: 1;\n  background: var(--border);\n  margin: 4px 0;\n  min-height: 1.5rem;\n}\n.timeline-content[_ngcontent-%COMP%] {\n  padding-bottom: 2.25rem;\n  flex: 1;\n  min-width: 0;\n}\n.timeline-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-bottom: 0.875rem;\n}\n.timeline-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.timeline-company[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin-top: 0.15rem;\n}\n.timeline-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.3rem;\n  flex-shrink: 0;\n}\n.timeline-period[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.timeline-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.15rem 0.5rem;\n  background: var(--bg-raised);\n  border: 1px solid var(--border);\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.timeline-tag-current[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.08);\n  border-color: rgba(99, 102, 241, 0.25);\n  color: var(--accent-bright);\n}\n.timeline-bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.timeline-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.625rem;\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.timeline-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\b7";\n  color: var(--text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n  margin-top: -0.1em;\n}\n.timeline-cta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n}\n.contact-section[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n.contact-card[_ngcontent-%COMP%] {\n  padding: 3rem 2.5rem;\n  max-width: 680px;\n}\n.contact-heading[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 4vw, 2.75rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 1rem;\n}\n.contact-sub[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n  margin-bottom: 2rem;\n}\n.contact-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.contact-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.contact-link[_ngcontent-%COMP%]:hover {\n  color: var(--accent-bright);\n}\n@media (max-width: 639px) {\n  .case-study[_ngcontent-%COMP%] {\n    padding: 1.25rem 1rem 1rem;\n  }\n  .case-header-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n  .case-header-row[_ngcontent-%COMP%]   .case-header-actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n  .case-study[_ngcontent-%COMP%]    > .case-trigger[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.5rem;\n  }\n  .case-study[_ngcontent-%COMP%]    > .case-trigger[_ngcontent-%COMP%]   .case-trigger-right[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n  }\n  .shot-tabs[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    scrollbar-width: none;\n    padding-bottom: 2px;\n  }\n  .shot-tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .timeline-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.375rem;\n  }\n  .timeline-header[_ngcontent-%COMP%]   .timeline-right[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n    gap: 0.5rem;\n  }\n  .contact-card[_ngcontent-%COMP%] {\n    padding: 1.75rem 1.25rem;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/features/home/home.component.ts", lineNumber: 11 });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Alex Barkus \u2014 Forward Deployed Engineer"
  },
  {
    path: "approach",
    loadComponent: () => import("./chunk-IUSWH3HH.js").then((m) => m.ApproachComponent),
    title: "Approach \u2014 Alex Barkus"
  },
  {
    path: "resume",
    loadComponent: () => import("./chunk-YKLD7UK5.js").then((m) => m.ResumeComponent),
    title: "Resume \u2014 Alex Barkus"
  },
  {
    path: "services",
    redirectTo: "approach",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

// src/app/layout/header/header.component.ts
var _c02 = () => ({ exact: true });
function HeaderComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "path", 13);
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "path", 14);
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 12)(1, "a", 15);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(2, "Home");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 16);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Template_a_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(4, "Approach");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 17);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Template_a_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(6, "Play With Algorithmic Art \u2197");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 18);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_18_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(8, "Resume \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c02));
  }
}
var HeaderComponent = class _HeaderComponent {
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], decls: 19, vars: 5, consts: [[1, "site-header"], [1, "header-inner"], ["routerLink", "/", 1, "logo", 3, "click"], [1, "logo-mark"], [1, "logo-dot"], [1, "desktop-nav"], ["routerLink", "/", "routerLinkActive", "nav-active", 1, "nav-link", 3, "routerLinkActiveOptions"], ["routerLink", "/approach", "routerLinkActive", "nav-active", 1, "nav-link"], ["href", "/assets/art/threshold-current.html", "target", "_blank", "rel", "noopener noreferrer", 1, "nav-art"], ["routerLink", "/resume", 1, "nav-resume"], ["aria-label", "Toggle navigation", 1, "mobile-toggle", 3, "click"], ["width", "22", "height", "22", "viewBox", "0 0 22 22", "fill", "none", "aria-hidden", "true"], ["aria-label", "Mobile navigation", 1, "mobile-nav"], ["d", "M3 6h16M3 11h16M3 16h16", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round"], ["d", "M5 5l12 12M17 5L5 17", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round"], ["routerLink", "/", "routerLinkActive", "nav-active", 1, "mobile-nav-link", 3, "click", "routerLinkActiveOptions"], ["routerLink", "/approach", "routerLinkActive", "nav-active", 1, "mobile-nav-link", 3, "click"], ["href", "/assets/art/threshold-current.html", "target", "_blank", "rel", "noopener noreferrer", 1, "mobile-nav-link", "mobile-art", 3, "click"], ["routerLink", "/resume", 1, "mobile-nav-link", "mobile-resume", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275listener("click", function HeaderComponent_Template_a_click_2_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275elementStart(3, "span", 3);
      \u0275\u0275text(4, "AB");
      \u0275\u0275elementEnd();
      \u0275\u0275element(5, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "nav", 5)(7, "a", 6);
      \u0275\u0275text(8, "Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 7);
      \u0275\u0275text(10, "Approach");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 8);
      \u0275\u0275text(12, "Play With Algorithmic Art \u2197");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 9);
      \u0275\u0275text(14, "Resume \u2192");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "button", 10);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_15_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275template(16, HeaderComponent_Conditional_16_Template, 2, 0, ":svg:svg", 11)(17, HeaderComponent_Conditional_17_Template, 2, 0, ":svg:svg", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, HeaderComponent_Conditional_18_Template, 9, 2, "nav", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(4, _c02));
      \u0275\u0275advance(8);
      \u0275\u0275attribute("aria-expanded", ctx.isMenuOpen);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isMenuOpen ? 16 : 17);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isMenuOpen ? 18 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, RouterLinkActive], styles: ['@charset "UTF-8";\n\n\n\n.site-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: rgba(9, 9, 11, 0.85);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border-bottom: 1px solid var(--border);\n}\n.header-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  text-decoration: none;\n  flex-shrink: 0;\n}\n.logo-mark[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.125rem;\n  font-weight: 700;\n  letter-spacing: -0.03em;\n  color: var(--text-primary);\n}\n.logo-mark[_ngcontent-%COMP%]::first-letter {\n  color: var(--accent-bright);\n}\n.logo-dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--accent-amber);\n  margin-bottom: 3px;\n  flex-shrink: 0;\n}\n.desktop-nav[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  gap: 2.25rem;\n}\n@media (min-width: 768px) {\n  .desktop-nav[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.nav-link[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-muted);\n  text-decoration: none;\n  letter-spacing: 0.01em;\n  transition: color 0.2s ease;\n}\n.nav-link[_ngcontent-%COMP%]:hover, \n.nav-link.nav-active[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.nav-resume[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.375rem 0.875rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--accent-bright);\n  text-decoration: none;\n  border: 1px solid rgba(99, 102, 241, 0.3);\n  border-radius: 6px;\n  transition:\n    background 0.2s ease,\n    border-color 0.2s ease,\n    box-shadow 0.2s ease;\n}\n.nav-resume[_ngcontent-%COMP%]:hover {\n  background: rgba(99, 102, 241, 0.08);\n  border-color: rgba(99, 102, 241, 0.55);\n  box-shadow: 0 0 14px rgba(99, 102, 241, 0.12);\n}\n.nav-art[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: var(--accent-amber);\n  text-decoration: none;\n  letter-spacing: 0.01em;\n  opacity: 0.75;\n  transition: opacity 0.2s ease, color 0.2s ease;\n}\n.nav-art[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  color: #fbbf24;\n}\n.mobile-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem;\n  background: none;\n  border: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  border-radius: 6px;\n  transition: color 0.2s ease;\n}\n.mobile-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n}\n@media (min-width: 768px) {\n  .mobile-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mobile-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid var(--border);\n  animation: slideDown 0.22s ease forwards;\n}\n@media (min-width: 768px) {\n  .mobile-nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mobile-nav-link[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.5rem;\n  font-size: 0.9375rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  text-decoration: none;\n  border-bottom: 1px solid var(--border);\n  transition: color 0.2s ease, background 0.2s ease;\n}\n.mobile-nav-link[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.mobile-nav-link[_ngcontent-%COMP%]:hover, \n.mobile-nav-link.nav-active[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  background: rgba(255, 255, 255, 0.02);\n}\n.mobile-resume[_ngcontent-%COMP%] {\n  color: var(--accent-bright);\n}\n.mobile-resume[_ngcontent-%COMP%]:hover {\n  color: var(--accent-primary);\n}\n.mobile-art[_ngcontent-%COMP%] {\n  color: var(--accent-amber);\n  opacity: 0.8;\n}\n.mobile-art[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  color: #fbbf24;\n}\n/*# sourceMappingURL=header.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/layout/header/header.component.ts", lineNumber: 11 });
})();

// src/app/layout/footer/footer.component.ts
var FooterComponent = class _FooterComponent {
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  static \u0275fac = function FooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], decls: 19, vars: 1, consts: [[1, "site-footer"], [1, "footer-inner"], [1, "footer-left"], [1, "footer-logo"], [1, "footer-logo-dot"], [1, "footer-copy"], [1, "footer-links"], ["href", "https://github.com/aj8971996/", "target", "_blank", "rel", "noopener noreferrer", "aria-label", "GitHub", 1, "footer-icon"], ["width", "19", "height", "19", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["fill-rule", "evenodd", "d", "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", "clip-rule", "evenodd"], ["href", "https://www.linkedin.com/in/alexander-barkus/", "target", "_blank", "rel", "noopener noreferrer", "aria-label", "LinkedIn", 1, "footer-icon"], ["d", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"], ["href", "mailto:alexander.barkus96@gmail.com", "aria-label", "Email", 1, "footer-icon"], ["d", "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"]], template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "AB");
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, ".");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "a", 7);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(11, "svg", 8);
      \u0275\u0275element(12, "path", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(13, "a", 10);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 8);
      \u0275\u0275element(15, "path", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(16, "a", 12);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(17, "svg", 8);
      \u0275\u0275element(18, "path", 13);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " Alexander Barkus. All rights reserved.");
    }
  }, styles: ["\n\n.site-footer[_ngcontent-%COMP%] {\n  background: var(--bg-base);\n  border-top: 1px solid var(--border);\n  padding: 1.75rem 0;\n}\n.footer-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.footer-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.125rem;\n}\n.footer-logo[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: -0.03em;\n  color: var(--text-primary);\n}\n.footer-logo-dot[_ngcontent-%COMP%] {\n  color: var(--accent-amber);\n}\n.footer-copy[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  margin: 0;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.25rem;\n}\n.footer-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: var(--text-muted);\n  transition: color 0.2s ease;\n}\n.footer-icon[_ngcontent-%COMP%]:hover {\n  color: var(--text-secondary);\n}\n/*# sourceMappingURL=footer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src/app/layout/footer/footer.component.ts", lineNumber: 10 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "personalportfolio";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "flex", "flex-col", "min-h-screen", 2, "background", "var(--bg-base)", "color", "var(--text-primary)"], [1, "flex-grow"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-header");
      \u0275\u0275elementStart(2, "main", 1);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "app-footer");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 14 });
})();

// src/main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
