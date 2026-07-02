/**
 * ============================================================
 *  PORTFOLIO CONTENT — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  Edit anything below to update the website. No UI components
 *  need to be touched. Push changes via GitHub to deploy.
 *
 *  THEME: "Mountain Ascent" — each award is an altitude checkpoint
 *  on the climb toward peak potential. Update `altitude` (meters)
 *  to reposition milestones along the ascent trail.
 *
 *  IMAGE ASSETS (local):
 *  ----------------------------------------------------------
 *  All images are served from the `public/` folder. Drop your
 *  files there with these exact names and extensions:
 *
 *    Profile photo  -> /gambar1.jpeg
 *    Project 1      -> /gambar2.jpeg
 *    Project 2      -> /gambar3.png   (note: .png, not .jpeg)
 *    Gallery        -> /gambar4.jpeg, /gambar5.jpeg, /gambar6.jpeg, ...
 *
 *  The extensions are intentional — match them exactly when
 *  adding files to the public folder.
 *  ----------------------------------------------------------
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  shortBio: string;
  bio: string;
  location: string;
  origin: string;
  university: string;
  faculty: string;
  acceptanceNote: string;
  status: string;
  email: string;
  /** Profile photo — local file: public/gambar1.jpeg */
  photo: string;
  /** A short caption shown under the photo. */
  photoCaption: string;
  social: {
    label: string;
    href: string;
    icon: 'github' | 'linkedin' | 'instagram' | 'mail' | 'external';
  }[];
  stats: { label: string; value: string }[];
  focusAreas: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  tags: string[];
  image: string;
  highlights: string[];
  links: { label: string; href: string; icon: 'external' | 'github' }[];
}

export interface Award {
  year: string;
  title: string;
  organization: string;
  level: string;
  description: string;
  project: string;
  icon: 'trophy' | 'medal' | 'star' | 'sparkles';
  /**
   * Altitude in meters — used to position the milestone on the Ascent Trail.
   * Higher = further up the mountain. Increments convey the climb.
   */
  altitude: number;
  /** Short label shown next to the altitude reading, e.g. "Base Camp". */
  ascentLabel: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Ascent', href: '#awards' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/*  PROFILE / HERO / ABOUT                                             */
/* ------------------------------------------------------------------ */
export const profile: Profile = {
  name: 'Imam Akbari Majid',
  tagline: 'Mechatronics Engineering Student | IoT & Automation Enthusiast',
  shortBio:
    'Mechatronics Engineering student from Bukittinggi, building at the intersection of IoT, robotics, and automation.',
  origin: 'Bukittinggi, West Sumatra',
  location: 'Yogyakarta, Indonesia',
  university: 'Universitas Negeri Yogyakarta (UNY)',
  faculty: 'Mechatronics Engineering',
  acceptanceNote: 'Accepted via SNBT 2024',
  status: 'Currently studying at Universitas Negeri Yogyakarta (UNY) — Mechatronics Engineering, accepted via SNBT 2024.',
  email: 'akbariimam8@gmail.com',
  bio: `Who Am I?

Hi, I'm Imam Akbari Majid. I am a Mechatronics Engineering student originally from Bukittinggi. Coming from a modest background has fueled my determination to maximize every opportunity, especially in automation, robotics, and programming. I actively participate in competitions and organizations to hone my technical and leadership skills.`,
  photo: '/gambar1.jpeg',
  photoCaption: 'Imam Akbari Majid — Bukittinggi → Yogyakarta',
  social: [
    { label: 'GitHub', href: 'https://github.com/senryudamn', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/imam-akbari-majid-29a5b2270/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/imam_maajiid/', icon: 'instagram' },
    { label: 'Email', href: 'mailto:akbariimam8@gmail.com', icon: 'mail' },
  ],
  stats: [
    { label: 'National Awards', value: '04' },
    { label: 'Projects Built', value: '06+' },
    { label: 'Focus Domains', value: '03' },
    { label: 'SNBT', value: '2024' },
  ],
  focusAreas: ['Internet of Things', 'Robotics', 'Industrial Automation', 'Embedded Systems'],
};

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    id: 'nfc-interactive-learning',
    title: 'NFC Interactive Learning',
    subtitle: 'Assistive EdTech for Children with Down Syndrome',
    description:
      'Interactive learning media for children with Down Syndrome utilizing NFC technology and audio-visual guidance via a tablet.',
    longDescription: [
      'An assistive learning platform that pairs physical NFC-tagged objects with a tablet-based application, turning everyday items into interactive learning triggers.',
      'When a child taps an object, the app instantly plays audio and visual guidance tuned to the learning pace of children with Down Syndrome — making education tangible, multisensory, and joyful.',
    ],
    tags: ['NFC', 'Android', 'Tablet App', 'Accessibility', 'EdTech', 'Audio-Visual'],
    image: '/gambar2.jpeg',
    highlights: [
      'Tap-to-learn interaction with NFC-tagged physical objects',
      'Audio + visual guidance tailored to Down Syndrome learners',
      'Tablet-first, kid-friendly interface',
    ],
    links: [],
  },
  {
    id: 'agrosentrix',
    title: 'AgroSentrix',
    subtitle: 'Smart Agriculture IoT Monitoring System',
    description:
      'Smart monitoring system for agriculture including soil pH, temperature, humidity, GPS tracking, and integrated pest detection.',
    longDescription: [
      'A modular IoT system that gives farmers a real-time digital pulse of their fields — continuously tracking soil pH, ambient temperature & humidity, and geolocation.',
      'An integrated pest-detection layer analyzes sensor anomalies to flag potential threats early, while GPS tracking maps every node across the farmland for total visibility.',
    ],
    tags: ['IoT', 'GPS Tracking', 'Soil pH', 'Temperature', 'Humidity', 'Pest Detection'],
    image: '/gambar3.png',
    highlights: [
      'Multi-sensor fusion: soil pH, temp, humidity, GPS',
      'Integrated pest detection with early-alert logic',
      'Google Maps integration for node visualization',
    ],
    links: [],
  },
];

