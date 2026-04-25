import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-N6XIQF5H.js";
import {
  CommonModule,
  ElementRef,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3S5BZ677.js";
import "./chunk-YP43Q66R.js";

// src/app/features/home/home.component.ts
var _c0 = () => ["Angular 19", "FastAPI", "SQL Server", "Python", "Azure AD / MSAL", "Docker", "nginx", "Playwright", "Prometheus", "Grafana", "GitHub Actions"];
var _c1 = () => ["Angular", "FastAPI", "SQL Server", "Python", "Highcharts", "Docker", "Tableau", "ETL Pipelines"];
var _forTrack0 = ($index, $item) => $item.group;
var _forTrack1 = ($index, $item) => $item.company;
function HomeComponent_For_69_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1);
  }
}
function HomeComponent_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 70);
    \u0275\u0275repeaterCreate(4, HomeComponent_For_69_For_5_Template, 2, 1, "span", 53, \u0275\u0275repeaterTrackByIdentity);
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
function HomeComponent_For_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3);
  }
}
function HomeComponent_For_142_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4);
  }
}
function HomeComponent_For_152_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 73);
  }
}
function HomeComponent_For_152_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("timeline-tag-current", role_r5.current);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r5.tag);
  }
}
function HomeComponent_For_152_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r6);
  }
}
function HomeComponent_For_152_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 81);
    \u0275\u0275repeaterCreate(1, HomeComponent_For_152_Conditional_15_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(role_r5.bullets);
  }
}
function HomeComponent_For_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 71);
    \u0275\u0275element(2, "div", 72);
    \u0275\u0275template(3, HomeComponent_For_152_Conditional_3_Template, 1, 0, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74)(5, "div", 75)(6, "div")(7, "div", 76);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 77);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 78)(12, "span", 79);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, HomeComponent_For_152_Conditional_14_Template, 2, 3, "span", 80);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, HomeComponent_For_152_Conditional_15_Template, 3, 0, "ul", 81);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r5 = ctx.$implicit;
    const \u0275$index_264_r7 = ctx.$index;
    const \u0275$count_264_r8 = ctx.$count;
    \u0275\u0275advance(2);
    \u0275\u0275classProp("timeline-node-current", role_r5.current);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_264_r7 === \u0275$count_264_r8 - 1) ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(role_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r5.company);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r5.period);
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r5.tag ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r5.bullets.length > 0 ? 15 : -1);
  }
}
var HomeComponent = class _HomeComponent {
  el;
  terminalText = "";
  fullTerminalText = "> building at the intersection of systems and stakeholders";
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
  constructor(el) {
    this.el = el;
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
  }
  ngOnDestroy() {
    clearInterval(this.typeInterval);
    this.observer?.disconnect();
  }
  scrollToWork() {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
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
    return new (__ngFactoryType__ || _HomeComponent)(\u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 178, vars: 3, consts: [[1, "hero"], [1, "dot-grid"], [1, "hero-inner"], [1, "hero-badge", "animate-fade-in", 2, "animation-delay", "0.05s"], [1, "hero-badge-dot"], [1, "hero-name", "animate-fade-up", 2, "animation-delay", "0.15s"], [1, "gradient-text"], [1, "hero-statement", "animate-fade-up", 2, "animation-delay", "0.28s"], [1, "terminal-line", "animate-fade-up", 2, "animation-delay", "0.42s"], [1, "terminal-text"], [1, "terminal-cursor", "animate-blink"], [1, "hero-ctas", "animate-fade-up", 2, "animation-delay", "0.56s"], [1, "btn-primary", 3, "click"], ["routerLink", "/resume", 1, "btn-secondary"], [1, "section"], [1, "section-inner"], [1, "section-header", "reveal"], [1, "section-label"], [1, "section-heading"], [1, "section-sub"], [1, "pillars-grid"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-1"], [1, "pillar-icon"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["points", "16 18 22 12 16 6"], ["points", "8 6 2 12 8 18"], [1, "pillar-title"], [1, "pillar-body"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-2"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "pillar-card", "glass-card", "reveal", "reveal-delay-3"], ["points", "22 7 13.5 15.5 8.5 10.5 2 17"], ["points", "16 7 22 7 22 13"], [1, "section", 2, "padding-top", "0"], [1, "capabilities-grid"], [1, "cap-group", "reveal"], ["id", "work", 1, "section"], [1, "case-study", "glass-card-amber", "reveal"], [1, "case-study-header"], [1, "case-company"], [1, "case-title"], [1, "case-meta"], [1, "case-outcome-badge"], [1, "case-context"], [1, "case-repos"], [1, "section-label", 2, "margin-bottom", "0.5rem"], [1, "repo-tags"], [1, "repo-tag"], [1, "case-bullets"], [1, "case-stack"], [1, "tech-badge"], [1, "timeline"], [1, "timeline-item", "reveal"], [1, "timeline-cta", "reveal"], ["id", "contact", 1, "section", "contact-section"], [1, "contact-card", "glass-card", "reveal"], [1, "contact-heading"], [1, "contact-sub"], [1, "contact-links"], ["href", "mailto:alexander.barkus96@gmail.com", 1, "contact-link"], ["width", "17", "height", "17", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"], ["href", "https://www.linkedin.com/in/alexander-barkus/", "target", "_blank", "rel", "noopener noreferrer", 1, "contact-link"], ["d", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"], ["href", "https://github.com/aj8971996/", "target", "_blank", "rel", "noopener noreferrer", 1, "contact-link"], ["fill-rule", "evenodd", "d", "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", "clip-rule", "evenodd"], [1, "cap-group-label"], [1, "cap-badges"], [1, "timeline-track"], [1, "timeline-node"], [1, "timeline-line"], [1, "timeline-content"], [1, "timeline-header"], [1, "timeline-title"], [1, "timeline-company"], [1, "timeline-right"], [1, "timeline-period"], [1, "timeline-tag", 3, "timeline-tag-current"], [1, "timeline-bullets"], [1, "timeline-tag"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
      \u0275\u0275element(4, "span", 4);
      \u0275\u0275text(5, " Forward Deployed Engineer ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1", 5)(7, "span", 6);
      \u0275\u0275text(8, "Alex Barkus");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p", 7);
      \u0275\u0275text(10, " I sit at the intersection of engineering and the customer \u2014 close enough to understand the real problem, technical enough to build the right solution. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8)(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "|");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 11)(17, "button", 12);
      \u0275\u0275listener("click", function HomeComponent_Template_button_click_17_listener() {
        return ctx.scrollToWork();
      });
      \u0275\u0275text(18, "See My Work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "a", 13);
      \u0275\u0275text(20, "View Resume \u2192");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "section", 14)(22, "div", 15)(23, "div", 16)(24, "span", 17);
      \u0275\u0275text(25, "The Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "h2", 18);
      \u0275\u0275text(27, "What Forward Deployed Means");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 19);
      \u0275\u0275text(29, " Most engineers optimize for code. FDEs optimize for outcomes \u2014 which requires speaking both languages fluently. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20)(31, "div", 21)(32, "div", 22);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(33, "svg", 23);
      \u0275\u0275element(34, "polyline", 24)(35, "polyline", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(36, "h3", 26);
      \u0275\u0275text(37, "Technical Depth");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "p", 27);
      \u0275\u0275text(39, " Production-grade systems built in-house. Full-stack apps, ETL pipelines, enterprise auth infrastructure, real observability \u2014 not prototypes. Platforms. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 28)(41, "div", 22);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(42, "svg", 23);
      \u0275\u0275element(43, "path", 29)(44, "circle", 30)(45, "path", 31)(46, "path", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(47, "h3", 26);
      \u0275\u0275text(48, "Customer Proximity");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "p", 27);
      \u0275\u0275text(50, " Embedded alongside stakeholders. Understanding their workflow, their constraints, their org chart \u2014 before writing a single line of code. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 33)(52, "div", 22);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(53, "svg", 23);
      \u0275\u0275element(54, "polyline", 34)(55, "polyline", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(56, "h3", 26);
      \u0275\u0275text(57, "Tangible Outcomes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p", 27);
      \u0275\u0275text(59, " Measured by what changed in the business: months \u2192 days, manual \u2192 automated, fragile \u2192 observable. Not what shipped \u2014 what stuck. ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(60, "section", 36)(61, "div", 15)(62, "div", 16)(63, "span", 17);
      \u0275\u0275text(64, "Technical Arsenal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "h2", 18);
      \u0275\u0275text(66, "Core Capabilities");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "div", 37);
      \u0275\u0275repeaterCreate(68, HomeComponent_For_69_Template, 6, 1, "div", 38, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(70, "section", 39)(71, "div", 15)(72, "div", 16)(73, "span", 17);
      \u0275\u0275text(74, "Featured Work");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "h2", 18);
      \u0275\u0275text(76, "Case Studies");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "p", 19);
      \u0275\u0275text(78, " Both engagements were greenfield builds in complex enterprise environments \u2014 designed, architected, and shipped solo. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(79, "div", 40)(80, "div", 41)(81, "div")(82, "div", 42);
      \u0275\u0275text(83, "Sphere Entertainment Co. \u2014 Las Vegas, NV");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "h3", 43);
      \u0275\u0275text(85, "Internal Operations Platform");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "div", 44);
      \u0275\u0275text(87, "Forward Deployed Engineer \xB7 Oct 2025 \u2013 Present \xB7 Contract \u2192 FTE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(88, "div", 45);
      \u0275\u0275text(89, "Executive buy-in secured");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(90, "p", 46);
      \u0275\u0275text(91, " Embedded as the sole engineer to modernize internal operations for one of the world's most technically complex live entertainment venues. Scope expanded from legacy audit to a full multi-department platform. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "div", 47)(93, "span", 48);
      \u0275\u0275text(94, "Architecture \u2014 4 repositories");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "div", 49)(96, "span", 50);
      \u0275\u0275text(97, "swiki");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "span", 50);
      \u0275\u0275text(99, "swiki-api");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "span", 50);
      \u0275\u0275text(101, "etls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "span", 50);
      \u0275\u0275text(103, "testing-suite");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(104, "ul", 51)(105, "li");
      \u0275\u0275text(106, "Angular 19 SPA with five role-gated stakeholder portals (Exec, Security, HSE, Guest Services, Dev) using Microsoft Entra ID / Azure AD with MSAL and backend JWT revalidation on every request");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "li");
      \u0275\u0275text(108, "FastAPI backend on SQL Server with HTTPS enforcement, full ticketing system, ETL health monitoring endpoints, and Docker/docker-compose deployment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "li");
      \u0275\u0275text(110, "Python ETL suite extracting, cleansing, and loading operational workforce data from scrapers to SQL Server on automated schedules");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "li");
      \u0275\u0275text(112, "Centralized QA repo with Playwright E2E coverage across all portals, SAST in GitHub Actions, and Page Object Model architecture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "li");
      \u0275\u0275text(114, "Prometheus + Grafana observability stack (3 dashboards) for real-time API and ETL monitoring; nginx reverse proxy with DNS alias and HTTPS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(115, "div", 52);
      \u0275\u0275repeaterCreate(116, HomeComponent_For_117_Template, 2, 1, "span", 53, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(118, "div", 40)(119, "div", 41)(120, "div")(121, "div", 42);
      \u0275\u0275text(122, "Clark County School District \u2014 Las Vegas, NV");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(123, "h3", 43);
      \u0275\u0275text(124, "Internal Web Platform & Data Infrastructure");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "div", 44);
      \u0275\u0275text(126, "Data Visualization Analyst II \xB7 Nov 2023 \u2013 Sep 2025");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(127, "div", 45);
      \u0275\u0275text(128, "Months \u2192 days");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(129, "p", 46);
      \u0275\u0275text(130, " Sole engineer on a ground-up internal platform at one of the largest school districts in the United States. Operated across a large enterprise environment with complex network segmentation across a geographically distributed campus. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "ul", 51)(132, "li");
      \u0275\u0275text(133, "Designed the database schema, built the FastAPI backend, developed the Angular frontend, and managed Docker deployment to a VM \u2014 full ownership, end to end");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(134, "li");
      \u0275\u0275text(135, "Built geographic data visualizations mapping staff tenure across Clark County using SQL Server spatial queries and Highcharts");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(136, "li");
      \u0275\u0275text(137, "Reduced data request fulfillment from months to days via custom ETL pipelines and a unified data layer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(138, "li");
      \u0275\u0275text(139, "Integrated Highcharts for dynamic leadership tracking dashboards with role-based access and PDF report generation");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(140, "div", 52);
      \u0275\u0275repeaterCreate(141, HomeComponent_For_142_Template, 2, 1, "span", 53, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(143, "section", 36)(144, "div", 15)(145, "div", 16)(146, "span", 17);
      \u0275\u0275text(147, "Experience");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "h2", 18);
      \u0275\u0275text(149, "Work History");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(150, "div", 54);
      \u0275\u0275repeaterCreate(151, HomeComponent_For_152_Template, 16, 8, "div", 55, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(153, "div", 56)(154, "a", 13);
      \u0275\u0275text(155, "Full resume with all roles \u2192");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(156, "section", 57)(157, "div", 15)(158, "div", 58)(159, "span", 17);
      \u0275\u0275text(160, "Get in Touch");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(161, "h2", 59);
      \u0275\u0275text(162, "Let's talk.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(163, "p", 60);
      \u0275\u0275text(164, " Open to FDE roles, embedded engineering engagements, and conversations about hard technical problems in customer-facing environments. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(165, "div", 61)(166, "a", 62);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(167, "svg", 63);
      \u0275\u0275element(168, "path", 64);
      \u0275\u0275elementEnd();
      \u0275\u0275text(169, " alexander.barkus96@gmail.com ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(170, "a", 65);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(171, "svg", 63);
      \u0275\u0275element(172, "path", 66);
      \u0275\u0275elementEnd();
      \u0275\u0275text(173, " LinkedIn ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(174, "a", 67);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(175, "svg", 63);
      \u0275\u0275element(176, "path", 68);
      \u0275\u0275elementEnd();
      \u0275\u0275text(177, " GitHub ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275textInterpolate(ctx.terminalText);
      \u0275\u0275advance(55);
      \u0275\u0275repeater(ctx.capabilities);
      \u0275\u0275advance(48);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c0));
      \u0275\u0275advance(25);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(2, _c1));
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.experience);
    }
  }, dependencies: [RouterModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100svh;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.hero-inner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 6rem 1.5rem 5rem;\n  width: 100%;\n}\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0.35rem 0.875rem;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.22);\n  border-radius: 100px;\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  color: var(--accent-bright);\n  text-transform: uppercase;\n  margin-bottom: 1.75rem;\n}\n.hero-badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--accent-bright);\n  animation: pulse-slow 2s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.hero-name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(3.5rem, 8vw, 6rem);\n  font-weight: 700;\n  letter-spacing: -0.04em;\n  line-height: 1.05;\n  margin-bottom: 1.75rem;\n}\n.hero-statement[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 2vw, 1.1875rem);\n  color: var(--text-secondary);\n  line-height: 1.75;\n  max-width: 560px;\n  margin-bottom: 2rem;\n}\n.terminal-line[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-family: var(--font-mono);\n  font-size: 0.875rem;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 0.625rem 1rem;\n  margin-bottom: 2.5rem;\n  min-height: 2.5rem;\n}\n.terminal-cursor[_ngcontent-%COMP%] {\n  color: var(--accent-bright);\n  margin-left: 1px;\n  animation: blink 1s step-end infinite;\n}\n.hero-ctas[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.875rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.pillars-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.25rem;\n}\n@media (min-width: 768px) {\n  .pillars-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.pillar-card[_ngcontent-%COMP%] {\n  padding: 1.75rem 1.5rem;\n}\n.pillar-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  border-radius: 10px;\n  color: var(--accent-bright);\n  margin-bottom: 1.25rem;\n}\n.pillar-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.0625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 0.625rem;\n}\n.pillar-body[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n}\n.capabilities-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1.5rem;\n}\n@media (min-width: 640px) {\n  .capabilities-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .capabilities-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.cap-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.625rem;\n}\n.cap-group-label[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  font-weight: 500;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--text-muted);\n}\n.cap-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.case-study[_ngcontent-%COMP%] {\n  padding: 2rem 2rem 1.75rem;\n  margin-bottom: 1.5rem;\n}\n.case-study[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.case-study-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.case-company[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  font-weight: 500;\n  letter-spacing: 0.06em;\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 0.375rem;\n}\n.case-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.3125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 0.3rem;\n}\n.case-meta[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--text-muted);\n}\n.case-outcome-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.3rem 0.75rem;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.25);\n  border-radius: 6px;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  font-weight: 500;\n  color: var(--accent-amber);\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.case-context[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n  margin-bottom: 1.5rem;\n}\n.case-repos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1.25rem;\n}\n.repo-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.repo-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.2rem 0.625rem;\n  background: rgba(6, 182, 212, 0.06);\n  border: 1px solid rgba(6, 182, 212, 0.2);\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 0.7rem;\n  color: var(--accent-cyan);\n  letter-spacing: 0.04em;\n}\n.case-bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.625rem;\n}\n.case-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n  line-height: 1.65;\n}\n.case-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2192";\n  color: var(--accent-amber);\n  flex-shrink: 0;\n  font-family: var(--font-mono);\n  font-size: 0.8rem;\n  margin-top: 0.15em;\n}\n.case-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  padding-top: 1.25rem;\n  border-top: 1px solid var(--border);\n}\n.timeline[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  margin-bottom: 2rem;\n}\n.timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.25rem;\n}\n.timeline-track[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-shrink: 0;\n  padding-top: 0.2rem;\n}\n.timeline-node[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: var(--bg-raised);\n  border: 2px solid var(--text-muted);\n  flex-shrink: 0;\n  transition: border-color 0.2s ease;\n}\n.timeline-node-current[_ngcontent-%COMP%] {\n  background: var(--accent-dim);\n  border-color: var(--accent-bright);\n  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);\n}\n.timeline-line[_ngcontent-%COMP%] {\n  width: 1px;\n  flex: 1;\n  background: var(--border);\n  margin: 4px 0;\n  min-height: 1.5rem;\n}\n.timeline-content[_ngcontent-%COMP%] {\n  padding-bottom: 2.25rem;\n  flex: 1;\n  min-width: 0;\n}\n.timeline-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-bottom: 0.875rem;\n}\n.timeline-title[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.timeline-company[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin-top: 0.15rem;\n}\n.timeline-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.3rem;\n  flex-shrink: 0;\n}\n.timeline-period[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.72rem;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.timeline-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.15rem 0.5rem;\n  background: var(--bg-raised);\n  border: 1px solid var(--border);\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  color: var(--text-muted);\n  white-space: nowrap;\n}\n.timeline-tag-current[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.08);\n  border-color: rgba(99, 102, 241, 0.25);\n  color: var(--accent-bright);\n}\n.timeline-bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.timeline-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.625rem;\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.timeline-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\b7";\n  color: var(--text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n  margin-top: -0.1em;\n}\n.timeline-cta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n}\n.contact-section[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n.contact-card[_ngcontent-%COMP%] {\n  padding: 3rem 2.5rem;\n  max-width: 680px;\n}\n.contact-heading[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: clamp(2rem, 4vw, 2.75rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 1rem;\n}\n.contact-sub[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-secondary);\n  line-height: 1.7;\n  margin-bottom: 2rem;\n}\n.contact-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.contact-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.contact-link[_ngcontent-%COMP%]:hover {\n  color: var(--accent-bright);\n}\n/*# sourceMappingURL=home.component.css.map */'] });
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
    loadComponent: () => import("./chunk-FLVDDCNO.js").then((m) => m.ApproachComponent),
    title: "Approach \u2014 Alex Barkus"
  },
  {
    path: "resume",
    loadComponent: () => import("./chunk-KYEFOUVP.js").then((m) => m.ResumeComponent),
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
function HeaderComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 10);
    \u0275\u0275element(1, "path", 12);
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 10);
    \u0275\u0275element(1, "path", 13);
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 11)(1, "a", 14);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_16_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(2, "Home");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 15);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_16_Template_a_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(4, "Approach");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 16);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_16_Template_a_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275text(6, "Resume \u2192");
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], decls: 17, vars: 5, consts: [[1, "site-header"], [1, "header-inner"], ["routerLink", "/", 1, "logo", 3, "click"], [1, "logo-mark"], [1, "logo-dot"], [1, "desktop-nav"], ["routerLink", "/", "routerLinkActive", "nav-active", 1, "nav-link", 3, "routerLinkActiveOptions"], ["routerLink", "/approach", "routerLinkActive", "nav-active", 1, "nav-link"], ["routerLink", "/resume", 1, "nav-resume"], ["aria-label", "Toggle navigation", 1, "mobile-toggle", 3, "click"], ["width", "22", "height", "22", "viewBox", "0 0 22 22", "fill", "none", "aria-hidden", "true"], ["aria-label", "Mobile navigation", 1, "mobile-nav"], ["d", "M3 6h16M3 11h16M3 16h16", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round"], ["d", "M5 5l12 12M17 5L5 17", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round"], ["routerLink", "/", "routerLinkActive", "nav-active", 1, "mobile-nav-link", 3, "click", "routerLinkActiveOptions"], ["routerLink", "/approach", "routerLinkActive", "nav-active", 1, "mobile-nav-link", 3, "click"], ["routerLink", "/resume", 1, "mobile-nav-link", "mobile-resume", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) {
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
      \u0275\u0275text(12, "Resume \u2192");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 9);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_13_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275template(14, HeaderComponent_Conditional_14_Template, 2, 0, ":svg:svg", 10)(15, HeaderComponent_Conditional_15_Template, 2, 0, ":svg:svg", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, HeaderComponent_Conditional_16_Template, 7, 2, "nav", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(4, _c02));
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-expanded", ctx.isMenuOpen);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isMenuOpen ? 14 : 15);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isMenuOpen ? 16 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, RouterLinkActive], styles: ['@charset "UTF-8";\n\n\n\n.site-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: rgba(9, 9, 11, 0.85);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border-bottom: 1px solid var(--border);\n}\n.header-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  text-decoration: none;\n  flex-shrink: 0;\n}\n.logo-mark[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.125rem;\n  font-weight: 700;\n  letter-spacing: -0.03em;\n  color: var(--text-primary);\n}\n.logo-mark[_ngcontent-%COMP%]::first-letter {\n  color: var(--accent-bright);\n}\n.logo-dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--accent-amber);\n  margin-bottom: 3px;\n  flex-shrink: 0;\n}\n.desktop-nav[_ngcontent-%COMP%] {\n  display: none;\n  align-items: center;\n  gap: 2.25rem;\n}\n@media (min-width: 768px) {\n  .desktop-nav[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.nav-link[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-muted);\n  text-decoration: none;\n  letter-spacing: 0.01em;\n  transition: color 0.2s ease;\n}\n.nav-link[_ngcontent-%COMP%]:hover, \n.nav-link.nav-active[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.nav-resume[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.375rem 0.875rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--accent-bright);\n  text-decoration: none;\n  border: 1px solid rgba(99, 102, 241, 0.3);\n  border-radius: 6px;\n  transition:\n    background 0.2s ease,\n    border-color 0.2s ease,\n    box-shadow 0.2s ease;\n}\n.nav-resume[_ngcontent-%COMP%]:hover {\n  background: rgba(99, 102, 241, 0.08);\n  border-color: rgba(99, 102, 241, 0.55);\n  box-shadow: 0 0 14px rgba(99, 102, 241, 0.12);\n}\n.mobile-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.375rem;\n  background: none;\n  border: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  border-radius: 6px;\n  transition: color 0.2s ease;\n}\n.mobile-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n}\n@media (min-width: 768px) {\n  .mobile-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mobile-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 1px solid var(--border);\n  animation: slideDown 0.22s ease forwards;\n}\n@media (min-width: 768px) {\n  .mobile-nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mobile-nav-link[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.5rem;\n  font-size: 0.9375rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  text-decoration: none;\n  border-bottom: 1px solid var(--border);\n  transition: color 0.2s ease, background 0.2s ease;\n}\n.mobile-nav-link[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.mobile-nav-link[_ngcontent-%COMP%]:hover, \n.mobile-nav-link.nav-active[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  background: rgba(255, 255, 255, 0.02);\n}\n.mobile-resume[_ngcontent-%COMP%] {\n  color: var(--accent-bright);\n}\n.mobile-resume[_ngcontent-%COMP%]:hover {\n  color: var(--accent-primary);\n}\n/*# sourceMappingURL=header.component.css.map */'] });
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
