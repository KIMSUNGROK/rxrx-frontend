import ParticleBackground from "@/components/ParticleBackgroundWrapper";
import ScrollReveal from "@/components/ScrollReveal";

export default function PipelinePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[420px] overflow-hidden pointer-events-none">
        <ParticleBackground />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] hero-bottom-fade" />
      </div>

      <div className="relative z-10 max-w-[880px] mx-auto px-6 py-10 pt-16">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">PIPELINE</span>
            <h2 className="font-['Syne'] text-[36px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">Broad & Deep Pipeline</h2>
          </div>
        </ScrollReveal>
        
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm rounded-2xl p-6 sm:p-8">
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_260px] gap-6 border-b border-gray-100 pb-3 mb-4 hidden md:grid">
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#aab0bc]">Area</div>
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#aab0bc]">Indication</div>
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#aab0bc] flex justify-between">
                <span>Discovery</span>
                <span>Phase 2</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3">
              {[
                { area: "Oncology", indication: "REC-4881 (FAP)", progress: 85, color: "#1a9e96" },
                { area: "Rare", indication: "REC-2282 (NF2)", progress: 70, color: "#00b894" },
                { area: "Rare", indication: "REC-994 (CCM)", progress: 95, color: "#00b894" },
                { area: "Oncology", indication: "REC-3964 (C. Diff)", progress: 40, color: "#1a9e96" },
                { area: "Mapping", indication: "Fibrosis Target ID", progress: 20, color: "#2d7dd2" },
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 70}>
                  <div className="group flex flex-col md:grid md:grid-cols-[100px_1fr_260px] gap-2 md:gap-6 py-4 px-4 bg-white/30 hover:bg-white/60 border border-transparent hover:border-gray-100 rounded-lg transition-colors items-start md:items-center">
                    <div>
                      <span className="font-['DM_Mono'] text-[11px] font-medium px-2 py-1 rounded" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                        {item.area}
                      </span>
                    </div>
                    <div className="font-['DM_Mono'] text-[13px] font-medium text-[#1a1a2e]">
                      {item.indication}
                    </div>
                    <div className="w-full mt-2 md:mt-0 relative">
                      <div className="w-full h-[5px] bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out phase-bar" 
                          style={{ 
                            width: `${item.progress}%`, 
                            backgroundColor: item.color,
                            boxShadow: `0 0 10px ${item.color}40`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
