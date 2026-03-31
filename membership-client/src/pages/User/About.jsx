import React from "react";
import Navbar from "../../components/Navbar";
import { FiUsers, FiAward, FiMapPin, FiHeart,FiZap } from "react-icons/fi";

// Import your newly generated images once they are saved in assets
import ethiopianArtImg from "../../assets/art&sketch.png";
import ethiopianBookClubImg from "../../assets/readingbook.png";
import habeshaBasketballImg from "../../assets/hooping.png";
import torontoWalkImg from "../../assets/walking.png";

export default function About() {
  const memberships = [
    {
      activity: "Art & Sketch Membership",
      image: ethiopianArtImg,
      icon: <FiAward />,
      description: `
        Explore Habesha creativity through our collaborative sketch sessions. Connect with 
        fellow members to learn techniques, share cultural artwork, and build your portfolio. 
        Basic materials like sketchpads and pencils are provided. Join us to celebrate our 
        heritage through visual art. This membership costs $30/month with a 7-day free trial.
      `,
    },
    {
      activity: "Book Club Membership",
      image: ethiopianBookClubImg,
      icon: <FiUsers />,
      description: `
        Celebrate the joy of reading and culture. Participate in monthly discussions 
        focusing on diverse literature and Ethiopian authors. Connect deeply with other book lovers 
        within the Toronto community. Books for the discussions are included in your 
        membership. This plan costs $25/month with a 30-day free trial.
      `,
    },
    {
      activity: "Basketball Training Membership",
      image: habeshaBasketballImg,
      icon: <FiZap />,
      description: `
        Improve your game and represent the community. Train with experienced mentors, 
        participate in drills and community scrimmages, and focus on physical fitness. 
        Members get prioritized access to the GTA community hub training equipment. 
        The membership is $50/month with the first session free.
      `,
    },
    {
      activity: "Walking Club Membership",
      image: torontoWalkImg,
      icon: <FiHeart />,
      description: `
        Stay fit, explore the beauty of Toronto's scenic locations, and socialize with 
        community members. Join weekly walking sessions designed to foster fitness, track progress, 
        and build lasting friendships within the GTA Diaspora. Guided routes are included. 
        The plan costs $15/month with a 7-day free trial.
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      <Navbar userName="Guest" />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
        <header className="mb-20 text-center">
          <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">Our Core Pillars</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">
            Habesha Hub <span className="text-rose-600">Communities</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-sm">
            We offer specialized memberships tailored to foster connection, heritage, and growth 
            within the Ethiopian Diaspora in the GTA. Discover your community here.
          </p>
        </header>

        {memberships.map((mem, idx) => (
          <section
            key={idx}
            className="mb-16 flex flex-col md:flex-row items-center gap-10 bg-[#0d0d0d] border border-zinc-800/50 p-10 rounded-[40px] shadow-lg group hover:border-zinc-700 transition-all duration-300"
          >
            <div className="w-full md:w-96 h-72 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
               <img
                  src={mem.image}
                  alt={mem.activity}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-inner">
                      {React.cloneElement(mem.icon, { className: "text-rose-600", size: 24 })}
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">{mem.activity}</h2>
              </div>
              
              <p className="text-zinc-400 text-sm font-medium leading-relaxed whitespace-pre-line">
                {mem.description}
              </p>
              
              <div className="flex items-center gap-3 justify-center md:justify-start">
                  <FiMapPin className="text-rose-600" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Toronto GTA Community Hub</span>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}