export interface ParkZone {
  id: string;
  nameTh: string;
  nameEn: string;
  taglineTh: string;
  category: 'attraction' | 'paddock' | 'facility' | 'hospitality' | 'restricted';
  categoryTh: string;
  threatStatus: 'nominal' | 'elevated' | 'restricted';
  threatStatusTh: string;
  mapCoords: { x: number; y: number }; // percentage on island map
  featuredSpeciesIds: string[];
  capacityGuests: number;
  openHoursTh: string;
  ticketAccessTh: string;
  image: string;
  descriptionTh: string;
  highlightsTh: string[];
  safetyGuidelinesTh: string[];
  facilitySpecs: {
    fenceVoltage?: string;
    viewingGlassThickness?: string;
    submersibleDepth?: string;
    areaSize?: string;
  };
}

export const PARK_ZONES_DATA: ParkZone[] = [
  {
    id: 't-rex-kingdom',
    nameTh: 'อาณาจักรทีเร็กซ์ (T-Rex Kingdom)',
    nameEn: 'T-Rex Kingdom (Paddock 9)',
    taglineTh: 'เผชิญหน้ากับราชันแห่งไดโนเสาร์หลังกระจกนิรภัย 20 ฟุต',
    category: 'paddock',
    categoryTh: 'กรงควบคุมผู้ล่าสูงสุด',
    threatStatus: 'nominal',
    threatStatusTh: 'ระบบกรงระดับ 5 ทำงานปกติ',
    mapCoords: { x: 42, y: 55 },
    featuredSpeciesIds: ['t-rex'],
    capacityGuests: 1200,
    openHoursTh: '09:00 - 18:30 น. (การให้อาหาร: 11:00 และ 15:30 น.)',
    ticketAccessTh: 'บัตรเข้าชมทุกประเภท / แนะนำการจองล่วงหน้า',
    image: '/assets/images/zone_trex_kingdom_1791076764292.jpg',
    descriptionTh: 'โซนจัดแสดงยอดนิยมอันดับ 1 ของจูราสสิค เวิลด์ จัดจำลองระบบนิเวศป่าทึบยุคครีเทเชียส ผู้เยี่ยมชมสามารถชม ไทแรนโนซอรัส เร็กซ์ ตัวจริงผ่านโดมกระจกนิรภัยหรือระเบียงชมวิวไฮดรอลิกระดับสูง',
    highlightsTh: [
      'ท่อนไม้ชมวิวจำลองพร้อมกระจกอะคริลิกกันกระสุนหนา 4 นิ้ว',
      'การแสดงให้อาหารสดด้วยระบบรางเคเบิลอัตโนมัติ',
      'เซนเซอร์ตรวจจับแรงสั่นสะเทือนพื้นดินแบบเรียลไทม์',
      'ระบบไฟส่องสว่างความเข้มสูงสำหรับการเปิดให้ชมรอบพิเศษยามค่ำคืน',
    ],
    safetyGuidelinesTh: [
      'ห้ามใช้แฟลชถ่ายรูปเด็ดขาด เนื่องจากอาจกระตุ้นการล่าของทีเร็กซ์',
      'ห้ามเคาะหรือสัมผัสแนวกระจกกันกระสุน',
      'ในกรณีสัญญาณเตือนไซเรนดัง ให้เดินตามเจ้าหน้าที่ ACU ไปยังหลุมหลบภัย B-2',
    ],
    facilitySpecs: {
      fenceVoltage: '10,000 โวลต์ (สำรองไฟ 3 ชั้น)',
      viewingGlassThickness: 'กระจกอะคริลิกเสริมเหล็ก 120 มม.',
      areaSize: '2.5 ตารางกิโลเมตร',
    },
  },
  {
    id: 'mosasaurus-lagoon',
    nameTh: 'ลากูนโมซาซอร์ (Mosasaurus Lagoon)',
    nameEn: 'Mosasaurus Lagoon & Underwater Observatory',
    taglineTh: 'อัฒจันทร์ยักษ์ริมอ่าวและอุโมงค์กระจกใต้บาดาล 3 ล้านแกลลอน',
    category: 'attraction',
    categoryTh: 'อารีน่าทางทะเล & สวนน้ำ',
    threatStatus: 'nominal',
    threatStatusTh: 'เซนเซอร์คลื่นใต้น้ำปกติ',
    mapCoords: { x: 58, y: 64 },
    featuredSpeciesIds: ['mosasaurus'],
    capacityGuests: 3000,
    openHoursTh: '10:00 - 19:00 น. (โชว์กระโดดงับเหยื่อทุก 2 ชั่วโมง)',
    ticketAccessTh: 'บัตรทั่วไป & VIP Splash Zone',
    image: '/assets/images/zone_mosasaurus_lagoon_1791076777552.jpg',
    descriptionTh: 'สระน้ำเค็มธรรมชาติขนาดยักษ์ใจกลางพาร์ค ลึกกว่า 40 เมตร เป็นที่อยู่อาศัยของโมซาซอร์ สัตว์เลื้อยคลานทะเลยักษ์ยุคครีเทเชียส มีอัฒจันทร์เคลื่อนที่และอุโมงค์ชมใต้น้ำที่มองเห็นการล่าเหยื่อได้อย่างใกล้ชิด',
    highlightsTh: [
      'การแสดง Mosasaurus Feeding Show แขวนเหยื่อฉลามขาวจำลอง',
      'อัฒจันทร์เลื่อนระดับลงใต้ผิวน้ำ (Submersible Bleachers)',
      'อุโมงค์กระจก 360 องศาใต้ท้องทะเลลากูน',
      'โซนเปียกน้ำ Splash Zone สำหรับผู้รักความตื่นเต้น',
    ],
    safetyGuidelinesTh: [
      'โซน 5 แถวหน้าจะเปียกน้ำเกลืออย่างรุนแรง กรุณาเก็บอุปกรณ์อิเล็กทรอนิกส์ในถุงกันน้ำ',
      'ห้ามโยนวัตถุหรือเศษอาหารลงในลากูน',
    ],
    facilitySpecs: {
      fenceVoltage: 'ตาข่ายโซนิคขับไล่สัตว์น้ำกำลังสูง',
      submersibleDepth: 'ลึก 42 เมตร ปริมาตรน้ำ 3,000,000 แกลลอน',
      areaSize: 'อ่าวลากูน 85,000 ตารางเมตร',
    },
  },
  {
    id: 'raptor-paddock',
    nameTh: 'กรงวิจัยเวโลซิแรปเตอร์ (Raptor Research Paddock)',
    nameEn: 'InGen Raptor Research Containment Area',
    taglineTh: 'ศูนย์วิจัยพฤติกรรมสัตว์นักล่าและโครงการศึกษาอัลฟ่าของ InGen',
    category: 'restricted',
    categoryTh: 'เขตวิจัยความมั่นคงสูง',
    threatStatus: 'elevated',
    threatStatusTh: 'เฝ้าระวังระดับความฉลาดของฝูง',
    mapCoords: { x: 38, y: 72 },
    featuredSpeciesIds: ['velociraptor'],
    capacityGuests: 150,
    openHoursTh: 'เฉพาะทัวร์ VIP พิเศษ (จำกัดรอบ 13:00 และ 16:00 น.)',
    ticketAccessTh: 'InGen Research Access Pass เท่านั้น',
    image: '/assets/images/zone_raptor_paddock_1791076786698.jpg',
    descriptionTh: 'ศูนย์วิจัยเฉพาะทางที่ควบคุมดูแลโดยหน่วยวิจัยพฤติกรรมสัตว์ของ InGen เป็นที่อยู่อาศัยของฝูงแรปเตอร์ 4 ตัว (Blue, Charlie, Delta, Echo) สร้างด้วยกำแพงคอนกรีตหนา 15 ฟุตและมีสะพานสังเกตการณ์ด้านบน',
    highlightsTh: [
      'สะพานคนเดินแขวนเหนือแนวกรงสำหรับศึกษาสรีระและสายตาของแรปเตอร์',
      'คลิกเกอร์ฝึกสอนและการตอบสนองต่อสัญญาณคำสั่งเสียง',
      'ห้องทดลองยีนเพื่อตรวจสอบความจำทางพันธุกรรม',
    ],
    safetyGuidelinesTh: [
      'ห้ามยื่นแขนหรืออุปกรณ์ใดๆ เหนือแนวตาข่ายไฟฟ้า',
      'ห้ามสบสายตากับอัลฟ่า (Blue) โดยตรงเป็นเวลานาน',
      'ต้องมีเจ้าหน้าที่ ACU พกอาวุธควบคุมคลื่นเสียงดูแลตลอดเวลา',
    ],
    facilitySpecs: {
      fenceVoltage: 'กำแพงคอนกรีตเสริมเหล็ก + รั้วไฟฟ้า 8,000 โวลต์',
      viewingGlassThickness: 'แผ่นอะคริลิกนิรภัย 100 มม.',
      areaSize: '40,000 ตารางเมตร',
    },
  },
  {
    id: 'the-aviary',
    nameTh: 'กรงนกยักษ์ดึกดำบรรพ์ (The Aviary)',
    nameEn: 'The Aviary Geodesic Sanctuary',
    taglineTh: 'โดมตาข่ายไทเทเนียมขนาดยักษ์ ครอบคลุมหุบผาชันและรังนกบินได้',
    category: 'attraction',
    categoryTh: 'เขตอนุรักษ์สัตว์ปีกดึกดำบรรพ์',
    threatStatus: 'nominal',
    threatStatusTh: 'แรงดันโครงข่ายโดม 100%',
    mapCoords: { x: 50, y: 35 },
    featuredSpeciesIds: ['pteranodon', 'dimorphodon'],
    capacityGuests: 800,
    openHoursTh: '08:30 - 17:30 น.',
    ticketAccessTh: 'บัตรเข้าชมทุกประเภท',
    image: '/assets/images/zone_aviary_dome_1791076798259.jpg',
    descriptionTh: 'โดมตาข่ายเหล็กกำลังสูงรูปทรงจีโอเดสิก พื้นที่กว่า 430,000 ตารางฟุต ครอบคลุมแม่น้ำและหน้าผาหินธรรมชาติ ผู้เยี่ยมชมสามารถเดินชมบนสะพานแขวนและหอคอยลิฟต์กระจกเพื่อชมนกบินยุคดึกดำบรรพ์',
    highlightsTh: [
      'สะพานแขวนข้ามหุบเหวท่ามกลางฝูงเทอราโนดอนบินโฉบ',
      'จุดชมรังฟักไข่บนหน้าผาเทียมด้วยกล้องส่องทางไกลไฮเดฟินิชัน',
      'สถานีลิฟต์กระจกชมโดมแบบ 360 องศา',
    ],
    safetyGuidelinesTh: [
      'กรุณาสวมหมวกนิรภัยที่จุดทางเข้าโดม',
      'ห้ามส่งเสียงดังหรือสะท้อนแสงเลเซอร์ใส่สัตว์ปีก',
      'ห้ามเดินออกนอกเส้นทางสะพานแขวนที่มีตาข่ายกันตก',
    ],
    facilitySpecs: {
      fenceVoltage: 'โครงถักตาข่ายสายเคเบิลไทเทเนียมทนแรงดึงสูง',
      areaSize: '430,000 ตารางฟุต สูง 65 เมตร',
    },
  },
  {
    id: 'innovation-center',
    nameTh: 'ศูนย์นวัตกรรม (Samsung Innovation Center)',
    nameEn: 'Samsung Innovation Center & Creation Lab',
    taglineTh: 'หัวใจแห่งวิทยาศาสตร์จูราสสิค โฮโลแกรม ห้องฟักไข่ และแล็บดีเอ็นเอ',
    category: 'facility',
    categoryTh: 'ศูนย์การเรียนรู้ & ห้องปฏิบัติการกลาง',
    threatStatus: 'nominal',
    threatStatusTh: 'ระบบควบคุมสิ่งแวดล้อมสถาวะปลอดภัย',
    mapCoords: { x: 53, y: 70 },
    featuredSpeciesIds: ['apatosaurus', 'gallimimus', 'parasaurolophus'],
    capacityGuests: 4500,
    openHoursTh: '08:00 - 22:00 น. (เปิดบริการตลอดทั้งวัน)',
    ticketAccessTh: 'เปิดให้เข้าชมฟรีสำหรับนักท่องเที่ยวทุกคน',
    image: '/assets/images/jw_innovation_lab_1791074505823.jpg',
    descriptionTh: 'อาคารทรงปิรามิดสองชั้นอันเป็นสัญลักษณ์ของ Main Street จัดแสดงนิทรรศการโฮโลแกรมอินเทอร์แอคทีฟ อุโมงค์ขุดฟอสซิล และมีไฮไลต์คือ Hammond Creation Lab ที่สามารถมองทะลุกระจกเห็นนักพันธุศาสตร์ฟักไข่ไดโนเสาร์สดๆ',
    highlightsTh: [
      'Holo-Desk สารานุกรมไดโนเสาร์แบบโฮโลกราฟิก 3 มิติ',
      'ห้องฟักไข่ดึกดำบรรพ์ (Nursery Incubation Chamber)',
      'มิสเตอร์ดีเอ็นเอ (Mr. DNA) แอนิเมชันอธิบายการโคลนนิ่ง',
      'เครื่องจำลองลำดับเบสดีเอ็นเอและขุดค้นฟอสซิลเสมือนจริง',
    ],
    safetyGuidelinesTh: [
      'พื้นที่เป็นมิตรต่อเด็กและครอบครัว มีเครื่องปรับอากาศเต็มระบบ',
      'ห้ามใช้แฟลชถ่ายรูปภายในห้องเนอสเซอรี่ฟักไข่อ่อน',
    ],
    facilitySpecs: {
      areaSize: '35,000 ตารางเมตร สองชั้นพร้อมห้องแล็บปลอดเชื้อ',
    },
  },
  {
    id: 'gyrosphere-valley',
    nameTh: 'หุบเขาไจโรสเฟียร์ (Gyrosphere Valley)',
    nameEn: 'Gyrosphere Valley & Herbivore Safari',
    taglineTh: 'ขับลูกแก้วแก้วคริสตัลกันกระสุนสำรวจทุ่งกินพืชขนาดมหึมา',
    category: 'attraction',
    categoryTh: 'ทัวร์ซาฟารีขับเคลื่อนอัตโนมัติ',
    threatStatus: 'nominal',
    threatStatusTh: 'ยานพาหนะควบคุมด้วยดาวเทียม GPS',
    mapCoords: { x: 30, y: 45 },
    featuredSpeciesIds: ['apatosaurus', 'triceratops', 'stegosaurus', 'ankylosaurus', 'gallimimus', 'parasaurolophus'],
    capacityGuests: 2500,
    openHoursTh: '08:30 - 17:00 น.',
    ticketAccessTh: 'บัตรทั่วไป (รวมในบัตรเข้าสวนสนุก)',
    image: '/assets/images/zone_gyrosphere_valley_1791076811476.jpg',
    descriptionTh: 'ทุ่งหญ้าสะวันนากว้างใหญ่ล้อมรอบด้วยเทือกเขาเขตร้อน นักท่องเที่ยวจะได้นั่งในลูกแก้วไจโรสเฟียร์ 2 ที่นั่งที่ขับเคลื่อนด้วยระบบไฟฟ้า หมุนได้ 360 องศา และขับตามเส้นทางผ่านฝูงไดโนเสาร์กินพืชขนาดยักษ์นับร้อยตัว',
    highlightsTh: [
      'ลูกบอลไจโรสเฟียร์กระจกอะลูมิเนียมออกซีไนไตรด์ ป้องกันแรงกระแทกระดับ 50 คาลิเบอร์',
      'ระบบจอสัมผัสแสดงข้อมูลสายพันธุ์ที่อยู่ตรงหน้าโดยอัตโนมัติ',
      'ขับผ่านฝูงอะแพทโทซอรัส ไทรเซอราทอปส์ และสเตโกซอรัสในระยะเผชิญหน้า',
    ],
    safetyGuidelinesTh: [
      'ห้ามขับรถออกนอกเส้นทางหรือชนต้อนฝูงสัตว์',
      'ในกรณีที่มีฝนตกหนักหรือพายุ ระบบจะนำรถกลับฐานอัตโนมัติ ห้ามฝืนบังคับรถ',
    ],
    facilitySpecs: {
      areaSize: '12 ตารางกิโลเมตร',
      fenceVoltage: 'แนวกั้นอัลตราโซนิกใต้ดิน ไร้รั้วกั้นสายตา',
    },
  },
  {
    id: 'restricted-sector',
    nameTh: 'เขตหวงห้ามป่าทึบภาคเหนือ (North Restricted Sector)',
    nameEn: 'Sector 11 Isolation Paddock',
    taglineTh: 'เขตควบคุมความปลอดภัยระดับสูงสุด ห้ามบุคคลภายนอกเข้าโดยเด็ดขาด',
    category: 'restricted',
    categoryTh: 'เขตกักกันความมั่นคงพิเศษ',
    threatStatus: 'restricted',
    threatStatusTh: 'ระดับการกักกัน: ความมั่นคงสูงสุด (Level 5)',
    mapCoords: { x: 28, y: 22 },
    featuredSpeciesIds: ['indominus-rex'],
    capacityGuests: 0,
    openHoursTh: 'ปิดไม่ให้สาธารณชนเข้าชม',
    ticketAccessTh: 'เจ้าหน้าที่ระดับบอร์ดบริหาร InGen และ ACU Alpha ทีมเท่านั้น',
    image: '/assets/images/zone_restricted_paddock11_1791076833325.jpg',
    descriptionTh: 'กรงคอนกรีตเสริมเหล็กสูง 40 ฟุตกลางป่าทึบทางตอนเหนือของเกาะอิสลานูบลาร์ สร้างขึ้นเพื่อกักกันและสังเกตการณ์ตัวอย่างทดลองลูกผสม Indominus Rex ติดตั้งเซนเซอร์ตรวจจับความร้อน เซนเซอร์วัดการเคลื่อนไหว และกล้องใยแก้วนำแสง',
    highlightsTh: [
      'กำแพงคอนกรีตหนา 1.5 เมตร เคลือบสารต้านกรด',
      'เครนส่งอาหารพร้อมระบบกล้องจับความร้อนอินฟราเรด',
      'ระบบทำลายตนเองฉุกเฉินและระบบแก๊สสลบแรงดันสูง',
    ],
    safetyGuidelinesTh: [
      'เขตห้ามเข้าเด็ดขาด บุคลากรที่ละเมิดจะถูกดำเนินการตามมาตรการความมั่นคงของ InGen',
      'หากเซนเซอร์จับความร้อนไม่พบเป้าหมาย ห้ามเข้าไปตรวจสอบภายในกรงเด็ดขาด',
    ],
    facilitySpecs: {
      fenceVoltage: 'กำแพงคอนกรีต 40 ฟุต + สลิงรับแรงกระแทก 50 ตัน',
      areaSize: '500,000 ตารางเมตร',
    },
  },
  {
    id: 'main-street-hub',
    nameTh: 'ถนนสายหลักและท่าเรือ (Main Street & Ferry Terminal)',
    nameEn: 'Main Street, Boardwalk & Guest Port',
    taglineTh: 'ศูนย์กลางการต้อนรับ แหล่งช้อปปิ้ง โรงแรมหรู 5 ดาว และร้านอาหารชั้นนำ',
    category: 'hospitality',
    categoryTh: 'เขตบริการนักท่องเที่ยว & รีสอร์ต',
    threatStatus: 'nominal',
    threatStatusTh: 'เขตปลอดภัยสูงสุดของเกาะ',
    mapCoords: { x: 62, y: 78 },
    featuredSpeciesIds: [],
    capacityGuests: 20000,
    openHoursTh: 'เปิดบริการ 24 ชั่วโมง',
    ticketAccessTh: 'เปิดเสรีสำหรับผู้มีบัตรผ่านเกาะ',
    image: '/assets/images/zone_main_street_1791076822807.jpg',
    descriptionTh: 'ถนนคนเดินปูหินกว้างใหญ่ริมลากูน รายล้อมด้วยร้านอาหารนานาชาติ แกลเลอรีของที่ระลึก โรงแรม Hilton Isla Nublar Resort สถานีรถไฟโมโนเรลความเร็วสูง และจุดเทียบเรือเฟอร์รี่จากคอสตาริกา',
    highlightsTh: [
      'ร้านสเต็ก Winston’s Steakhouse และ Starbucks Cafe ริมลากูน',
      'โรงภาพยนตร์ IMAX แสดงประวัติศาสตร์การฟื้นคืนชีพไดโนเสาร์',
      'สถานีรถไฟรางเดี่ยว Monorail เชื่อมต่อไปยังทุกโซนรอบเกาะ',
      'ร้านขายของที่ระลึกอย่างเป็นทางการของ Jurassic Traders',
    ],
    safetyGuidelinesTh: [
      'จุดประชาสัมพันธ์และหน่วยปฐมพยาบาลเปิดตลอด 24 ชั่วโมง',
      'สามารถแลกรับสายรัดข้อมือดิจิทัล HoloBand ได้ที่เคาน์เตอร์ต้อนรับ',
    ],
    facilitySpecs: {
      areaSize: 'ย่านการค้าและโรงแรม 150,000 ตารางเมตร',
    },
  },
];
