import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Bell,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Play,
  Share2,
  Users,
  Video,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useChannelInfo } from "./hooks/useQueries";

const CHANNEL_URL = "https://youtube.com/@new.raistarbhai?feature=shared";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function PlayButton() {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-pulse-ring" />
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-yt-red shadow-yt-glow-lg">
        <Play className="w-8 h-8 text-white fill-white ml-1" />
      </div>
    </motion.div>
  );
}

function SubscribeButton({
  size = "default",
  className = "",
  ocid,
}: {
  size?: "default" | "lg" | "sm";
  className?: string;
  ocid: string;
}) {
  return (
    <Button
      asChild
      size={size}
      className={`bg-yt-red hover:bg-yt-red-hover text-white font-display font-bold tracking-wide shadow-yt-glow transition-all duration-300 hover:scale-105 hover:shadow-yt-glow-lg ${className}`}
      data-ocid={ocid}
    >
      <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
        <Bell className="w-4 h-4 mr-2" />
        Subscribe Now
      </a>
    </Button>
  );
}

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Channel link copied!", {
        description: "Share it with your friends!",
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors duration-200 text-sm font-body text-muted-foreground hover:text-foreground border border-border"
      aria-label="Copy channel link"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-green-600"
          >
            <Check className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}

function Header({ channelName }: { channelName: string }) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 backdrop-blur-md bg-white/90 border-b border-border shadow-xs"
    >
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
        data-ocid="nav.channel_link"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-yt-red/20 group-hover:ring-yt-red transition-all duration-300">
          <img
            src="/assets/generated/raistarbhai-avatar-transparent.dim_200x200.png"
            alt={channelName}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-display font-bold text-lg text-foreground tracking-tight hidden sm:block">
          {channelName}
        </span>
      </a>

      <nav className="flex items-center gap-2">
        <a
          href="#about"
          className="hidden md:inline-flex text-sm font-body text-muted-foreground hover:text-foreground transition-colors px-3 py-1"
        >
          About
        </a>
        <a
          href="#stats"
          className="hidden md:inline-flex text-sm font-body text-muted-foreground hover:text-foreground transition-colors px-3 py-1"
        >
          Features
        </a>
        <SubscribeButton size="sm" ocid="nav.subscribe_button" />
      </nav>
    </motion.header>
  );
}