/* ------------------------------------------------------------------ */
/*  AWARDS — THE ASCENT TRAIL                                          */
/*  Ordered chronologically (climbing upward). `altitude` places      */
/*  each checkpoint along the trail. Base camp starts low.            */
/* ------------------------------------------------------------------ */
export const awards: Award[] = [
  {
    year: '2025',
    title: '3rd Place',
    organization: 'UNY National IT Competition (UNITY) #13',
    level: 'National',
    description:
      'Integrated IoT and Google Maps Agriculture System — a connected platform for real-time farm monitoring with geospatial visualization.',
    project: 'Integrated IoT and Google Maps Agriculture System',
    icon: 'medal',
    altitude: 1200,
    ascentLabel: 'Base Camp',
  },
  {
    year: '2025',
    title: "2nd Place — Most Innovative Idea",
    organization: 'Skim Karsa Cipta, Directorate of Student Affairs & Alumni UNY',
    level: 'University Level',
    description:
      'Awarded for the most innovative idea in the Karsa Cipta scheme — recognizing creative, high-impact engineering thinking.',
    project: '—',
    icon: 'sparkles',
    altitude: 2400,
    ascentLabel: 'Ridge Line',
  },
  {
    year: '2026',
    title: '4th Place (Juara Harapan II)',
    organization: 'UNY National IT Competition (UNITY) #14',
    level: 'National',
    description:
      'INOVASI SMART HEALTHCARE INKLUSIF — integrating a smart triage machine and social literacy to strengthen the independence of primary health facilities in the Mentawai Islands.',
    project:
      'Inovasi Smart Healthcare Inklusif: Integrasi Mesin Triase Cerdas dan Literasi Sosial Guna Penguatan Kemandirian Faskes Pertama di Kepulauan Mentawai',
    icon: 'medal',
    altitude: 3600,
    ascentLabel: 'High Camp',
  },
  {
    year: '2026',
    title: 'Outstanding Student in Reasoning (Mahasiswa Berprestasi Bidang Penalaran)',
    organization: 'Universitas Negeri Yogyakarta',
    level: 'University Level',
    description:
      'Recognized as the top-performing student in the reasoning & achievement category at the university level — the summit of the trail so far.',
    project: '—',
    icon: 'trophy',
    altitude: 4810,
    ascentLabel: 'Summit',
  },
];

/* ------------------------------------------------------------------ */
/*  GALLERY                                                            */
/*  Images are local files in public/: /gambar4.jpeg, /gambar5.jpeg,  */
/*  /gambar6.jpeg, ... Drop your photos with those exact names.        */
/* ------------------------------------------------------------------ */
export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Robotics in Action',
    description: 'Prototyping autonomous movement and control systems in the lab.',
    category: 'Robotics',
    image: '/gambar4.jpeg',
  },
  {
    id: 'g2',
    title: 'IoT Field Deployment',
    description: 'Deploying AgroSentrix sensor nodes across farmland for live monitoring.',
    category: 'IoT',
    image: '/gambar5.jpeg',
  },
  {
    id: 'g3',
    title: 'Competition Day',
    description: 'Presenting at UNY National IT Competition (UNITY).',
    category: 'Competitions',
    image: '/gambar6.jpeg',
  },
  {
    id: 'g4',
    title: 'Circuit & Soldering',
    description: 'Designing and hand-soldering custom PCBs for embedded projects.',
    category: 'Hardware',
    image: '/gambar7.jpeg',
  },
  {
    id: 'g5',
    title: 'Smart Agriculture',
    description: 'Monitoring soil conditions to enable data-driven farming decisions.',
    category: 'IoT',
    image: '/gambar8.jpeg',
  },
  {
    id: 'g6',
    title: 'Award Ceremony',
    description: 'Receiving recognition for engineering innovation and teamwork.',
    category: 'Competitions',
    image: '/gambar9.jpeg',
  },
  {
    id: 'g7',
    title: 'Automation Lab',
    description: 'Working with PLCs, actuators, and control panels on the bench.',
    category: 'Hardware',
    image: '/gambar10.jpeg',
  },
  {
    id: 'g8',
    title: 'Team & Mentorship',
    description: 'Leading and collaborating within student organizations and project teams.',
    category: 'Community',
    image: '/gambar11.jpeg',
  },
];
