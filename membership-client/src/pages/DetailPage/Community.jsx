import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Hero */}
      <div className="px-6 md:px-20 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Community <span className="text-rose-600">Runs</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A space to move, connect, and belong. Our community runs bring people
          together through walking and running — building health, relationships,
          and a stronger Ethiopian community.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-20 space-y-20">

        {/* What it is */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What Are Community Runs?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Community Runs are weekly group meetups focused on walking and
            running in a relaxed and welcoming environment. They are designed
            for everyone — whether you prefer a light walk, a steady jog, or a
            more active run.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            There is no pressure, no competition — just movement, consistency,
            and being part of something bigger than yourself.
          </p>
        </section>

        {/* Connection */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Strengthening Community & Belonging
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            These runs are about more than physical activity. They create a space
            where members of the Ethiopian community can come together, meet new
            people, and build genuine relationships.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            For many, it becomes a consistent point of connection — a place where
            familiar faces, shared language, and cultural understanding create a
            strong sense of belonging.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Whether you’re new to the city or have been here for years, Community
            Runs help turn a group of individuals into a connected community.
          </p>
        </section>

        {/* Culture */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Rooted in Culture
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            These gatherings naturally reflect the Ethiopian culture of
            togetherness, support, and shared experience. Conversations flow
            easily, connections form naturally, and people feel comfortable being
            themselves.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            It’s not just about showing up to exercise — it’s about showing up
            for each other.
          </p>
        </section>

        {/* Health */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Health & Wellness Benefits
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Walking and running are some of the most accessible and effective
            ways to improve overall health. Regular participation helps strengthen
            the heart, improve endurance, and maintain a healthy lifestyle.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Beyond physical health, these runs also support mental well-being.
            Being active in a group setting can reduce stress, boost mood, and
            create a sense of routine and balance.
          </p>
          <p className="text-zinc-500 text-sm">
            Simple movement. Consistent habits. Long-term impact.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            After joining the platform, you can view upcoming runs, check
            locations, and see who’s attending. Runs are typically held weekly
            in accessible areas across the city.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            You can participate at your own pace — walk, jog, or run — and be
            part of a supportive group that encourages consistency and growth.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-10 border-t border-zinc-800">
          <h3 className="text-xl font-bold mb-4">
            Move together. Grow together.
          </h3>
          <p className="text-zinc-400 mb-6">
            Join the next community run and experience the connection for yourself.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Join a Run
          </Link>
        </div>

      </div>
    </div>
  );
}