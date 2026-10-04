import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  Clock,
  Ship,
  CheckCircle2,
  HelpCircle,
  Send,
  Users,
  Award,
  GraduationCap,
  UserCheck,
  FileText,
  Shield,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynthesizer';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // รายชื่อสมาชิกผู้จัดทำโครงงานตามที่ผู้ใช้ระบุอย่างเป็นทางการ
  const teamMembers = [
    {
      no: '01',
      nameTh: 'กฤษดา จันทะ',
      studentId: '66020103',
      roleTh: 'หัวหน้าโครงงาน & สถาปัตยกรรมฐานข้อมูล (Project Lead & Database Architect)',
      departmentTh: 'สาขาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
      clearance: 'LEVEL 5 INGEN DIRECTOR CLEARANCE',
      badgeColor: 'border-amber-500/70 bg-amber-500/10 text-amber-300',
    },
    {
      no: '02',
      nameTh: 'ญาณิดา ศรีระสา',
      studentId: '66020761',
      roleTh: 'ออกแบบและพัฒนาส่วนต่อประสานผู้ใช้ (UI/UX Design & Frontend Development)',
      departmentTh: 'สาขาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
      clearance: 'LEVEL 4 RESEARCH CLEARANCE',
      badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    },
    {
      no: '03',
      nameTh: 'สุพิชฌาย์ รสจันทร์',
      studentId: '66020792',
      roleTh: 'ระบบจำลองพันธุศาสตร์ชีวภาพ & แล็บดีเอ็นเอ (Biotech Simulation & Data Analysis)',
      departmentTh: 'สาขาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
      clearance: 'LEVEL 4 RESEARCH CLEARANCE',
      badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    },
    {
      no: '04',
      nameTh: 'ลลนา เข็มเลิศ',
      studentId: '66020782',
      roleTh: 'ระบบแผนที่เชิงยุทธวิธี & มัลติมีเดีย (Interactive Cartography & Digital Assets)',
      departmentTh: 'สาขาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
      clearance: 'LEVEL 4 RESEARCH CLEARANCE',
      badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    },
    {
      no: '05',
      nameTh: 'ฐาปนัท กล่อมมะโน',
      studentId: '66020763',
      roleTh: 'ระบบความปลอดภัย & ควบคุมภาวะฉุกเฉิน (Security Protocols & QA Testing)',
      departmentTh: 'สาขาวิทยาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
      clearance: 'LEVEL 4 RESEARCH CLEARANCE',
      badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    },
  ];

  const faqs = [
    {
      q: 'การเดินทางไปยังเกาะอิสลานูบลาร์ใช้เวลานานเท่าใด?',
      a: 'เรือเฟอร์รี่ความเร็วสูงของ Jurassic World ออกเดินทางจากท่าเรือ Puerto Jimenez ประเทศคอสตาริกา ใช้เวลาเดินทางประมาณ 2 ชั่วโมง 15 นาที โดยมีเรือให้บริการไป-กลับวันละ 6 เที่ยว',
    },
    {
      q: 'มีข้อจำกัดเรื่องความสูงหรืออายุสำหรับเครื่องเล่นหรือไม่?',
      a: 'ลูกบอลไจโรสเฟียร์ (Gyrosphere) กำหนดส่วนสูงขั้นต่ำ 120 ซม. ส่วนโซน Gentle Giants Petting Zoo และ Samsung Innovation Center เหมาะสำหรับทุกเพศทุกวัย',
    },
    {
      q: 'ในกรณีสภาพอากาศแปรปรวนหรือพายุเฮอริเคน พาร์คมีมาตรการอย่างไร?',
      a: 'เกาะอิสลานูบลาร์ติดตั้งระบบเรดาร์ตรวจจับสภาพอากาศล่วงหน้า หากมีพายุระดับ 3 ขึ้นไป พาร์คจะระงับบริการเครื่องเล่นกลางแจ้งและนำนักท่องเที่ยวเข้าพักในอาคารโรงแรมและหลุมหลบภัยมาตรฐานสากล',
    },
    {
      q: 'สามารถนำกล้องถ่ายภาพหรือโดรนเข้ามาในเกาะได้หรือไม่?',
      a: 'กล้องถ่ายภาพทั่วไปสามารถนำเข้ามาได้ แต่ "ห้ามใช้แฟลช" ในบริเวณกรงสัตว์นักล่าเด็ดขาด และไม่อนุญาตให้นำโดรนทุกชนิดเข้ามาในเกาะเพื่อความปลอดภัยของสัตว์ปีกในกรง The Aviary',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSonarPing();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[#143d26] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>ISLA NUBLAR GUEST SERVICES & PROJECT CONTRIBUTORS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white mt-1">
          ติดต่อสอบถาม & รายชื่อสมาชิกผู้จัดทำโครงงาน
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          ศูนย์บริการข้อมูลนักท่องเที่ยว เกาะอิสลา นูบลาร์ และทำเนียบสมาชิกคณะผู้พัฒนาเว็บไซต์ Jurassic World: Educational & Park Guide (InGen Research Hub)
        </p>
      </div>

      {/* รายชื่อสมาชิกผู้จัดทำโครงงาน (Project Team Members) - เปลี่ยนจากส่วนลงทะเบียนสำรองที่นั่ง */}
      <div className="rounded-2xl bg-[#06150e] border border-[#143d26] p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="border-b border-[#143d26] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Users className="w-4 h-4 text-amber-400" />
              <span>INGEN RESEARCH & DEVELOPMENT // PROJECT CONTRIBUTORS</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-tech font-bold text-white mt-1">
              รายชื่อสมาชิกผู้จัดทำโครงงาน
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              คณะผู้ศึกษาและพัฒนาเว็บไซต์ระบบข้อมูลเชิงการศึกษาและคู่มือนำเที่ยว Jurassic World
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-[#040e09] border border-amber-500/40 text-xs font-mono text-amber-300 flex items-center gap-2 self-start sm:self-auto shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>สมาชิกทั้งหมด: 5 คน</span>
          </div>
        </div>

        {/* 5 Member InGen Security Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {teamMembers.map((member) => (
            <div
              key={member.no}
              className="group relative rounded-xl bg-[#040e09] border border-[#153e28] hover:border-amber-500/60 p-5 space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Badge Header Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    ลำดับที่ {member.no}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    {member.clearance}
                  </span>
                </div>

                {/* Member Name & Student ID */}
                <div>
                  <h3 className="text-xl font-tech font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {member.nameTh}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs font-mono">
                    <span className="text-slate-400">รหัสนักศึกษา:</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800 font-bold tracking-wider text-sm shadow-inner">
                      {member.studentId}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <div className="p-3 rounded-lg bg-[#06150e] border border-[#143d26] text-xs space-y-1">
                  <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>หน้าที่และความรับผิดชอบ:</span>
                  </div>
                  <div className="text-slate-200 font-medium leading-relaxed">{member.roleTh}</div>
                </div>

                {/* Department */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-tech">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{member.departmentTh}</span>
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="pt-3 border-t border-[#143d26] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ACTIVE CONTRIBUTOR</span>
                </span>
                <span className="text-amber-400/80 font-semibold">INGEN DEPT</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Academic Project Info Summary */}
          <div className="rounded-xl bg-gradient-to-br from-[#061e13] to-[#040e09] border border-emerald-500/40 p-5 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <Award className="w-4 h-4 text-amber-400" />
                <span>PROJECT SPECIFICATION</span>
              </div>
              <h3 className="text-lg font-tech font-bold text-white">
                Jurassic World: Educational & Park Guide
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                โครงงานพัฒนาเว็บแอปพลิเคชันเชิงการศึกษาแบบโต้ตอบ ผสานข้อมูลชีววิทยาไดโนเสาร์ แผนที่ดาวเทียมเกาะอิสลานูบลาร์ และระบบเสียงสังเคราะห์ชีวภาพ (Web Audio API Synthesizer)
              </p>
              <div className="space-y-1.5 text-xs font-mono text-slate-300 pt-2 border-t border-[#143d26]">
                <div className="flex justify-between">
                  <span className="text-slate-400">ระบบเทคโนโลยี:</span>
                  <span className="text-emerald-300">React + Tailwind + Web Audio</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">สถานะโครงงาน:</span>
                  <span className="text-amber-300">สมบูรณ์แบบ 100%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-500/30 flex items-center justify-between text-[11px] font-mono text-emerald-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL INGEN HUB</span>
              </span>
              <span>2026 EDITION</span>
            </div>
          </div>
        </div>

        {/* Project Contact Inquiry Box */}
        <div className="mt-8 p-6 rounded-xl bg-[#040e09] border border-[#153e28] space-y-4">
          <div className="flex items-center gap-2 text-xs font-tech text-emerald-400 font-semibold uppercase">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>ส่งข้อความติดต่อสอบถามทีมผู้จัดทำ (CONTACT INGEN RESEARCH TEAM)</span>
          </div>
          {formSubmitted ? (
            <div className="p-4 rounded-lg bg-[#062013] border border-emerald-500/60 text-center space-y-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-sm font-tech font-bold text-white">ส่งข้อความถึงทีมผู้จัดทำเรียบร้อยแล้ว</div>
              <div className="text-xs text-slate-300">ขอขอบคุณสำหรับข้อเสนอแนะเกี่ยวกับศูนย์วิจัยจูราสสิค เวิลด์</div>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-2 text-xs text-amber-400 underline hover:text-amber-300 cursor-pointer"
              >
                ส่งข้อความเพิ่มเติม
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="ชื่อของคุณ"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#06150e] border border-[#143d26] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="อีเมลติดต่อกลับ"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#06150e] border border-[#143d26] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="ข้อความหรือข้อคิดเห็น..."
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#06150e] border border-[#143d26] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ส่งข้อความถึงทีมผู้จัดทำ</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Transit Ferry Timetable & Operating Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#06150e] border border-[#143d26] space-y-4">
          <div className="flex items-center gap-2 text-xs font-tech text-amber-400 font-semibold uppercase">
            <Ship className="w-4 h-4 text-amber-400" />
            <span>ตารางเรือข้ามฟาก (ISLAND FERRY SCHEDULE)</span>
          </div>
          <h3 className="text-base font-tech font-bold text-white">
            ท่าเรือ Puerto Jimenez ⇌ ท่าเรือ Jurassic World
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            เรือเฟอร์รี่พลังงานไฮบริดปรับอากาศพร้อมจุดชมวิวโลมาเขตร้อน
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-[#040e09] border border-[#153e28]">
              <span className="text-slate-400">เที่ยวเช้า (Morning Departures):</span>
              <span className="text-amber-300">07:00 / 09:30 / 11:45 น.</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-[#040e09] border border-[#153e28]">
              <span className="text-slate-400">เที่ยวบ่าย (Afternoon Departures):</span>
              <span className="text-amber-300">14:00 / 16:30 / 19:00 น.</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#06150e] border border-[#143d26] space-y-4">
          <div className="flex items-center gap-2 text-xs font-tech text-emerald-400 font-semibold uppercase">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>เวลาทำการของพาร์ค (OPERATING HOURS)</span>
          </div>
          <h3 className="text-base font-tech font-bold text-white">
            เปิดให้บริการ 365 วัน ไม่มีวันหยุด
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            เวลาเปิดทำการอาจปรับเปลี่ยนตามฤดูกาลและสภาพอากาศทางทะเล
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2 rounded bg-[#040e09] border border-[#153e28]">
              <span className="text-slate-400">โซนเครื่องเล่น & กรงสัตว์:</span>
              <span className="text-emerald-300">08:00 - 19:00 น.</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-[#040e09] border border-[#153e28]">
              <span className="text-slate-400">ถนนสายหลัก & ร้านอาหาร:</span>
              <span className="text-emerald-300">เปิดตลอด 24 ชั่วโมง</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="border-b border-[#143d26] pb-3">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            คำถามที่พบบ่อย (FREQUENTLY ASKED QUESTIONS)
          </div>
          <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mt-1">
            ข้อมูลสำคัญที่นักท่องเที่ยวควรรู้
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-[#06150e] border border-[#143d26] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-tech font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{f.q}</span>
                  </span>
                  <span className="text-slate-400 text-sm">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-[#143d26] pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
