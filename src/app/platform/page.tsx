import ParticleBackground from "@/components/ParticleBackgroundWrapper";
import ScrollReveal from "@/components/ScrollReveal";

export default function PlatformPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[420px] overflow-hidden pointer-events-none">
        <ParticleBackground />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] hero-bottom-fade" />
      </div>

      <div className="relative z-10 max-w-[960px] mx-auto px-6 py-10 pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">플랫폼</h1>
        </div>

        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">기술 플랫폼</span>
            <h2 className="font-['Syne'] text-[36px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">신약 발견을 위한 운영 체제</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "⛁",
              title: "대규모 데이터",
              desc: "50+ 페타바이트 이상의 자체 생산된 생물학 및 화학 데이터를 축적하고 있으며, 높은 연관성을 가진 데이터를 기반으로 신약 후보를 탐색합니다.",
              color: "#1a9e96"
            },
            {
              icon: "⎔",
              title: "첨단 AI 모델",
              desc: "유전자, 화합물, 질병 상태 간의 관계를 매핑하는 파운데이션 모델을 구축하여, 기존 방식으로는 발견하기 어려운 치료제 후보를 식별합니다.",
              color: "#2d7dd2"
            },
            {
              icon: "⚡",
              title: "슈퍼 컴퓨팅",
              desc: "BioHive-1과 BioHive-2는 생물학 전용 슈퍼컴퓨터 중 세계 최고 수준의 성능을 자랑하며, 대규모 연산을 가능하게 합니다.",
              color: "#6c5ce7"
            }
          ].map((card, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-white/40 shadow-[0_2px_10px_rgba(0,0,0,0.02)] card-hover-glow group">
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
    </div>
  );
}
