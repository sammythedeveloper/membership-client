import { Link } from "react-router-dom";

export default function Programs() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Hero */}
      <div className="px-6 md:px-20 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Training <span className="text-rose-600">Programs</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Our programs are designed to develop not just your basketball skills,
          but your discipline, confidence, and connection with the community.
          Whether you're stepping on the court for the first time or refining
          your competitive edge, there is a place for you here.
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-20 space-y-20">
        {/* Beginner */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Beginner Development
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This program is built for individuals who are new to basketball or
            returning after a long break. We focus on building a strong
            foundation through repetition, guidance, and encouragement.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Participants will learn essential skills such as ball handling,
            shooting form, footwork, and basic game understanding. Sessions are
            paced to ensure everyone progresses comfortably without pressure.
          </p>
          <p className="text-zinc-500 text-sm">
            Focus areas: Dribbling, shooting mechanics, coordination, confidence
          </p>
        </section>

        {/* Intermediate */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Intermediate Training
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Designed for players who understand the basics and are ready to take
            their game to the next level. This program introduces structured
            drills, game scenarios, and conditioning.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            You will develop better decision-making, improve your shooting under
            pressure, and gain confidence in real gameplay situations.
          </p>
          <p className="text-zinc-500 text-sm">
            Focus areas: Game IQ, movement, teamwork, endurance
          </p>
        </section>

        {/* Advanced */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Advanced Performance
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This high-level program is for competitive players who want to push
            their limits. Sessions are intense, fast-paced, and focused on real
            performance outcomes.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Players will train in advanced techniques, situational gameplay, and
            mental resilience. Expect a challenging environment that prepares
            you for competitive runs and tournaments.
          </p>
          <p className="text-zinc-500 text-sm">
            Focus areas: Advanced skills, speed, decision-making, competitive
            play
          </p>
        </section>

        {/* Private Coaching */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Private Coaching
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            For those who want personalized attention, private coaching offers a
            fully tailored experience based on your goals and current level.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Whether you're trying to fix specific weaknesses or accelerate your
            development, coaches will work closely with you to create a focused
            improvement plan.
          </p>
          <p className="text-zinc-500 text-sm">
            Focus areas: Personalized training, rapid improvement, skill
            refinement
          </p>
        </section>

        {/* Closing CTA */}
        <div className="text-center pt-10 border-t border-zinc-800">
          <h3 className="text-xl font-bold mb-4">
            Ready to take the next step?
          </h3>
          <p className="text-zinc-400 mb-6">
            Join the community and start training with us.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Join the Program
          </Link>
        </div>
      </div>
    </div>
  );
}
