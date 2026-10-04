import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  PhoneCall,
  MapPin,
  Lock,
  Radio,
  Crosshair,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

interface SafetyProtocolsPageProps {
  conditionRed: boolean;
  onToggleCondition: () => void;
  onNavigateToMapZone?: (zoneId: string) => void;
}

export const SafetyProtocolsPage: React.FC<SafetyProtocolsPageProps> = ({
  conditionRed,
  onToggleCondition,
  onNavigateToMapZone,
}) => {
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<'green' | 'yellow' | 'red'>(
    conditionRed ? 'red' : 'green'
  );

  const handleTestSiren = () => {
    soundManager.playAlertSiren();
  };

  const handleSelectCondition = (level: 'green' | 'yellow' | 'red') => {
    soundManager.playTerminalClick();
    setSelectedThreatLevel(level);
    if (level === 'red' && !conditionRed) {
      onToggleCondition();
    } else if (level === 'green' && conditionRed) {
      onToggleCondition();
    }
  };

  const bunkers = [
    {
      id: 'bunker-a',
      nameTh: 'หลุมหลบภัยศูนย์กลาง A-1 (Main Street Bunker)',
      locationTh: 'ใต้ดินชั้น B2 ศูนย์นวัตกรรม Samsung Innovation Center',
      capacityTh: '5,000 คน',
      suppliesTh: 'เสบียงอาหาร 30 วัน, เครื่องกำเนิดไฟฟ้าดีเซลอิสระ, ห้องพยาบาลฉุกเฉิน',
      zoneId: 'main-street-hub',
    },
    {
      id: 'bunker-b',
      nameTh: 'หลุมหลบภัย B-2 (Safari Perimeter Shelter)',
      locationTh: 'สถานีควบคุมหุบเขาไจโรสเฟียร์ ทางเชื่อมตะวันตก',
      capacityTh: '2,500 คน',
      suppliesTh: 'หน้ากากกันแก๊สสลบ, ประตูเหล็กนิรภัยหนา 18 นิ้ว, วิทยุสื่อสาร ACU',
      zoneId: 'gyrosphere-valley',
    },
    {
      id: 'bunker-c',
      nameTh: 'หลุมหลบภัย C-3 (Aviary / North Command Bunker)',
      locationTh: 'ฐานรากหินภูเขาไฟใต้อารีน่าโมซาซอร์และโดมกรงนก',
      capacityTh: '3,000 คน',
      suppliesTh: 'ระบบกรองอากาศความดันบวก, แคปซูลอพยพทางทะเล',
      zoneId: 'mosasaurus-lagoon',
    },
  ];

  const acuEquipment = [
    {
      nameTh: 'ปืนลูกดอกยาสลบแรงดันสูง (CO2 Heavy Tranquilizer)',
      rangeTh: 'ระยะหวังผล 80 เมตร',
      descTh: 'ใช้สารสกัด Carfentanil ความเข้มข้นสูง สามารถทำให้ไดโนเสาร์ขนาด 10 ตันสลบได้ภายใน 90 วินาที',
    },
    {
      nameTh: 'ปืนตาข่ายสายเคเบิลเคฟลาร์ (Kevlar Net Launcher)',
      rangeTh: 'ระยะหวังผล 40 เมตร',
      descTh: 'ตาข่ายถักเคฟลาร์เสริมลวดไทเทเนียม ทนแรงดึง 5 ตัน สำหรับหยุดการเคลื่อนไหวของแรปเตอร์',
    },
    {
      nameTh: 'กระบองช็อตไฟฟ้าความต่างศักย์สูง (Shock Prod 50,000V)',
      rangeTh: 'ระยะประชิด',
      descTh: 'ปล่อยกระแสไฟฟ้าแรงดันสูงเพื่อขับไล่และป้องกันตัวในสถานการณ์ฉุกเฉินระยะประชิด',
    },
    {
      nameTh: 'อุปกรณ์ปล่อยคลื่นเสียงรบกวน (LRAD Sonic Emitter)',
      rangeTh: 'ระยะ 300 เมตร',
      descTh: 'ส่งคลื่นความถี่สูงพิเศษเพื่อขับไล่สัตว์เลื้อยคลานบินได้ในโดม Aviary',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#143d26] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>INGEN ASSET CONTAINMENT UNIT (ACU) // SECURITY DISPATCH</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
          มาตรการความปลอดภัย & แผนรับมือภาวะฉุกเฉิน
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          ระบบรักษาความปลอดภัยระดับสูงสุดของหน่วย ACU (Asset Containment Unit) ขั้นตอนการอพยพนักท่องเที่ยวเมื่อสัตว์หลุดกรง และแผนที่หลุมหลบภัยทั่วเกาะอิสลานูบลาร์
        </p>
      </div>

      {/* Interactive Threat Condition Simulator */}
      <div className="rounded-2xl bg-[#06150e] border border-[#143d26] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#143d26] pb-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              แผงจำลองสถานะภัยคุกคาม (THREAT LEVEL CONSOLE)
            </div>
            <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
              จำลองระดับการแจ้งเตือนภัยทั่วเกาะ (Alert Condition Toggles)
            </h3>
          </div>

          <button
            onClick={handleTestSiren}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-tech font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>ทดสอบเสียงไซเรนฉุกเฉิน (Test Klaxon)</span>
          </button>
        </div>

        {/* 3 Condition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Condition Green */}
          <div
            onClick={() => handleSelectCondition('green')}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedThreatLevel === 'green'
                ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg'
                : 'bg-[#040e09] border-[#143d26] hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                CONDITION GREEN
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-tech font-bold text-white text-lg">สภาวะปกติ (Nominal)</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              สัตว์ทุกตัวอยู่ในเขตกักกัน รั้วไฟฟ้าทำงานเต็มพิกัด 100% นักท่องเที่ยวสามารถท่องเที่ยวได้ตามปกติในทุกโซน
            </p>
          </div>

          {/* Condition Yellow */}
          <div
            onClick={() => handleSelectCondition('yellow')}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedThreatLevel === 'yellow'
                ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                : 'bg-[#040e09] border-[#143d26] hover:border-amber-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                CONDITION YELLOW
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-tech font-bold text-white text-lg">เฝ้าระวังพิเศษ (Caution)</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              สภาพอากาศแปรปรวนหรือตรวจพบความผิดปกติของเซนเซอร์กั้นรั้ว ระงับบริการรถไจโรสเฟียร์ชั่วคราว
            </p>
          </div>

          {/* Condition Red */}
          <div
            onClick={() => handleSelectCondition('red')}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedThreatLevel === 'red'
                ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/40 shadow-lg animate-pulse'
                : 'bg-[#040e09] border-[#143d26] hover:border-rose-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">
                CONDITION RED
              </span>
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h4 className="font-tech font-bold text-white text-lg">สัตว์หลุดกรง / อพยพด่วน</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              มีการฝ่าฝืนเขตกักกัน (Containment Breach) ปิดทุกโซนท่องเที่ยวทันที ย้ายนักท่องเที่ยวเข้าหลุมหลบภัย
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Bunker Guide */}
      <div className="space-y-6">
        <div className="border-b border-[#143d26] pb-3">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            พิกัดหลุมหลบภัยฉุกเฉิน (EMERGENCY SHELTER DIRECTORY)
          </div>
          <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
            หลุมหลบภัยเสริมเหล็กกล้าใต้ดิน 3 จุดหลัก
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bunkers.map((bunker) => (
            <div
              key={bunker.id}
              className="p-5 rounded-xl bg-[#06150e] border border-[#143d26] space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold">{bunker.nameTh.split('(')[0]}</span>
                  <span className="text-slate-400">{bunker.capacityTh}</span>
                </div>
                <h4 className="font-tech font-bold text-slate-100 text-base">{bunker.nameTh}</h4>
                <div className="flex items-start gap-1.5 text-xs text-emerald-300 font-mono">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span>{bunker.locationTh}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] text-xs text-slate-300">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">สิ่งอำนวยความสะดวก:</div>
                  <p>{bunker.suppliesTh}</p>
                </div>
              </div>

              {onNavigateToMapZone && (
                <button
                  onClick={() => onNavigateToMapZone(bunker.zoneId)}
                  className="mt-4 w-full py-2 rounded-lg bg-[#092216] hover:bg-[#0e3523] border border-[#1e5837] text-xs font-tech text-emerald-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ดูพิกัดบนแผนที่</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Asset Containment Unit (ACU) Gear & Weapons */}
      <div className="space-y-6">
        <div className="border-b border-[#143d26] pb-3">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            ยุทโธปกรณ์ควบคุมสัตว์ (TACTICAL EQUIPMENT SPECS)
          </div>
          <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
            อุปกรณ์และอาวุธประจำการของหน่วย ACU
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {acuEquipment.map((eq, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-[#06150e] border border-[#143d26] space-y-2 shadow-lg"
            >
              <div className="w-8 h-8 rounded bg-emerald-950 border border-emerald-800 flex items-center justify-center text-amber-400">
                <Crosshair className="w-4 h-4" />
              </div>
              <h4 className="font-tech font-bold text-slate-100 text-sm">{eq.nameTh}</h4>
              <div className="text-[11px] font-mono text-emerald-400">{eq.rangeTh}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{eq.descTh}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Safety Guidelines Checklist */}
      <div className="rounded-xl bg-[#06150e] border border-[#143d26] p-6 space-y-4">
        <h4 className="font-tech font-bold text-white text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>กฎเหล็ก 5 ข้อสำหรับนักท่องเที่ยวทุกท่าน</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>ห้ามให้อาหารไดโนเสาร์นอกเหนือจากจุดที่เจ้าหน้าที่ดูแล</span>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>สวมสายรัดข้อมือดิจิทัล HoloBand ตลอดเวลาที่อยู่บนเกาะ</span>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>ห้ามบินโดรนหรือใช้อุปกรณ์ปล่อยคลื่นวิทยุกวนสัตว์ปีก</span>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>ห้ามเดินออกนอกเส้นทางที่ระบุไว้ในแผนที่</span>
          </div>
          <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>ปฏิบัติตามคำสั่งของเจ้าหน้าที่ ACU อย่างเคร่งครัดเมื่อมีเสียงไซเรน</span>
          </div>
        </div>
      </div>
    </div>
  );
};
