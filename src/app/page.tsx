import ParticleBackground from "@/components/ParticleBackgroundWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

export const revalidate = 60;

export default async function Home() {

  return (
    <div className="relative w-full bg-[#f8f8fa] overflow-hidden">
      {/* 1. HERO SECTION (100vh) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center pt-16">
        <ParticleBackground />

        {/* Hero Overlays */}
        <div className="absolute inset-0 pointer-events-none z-0 hero-vignette" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-0 hero-bottom-fade" />

        {/* Hero Content */}
        <div className="relative z-10 text-center flex flex-col items-center px-4 sm:px-6 w-full max-w-4xl mx-auto">
          {/* Label */}
          <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
            <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.35em] text-[#1a9e96] font-medium mb-6 block">
              RECURSION PHARMACEUTICALS
            </span>
          </div>

          {/* Title - responsive size using clamp */}
          <h1 className="animate-fade-in-up [animation-delay:400ms] opacity-0 fill-mode-forwards font-['Syne'] text-[clamp(24px,3.8vw,46px)] font-[800] leading-[1.15] tracking-[-0.035em] text-[#1a1a2e] mb-6">
            리커전 파마슈티컬스
            <br /><span className="text-gradient-primary">한국인 투자 커뮤니티</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-in-up [animation-delay:600ms] opacity-0 fill-mode-forwards font-['DM_Mono'] text-[13.5px] text-[#8895a7] leading-[1.75] max-w-[480px] mb-10">
            Mapping and navigating biology to discover extraordinary entirely new medicines through artificial intelligence and massively parallel experiments.
          </p>


        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-pulse opacity-60">
          <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-[#8895a7]">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#8895a7] to-transparent" />
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white border-y border-[rgba(0,0,0,0.04)] py-16 relative z-10">
        <div className="max-w-[880px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 text-center divide-x-0 md:divide-x divide-[rgba(0,0,0,0.04)]">
            <ScrollReveal delay={0}>
              <div className="text-[44px] font-[700] font-['Syne'] text-gradient-primary mb-2">
                <CountUp end={50} prefix="" suffix="+" />
              </div>
              <div className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8895a7]">Petabytes of Data</div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-[44px] font-[700] font-['Syne'] text-gradient-primary mb-2">
                <CountUp end={7} prefix="" suffix="" />
              </div>
              <div className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8895a7]">Clinical Programs</div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-[44px] font-[700] font-['Syne'] text-gradient-primary mb-2">
                <CountUp end={90} prefix="" suffix="%" />
              </div>
              <div className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8895a7]">Time Saved</div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-[44px] font-[700] font-['Syne'] text-gradient-primary mb-2">
                <CountUp end={2} prefix="" suffix="M+" />
              </div>
              <div className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8895a7]">Experiments / Week</div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Global utility animation classes appended dynamically */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fill-mode-forwards {
          animation-fill-mode: forwards;
        }
      `}} />
    </div>
  );
}
