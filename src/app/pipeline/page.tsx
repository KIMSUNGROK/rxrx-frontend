import ParticleBackground from "@/components/ParticleBackgroundWrapper";
import ScrollReveal from "@/components/ScrollReveal";

const PHASES = ["Late Discovery", "Preclinical", "Phase 1/2", "Pivotal/Phase 3"];

const PIPELINE_DATA = [
  {
    name: "REC-4881",
    target: "MEK1/2",
    indication: "Familial adenomatous polyposis",
    progress: 88,
    color: "#1a9e96",
  },
  {
    name: "REC-617",
    target: "CDK7",
    indication: "Advanced solid tumors",
    progress: 72,
    color: "#1a9e96",
  },
  {
    name: "REC-1245",
    target: "RBM39",
    indication: "Biomarker-enriched solid tumors and lymphoma",
    progress: 65,
    color: "#1a9e96",
  },
  {
    name: "REC-3565",
    target: "MALT1",
    indication: "B-cell malignancies",
    progress: 60,
    color: "#1a9e96",
  },
  {
    name: "REC-4539",
    target: "LSD1",
    indication: "Solid tumors and hematology oncology",
    progress: 58,
    color: "#1a9e96",
  },
  {
    name: "REC-7735",
    target: "PI3Kα H1047R",
    indication: "Solid tumors incl. HR+ breast cancer",
    progress: 40,
    color: "#2d7dd2",
  },
  {
    name: "REC-102",
    target: "ENPP1",
    indication: "Hypophosphatasia",
    progress: 35,
    color: "#6c5ce7",
  },
];

export default function PipelinePage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[420px] overflow-hidden pointer-events-none">
        <ParticleBackground />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] hero-bottom-fade" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-10 pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">파이프라인</h1>
        </div>

        <ScrollReveal>
          <div className="mb-10">
            <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">THERAPEUTIC PIPELINE</span>
            <h2 className="font-['Syne'] text-[32px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">임상 파이프라인</h2>
            <p className="font-['DM_Mono'] text-[13px] text-[#6b7280] mt-3 leading-[1.7]">
              Recursion은 AI 기반 신약 발견 플랫폼을 통해 다양한 질환에 대한 치료제를 개발하고 있습니다.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm rounded-2xl p-6 sm:p-8 overflow-x-auto">
          {/* Phase Header */}
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[90px_100px_200px_1fr] gap-4 items-end border-b border-gray-200 pb-3 mb-2">
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#8895a7] font-semibold"></div>
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#8895a7] font-semibold">Target</div>
              <div className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#8895a7] font-semibold">Disease Indication</div>
              <div className="grid grid-cols-4 gap-0">
                {PHASES.map((phase) => (
                  <div key={phase} className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.1em] text-[#aab0bc] text-center font-medium">
                    {phase}
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Grid Lines */}
            <div className="flex flex-col gap-0">
              {PIPELINE_DATA.map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 60}>
                  <div className="grid grid-cols-[90px_100px_200px_1fr] gap-4 py-4 px-2 hover:bg-white/60 rounded-lg transition-colors items-center border-b border-gray-50 last:border-b-0">
                    {/* Name */}
                    <div className="font-['DM_Mono'] text-[13px] font-bold text-[#1a1a2e]">
                      {item.name}
                    </div>
                    {/* Target */}
                    <div className="font-['DM_Mono'] text-[12px] font-semibold text-[#1a1a2e]">
                      {item.target}
                    </div>
                    {/* Indication */}
                    <div className="font-['DM_Mono'] text-[11.5px] text-[#6b7280] leading-[1.4]">
                      {item.indication}
                    </div>
                    {/* Progress Bar with Phase Grid */}
                    <div className="relative">
                      {/* Phase divider lines */}
                      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                        {PHASES.map((_, i) => (
                          <div key={i} className={`${i < PHASES.length - 1 ? 'border-r border-gray-100' : ''}`} />
                        ))}
                      </div>
                      {/* Bar */}
                      <div className="w-full h-[8px] bg-gray-50 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full rounded-full phase-bar" 
                          style={{ 
                            width: `${item.progress}%`, 
                            background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`,
                            boxShadow: `0 0 12px ${item.color}30`
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

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1a9e96" }} />
            <span className="font-['DM_Mono'] text-[10px] text-[#8895a7] uppercase tracking-wider">Oncology</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#2d7dd2" }} />
            <span className="font-['DM_Mono'] text-[10px] text-[#8895a7] uppercase tracking-wider">Oncology (PI3Kα)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6c5ce7" }} />
            <span className="font-['DM_Mono'] text-[10px] text-[#8895a7] uppercase tracking-wider">Rare Disease</span>
          </div>
        </div>
      </div>
    </div>
  );
}
