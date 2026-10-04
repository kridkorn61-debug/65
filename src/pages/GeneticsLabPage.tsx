import React, { useState } from 'react';
import {
  Dna,
  Sparkles,
  FlaskConical,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Cpu,
  Thermometer,
  ShieldCheck,
  Microscope,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

export const GeneticsLabPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Interactive Gene Sequencer Simulation State
  const [basePairs, setBasePairs] = useState<string[]>([
    'A-T',
    'C-G',
    'GAP',
    'T-A',
    'G-C',
    'GAP',
    'A-T',
    'C-G',
  ]);
  const [amphibianDnaSpliced, setAmphibianDnaSpliced] = useState(false);
  const [incubationTemp, setIncubationTemp] = useState<number>(37.5);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [cloningStatus, setCloningStatus] = useState<string>('พร้อมเริ่มการสังเคราะห์');

  const labImage = '/assets/images/jw_innovation_lab_1791074505823.jpg';
  const amberImage = '/assets/images/jw_amber_mosquito_dna_1791074492855.jpg';

  const steps = [
    {
      step: 1,
      titleTh: '1. การขุดค้น & สกัดอำพัน',
      titleEn: 'Amber Extraction',
      descriptionTh:
        'นักบรรพชีวินวิทยาสำรวจเหมืองอำพันในสาธารณรัฐโดมินิกันเพื่อหาก้อนอำพันฟอสซิลอายุ 65-100 ล้านปีที่มียุงหรือแมลงดูดเลือดติดอยู่ภายใน จากนั้นใช้หัวเจาะเพชรระดับไมครอนเจาะทะลุเปลือกอำพันเพื่อดูดเลือดไดโนเสาร์ในกระเพาะยุง',
    },
    {
      step: 2,
      titleTh: '2. การอ่านลำดับเบสที่เสื่อมสภาพ',
      titleEn: 'Sequencing & Gap Analysis',
      descriptionTh:
        'ดีเอ็นเอโบราณมีอายุขัยสลายตัว (Half-life) ประมาณ 521 ปี ทำให้โมเลกุลดีเอ็นเอในเลือดแตกหักเป็นล้านชิ้น เครื่อง InGen Supercomputer จะทำการอ่านชิ้นส่วนเบส A, T, C, G และตรวจจับช่องว่าง (Gene Gaps) ที่ขาดหายไป',
    },
    {
      step: 3,
      titleTh: '3. การตัดต่อยีนเติมเต็ม (Gene Splicing)',
      titleEn: 'Amphibian Gene Splicing',
      descriptionTh:
        'ดร.เฮนรี วู ค้นพบว่าจีโนมของกบต้นไม้ (Tree Frog) และกบลูกศรพิษเขตร้อน มีโครงสร้างเข้ากันได้ดีที่สุดในการนำมาเป็น "ตัวเชื่อมต่อ" เติมเต็มช่องว่างของรหัสพันธุกรรมไดโนเสาร์ให้สมบูรณ์ครบ 100%',
    },
    {
      step: 4,
      titleTh: '4. การปฏิสนธิ & การฟักตัวอ่อน',
      titleEn: 'Embryo Implantation & Hatching',
      descriptionTh:
        'นำนิวเคลียสที่สังเคราะห์เสร็จแล้วฉีดเข้าสู่เซลล์ไข่นกกระจอกเทศที่นำนิวเคลียสเดิมออก แล้วนำไปบ่มในตู้อบ Hammond Nursery ควบคุมระดับออกซิเจน อุณหภูมิ และความชื้น จนกระทั่งลูกไดโนเสาร์เจาะเปลือกไข่ออกมา',
    },
  ];

  const handleFillGaps = () => {
    soundManager.playTerminalClick();
    setBasePairs((prev) =>
      prev.map((bp) => (bp === 'GAP' ? 'A-T (Frog DNA)' : bp))
    );
    setAmphibianDnaSpliced(true);
    setCloningStatus('เติมเต็มยีนกบลูกศรพิษสำเร็จ - ลำดับเบสสมบูรณ์');
  };

  const handleResetSequencer = () => {
    soundManager.playTerminalClick();
    setBasePairs(['A-T', 'C-G', 'GAP', 'T-A', 'G-C', 'GAP', 'A-T', 'C-G']);
    setAmphibianDnaSpliced(false);
    setIncubationTemp(37.5);
    setCloningStatus('รีเซ็ตลำดับเบสสู่สถานะเริ่มต้น');
  };

  const handleRunIncubation = () => {
    soundManager.playSonarPing();
    setSimulationRunning(true);
    setCloningStatus('กำลังเร่งการแบ่งเซลล์ของตัวอ่อน...');
    setTimeout(() => {
      setSimulationRunning(false);
      if (amphibianDnaSpliced && incubationTemp >= 36.5 && incubationTemp <= 38.5) {
        setCloningStatus('สำเร็จ 100%! ตัวอ่อนเจริญเติบโตสมบูรณ์ - พร้อมย้ายสู่เนอสเซอรี่');
      } else if (!amphibianDnaSpliced) {
        setCloningStatus('ล้มเหลว: ยีนมีช่องว่าง (GAP) ไม่สามารถสร้างโปรตีนได้');
      } else {
        setCloningStatus('คำเตือน: อุณหภูมิตู้อบไม่อยู่ในเกณฑ์เหมาะสม (36.5°C - 38.5°C)');
      }
    }, 1200);
  };

  const stabilityPercentage = amphibianDnaSpliced ? 99.84 : 64.2;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#143d26] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
          <span>INGEN HAMMOND CREATION LAB // ADVANCED GENETICS DIVISION</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
          ห้องปฏิบัติการพันธุศาสตร์ InGen & วิทยาการโคลนนิ่ง
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          เปิดเผยกระบวนการทางวิทยาศาสตร์ที่ทำให้ไดโนเสาร์ที่สูญพันธุ์ไปกว่า 65 ล้านปีกลับมามีชีวิตอีกครั้ง ผ่านการสกัดดีเอ็นเอจากอำพันโบราณและการตัดแต่งจีโนม
        </p>
      </div>

      {/* Hero Split Graphic */}
      <div className="rounded-2xl overflow-hidden bg-[#06150e] border border-[#143d26] grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>DR. HENRY WU'S MASTER CREATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white leading-tight">
            "ไม่มีสิ่งมีชีวิตใดในจูราสสิค เวิลด์ <br />
            <span className="text-amber-300">ที่เป็นสัตว์ธรรมชาติแท้ 100%"</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ดีเอ็นเอที่สกัดได้จากยุงโบราณมักแตกหักและขาดหายไปจำนวนมหาศาล ทีมวิจัยของ InGen นำโดย ดร.เฮนรี วู จึงได้สังเคราะห์รหัสพันธุกรรมขึ้นใหม่ โดยนำยีนของสัตว์สะเทินน้ำสะเทินบก สัตว์เลื้อยคลาน และนกในยุคปัจจุบันมาเป็นส่วนเติมเต็ม ทำให้ไดโนเสาร์สามารถฟักตัวและมีชีวิตรอดได้ในสภาพแวดล้อมยุคปัจจุบัน
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
              <div className="text-[10px] font-mono text-slate-400">ตัวอย่างอำพัน</div>
              <div className="text-lg font-tech font-bold text-amber-300 mt-0.5">14,800+</div>
              <div className="text-[9px] text-slate-500 font-mono">ชิ้นในคลัง InGen</div>
            </div>
            <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
              <div className="text-[10px] font-mono text-slate-400">อัตราความสำเร็จ</div>
              <div className="text-lg font-tech font-bold text-emerald-400 mt-0.5">92.4%</div>
              <div className="text-[9px] text-slate-500 font-mono">ในการฟักตัวอ่อน</div>
            </div>
            <div className="p-3 rounded-lg bg-[#040e09] border border-[#153e28]">
              <div className="text-[10px] font-mono text-slate-400">ระดับความปลอดภัย</div>
              <div className="text-lg font-tech font-bold text-cyan-300 mt-0.5">BSL-4</div>
              <div className="text-[9px] text-slate-500 font-mono">ห้องแล็บปลอดเชื้อ</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
          <img
            src={labImage}
            alt="InGen Creation Lab Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06150e] via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded border border-white/10 text-[11px] font-mono text-emerald-300">
            HAMMOND CREATION LAB // SECTOR 4 BIO-INCUBATOR
          </div>
        </div>
      </div>

      {/* 4-Step Educational Process Flow */}
      <div className="space-y-6">
        <div className="border-b border-[#143d26] pb-3">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            ขั้นตอนการทำงาน 4 ลำดับ (THE 4-STAGE PIPELINE)
          </div>
          <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
            กระบวนการฟื้นชีพพันธุกรรมไดโนเสาร์
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s) => {
            const isSelected = activeStep === s.step;
            return (
              <div
                key={s.step}
                onClick={() => {
                  soundManager.playTerminalClick();
                  setActiveStep(s.step);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#092518] border-amber-500 ring-1 ring-amber-400/50 shadow-lg'
                    : 'bg-[#06150e] border-[#143d26] hover:border-[#1e5837]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-1">
                    STAGE 0{s.step}
                  </div>
                  <h4 className="font-tech font-bold text-white text-base">
                    {s.titleTh}
                  </h4>
                  <div className="text-[11px] font-mono text-slate-400 mb-2">
                    {s.titleEn}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.descriptionTh}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#143d26] flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>{isSelected ? '● กำลังตรวจสอบ' : 'คลิกเพื่อโฟกัส'}</span>
                  <span>0{s.step}/04</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Base Sequencer & Incubation Sandbox */}
      <div className="rounded-2xl bg-[#06150e] border border-[#143d26] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#143d26] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>INTERACTIVE GENE SEQUENCER SIMULATION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
              เครื่องจำลองการจัดเรียงลำดับเบส & ตู้อบตัวอ่อนเสมือนจริง
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              ทดลองเชื่อมต่อรหัสเบสที่สูญหายด้วยดีเอ็นเอดัดแปลง และปรับอุณหภูมิตู้อบเพื่อสังเคราะห์ตัวอย่างทดลอง
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSequencer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#040e09] border border-[#153e28] text-xs font-tech text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ต</span>
            </button>
          </div>
        </div>

        {/* Genome Visualizer Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Base Pairs Visual Strand (Col 7) */}
          <div className="lg:col-span-7 bg-[#040e09] p-5 rounded-xl border border-[#153e28] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">สายดีเอ็นเอตัวอย่าง: INGEN-SEQ-99</span>
              <span className="text-amber-400">ความเสถียร: {stabilityPercentage}%</span>
            </div>

            {/* Nucleotide Strand Display */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {basePairs.map((pair, idx) => {
                const isGap = pair === 'GAP';
                const isFrog = pair.includes('Frog');
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-center font-mono text-xs border transition-all ${
                      isGap
                        ? 'bg-rose-950/60 border-rose-600 text-rose-300 animate-pulse'
                        : isFrog
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                        : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500">#{idx + 1}</div>
                    <div className="text-xs font-bold mt-1">
                      {isGap ? 'GAP' : pair.split(' ')[0]}
                    </div>
                    <div className="text-[9px] mt-1 text-slate-400">
                      {isGap ? 'สูญหาย' : isFrog ? 'ยีนกบ' : 'โบราณ'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gap Warning or Success */}
            <div className="pt-2">
              {!amphibianDnaSpliced ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-xs">
                  <div className="flex items-center gap-2 text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>ตรวจพบช่องว่าง 2 จุดในสายพันธุกรรม ต้องตัดต่อยีนเติมเต็ม</span>
                  </div>
                  <button
                    onClick={handleFillGaps}
                    className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    สกัดยีนกบเติมเต็ม (Splice Gaps)
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>สายดีเอ็นเอครบถ้วนสมบูรณ์ 100% - พร้อมสำหรับการฝังเซลล์ไข่</span>
                </div>
              )}
            </div>
          </div>

          {/* Incubation Controls (Col 5) */}
          <div className="lg:col-span-5 bg-[#040e09] p-5 rounded-xl border border-[#153e28] space-y-4">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              พารามิเตอร์ตู้อบตัวอ่อน (INCUBATION CHAMBER)
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>อุณหภูมิตู้อบ (36.0°C - 40.0°C)</span>
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {incubationTemp.toFixed(1)} °C
                </span>
              </div>
              <input
                type="range"
                min="35.0"
                max="41.0"
                step="0.1"
                value={incubationTemp}
                onChange={(e) => setIncubationTemp(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                <span>35.0°C (เย็นเกินไป)</span>
                <span className="text-emerald-400">เกณฑ์เหมาะสม: 37.5°C</span>
                <span>41.0°C (ร้อนเกินไป)</span>
              </div>
            </div>

            {/* Status Output Box */}
            <div className="p-3 rounded-lg bg-[#06150e] border border-[#143d26] text-xs font-mono">
              <div className="text-slate-400 text-[10px]">สถานะการประมวลผล:</div>
              <div className="text-amber-300 font-semibold mt-0.5">{cloningStatus}</div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunIncubation}
              disabled={simulationRunning}
              className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-800 text-white font-tech font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>
                {simulationRunning
                  ? 'กำลังสังเคราะห์ตัวอ่อน...'
                  : 'เริ่มจำลองการฟักตัวอ่อน (Run Incubation)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
