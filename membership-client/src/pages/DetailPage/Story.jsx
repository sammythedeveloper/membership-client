import { Link } from "react-router-dom";
import communityImg from "../../assets/community.png";
import generation from "../../assets/real.png";
import city from "../../assets/readingbook.png";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* HERO */}
      <div className="relative px-6 md:px-20 py-32 text-center border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-rose-950/20 blur-[160px] -z-10" />

        <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-6">
          OUR STORY
        </p>

        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.05]">
          From Ethiopia <br />
          <span className="text-rose-600">to Toronto</span>
        </h1>

        <p className="text-zinc-400 max-w-3xl mx-auto mt-8 text-lg md:text-xl leading-relaxed">
          A story about identity, migration, youth, struggle, and the quiet
          search for belonging in a city that never stops moving.
        </p>
      </div>

      {/* SECTION 1 */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Leaving home is never just a move — it’s a shift in identity
          </h2>

          <p className="text-zinc-400 leading-relaxed text-lg">
            For many Ethiopian families who arrived in Canada, the journey was
            built on hope. Hope for safety. Hope for opportunity. Hope for a
            better future for their children.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            But behind that hope was something more quiet — the weight of
            leaving everything familiar behind. Language, culture, neighbors,
            food, sound, rhythm of life. Everything changes at once.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Toronto becomes home, but not instantly. It becomes a place you
            learn to live in, not one you immediately belong to.
          </p>
        </div>

        <div className="h-[420px] rounded-2xl border border-zinc-800 bg-[#0f0f0f] flex items-center justify-center text-zinc-600">
          <img
            src={generation}
            alt="— Ethiopian migration / arrival in Canada"
          />
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-[#0b0b0b] border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
          <div className="h-[420px] rounded-2xl border border-zinc-800 bg-[#0f0f0f] flex items-center justify-center text-zinc-600 order-2 md:order-1">
            <img src={city} alt="— Toronto streets / isolation / city life" />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              For the youth, the silence is often the hardest part
            </h2>

            <p className="text-zinc-400 leading-relaxed text-lg">
              Growing up Ethiopian in Toronto often means living between two
              worlds. At home, you are shaped by culture, language, and
              tradition. Outside, you are adapting to a completely different
              rhythm of life.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Many young people quietly carry this tension. Trying to fit in
              without losing themselves. Trying to belong without fully knowing
              where they belong.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              It is not always spoken about, but it is deeply felt — in schools,
              in friendships, in everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Then something simple starts to change everything
          </h2>

          <p className="text-zinc-400 leading-relaxed text-lg">
            It doesn’t begin with something big. It starts with movement.
            Running. Walking. Basketball. Meeting in open spaces. Showing up
            without pressure.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Slowly, strangers become familiar. Familiar becomes connection.
            Connection becomes trust.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            And in those moments — between sweat, laughter, and shared effort —
            something deeper begins to form: community.
          </p>
        </div>

        <div className="h-[420px] rounded-2xl border border-zinc-800 bg-[#0f0f0f] flex items-center justify-center text-zinc-600">
          <img src={communityImg} alt="— community runs / group activity" />
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="bg-[#0b0b0b] border-y border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-28 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            A place where you don’t have to explain yourself
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            This platform was created from that exact need — to build a space
            where Ethiopian youth in Toronto can connect without translation,
            without pretending, without distance.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            A place where identity is not something you lose or hide, but
            something you share.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-28 text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          More than fitness. More than events.
        </h2>

        <p className="text-zinc-400 leading-relaxed text-lg">
          Running improves health. Training builds discipline. But community
          builds something deeper — belonging.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          In a city like Toronto, where life moves fast and connection can feel
          rare, this space exists to slow things down just enough for people to
          find each other again.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center py-24 px-6 border-t border-zinc-900">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          This is still being written
        </h3>

        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
          Every run, every meeting, every new member adds another line to this
          story.
        </p>

        <Link
          to="/signup"
          className="inline-block bg-rose-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
        >
          Join the Community
        </Link>
      </div>
    </div>
  );
}
