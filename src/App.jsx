import React, { useState, useEffect } from 'react';

// --- Inline SVGs for reliability without external libraries ---
const ZeissLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30" className="h-6">
    <rect width="100" height="30" fill="#003b8e" rx="4" />
    <text x="50" y="20" fill="white" fontSize="16" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">ZEISS</text>
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-12 h-12 text-blue-600 mb-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const VisucoreMachineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M6 12h12M9 16h6" />
  </svg>
);

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 16v-5m4 5V8m4 8v-3" />
  </svg>
);

const TrialFrameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-8 h-8">
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4M4 12H2m20 0h-2M7 9V7m10 2V7" />
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// --- Data Constants ---
const COATINGS = [
  { id: 'chrome', name: 'DuraVision Chrome UV', price: 50, desc: 'Standard clarity and basic UV protection.' },
  { id: 'platinum', name: 'DuraVision Platinum UV', price: 120, desc: 'Maximum robustness and anti-reflective durability.' },
  { id: 'blue', name: 'DuraVision BlueProtect UV', price: 100, desc: 'Optimized blue-light filter for digital comfort.' }
];

// --- Main Application Component ---
export default function App() {
  const [step, setStep] = useState(0);

  // Data States
  const [patient, setPatient] = useState({ name: '', phone: '', email: '', dob: '', country: '', pincode: '' });
  const [patientType, setPatientType] = useState('new'); // 'existing' | 'new'
  const [lookupPhone, setLookupPhone] = useState('');
  const [isSearchingPatient, setIsSearchingPatient] = useState(false);
  
  const [visucoreStatus, setVisucoreStatus] = useState('guidance'); // guidance, scanning, done
  const [visufitStatus, setVisufitStatus] = useState('guidance'); // guidance, scanning, done

  // Extended Lifestyle Sliders
  const [sliders, setSliders] = useState({
    screen: 50,
    driving: 50,
    outdoor: 50,
    noisy: 50, // Cognitive Load
    fatigue: 50 // Digital Eye Fatigue
  });

  const [selectedCoating, setSelectedCoating] = useState(COATINGS[0]);
  const [selectedLens, setSelectedLens] = useState(null);
  const [selectedFrames, setSelectedFrames] = useState([]);

  const [frameTypeFilter, setFrameTypeFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [orderStatus, setOrderStatus] = useState('idle'); // idle, processing, success
  const [analyzing, setAnalyzing] = useState(false);

  const handlePatientLookup = () => {
    if (!lookupPhone) return;
    setIsSearchingPatient(true);
    setTimeout(() => {
      // Mock retrieving data from Patient DB
      setPatient({
        name: 'Jane Doe',
        phone: lookupPhone,
        email: 'jane.doe@example.com',
        dob: '1985-06-15',
        country: 'India',
        pincode: '560001'
      });
      setIsSearchingPatient(false);
    }, 1200);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      handleNext();
    }, 3000);
  };

  const handleOrder = (destination) => {
    setOrderStatus('processing');
    setTimeout(() => setOrderStatus('success'), 2500);
  };

  // Trigger Visucore Scan Manually
  const startVisucoreScan = () => {
    setVisucoreStatus('scanning');
    setTimeout(() => setVisucoreStatus('done'), 2500);
  };

  // Trigger Visufit Scan Manually
  const startVisufitScan = () => {
    setVisufitStatus('scanning');
    setTimeout(() => setVisufitStatus('done'), 2500);
  };

  const getLensRecommendations = () => {
    const { screen, outdoor, driving, noisy, fatigue } = sliders;
    const options = [];

    const catalog = {
      pro: { id: 'pro', name: "Zeiss SmartLife Pro", desc: "The ultimate all-in-one lens tailored for extreme visual demands.", feature: "Intelligence 2.0 Tech", price: 850, image: "https://woweye.in/cdn/shop/files/b6_ad47f2b5-5cbb-4a0b-a7fc-16db3d3fb6e4_800x.png?v=1711951736", progressiveReason: "Provides comprehensive accommodative support for seamlessly shifting focus across all distances." },
      clearmind: { id: 'clearmind', name: "Zeiss ClearMind", desc: "Developed to reduce cognitive load, aiming for clarity in visually noisy environments.", feature: "Peripheral Clarity", price: 650, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80", progressiveReason: "Engineered with a specific peripheral-blur reduction profile to ease the cognitive load in busy settings." },
      digital: { id: 'digital', name: "Zeiss SmartLife Digital", desc: "Targeted at digital lifestyles, providing support to help relieve tired eyes from device use.", feature: "BlueGuard Tech", price: 450, image: "https://woweye.in/cdn/shop/files/100_395bbe18-3210-4662-82ee-8b539507144c_800x.png?v=1711974996", progressiveReason: "Features a subtle, customized progressive zone at the lower lens to relieve ciliary muscle fatigue." },
      drive: { id: 'drive', name: "Zeiss DriveSafe", desc: "Reduces glare from oncoming traffic and improves contrast in low-light conditions.", feature: "Luminance Design", price: 500, image: "https://images.unsplash.com/photo-1589828131336-127e1fcc11f6?auto=format&fit=crop&w=600&q=80", progressiveReason: "Incorporates Luminance Design to account for low-light pupil dilation, reducing perceived glare by up to 64%." },
      photo: { id: 'photo', name: "Zeiss PhotoFusion X", desc: "Adapts to light instantly. Clear indoors, dark outdoors. Ultimate UV protection.", feature: "Fast Fade-back", price: 600, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80", progressiveReason: "Embedded with billions of photochromic dyes designed to instantly adapt to your shifting light conditions." },
      clear: { id: 'clear', name: "Zeiss ClearView", desc: "Flatter, thinner, and offering excellent clarity from the center to the very edge.", feature: "Freeform Tech", price: 300, image: "https://woweye.in/cdn/shop/files/b41_800x.png?v=1711817074", progressiveReason: "Uses advanced freeform technology across 700 parameters to provide edge-to-edge clarity in a flatter profile." }
    };

    if (screen > 80 && outdoor > 80 && driving > 80) options.push({ ...catalog.pro, matchBadge: "Ultimate Match" });
    else if (noisy > 70) options.push({ ...catalog.clearmind, matchBadge: "Top Match" });
    else if (fatigue > 70 || screen > 70) options.push({ ...catalog.digital, matchBadge: "Top Match" });
    else if (driving > 70) options.push({ ...catalog.drive, matchBadge: "Top Match" });
    else if (outdoor > 70) options.push({ ...catalog.photo, matchBadge: "Top Match" });
    else options.push({ ...catalog.clear, matchBadge: "Top Match" });

    const pId = options[0].id;
    if (pId !== 'digital' && screen > 50) options.push({ ...catalog.digital, matchBadge: "Digital Alternative" });
    else if (pId !== 'photo' && outdoor > 50) options.push({ ...catalog.photo, matchBadge: "Outdoor Alternative" });
    else if (pId !== 'pro') options.push({ ...catalog.pro, matchBadge: "Premium Upgrade" });

    const currentIds = options.map(o => o.id);
    if (!currentIds.includes('clear')) options.push({ ...catalog.clear, matchBadge: "Standard Option" });
    else if (!currentIds.includes('digital')) options.push({ ...catalog.digital, matchBadge: "Digital Alternative" });
    else options.push({ ...catalog.clearmind, matchBadge: "Clarity Upgrade" });

    return options.slice(0, 3);
  };

  const baseLensValue = 100 + ((sliders.screen + sliders.driving + sliders.outdoor + sliders.noisy + sliders.fatigue) / 500) * 1400;
  const estimatedPrice = Math.floor(baseLensValue + selectedCoating.price).toLocaleString();

  const allFrames = [
    { id: 1, name: "Minimalist Titanium", brand: "LINDBERG", type: "Rimless", stock: "In Store", price: 450, image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Classic Acetate", brand: "Moscot", type: "Full Rim", stock: "In Store", price: 320, image: "https://dayalopticalsindia.com/cdn/shop/files/Moscot_Frankle_Dark_Green.........webp?v=1761812991" },
    { id: 3, name: "Aerospace Alloy", brand: "Mykita", type: "Half Rim", stock: "Order from HQ", price: 550, image: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/1080x1080/9df78eab33525d08d6e5fb8d27136e95//v/i/Vincent-Chase-VC-E14440-C1-Eyeglasses_J_1616.jpg" },
    { id: 4, name: "Vintage Tortoise", brand: "Oliver Peoples", type: "Full Rim", stock: "In Store", price: 380, image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493669803/zBT6jgcid7R-0OV5598SU__1731P1__P21__shad__qt.png" },
    { id: 5, name: "Premiere Signature", brand: "Cartier", type: "Rimless", stock: "Order from HQ", price: 1200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5M84lkh_3yE9UqacW2SWE8yMT-zzl5MvYqw&s" },
    { id: 6, name: "Bold Square", brand: "Tom Ford", type: "Full Rim", stock: "In Store", price: 490, image: "https://www.rkumar.in/cdn/shop/files/FT6076-B_001_01_ef60de12-098b-43e3-9590-fb6cf8fa57af.jpg?v=1772851360" }
  ];

  const filteredFrames = allFrames.filter(f =>
    (frameTypeFilter === 'All' || f.type === frameTypeFilter) && (brandFilter === 'All' || f.brand === brandFilter)
  );

  const toggleFrameSelection = (frame) => {
    if (selectedFrames.some(f => f.id === frame.id)) {
      setSelectedFrames(selectedFrames.filter(f => f.id !== frame.id));
    } else {
      setSelectedFrames([...selectedFrames, frame]);
    }
  };

  const steps = [
    { id: 'profile', label: 'Patient' },
    { id: 'visucore', label: 'Refraction' },
    { id: 'visufit', label: 'Centration' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'lens', label: 'Lens' },
    { id: 'frame', label: 'Frame' },
    { id: 'summary', label: 'Summary' }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length - 1));

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans flex flex-col items-center justify-center p-4 md:p-6 selection:bg-blue-100">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[750px] flex flex-col relative transition-all duration-500 ease-in-out">

        {/* Global Header */}
        <header className="px-8 py-5 flex justify-between items-center border-b border-gray-100 bg-white z-20 shadow-sm relative">
          <div className="flex items-center space-x-3">
            <ZeissLogo />
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="font-semibold tracking-wide text-xs text-gray-500 uppercase">Vision Experience</span>
          </div>
          <div className="flex items-center space-x-6">
            {step > 0 && patient.name && (
              <div className="hidden md:flex items-center space-x-3 animate-fade-in">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-gray-800">{patient.name}</span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">DOB: {patient.dob}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold shadow-sm border border-blue-100 text-lg">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="text-sm font-medium text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 px-4 py-2 rounded-full">Back</button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50/30 flex flex-col items-center p-6 md:p-10 relative">

          {/* STEP 0: Onboarding */}
          {step === 0 && (
            <div className="animate-fade-in max-w-lg w-full text-center mt-8">
              <UserIcon />
              <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Welcome to Zeiss Vision Centre</h1>
              <p className="text-gray-500 mb-8 text-sm">Please enter details to begin your personalized vision journey.</p>
              
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex gap-2 mb-8 mx-auto w-fit">
                <button 
                  onClick={() => { setPatientType('existing'); setPatient({ name: '', phone: '', email: '', dob: '', country: '', pincode: '' }) }} 
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${patientType === 'existing' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Existing Patient</button>
                <button 
                  onClick={() => setPatientType('new')} 
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${patientType === 'new' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>New Patient</button>
              </div>

              {patientType === 'existing' && !patient.name && (
                <div className="flex gap-2 items-end text-left max-w-xs mx-auto mb-8 animate-pop-in">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      value={lookupPhone} 
                      onChange={(e) => setLookupPhone(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePatientLookup()}
                      placeholder="+1 (555) 000-0000" 
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" 
                    />
                  </div>
                  <button 
                    onClick={handlePatientLookup} 
                    disabled={isSearchingPatient || !lookupPhone}
                    className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold shadow-sm hover:bg-gray-800 transition-all whitespace-nowrap disabled:bg-gray-200 disabled:text-gray-400">
                    {isSearchingPatient ? 'Searching...' : 'Find'}
                  </button>
                </div>
              )}

              {(patientType === 'new' || patient.name) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left animate-pop-in">
                  <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label><input type="text" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} placeholder="e.g. Jane Doe" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Date of Birth</label><input type="date" value={patient.dob} onChange={(e) => setPatient({ ...patient, dob: e.target.value })} className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Contact Number</label><input type="tel" value={patient.phone} onChange={(e) => setPatient({ ...patient, phone: e.target.value })} placeholder="e.g. +1 (555) 000-0000" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                  <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label><input type="email" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })} placeholder="jane.doe@example.com" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Country <span className="text-gray-400 normal-case">(optional)</span></label><input type="text" value={patient.country} onChange={(e) => setPatient({ ...patient, country: e.target.value })} placeholder="e.g. India" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Pincode <span className="text-gray-400 normal-case">(optional)</span></label><input type="text" value={patient.pincode} onChange={(e) => setPatient({ ...patient, pincode: e.target.value })} placeholder="e.g. 560001" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none shadow-sm" /></div>
                </div>
              )}
              
              <button disabled={!patient.name.trim() || !patient.email.trim() || !patient.dob} onClick={handleNext} className={`mt-10 w-full px-8 py-4 rounded-full transition-all font-semibold text-sm shadow-md ${(patient.name.trim() && patient.email.trim() && patient.dob) ? 'bg-gray-900 text-white hover:bg-gray-800' : 'hidden'}`}>Start Experience</button>
            </div>
          )}

          {/* STEP 1: Visucore Guidance (Refraction) */}
          {step === 1 && (
            <div className="animate-fade-in w-full max-w-4xl pb-10">
              {visucoreStatus === 'guidance' ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-pop-in">
                  <div className="w-64 h-64 rounded-full overflow-hidden mb-8 shadow-2xl border-8 border-white bg-white p-4 flex items-center justify-center">
                    <img
                      src="https://www.zeiss.co.in/content/dam/vis-b2b/reference-master/images/equipment/visucore-500/visucore_500_refractor.jpg/_jcr_content/renditions/original.image_file.947.947.0,1,947,948.file/visucore_500_refractor.jpg"
                      alt="Visucore 500"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 mb-3">Refraction Measurement</h2>
                  <p className="text-gray-500 mb-6 max-w-md">Walk to the <strong>ZEISS VISUCORE 500</strong>. Rest your chin and look straight into the target.</p>
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8 max-w-xl text-left shadow-sm flex gap-4 items-start">
                    <SparkleIcon className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600" />
                    <p className="text-sm text-blue-900 leading-relaxed">
                      The ZEISS VISUCORE 500 is an all-in-one eye exam machine that combines both automated measurements and the "which lens is better, 1 or 2?" test into a single, compact unit. It allows a complete, high-precision prescription to be finished in under five minutes, using smart mirrors to simulate a 5-meter room in a space no larger than a small desk.
                    </p>
                  </div>
                  <button onClick={startVisucoreScan} className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-sm shadow-lg hover:scale-105 transition-all">Start Scan</button>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="flex gap-6 mb-8 justify-center">
                    <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full bg-[#0071C5] flex items-center justify-center shadow-md"><VisucoreMachineIcon className="text-white w-8 h-8" /></div><span className="text-[10px] font-bold text-gray-500 mt-2 uppercase">VISUCORE 500</span></div>
                    <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full bg-[#0071C5] flex items-center justify-center shadow-md"><BarChartIcon /></div><span className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Analysis</span></div>
                  </div>
                  <div className="relative w-full rounded-[2rem] bg-white shadow-sm border border-gray-200 p-8 min-h-[300px] flex items-center justify-center">
                    {visucoreStatus === 'scanning' ? (
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                        <div className="w-full max-w-sm h-1.5 bg-blue-100 rounded-full overflow-hidden mb-6 relative"><div className="absolute top-0 left-0 h-full bg-blue-600 w-1/2 animate-scan-horizontal"></div></div>
                        <span className="text-sm font-bold text-gray-800">Reading Wavefront Data...</span>
                      </div>
                    ) : (
                      <div className="w-full animate-pop-in">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                          <h2 className="text-xl font-bold">Refraction Results</h2>
                          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-green-100">Data Secured</div>
                        </div>

                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Objective Refraction <span className="text-gray-300 normal-case">(Autorefraction)</span></h3>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner mb-6">
                          <div className="grid grid-cols-[40px_1fr_1fr_1fr] gap-x-2 gap-y-4 text-center items-center text-sm font-medium">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Eye</div><div className="text-[10px] text-gray-400 font-bold uppercase">Sph</div><div className="text-[10px] text-gray-400 font-bold uppercase">Cyl</div><div className="text-[10px] text-gray-400 font-bold uppercase">Axis</div>
                            <div className="font-bold text-gray-900 bg-white rounded shadow-sm py-1">R</div><div className="bg-white py-2 rounded shadow-sm">+0.25</div><div className="bg-white py-2 rounded shadow-sm">-0.75</div><div className="bg-white py-2 rounded shadow-sm">42°</div>
                            <div className="font-bold text-gray-900 bg-white rounded shadow-sm py-1">L</div><div className="bg-white py-2 rounded shadow-sm">+0.25</div><div className="bg-white py-2 rounded shadow-sm">-0.50</div><div className="bg-white py-2 rounded shadow-sm">110°</div>
                          </div>
                        </div>

                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Subjective Refraction <span className="text-gray-300 normal-case">(Fine-tuned "1 or 2?" test)</span></h3>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner mb-6">
                          <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr] gap-x-2 gap-y-4 text-center items-center text-sm font-medium">
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Eye</div><div className="text-[10px] text-gray-400 font-bold uppercase">Sph</div><div className="text-[10px] text-gray-400 font-bold uppercase">Cyl</div><div className="text-[10px] text-gray-400 font-bold uppercase">Axis</div><div className="text-[10px] text-gray-400 font-bold uppercase">Add</div><div className="text-[10px] text-gray-400 font-bold uppercase">VA</div>
                            <div className="font-bold text-gray-900 bg-white rounded shadow-sm py-1">R</div><div className="bg-white py-2 rounded shadow-sm">+0.00</div><div className="bg-white py-2 rounded shadow-sm">-0.50</div><div className="bg-white py-2 rounded shadow-sm">46°</div><div className="bg-white py-2 rounded shadow-sm text-blue-600 font-bold">+1.00</div><div className="bg-white py-2 rounded shadow-sm">1.0</div>
                            <div className="font-bold text-gray-900 bg-white rounded shadow-sm py-1">L</div><div className="bg-white py-2 rounded shadow-sm">+0.00</div><div className="bg-white py-2 rounded shadow-sm">-0.25</div><div className="bg-white py-2 rounded shadow-sm">113°</div><div className="bg-white py-2 rounded shadow-sm text-blue-600 font-bold">+1.00</div><div className="bg-white py-2 rounded shadow-sm">1.0</div>
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-sm text-gray-700 leading-relaxed"><strong className="text-blue-900">Summary:</strong> Objective autorefraction provided the baseline, which was then refined through subjective testing. Your eyes have a standard profile with minor astigmatism. The Add power of +1.00 confirms early presbyopia support is needed for comfortable near vision.</div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-8">
                    <button onClick={handleNext} disabled={visucoreStatus !== 'done'} className={`px-10 py-4 rounded-full transition-all font-semibold text-sm shadow-md ${visucoreStatus === 'done' ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105' : 'opacity-0'}`}>Continue to Centration</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Visufit Guidance (Centration) */}
          {step === 2 && (
            <div className="animate-fade-in w-full max-w-4xl pb-10 mt-6">
              {visufitStatus === 'guidance' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-pop-in">
                  <div className="w-56 h-56 rounded-full overflow-hidden mb-8 shadow-2xl border-8 border-white bg-white p-4 flex items-center justify-center">
                    <img src="https://xitaso.com/wp-content/uploads/Referenz_Visufit_Multikamera.jpg" alt="Visufit" className="w-full h-full object-contain" />
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 mb-3">3D Digital Centration</h2>
                  <p className="text-gray-500 mb-6 max-w-md">Step in front of the <strong>ZEISS VISUFIT 1000</strong> for your 180° facial avatar scan.</p>
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8 max-w-xl text-left shadow-sm flex gap-4 items-start">
                    <SparkleIcon className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600" />
                    <p className="text-sm text-blue-900 leading-relaxed">
                      The ZEISS VISUFIT 1000 is a 3D platform that uses nine cameras to generate a digital avatar, enabling high-precision, 180-degree virtual frame comparison and accurate, contactless 3D lens centration, reducing the need for manual measurements.
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button onClick={() => { setVisufitStatus('skipped'); handleNext(); }} className="bg-white text-gray-500 border border-gray-200 px-10 py-4 rounded-full font-semibold text-sm shadow-sm hover:scale-105 transition-all">Skip</button>
                    <button onClick={startVisufitScan} className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-sm shadow-lg hover:scale-105 transition-all">Start 3D Scan</button>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in flex flex-col items-center">
                  <h1 className="text-3xl font-light text-gray-900 mb-8">{visufitStatus === 'skipped' ? 'Centration Skipped' : 'Generating 3D Avatar'}</h1>
                  <div className="relative w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 bg-white h-80">
                    <div className={`absolute inset-0 transition-all duration-1000 ${(visufitStatus === 'done' || visufitStatus === 'skipped') ? 'opacity-30 filter blur-xl' : 'opacity-100'}`}>
                      <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80" alt="Scan BG" className="w-full h-full object-cover" />
                    </div>
                    {visufitStatus === 'scanning' ? (
                      <div className="relative h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-900/40 animate-pulse"><div className="w-1 absolute left-1/2 top-0 h-full bg-blue-400 shadow-[0_0_20px_#60A5FA] animate-scan-horizontal"></div></div>
                        <div className="bg-white/90 backdrop-blur px-8 py-4 rounded-full shadow-lg z-20">Generating 180° Map...</div>
                      </div>
                    ) : (
                      <div className="relative h-full flex flex-col items-center justify-center animate-pop-in">
                        {visufitStatus === 'skipped' ? (
                          <div className="flex flex-col items-center">
                            <span className="text-4xl mb-4">⏩</span>
                            <span className="text-xl font-semibold text-gray-600">Centration stage was optional and skipped.</span>
                          </div>
                        ) : (
                          <><CheckCircleIcon /><span className="text-xl font-semibold">0.1mm Precision Achieved</span></>
                        )}
                      </div>
                    )}
                  </div>
                  <button onClick={handleNext} disabled={visufitStatus === 'scanning'} className={`mt-8 px-10 py-4 rounded-full transition-all font-semibold text-sm shadow-md ${visufitStatus !== 'scanning' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'opacity-0'}`}>Tune Lifestyle</button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Lifestyle & Coating */}
          {step === 3 && (
            <div className="animate-fade-in w-full max-w-4xl mx-auto">
              <h1 className="text-3xl font-light tracking-tight text-center mb-2">Personalize Your Solution</h1>
              <p className="text-gray-400 text-sm text-center mb-8">Adjust the sliders to match your lifestyle — watch the estimated investment update in real time.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visual Demands</h3>
                  {[{ key: 'screen', label: 'Screen Usage', l: 'Light', r: 'Heavy' }, { key: 'driving', label: 'Driving Activity', l: 'Rare', r: 'Daily/Night' }, { key: 'outdoor', label: 'Active Outdoors', l: 'Indoors', r: 'High Sun' }].map(s => (
                    <div key={s.key}>
                      <div className="flex justify-between items-end mb-2"><label className="text-sm font-bold text-gray-800">{s.label}</label><span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">{sliders[s.key]}%</span></div>
                      <input type="range" min="0" max="100" value={sliders[s.key]} onChange={(e) => setSliders({ ...sliders, [s.key]: parseInt(e.target.value) })} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none accent-blue-600" />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-wider"><span>{s.l}</span><span>{s.r}</span></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-8 flex flex-col">
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8 flex-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital & Stress Filter</h3>
                    {[{ key: 'fatigue', label: 'Eye Fatigue', color: 'purple', l: 'Rested', r: 'Strained' }, { key: 'noisy', label: 'Cognitive Load', color: 'teal', l: 'Calm', r: 'Noisy' }].map(s => (
                      <div key={s.key}>
                        <div className="flex justify-between items-end mb-2"><label className="text-sm font-bold text-gray-800">{s.label}</label><span className={`text-[10px] font-bold text-${s.color}-700 bg-${s.color}-50 px-2 py-1 rounded-full`}>{sliders[s.key]}%</span></div>
                        <input type="range" min="0" max="100" value={sliders[s.key]} onChange={(e) => setSliders({ ...sliders, [s.key]: parseInt(e.target.value) })} className={`w-full h-1.5 bg-gray-200 rounded-lg appearance-none accent-${s.color}-600`} />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-wider"><span>{s.l}</span><span>{s.r}</span></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lens Coating</h3>
                    <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                      {COATINGS.map(c => (
                        <button key={c.id} onClick={() => setSelectedCoating(c)} className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-bold transition-all duration-300 ${selectedCoating.id === c.id ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}>{c.name.split(' ').slice(1).join(' ')}</button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed text-center italic">{selectedCoating.desc}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 rounded-[2rem] p-6 flex justify-between items-center shadow-xl">
                <div><span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Base Investment</span><span className="text-xs text-gray-400">Includes {selectedCoating.name}</span></div>
                <span className="text-3xl font-light text-white tracking-tight">${estimatedPrice}</span>
              </div>
              <div className="mt-8 flex justify-center pb-10">
                <button onClick={handleAnalyze} disabled={analyzing} className="bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-700 hover:scale-105 transition-all">Analyze Final Profile</button>
              </div>

              {analyzing && (
                <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
                  <div className="relative mb-10">
                    <div className="w-28 h-28 rounded-full border-[3px] border-blue-500/20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-[3px] border-blue-400/30 flex items-center justify-center animate-spin" style={{animationDuration: '3s'}}>
                        <div className="w-12 h-12 rounded-full border-[3px] border-transparent border-t-blue-500 animate-spin" style={{animationDuration: '1.5s'}}></div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  <h2 className="text-3xl font-light text-white mb-4 tracking-tight">Analyzing Your Profile</h2>
                  <p className="text-blue-300 text-sm font-semibold mb-8 tracking-wide">Processing 4,000,000+ lens combinations to find your perfect match</p>
                  <div className="w-72 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-full animate-analyzing-bar"></div>
                  </div>
                  <p className="text-gray-500 text-xs mt-6 animate-pulse">Matching lifestyle · Optimizing clarity · Ranking designs</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Lens Selection */}
          {step === 4 && (
            <div className="animate-fade-in flex flex-col items-center w-full max-w-6xl pb-10 mt-4">
              <div className="mb-8 bg-blue-50/80 border border-blue-100 px-6 py-3 rounded-full flex items-center gap-3 animate-pop-in"><SparkleIcon /><span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">AI processed 4,000,000+ combinations for your perfect match</span></div>
              <h1 className="text-3xl font-light tracking-tight mb-10">Select Your Zeiss Precision Lens</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {getLensRecommendations().map((lens) => (
                  <div key={lens.id} onClick={() => setSelectedLens(lens)} className={`cursor-pointer rounded-[2.5rem] relative overflow-hidden group shadow-sm border-2 transition-all duration-300 flex flex-col ${selectedLens?.id === lens.id ? 'border-blue-600 bg-white ring-8 ring-blue-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}>
                    <div className="w-full aspect-[4/3] overflow-hidden relative bg-white p-6"><img src={lens.image} alt={lens.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" /><div className="absolute top-4 left-4"><span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg shadow-sm ${lens.matchBadge.includes('Match') ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>{lens.matchBadge}</span></div></div>
                    <div className="p-8 pt-2 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold text-gray-900 leading-tight">{lens.name}</h3>{selectedLens?.id === lens.id && <CheckCircleIcon className="w-6 h-6 mb-0" />}</div>
                      <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">{lens.desc}</p>
                      {lens.progressiveReason && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3"><SparkleIcon /><p className="text-[10px] text-gray-600 leading-relaxed"><strong className="text-gray-900 block mb-0.5">Why this design?</strong> {lens.progressiveReason}</p></div>
                      )}
                      <div className="flex justify-between items-center border-t border-gray-50 pt-6"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> <span className="text-[10px] font-bold text-gray-400 uppercase">{lens.feature}</span></div><span className="text-xl font-semibold text-gray-900">${lens.price}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleNext} disabled={!selectedLens} className={`mt-12 px-12 py-5 rounded-full font-bold text-sm shadow-xl transition-all ${selectedLens ? 'bg-gray-900 text-white hover:scale-105' : 'bg-gray-200 text-gray-400'}`}>Confirm Lens & Browse Frames</button>
            </div>
          )}

          {/* STEP 5: Frames */}
          {step === 5 && (
            <div className="animate-fade-in w-full max-w-5xl mx-auto pb-10">
              <div className="text-center mb-10"><h1 className="text-3xl font-light mb-2">Bespoke Frames</h1><p className="text-gray-500 text-sm max-w-xl mx-auto">Filtered via your VISUFIT avatar to ensure perfect optical alignment.</p></div>
              <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 mb-10 gap-6">
                <div className="flex bg-gray-50 p-1.5 rounded-2xl">{['All', 'Rimless', 'Full Rim', 'Half Rim'].map(type => (<button key={type} onClick={() => setFrameTypeFilter(type)} className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${frameTypeFilter === type ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}>{type}</button>))}</div>
                <div className="flex items-center gap-3"><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Brand</label><select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-xl py-2 px-4 outline-none font-bold text-gray-700"><option value="All">All Brands</option>{[...new Set(allFrames.map(f => f.brand))].map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredFrames.map((frame) => {
                  const isSelected = selectedFrames.some(f => f.id === frame.id);
                  return (
                    <div key={frame.id} onClick={() => toggleFrameSelection(frame)} className={`cursor-pointer p-6 rounded-[2rem] border-2 transition-all duration-300 relative group flex flex-col justify-between ${isSelected ? 'border-blue-600 bg-white ring-8 ring-blue-50' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}>
                      <div>
                        <div className="flex justify-between items-start mb-4"><div className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg uppercase tracking-widest ${frame.stock === 'In Store' ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'}`}>{frame.stock}</div><div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'border-gray-200'}`}>{isSelected && <CheckCircleIcon className="w-4 h-4 text-white mb-0" />}</div></div>
                        <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-gray-50 p-2 flex items-center justify-center"><img src={frame.image} alt={frame.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" /></div>
                        <h3 className="font-bold text-gray-900 text-base">{frame.brand}</h3><p className="text-xs text-gray-400 font-medium mb-8 uppercase tracking-widest">{frame.name}</p>
                      </div>
                      <div className="border-t border-gray-50 pt-4 flex justify-between items-end"><span className="text-[10px] text-gray-400 font-bold uppercase">{frame.type}</span><span className="text-lg font-bold text-gray-900">+ ${frame.price}</span></div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 flex justify-center w-full"><button disabled={selectedFrames.length === 0} onClick={handleNext} className={`px-12 py-5 rounded-full font-bold text-sm shadow-xl transition-all ${selectedFrames.length > 0 ? 'bg-gray-900 text-white hover:scale-105' : 'bg-gray-200 text-gray-400'}`}>Review Order ({selectedFrames.length} Pair{selectedFrames.length > 1 ? 's' : ''})</button></div>
            </div>
          )}

          {/* STEP 6: Summary */}
          {step === 6 && selectedLens && selectedFrames.length > 0 && (
            <div className="animate-fade-in max-w-xl mx-auto w-full pb-10 mt-6">
              {orderStatus === 'idle' && (
                <>
                  <h1 className="text-3xl font-light text-center mb-2">Final Vision Package</h1>
                  <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 shadow-sm mb-8 space-y-8 relative overflow-hidden">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-4">Investment Breakdown</h3>
                    <div className="flex justify-between items-center pb-2"><div className="flex items-center gap-5"><img src={selectedLens.image} className="w-16 h-16 object-contain rounded-2xl bg-gray-50 p-2 shadow-sm" /><div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Base Lens (x{selectedFrames.length})</p><p className="font-bold text-gray-900 text-base leading-tight">{selectedLens.name}</p></div></div><span className="text-lg font-bold">${selectedLens.price * selectedFrames.length}</span></div>
                    <div className="flex justify-between items-center py-2"><div className="flex items-center gap-5"><div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm"><SparkleIcon /></div><div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Premium Finish (x{selectedFrames.length})</p><p className="font-bold text-gray-900 text-base leading-tight">{selectedCoating.name}</p></div></div><span className="text-lg font-bold">+ ${selectedCoating.price * selectedFrames.length}</span></div>
                    {selectedFrames.map((f, i) => (
                      <div key={i} className="flex justify-between items-center py-2"><div className="flex items-center gap-5"><img src={f.image} className="w-16 h-16 object-contain rounded-2xl bg-gray-50 p-2 shadow-sm" /><div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Frame Pair {i + 1}</p><p className="font-bold text-gray-900 text-base leading-tight">{f.brand} {f.name}</p></div></div><span className="text-lg font-bold">+ ${f.price}</span></div>
                    ))}
                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center bg-gray-900 text-white -mx-10 -mb-10 p-10 rounded-b-[2.5rem] shadow-inner"><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Investment</span><span className="text-4xl font-light tracking-tighter">${((selectedLens.price + selectedCoating.price) * selectedFrames.length) + selectedFrames.reduce((acc, f) => acc + f.price, 0)}</span></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button onClick={() => handleOrder('hq')} className="flex-1 group bg-[#0071C5] text-white px-8 py-4 rounded-2xl font-medium text-sm shadow-lg hover:shadow-xl hover:bg-[#005fa3] transition-all duration-300 flex items-center justify-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                      Send to Zeiss Vision HQ
                    </button>
                    <button onClick={() => handleOrder('store')} className="flex-1 group bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium text-sm shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.99 2.99 0 00.621-1.037L4.5 3h15l.879 5.312A2.99 2.99 0 0021 9.35" /></svg>
                      Save to Vision Store
                    </button>
                  </div>
                </>
              )}
              
              {orderStatus === 'processing' && (
                <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
                  <div className="w-20 h-20 mb-8 rounded-full border-[6px] border-blue-50 border-t-blue-600 animate-spin"></div>
                  <h2 className="text-3xl font-light text-gray-900 mb-3">Transmitting Order...</h2>
                  <p className="text-gray-500 max-w-md">Securing your personalized vision package details with our Zeiss fulfillment system.</p>
                </div>
              )}
              
              {orderStatus === 'success' && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-pop-in">
                  <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                    <CheckCircleIcon className="w-16 h-16 text-green-600 mb-0" />
                  </div>
                  <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-2">Order Complete!</h2>
                  <h3 className="text-xl font-medium text-blue-600 mb-4">Thank you for choosing Zeiss.</h3>
                  <p className="text-gray-500 mb-8 max-w-md">Your bespoke Zeiss lenses and frames are successfully processed. We will notify you when they are ready for fitting.</p>
                  
                  <div className="flex gap-4 mb-8">
                    <a href="./architecture.html" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border border-gray-200 px-6 py-3.5 rounded-2xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                      Architecture
                    </a>
                    <a href="./roadmap.html" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border border-gray-200 px-6 py-3.5 rounded-2xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                      Roadmap
                    </a>
                  </div>

                  <button onClick={() => window.location.reload()} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-sm">Start New Experience</button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Wizard Navigation Bar */}
        <div className="px-4 md:px-8 py-5 bg-white border-t border-gray-200 flex justify-between items-center z-30 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex w-full max-w-4xl mx-auto justify-between items-center relative">
            <div className="absolute left-4 right-4 top-3.5 h-[2px] bg-gray-100 -z-10" />
            {steps.map((s, index) => {
              const isActive = step === index;
              const isCompleted = step > index;
              let isClickable = true;
              if (index > 0 && (!patient.name.trim() || !patient.email.trim() || !patient.dob)) isClickable = false;
              if (index > 1 && visucoreStatus !== 'done') isClickable = false;
              if (index > 2 && visufitStatus !== 'done' && visufitStatus !== 'skipped') isClickable = false;
              if (index > 4 && !selectedLens) isClickable = false;
              if (index === 6 && selectedFrames.length === 0) isClickable = false;
              return (
                <div key={s.id} className="flex flex-col items-center group relative bg-white">
                  <button onClick={() => isClickable && setStep(index)} disabled={!isClickable} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${isActive ? 'bg-gray-900 text-white ring-8 ring-gray-50 scale-125 shadow-lg' : isCompleted ? 'bg-[#0071C5] text-white' : 'bg-white text-gray-200 border-2 border-gray-100'} ${!isClickable ? 'opacity-30 cursor-not-allowed' : ''}`}>
                    {isCompleted ? <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg> : index + 1}
                  </button>
                  <span className={`text-[8px] uppercase tracking-widest mt-3 font-bold transition-colors hidden sm:block bg-white px-1 ${isActive ? 'text-gray-900' : 'text-gray-400'} ${!isClickable && 'opacity-30'}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes scan-horizontal { 0% { left: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        .animate-scan-horizontal { animation: scan-horizontal 2.5s ease-in-out infinite; }
        @keyframes popIn { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes analyzingBar { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-analyzing-bar { animation: analyzingBar 3s ease-in-out forwards; }
      `}} />
    </div>
  );
}