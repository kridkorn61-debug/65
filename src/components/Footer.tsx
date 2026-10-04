import React from 'react';
import { Compass, Dna, Shield, PhoneCall, ExternalLink } from 'lucide-react';
import type { PageId } from './Navbar';
import { JurassicWorldLogo } from './JurassicWorldLogo';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  return (
    <footer className="w-full bg-[#020704] border-t border-[#143d26] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: InGen Corporate */}
          <div className="space-y-3">
            <JurassicWorldLogo
              size="sm"
              subtitle="ISLA NUBLAR // INGEN"
              onClick={() => onPageChange('home')}
            />
            <p className="text-slate-400 text-xs leading-relaxed">
              ศูนย์วิจัยพันธุศาสตร์ชีวภาพและการท่องเที่ยวระดับโลก ก่อตั้งโดย International Genetic Technologies (InGen) ภายใต้การบริหารของ Masrani Global Corporation ณ เกาะอิสลา นูบลาร์ ประเทศคอสตาริกา
            </p>
            <div className="font-mono text-[11px] text-emerald-400/90">
              COORDINATES: 08°31'12"N, 83°43'12"W
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <div className="font-tech text-slate-200 text-xs font-semibold tracking-wider uppercase">
              โครงสร้างศูนย์วิจัย & พาร์ค
            </div>
            <ul className="space-y-1.5 font-tech text-xs">
              <li>
                <button
                  onClick={() => onPageChange('map')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>แผนที่ดาวเทียมเกาะอิสลานูบลาร์</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('dinosaurs')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Dna className="w-3.5 h-3.5 text-emerald-400" />
                  <span>สารานุกรม 13 สายพันธุ์มีชีวิต</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('genetics')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Dna className="w-3.5 h-3.5 text-amber-400" />
                  <span>ห้องปฏิบัติการ Hammond Creation Lab</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('zones')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>คู่มือสิ่งอำนวยความสะดวก & เครื่องเล่น</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Safety & Governance */}
          <div className="space-y-2.5">
            <div className="font-tech text-slate-200 text-xs font-semibold tracking-wider uppercase">
              ความปลอดภัย & ACU
            </div>
            <ul className="space-y-1.5 font-tech text-xs">
              <li>
                <button
                  onClick={() => onPageChange('safety')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>มาตรการกักกันสัตว์ดึกดำบรรพ์</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('safety')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>ขั้นตอนการอพยพกรณีฉุกเฉิน (Code Red)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>วิสัยทัศน์ของ ดร.เฮนรี วู และ จอห์น แฮมมอนด์</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>ตารางเรือเฟอร์รี่และจองตั๋ว</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Dispatch */}
          <div className="space-y-3 bg-[#06150e] p-4 rounded-lg border border-[#143d26]">
            <div className="flex items-center gap-2 text-rose-300 font-tech font-bold text-xs uppercase">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>ACU EMERGENCY DISPATCH</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              กรณีพบเห็นสิ่งผิดปกติหรือสัตว์หลุดออกจากแนวกั้น ติดต่อศูนย์ควบคุมกลางได้ตลอด 24 ชั่วโมง
            </p>
            <div className="font-mono text-sm font-bold text-amber-300 tracking-wider">
              HOTLINE: 1-800-INGEN-PARK
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              ISLA NUBLAR FREQUENCY: 142.85 MHz
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#10301e] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} InGen Technologies Inc. / Jurassic World. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>ISLA NUBLAR PARK GUIDE V4.2</span>
            <span>·</span>
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
