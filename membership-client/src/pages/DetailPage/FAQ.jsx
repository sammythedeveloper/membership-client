import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This platform is built for the Ethiopian community in Toronto to connect through basketball, wellness, and shared growth. We organize open runs, training sessions, and community-driven events.",
  },
  {
    question: "Who can join the community?",
    answer:
      "Anyone is welcome. While the platform is rooted in the Ethiopian community, we are open to all individuals who want to stay active, connect, and grow together.",
  },
  {
    question: "Do I need to be a good basketball player?",
    answer:
      "Not at all. We have all skill levels—from beginners to advanced players. The goal is participation, improvement, and community.",
  },
  {
    question: "What are Community Runs?",
    answer:
      "Community Runs are organized basketball sessions where members meet, play, and connect. They usually happen weekly and are open to all members.",
  },
  {
    question: "What does the Wellness section include?",
    answer:
      "The wellness section focuses on fitness, recovery, and mental health. This includes tips, routines, and guidance to support your overall well-being.",
  },
  {
    question: "Do I need a membership to participate?",
    answer:
      "Some events are free, but membership gives you access to exclusive runs, training programs, and priority event registration.",
  },
  {
    question: "Where are the events held?",
    answer:
      "Most events take place in Toronto, including Scarborough, North York, and surrounding areas.",
  },
  {
    question: "How do I join an event?",
    answer:
      "Once you sign up, you can browse upcoming sessions and confirm your attendance directly from your dashboard.",
  },
];

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white overflow-hidden flex flex-col">
      <nav className="relative w-full border-b border-zinc-900/30 bg-[#080808] z-50">
        <div className="flex items-center justify-between px-6 py-5 md:px-20">
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 text-rose-500"
            >
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white text-sm">
                ሀ
              </div>
              <span className="inline-block">MEMBERSHIP</span>
            </Link>

            <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
              <Link to="/About">Community</Link>
              <Link to="/About">Wellness</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/signin"
              className="text-sm font-semibold text-zinc-400 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 text-sm font-bold bg-rose-600 text-white rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-900/40"
            >
              Join
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-zinc-800 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4 text-zinc-400 font-medium">
              <Link to="/About">Community</Link>
              <Link to="/About">Wellness</Link>
              <Link to="/About">Open Runs</Link>
            </div>
            <hr className="border-zinc-800" />
            <div className="flex flex-col gap-4">
              <Link
                to="/signin"
                className="text-center font-semibold text-zinc-400"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 text-center text-sm font-bold bg-rose-600 text-white rounded-xl"
              >
                Join the community
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Main Content */}
      <div className="flex justify-center px-4 sm:px-6 md:px-10 py-16">
        <div className="w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Frequently Asked <span className="text-rose-600">Questions</span>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
              Everything you need to know about the community, events, and how
              to get involved.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-zinc-800 rounded-2xl bg-[#0f0f0f]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-5 md:p-6 text-left"
                >
                  <span className="font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>

                  <span className="text-rose-500 text-xl">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-zinc-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
