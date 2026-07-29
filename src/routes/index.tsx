import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone, ArrowUp, Menu, X, ChevronDown, Mail, MapPin, Clock, Facebook,
  Car, Bike, Truck, Caravan, Tractor, Package, Cog,
  ShieldCheck, Timer, Wallet, Smile, Wrench,
  CalendarCheck, Search, Disc3, Wind, FileCheck2, BadgeCheck,
  Send, Loader2, CheckCircle2, Globe,
} from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { Counter } from "@/components/Counter";
import { CONTACT } from "./__root";
import { HERO_SLIDES, HERO_SLIDE_INTERVAL_MS, SOCIAL, PHONE_CTA_HREF, SERVICE_ITEMS } from "@/lib/content";

const ICONS: Record<string, any> = { Car, Bike, Truck, Caravan, Tractor, Package, Cog };

/** Smooth-scroll to the contact section. Used by every "phone" CTA. */
function scrollToContact(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

const NAV = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "services", key: "nav.services" },
  { id: "why", key: "nav.why" },
  { id: "process", key: "nav.process" },
  { id: "contact", key: "nav.contact" },
];

function HomePage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <BackToTop />
      <CookieBanner />
    </>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary"
      />
    </motion.div>
  );
}

function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`inline-flex items-center gap-1 rounded-full glass p-1 ${compact ? "text-xs" : "text-sm"}`}>
      {(["hu", "ro"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-label={`Switch to ${l.toUpperCase()}`}
          className={`rounded-full px-3 py-1 font-semibold transition-colors ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
      const mid = window.scrollY + window.innerHeight / 3;
      for (const s of sections) {
        if (s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <button onClick={() => go("home")} className="flex items-center gap-2" aria-label="Home">
          <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="text-left leading-tight">
            <div className="font-display text-sm font-bold">ITP Paizs</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">DNS Auto</div>
          </div>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(item.key)}
              {active === item.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-full glass"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="hidden btn-primary items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {t("nav.call")}
          </a>
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-full glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4 py-4">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-foreground hover:bg-accent"
                >
                  {t(item.key)}
                </button>
              ))}
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="btn-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" />
                {t("nav.call")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* -------------------- Hero -------------------- */
function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="home"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* animated orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.68 0.18 245 / 0.35)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "oklch(0.78 0.16 210 / 0.28)" }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary-glow">
            <BadgeCheck className="h-4 w-4" />
            {t("hero.badge")}
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">{t("hero.title")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
            >
              <CalendarCheck className="h-5 w-5" />
              {t("hero.cta1")}
            </a>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
            >
              <Phone className="h-5 w-5" />
              {t("hero.cta2")}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 hidden items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground sm:flex"
        >
          <span>{t("hero.scroll")}</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Section wrapper -------------------- */
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="inline-block rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow"
    >
      {children}
    </motion.span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
    >
      {children}
    </motion.h2>
  );
}

/* -------------------- About -------------------- */
function About() {
  const { t } = useI18n();
  const features = [
    { icon: ShieldCheck, t: "about.f1t", d: "about.f1d" },
    { icon: BadgeCheck, t: "about.f2t", d: "about.f2d" },
    { icon: Wrench, t: "about.f3t", d: "about.f3d" },
    { icon: FileCheck2, t: "about.f4t", d: "about.f4d" },
  ];
  return (
    <Section id="about">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Kicker>{t("about.kicker")}</Kicker>
          <SectionTitle>{t("about.title")}</SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 space-y-5 text-lg text-muted-foreground"
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </motion.div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: "var(--gradient-primary)" }}
              >
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t(f.t)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(f.d)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- Services -------------------- */
function Services() {
  const { t } = useI18n();
  const items = [
    { icon: Car, k: "cars" },
    { icon: Bike, k: "moto" },
    { icon: Truck, k: "trucks" },
    { icon: Caravan, k: "trailers" },
    { icon: Tractor, k: "agri" },
    { icon: Package, k: "comm" },
  ];
  return (
    <Section id="services">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("services.kicker")}</Kicker>
        <SectionTitle>{t("services.title")}</SectionTitle>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          {t("services.subtitle")}
        </motion.p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass p-8 transition-shadow hover:shadow-[var(--shadow-glow)]"
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              <it.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">{t(`services.items.${it.k}.t`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(`services.items.${it.k}.d`)}
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow transition-transform hover:translate-x-1"
            >
              {t("services.cta")} →
            </a>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Why Us -------------------- */
function WhyUs() {
  const { t } = useI18n();
  const items = [
    { icon: BadgeCheck, k: "i1" },
    { icon: Wrench, k: "i2" },
    { icon: Timer, k: "i3" },
    { icon: Wallet, k: "i4" },
    { icon: Smile, k: "i5" },
    { icon: ShieldCheck, k: "i6" },
  ];
  return (
    <Section id="why">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("why.kicker")}</Kicker>
        <SectionTitle>{t("why.title")}</SectionTitle>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.k}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex items-start gap-4 rounded-2xl glass p-6"
          >
            <div
              className="shrink-0 grid h-11 w-11 place-items-center rounded-xl"
              style={{ background: "color-mix(in oklab, var(--primary) 20%, transparent)" }}
            >
              <it.icon className="h-5 w-5 text-primary-glow" />
            </div>
            <div>
              <h3 className="font-semibold">{t(`why.items.${it.k}.t`)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`why.items.${it.k}.d`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Process -------------------- */
function Process() {
  const { t } = useI18n();
  const steps = [
    { icon: CalendarCheck, k: "s1" },
    { icon: Search, k: "s2" },
    { icon: Disc3, k: "s3" },
    { icon: Wind, k: "s4" },
    { icon: FileCheck2, k: "s5" },
    { icon: BadgeCheck, k: "s6" },
  ];
  return (
    <Section id="process">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("process.kicker")}</Kicker>
        <SectionTitle>{t("process.title")}</SectionTitle>
      </div>
      <div className="relative mt-16">
        <div aria-hidden className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent lg:block" />
        <ol className="space-y-8 lg:space-y-16">
          {steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={s.k}
                initial={{ opacity: 0, x: left ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid gap-6 lg:grid-cols-2 lg:items-center ${left ? "" : "lg:[&>*:first-child]:order-2"}`}
              >
                <div className={`glass rounded-2xl p-6 ${left ? "lg:mr-10 lg:text-right" : "lg:ml-10"}`}>
                  <div className={`flex items-center gap-4 ${left ? "lg:flex-row-reverse" : ""}`}>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                      <s.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className={left ? "lg:text-right" : ""}>
                      <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">{String(i + 1).padStart(2, "0")}</div>
                      <h3 className="mt-1 text-lg font-semibold">{t(`process.steps.${s.k}.t`)}</h3>
                    </div>
                  </div>
                  <p className={`mt-3 text-sm text-muted-foreground whitespace-pre-wrap ${left ? "lg:text-right" : ""}`}>{t(`process.steps.${s.k}.d`)}</p>
                </div>
                <div aria-hidden className="hidden lg:block" />
                <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }} />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

/* -------------------- Stats -------------------- */
function Stats() {
  const { t } = useI18n();
  const items = [
    { to: 25000, suffix: "+", label: "stats.s1" },
    { to: 25, suffix: "+", label: "stats.s2" },
    { to: 98, suffix: "%", label: "stats.s3" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl glass-strong px-6 py-14 sm:px-12"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div className="grid gap-10 text-center sm:grid-cols-3">
            {items.map((s) => (
              <div key={s.label}>
                <div className="text-5xl font-bold tracking-tight gradient-text sm:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonials -------------------- */
function Testimonials() {
  const { t } = useI18n();
  const items = ["t1", "t2", "t3"];
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("testimonials.kicker")}</Kicker>
        <SectionTitle>{t("testimonials.title")}</SectionTitle>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((k, i) => (
          <motion.figure
            key={k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex gap-1 text-primary-glow">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed text-foreground">
              “{t(`testimonials.items.${k}.q`)}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold"
                style={{ background: "var(--gradient-primary)", color: "var(--primary-foreground)" }}
              >
                {t(`testimonials.items.${k}.n`).charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold">{t(`testimonials.items.${k}.n`)}</div>
                <div className="text-xs text-muted-foreground">{t(`testimonials.items.${k}.r`)}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- FAQ -------------------- */
function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>("q1");
  const keys = ["q1", "q2", "q3", "q4", "q5", "q6"];
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("faq.kicker")}</Kicker>
        <SectionTitle>{t("faq.title")}</SectionTitle>
      </div>
      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {keys.map((k) => {
          const isOpen = open === k;
          return (
            <div key={k} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(isOpen ? null : k)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold">{t(`faq.items.${k}.q`)}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5 text-primary-glow" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {t(`faq.items.${k}.a`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------- Contact -------------------- */
function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("contact.form.errors.name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t("contact.form.errors.email");
    if (form.phone && !/^[+\d\s()-]{6,}$/.test(form.phone)) e.phone = t("contact.form.errors.phone");
    if (form.message.trim().length < 10) e.message = t("contact.form.errors.message");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 900);
  };

  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <Kicker>{t("contact.kicker")}</Kicker>
        <SectionTitle>{t("contact.title")}</SectionTitle>
        <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <InfoRow icon={Phone} label={t("contact.phone")} value={CONTACT.phone} href={`tel:${CONTACT.phoneRaw}`} />
          <InfoRow icon={Mail} label={t("contact.email")} value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
          <InfoRow icon={MapPin} label={t("contact.address")} value={t("contact.addressValue")} />
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "color-mix(in oklab, var(--primary) 20%, transparent)" }}>
                <Clock className="h-5 w-5 text-primary-glow" />
              </div>
              <div className="text-sm font-semibold">{t("contact.hours")}</div>
            </div>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-muted-foreground">{t("contact.hoursValue")}</pre>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl glass">
            <iframe
              title="Google Maps — Târgu Secuiesc"
              src="https://www.google.com/maps?q=Targu+Secuiesc,+Romania&output=embed"
              width="100%"
              height="240"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("contact.form.name")} error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("contact.form.namePh")}
                className="w-full rounded-xl bg-input px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                aria-invalid={!!errors.name}
              />
            </Field>
            <Field label={t("contact.form.email")} error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t("contact.form.emailPh")}
                className="w-full rounded-xl bg-input px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                aria-invalid={!!errors.email}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label={t("contact.form.phone")} error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={t("contact.form.phonePh")}
                className="w-full rounded-xl bg-input px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                aria-invalid={!!errors.phone}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label={t("contact.form.message")} error={errors.message}>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("contact.form.messagePh")}
                className="w-full resize-none rounded-xl bg-input px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                aria-invalid={!!errors.message}
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {t("contact.form.submit")}
          </button>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary-glow"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t("contact.form.success")}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </Section>
  );
}

function InfoRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4 glass rounded-2xl p-5 transition-transform hover:-translate-y-0.5">
      <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "color-mix(in oklab, var(--primary) 20%, transparent)" }}>
        <Icon className="h-5 w-5 text-primary-glow" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold whitespace-pre-wrap">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : content;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold">ITP Paizs DNS Auto SRL</div>
              <div className="text-xs text-muted-foreground">Târgu Secuiesc · Kézdivásárhely</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <div className="mt-6 flex gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full glass">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full glass">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} aria-label="Phone" className="grid h-10 w-10 place-items-center rounded-full glass">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("footer.quickLinks")}</div>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-foreground/80 transition hover:text-primary-glow">{t(n.key)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("footer.contact")}</div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex items-start gap-2 whitespace-pre-wrap"><Phone className="mt-1 h-4 w-4 shrink-0 text-primary-glow" /> {CONTACT.phoneFooter}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary-glow" /> {CONTACT.email}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-glow" />&nbsp;str.Garii, nr.49/ A Târgu Secuiesc</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <div>© {new Date().getFullYear()} ITP Paizs DNS Auto SRL. {t("footer.rights")}</div>
        <div className="flex items-center gap-1">
          <Globe className="h-3 w-3" /> {t("footer.made")}
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Floating buttons -------------------- */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 left-4 z-40 flex flex-col gap-3 sm:left-6">
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.35, type: "spring", stiffness: 260, damping: 20 }}
        href={`tel:${CONTACT.phoneRaw}`}
        aria-label="Call"
        className="grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-lg transition-transform hover:scale-110"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </div>
  );
}

function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("backToTop")}
          className="fixed bottom-6 right-4 z-40 grid h-12 w-12 place-items-center rounded-full glass-strong text-foreground shadow-lg transition-transform hover:scale-110 sm:right-6"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Cookie banner -------------------- */
function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);
  const close = (v: string) => {
    localStorage.setItem("cookie-consent", v);
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl glass-strong p-4 shadow-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{t("cookie.text")}</p>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => close("declined")} className="btn-ghost rounded-full px-4 py-2 text-xs font-semibold">
                {t("cookie.decline")}
              </button>
              <button onClick={() => close("accepted")} className="btn-primary rounded-full px-4 py-2 text-xs font-semibold">
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
