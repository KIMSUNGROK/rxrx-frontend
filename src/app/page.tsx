import ParticleBackground from "@/components/ParticleBackgroundWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import { fetchLatest, fetchDaily, LatestPrice, StockPrice } from "@/lib/api";
import TradingViewWidget from "@/components/TradingViewWidget";
import StockTable from "@/components/StockTable";

export const revalidate = 60;

export default async function Home() {
  // === Dashboard Data Fetching ===
  let latest: LatestPrice | null = null;
  let dailyData: StockPrice[] = [];

  try {
    const [latestRes, dailyRes] = await Promise.all([
      fetchLatest(),
      fetchDaily(200), // dashboard의 200개 데이터 가져오기 통합
    ]);
    latest = latestRes.data;
    dailyData = dailyRes.data || [];
  } catch (e) {
    console.error("Failed to fetch data:", e);
  }

  const changePct = latest?.change_pct;
  const changeColor =
    changePct && changePct > 0
      ? "text-emerald-600"
      : changePct && changePct < 0
      ? "text-red-600"
      : "text-gray-500";

  const changeSign = changePct && changePct > 0 ? "+" : "";

  const closes = dailyData.map((d) => d.close);
  const latestPriceVal = closes.length > 0 ? closes[closes.length - 1] : 0;
  
  const previousClose = latest && latest.change !== null ? latest.close - latest.change : latestPriceVal;
  const todayOpen = dailyData.length > 0 ? dailyData[dailyData.length - 1].open : 0;
  const todayHigh = dailyData.length > 0 ? dailyData[dailyData.length - 1].high : 0;
  const todayLow = dailyData.length > 0 ? dailyData[dailyData.length - 1].low : 0;
  const todayVolume = dailyData.length > 0 ? dailyData[dailyData.length - 1].volume : 0;
  
  const highs = dailyData.map((d) => d.high);
  const lows = dailyData.map((d) => d.low);
  const high52 = highs.length > 0 ? Math.max(...highs) : 0;
  const low52 = lows.length > 0 ? Math.min(...lows) : 0;
  // ===============================

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

      {/* 4. PIPELINE SECTION */}
      <section className="bg-white py-32 border-y border-[rgba(0,0,0,0.04)] relative z-10" id="pipeline">
        <div className="max-w-[880px] mx-auto px-6">
          <ScrollReveal>
            <div className="mb-12">
              <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">PIPELINE</span>
              <h2 className="font-['Syne'] text-[36px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">Broad & Deep Pipeline</h2>
            </div>
          </ScrollReveal>
          
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
                  <div className="group flex flex-col md:grid md:grid-cols-[100px_1fr_260px] gap-2 md:gap-6 py-4 px-4 bg-[#f8f8fa]/50 hover:bg-white border border-transparent hover:border-gray-100 rounded-lg transition-colors items-start md:items-center">
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

      {/* 6. ORIGINAL STOCK DASHBOARD APPENDED HERE */}
      <section className="bg-white py-24 relative z-10 border-t border-[rgba(0,0,0,0.04)]" id="dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#1a9e96] block mb-4">STOCK OVERVIEW</span>
              <h2 className="font-['Syne'] text-[36px] font-[700] tracking-[-0.02em] text-[#1a1a2e]">Market Performance</h2>
            </div>
          </ScrollReveal>

          {/* Header */}
          <div className="mb-10 mt-6">
            <div className="flex justify-between items-end">
              <div className="flex items-baseline gap-3">
                <h1 className="font-['Syne'] text-[36px] font-[800] text-[#1a1a2e] tracking-[-0.02em]">RXRX</h1>
                <span className="font-['DM_Mono'] text-[14px] text-[#8895a7]">Recursion Pharmaceuticals</span>
                <span className="bg-[rgba(26,158,150,0.08)] text-[#1a9e96] border border-[rgba(26,158,150,0.15)] font-['DM_Mono'] text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider">
                  NASDAQ
                </span>
              </div>
            </div>
            {latest && (
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-['Syne'] text-[48px] font-[800] text-[#1a1a2e] tracking-[-0.02em]">
                  ${latest.close?.toFixed(2)}
                </span>
                <span className={`text-2xl font-semibold ${changeColor}`}>
                  {changeSign}
                  {changePct?.toFixed(2)}%
                </span>
                {latest.change !== null && (
                  <span className={`text-xl ${changeColor} opacity-90`}>
                    ({changeSign}${Math.abs(latest.change).toFixed(2)})
                  </span>
                )}
                <span className="font-['DM_Mono'] text-[11px] text-[#aab0bc] ml-3">
                  {latest.trade_date} 기준
                </span>
              </div>
            )}
          </div>

          {/* Detailed Stock Info Grid */}
          <div className="bg-white/80 backdrop-blur-sm border border-[rgba(0,0,0,0.04)] rounded-2xl px-6 py-8 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm">
              {/* Row 1 */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">전일</span>
                <span className="font-semibold text-gray-900">{previousClose.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">시가</span>
                <span className="font-semibold text-gray-900">{todayOpen > 0 ? todayOpen.toFixed(2) : '3.44'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">고가</span>
                <span className="font-semibold text-red-500">{todayHigh > 0 ? todayHigh.toFixed(2) : '3.56'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">저가</span>
                <span className="font-semibold text-blue-500">{todayLow > 0 ? todayLow.toFixed(2) : '3.40'}</span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">거래량</span>
                <span className="font-semibold text-gray-900">{todayVolume > 0 ? todayVolume.toLocaleString() : '5,370,655'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">대금</span>
                <span className="font-semibold text-gray-900">0.19억 USD</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">시총</span>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">17.9억 USD</div>
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">업종</span>
                <span className="font-semibold text-gray-900 text-right truncate w-24 sm:w-auto" title="생명 공학 및 의학 연구">생명 공학 및 의학 연구</span>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">52주 최고</span>
                <span className="font-semibold text-gray-900">{high52 > 0 ? high52.toFixed(2) : '7.18'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">52주 최저</span>
                <span className="font-semibold text-gray-900">{low52 > 0 ? low52.toFixed(2) : '2.98'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">PER</span>
                <span className="font-semibold text-gray-900">2.98</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">EPS</span>
                <span className="font-semibold text-gray-900">-1.46</span>
              </div>

              {/* Row 4 */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">PBR</span>
                <span className="font-semibold text-gray-900">1.59배</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">BPS</span>
                <span className="font-semibold text-gray-900">2.14</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">주당배당금</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">배당수익률</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>

              {/* Row 5 */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">배당일</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">배당락일</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">액면변경</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">액면가</span>
                <span className="font-semibold text-gray-900">N/A</span>
              </div>
            </div>
          </div>

          {/* TradingView Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-[rgba(0,0,0,0.04)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-['Syne'] text-[18px] font-[700] text-[#1a1a2e] tracking-[-0.01em]">
                RXRX 차트 (NASDAQ)
              </h2>
              <span className="font-['DM_Mono'] text-[10px] font-medium px-2.5 py-1 bg-[rgba(26,158,150,0.08)] text-[#1a9e96] border border-[rgba(26,158,150,0.12)] rounded-full tracking-wider">
                데이터 갱신주기: 1시간
              </span>
            </div>
            <TradingViewWidget />
          </div>

          {/* Recent Prices Table */}
          <div className="bg-white/80 backdrop-blur-sm border border-[rgba(0,0,0,0.04)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl p-6 mb-8">
            <h2 className="font-['Syne'] text-[18px] font-[700] text-[#1a1a2e] mb-4 tracking-[-0.01em]">
              최근 주가 데이터
            </h2>
            <StockTable data={dailyData} />
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
