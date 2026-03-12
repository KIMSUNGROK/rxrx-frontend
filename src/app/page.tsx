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
              AI-POWERED DRUG DISCOVERY
            </span>
          </div>

          {/* Title - responsive size using clamp */}
          <h1 className="animate-fade-in-up [animation-delay:400ms] opacity-0 fill-mode-forwards font-['Syne'] text-[clamp(26px,4.1vw,51px)] font-[800] leading-[1.06] tracking-[-0.035em] text-[#1a1a2e] mb-6">
            Pioneering <span className="text-gradient-primary">TechBio</span> Solutions
            <br /> in Drug Discovery
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

      {/* 3. MISSION SECTION */}
      <section className="bg-[#f8f8fa] py-32 relative z-10" id="platform">
        <ScrollReveal>
          <div className="max-w-[760px] mx-auto px-6 text-center">
            <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-6">OUR MISSION</span>
            <h2 className="font-['Syne'] text-[clamp(26px,3.5vw,44px)] font-[700] tracking-[-0.02em] text-[#1a1a2e] leading-[1.15] mb-8">
              Decoding biology to rapidly discover <br />
              <span className="text-gradient-expanded">novel insights</span> and treatments.
            </h2>
            <div className="font-['DM_Mono'] text-[13.5px] text-[#6b7280] leading-[1.85] space-y-6 max-w-2xl mx-auto">
              <p>
                By treating drug discovery as an engineering problem rather than a scientific one, we leverage our proprietary automated wet labs alongside vast computational power.
              </p>
              <p>
                This industrialized approach allows us to map the precise relationships between millions of biological perturbations, transforming the search for medicines from trial-and-error to a predictive science.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* 5. TECHNOLOGY CARDS SECTION */}
      <section className="bg-[#f8f8fa] py-32 relative z-10">
        <div className="max-w-[960px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">TECHNOLOGY</span>
              <h2 className="font-['Syne'] text-[36px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">The OS for Drug Discovery</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⛁",
                title: "Massive Data",
                desc: "50+ petabytes of highly-relatable, biological and chemical data generated in-house.",
                color: "#1a9e96" // Data = Teal
              },
              {
                icon: "⎔",
                title: "Advanced Models",
                desc: "Foundation models mapping relationships between genes, compounds, and disease states.",
                color: "#2d7dd2" // Models = Blue
              },
              {
                icon: "⚡",
                title: "Super Compute",
                desc: "BioHive-1 and BioHive-2 ranked among the fastest supercomputers entirely dedicated to biology.",
                color: "#6c5ce7" // Compute = Purple
              }
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white rounded-xl p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_10px_rgba(0,0,0,0.02)] card-hover-glow group">
                  <div 
                    className="text-[28px] mb-5 transition-colors"
                    style={{ color: '#8895a7' }}
                  >
                    <span className="group-hover:hidden">{card.icon}</span>
                    <span className="hidden group-hover:inline" style={{ color: card.color }}>{card.icon}</span>
                  </div>
                  <h3 className="font-['Syne'] text-[20px] font-[700] text-[#1a1a2e] mb-3 group-hover:text-black transition-colors">{card.title}</h3>
                  <p className="font-['DM_Mono'] text-[13px] text-[#6b7280] leading-[1.6]">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
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
