import React from 'react';
import { History, Award, Globe, Building2, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { JurassicWorldLogo } from '../components/JurassicWorldLogo';

export const AboutPage: React.FC = () => {
  const timelineEvents = [
    {
      year: '1975',
      titleTh: 'การก่อตั้ง InGen โดย จอห์น แฮมมอนด์',
      descTh:
        'International Genetic Technologies (InGen) ถูกก่อตั้งขึ้นในซานดิเอโก แคลิฟอร์เนีย โดย จอห์น แฮมมอนด์ ด้วยวิสัยทัศน์ที่จะทำให้การโคลนนิ่งสิ่งมีชีวิตที่สูญพันธุ์เป็นจริง',
    },
    {
      year: '1984 - 1985',
      titleTh: 'การเช่าเกาะอิสลานูบลาร์ & เริ่มสร้างพาร์คแรก',
      descTh:
        'InGen ทำสัญญาเช่าเกาะอิสลานูบลาร์เป็นเวลา 99 ปีจากรัฐบาลคอสตาริกา และเริ่มดำเนินการก่อสร้าง Jurassic Park แห่งแรกอย่างลับๆ',
    },
    {
      year: '1993',
      titleTh: 'เหตุการณ์อุบัติภัยบนเกาะอิสลานูบลาร์',
      descTh:
        'เกิดการวินาศกรรมระบบไฟฟ้าของเกาะนำไปสู่เหตุการณ์รั้วกั้นล่มสลาย คณะผู้ตรวจสอบ (ดร.อลัน แกรนต์, ดร.เอลลี แซตเลอร์, เอียน มัลคอล์ม) รอดชีวิตมาได้ และโครงการพาร์คเดิมถูกระงับชั่วคราว',
    },
    {
      year: '1998',
      titleTh: 'มาสรานี โกลบอล เข้าซื้อกิจการ InGen',
      descTh:
        'หลังจาก จอห์น แฮมมอนด์ ถึงแก่อสัญกรรม ไซมอน มาสรานี ซีอีโอหนุ่มผู้มีวิสัยทัศน์ของ Masrani Global Corporation ได้เข้าซื้อ InGen และวางแผนสร้างพาร์คใหม่ที่ปลอดภัยและยิ่งใหญ่กว่าเดิม',
    },
    {
      year: '2005',
      titleTh: 'เปิดตัวอย่างยิ่งใหญ่ "จูราสสิค เวิลด์ (Jurassic World)"',
      descTh:
        'จูราสสิค เวิลด์ เปิดประตูต้อนรับนักท่องเที่ยวอย่างเป็นทางการ พร้อมระบบรักษาความปลอดภัยยุคใหม่ ไจโรสเฟียร์ อารีน่าโมซาซอร์ และดึงดูดผู้เข้าชมมากกว่า 20,000 คนต่อวัน',
    },
    {
      year: '2015 - ปัจจุบัน',
      titleTh: 'นวัตกรรมสายพันธุ์ดัดแปลงพันธุกรรม',
      descTh:
        'ดร.เฮนรี วู และทีมพันธุศาสตร์ InGen ประสบความสำเร็จในการสังเคราะห์จีโนมลูกผสม (Hybrid Genomes) สู่ยุคใหม่ของวิทยาการชีวภาพระดับโลก',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#143d26] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>INGEN CORPORATE ARCHIVE // HISTORICAL RECORD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
            เกี่ยวกับ จูราสสิค เวิลด์ & InGen Technologies
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            ประวัติศาสตร์การฟื้นคืนชีพสิ่งมีชีวิตยุคก่อนประวัติศาสตร์ จากความฝันของ จอห์น แฮมมอนด์ สู่ความร่วมมือระดับโลกภายใต้ มาสรานี โกลบอล คอร์ปอเรชัน
          </p>
        </div>
        <div className="shrink-0 p-3 rounded-2xl bg-[#06150e] border border-amber-500/30 shadow-xl self-start md:self-auto">
          <JurassicWorldLogo size="lg" subtitle="EST. 1975 // SAN DIEGO" />
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#06150e] border border-[#143d26] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-tech font-bold text-white">วิสัยทัศน์ (Vision)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            เชื่อมโยงมนุษยชาติในศตวรรษที่ 21 เข้ากับความมหัศจรรย์ของโลกดึกดำบรรพ์ สร้างแรงบันดาลใจด้านวิทยาศาสตร์ และเตือนสติมนุษย์ถึงความรับผิดชอบอันยิ่งใหญ่ในการดูแลสิ่งแวดล้อม
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#06150e] border border-[#143d26] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-tech font-bold text-white">พันธกิจ (Mission)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            พัฒนาเทคโนโลยีการสังเคราะห์จีโนมและการรักษาความปลอดภัยระดับสูง ให้การท่องเที่ยวและการศึกษาวิจัยเป็นหนึ่งเดียวกันอย่างปลอดภัยไร้รอยต่อ
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#06150e] border border-[#143d26] space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-tech font-bold text-white">จริยธรรมชีวภาพ (Bioethics)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            สัตว์ทุกตัวได้รับการดูแลทางโภชนาการ สุขอนามัย และการจำลองระบบนิเวศอย่างแม่นยำ พร้อมมาตรการจำกัดการขยายพันธุ์นอกเหนือการควบคุมเพื่อรักษาสมดุลของเกาะ
          </p>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#061910] via-[#082216] to-[#040e09] border border-amber-500/30 p-8 sm:p-10 text-center space-y-3 shadow-2xl">
        <p className="text-lg sm:text-2xl font-tech italic text-amber-200 font-medium max-w-3xl mx-auto leading-relaxed">
          "จูราสสิค เวิลด์ ไม่ได้มีไว้เพื่อเตือนให้เรากลัวความยิ่งใหญ่ของธรรมชาติ แต่มีไว้เพื่อให้เราตระหนักว่า มนุษย์เราเป็นเพียงส่วนเล็กๆ ในประวัติศาสตร์อันยาวนานของโลกใบนี้"
        </p>
        <div className="text-xs font-mono text-emerald-400">
          — ไซมอน มาสรานี (Simon Masrani), ประธาน Masrani Global
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6">
        <div className="border-b border-[#143d26] pb-3">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            เส้นทางแห่งกาลเวลา (HISTORICAL CHRONOLOGY)
          </div>
          <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
            ลำดับเหตุการณ์สำคัญของ InGen & Isla Nublar
          </h3>
        </div>

        <div className="space-y-4">
          {timelineEvents.map((ev, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#06150e] border border-[#143d26] hover:border-[#1e5837] transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-2">
                <span className="text-2xl font-tech font-bold text-amber-400 tabular-nums">
                  {ev.year}
                </span>
              </div>
              <div className="md:col-span-10 space-y-1">
                <h4 className="font-tech font-bold text-white text-base">
                  {ev.titleTh}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ev.descTh}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