function HeroSection({ channelName }: { channelName: string }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/generated/hero-bg.dim_1600x900.jpg)",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-yt-dark/80" />
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative red gradient blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-yt-red/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
      >
        {/* Avatar */}
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-yt-red shadow-yt-glow-lg mx-auto animate-float">
              <img
                src="/assets/generated/raistarbhai-avatar-transparent.dim_200x200.png"
                alt={`${channelName} channel avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Live badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <Badge className="bg-yt-red text-white text-xs font-display font-bold px-2 py-0.5 shadow-yt-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5 inline-block" />
                YOUTUBE
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Channel name */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display font-black text-5xl md:text-7xl text-white tracking-tight leading-none mb-4"
        >
          new.
          <span className="text-yt-red">raistarbhai</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          custom={2}
          className="font-body text-lg md:text-xl text-white/70 max-w-xl mb-3"
        >
          Your go-to destination for amazing content
        </motion.p>

        {/* Social proof */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-1.5 text-white/60 text-sm font-body">
            <Users className="w-4 h-4" />
            <span>Growing community</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1.5 text-white/60 text-sm font-body">
            <Video className="w-4 h-4" />
            <span>Quality videos</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1.5 text-white/60 text-sm font-body">
            <Zap className="w-4 h-4" />
            <span>Regular uploads</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-yt-red hover:bg-yt-red-hover text-white font-display font-bold text-base px-8 py-6 shadow-yt-glow-lg transition-all duration-300 hover:scale-105 hover:shadow-yt-glow-lg rounded-full"
            data-ocid="hero.subscribe_button"
          >
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Bell className="w-5 h-5 mr-2" />
              Subscribe Now
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 hover:border-white font-display font-bold text-base px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-full bg-transparent"
            data-ocid="hero.watch_button"
          >
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Play className="w-5 h-5 mr-2 fill-white" />
              Watch Now
            </a>
          </Button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={fadeUp}
          custom={6}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
          >
            <span className="text-xs font-body tracking-widest uppercase">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection({
  bio,
  channelName,
}: { bio: string; channelName: string }) {
  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section label */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-yt-red rounded-full" />
            <span className="text-sm font-display font-bold tracking-[0.15em] uppercase text-yt-red">
              About
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-black text-4xl md:text-5xl text-foreground mb-12 leading-tight"
          >
            About the Channel
          </motion.h2>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            {/* Bio card */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-xs hover:shadow-card-hover transition-shadow duration-300">
              {/* Avatar + name header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-yt-red/30">
                  <img
                    src="/assets/generated/raistarbhai-avatar-transparent.dim_200x200.png"
                    alt={channelName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-foreground">
                    {channelName}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    YouTube Creator
                  </p>
                </div>
              </div>

              <p className="font-body text-base leading-relaxed text-foreground/80 mb-6">
                {bio}
              </p>

              {/* Channel link */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/60 border border-border">
                <Youtube className="w-4 h-4 text-yt-red flex-shrink-0" />
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-foreground/70 hover:text-yt-red transition-colors truncate flex-1 underline-offset-2 hover:underline"
                  data-ocid="about.channel_link"
                >
                  youtube.com/@new.raistarbhai
                </a>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              </div>
            </div>

            {/* Play button + visual */}
            <div className="flex flex-col items-center justify-center gap-8 py-8">
              <PlayButton />
              <p className="text-center font-body text-muted-foreground text-sm max-w-xs">
                Click play to start watching incredible content from{" "}
                <strong className="text-foreground">{channelName}</strong>
              </p>
              <Button
                asChild
                variant="outline"
                className="border-yt-red text-yt-red hover:bg-yt-red hover:text-white font-display font-bold transition-all duration-300 rounded-full px-6"
              >
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Channel
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Video,
    title: "Amazing Content",
    description:
      "Handcrafted videos that entertain, educate, and inspire. Every upload is made with passion and dedication to quality.",
    color: "text-yt-red",
    bg: "bg-yt-red/8",
  },
  {
    icon: Zap,
    title: "Regular Uploads",
    description:
      "Consistent content drops so you always have something fresh to watch. Never miss an upload by subscribing with notifications on.",
    color: "text-amber-500",
    bg: "bg-amber-500/8",
  },
  {
    icon: Users,
    title: "Growing Community",
    description:
      "Join thousands of viewers who are already part of the family. Engage, comment, and share in an active, welcoming community.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/8",
  },
];

function StatsSection() {
  return (
    <section id="stats" className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-yt-red rounded-full" />
              <span className="text-sm font-display font-bold tracking-[0.15em] uppercase text-yt-red">
                Why Subscribe
              </span>
              <div className="w-8 h-0.5 bg-yt-red rounded-full" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight">
              What Makes Us Special
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i + 1}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-yt-red/30 hover:shadow-card-hover transition-all duration-300 cursor-default"
                data-ocid={`stats.item.${i + 1}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-5`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      id="subscribe"
      className="py-24 px-4 bg-yt-dark relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yt-red/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yt-red/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* YouTube icon */}
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yt-red shadow-yt-glow-lg">
              <Youtube className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-black text-5xl md:text-6xl text-white leading-tight mb-4"
          >
            Don't Miss Out!
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-body text-lg text-white/60 max-w-lg mx-auto mb-10"
          >
            Subscribe now and never miss a video. Hit the notification bell so
            you're always the first to know when new content drops.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-yt-red hover:bg-yt-red-hover text-white font-display font-bold text-base px-10 py-6 shadow-yt-glow-lg transition-all duration-300 hover:scale-105 rounded-full w-full sm:w-auto"
              data-ocid="cta.subscribe_button"
            >
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Bell className="w-5 h-5 mr-2" />
                Subscribe Now
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 font-display font-bold text-base px-8 py-6 transition-all duration-300 rounded-full w-full sm:w-auto"
            >
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Share2 className="w-5 h-5 mr-2" />
                Share Channel
              </a>
            </Button>
          </motion.div>

          {/* Channel link display */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm">
              <Youtube className="w-4 h-4 text-yt-red flex-shrink-0" />
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/60 hover:text-white transition-colors"
                data-ocid="cta.channel_link"
              >
                youtube.com/@new.raistarbhai
              </a>
            </div>
            <CopyButton url={CHANNEL_URL} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-yt-dark border-t border-white/5 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-yt-red/30">
            <img
              src="/assets/generated/raistarbhai-avatar-transparent.dim_200x200.png"
              alt="new.raistarbhai"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-white/80 text-sm">
            new.raistarbhai
          </span>
        </div>

        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-body text-white/40 hover:text-yt-red transition-colors"
          data-ocid="footer.channel_link"
        >
          <Youtube className="w-4 h-4" />
          youtube.com/@new.raistarbhai
          <ExternalLink className="w-3 h-3" />
        </a>

        <p className="text-xs font-body text-white/30">
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const { data: channelInfo } = useChannelInfo();

  const channelName = channelInfo?.channelName ?? "new.raistarbhai";
  const bio =
    channelInfo?.bio ??
    "Welcome to new.raistarbhai! We create engaging, entertaining, and informative videos for our amazing community. From trending topics to in-depth tutorials, there's something for everyone. Join thousands of viewers and be part of our growing family!";

  return (
    <div className="min-h-screen flex flex-col">
      <Header channelName={channelName} />

      <main className="flex-1">
        <HeroSection channelName={channelName} />
        <AboutSection bio={bio} channelName={channelName} />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
