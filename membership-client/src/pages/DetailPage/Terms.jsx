import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Header */}
      <div className="px-6 md:px-20 py-20 text-center border-b border-zinc-900">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Terms of <span className="text-rose-600">Service</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          These Terms explain how our community platform works, what you can
          expect from us, and what we expect from you as a member.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 space-y-16">

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Our Mission</h2>
          <p className="text-zinc-400 leading-relaxed">
            This platform is built to strengthen the Ethiopian community in
            Toronto through basketball, running, wellness, and shared
            experiences. Our goal is to create connection, belonging, and
            personal growth through community-driven activities.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Membership & Access</h2>
          <p className="text-zinc-400 leading-relaxed">
            Some events and features are open to everyone, while others may
            require a membership. Membership gives access to exclusive events,
            priority registration, and additional community features.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Community Conduct</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            We are a community built on respect, inclusion, and positivity.
            By joining, you agree to:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2">
            <li>Respect all members regardless of background or skill level</li>
            <li>Avoid harmful, disrespectful, or disruptive behavior</li>
            <li>Support a safe and welcoming environment for everyone</li>
            <li>Follow event guidelines and organizer instructions</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Events & Participation</h2>
          <p className="text-zinc-400 leading-relaxed">
            Community events such as runs, training sessions, and meetups are
            voluntary. You participate at your own risk and are responsible for
            your own health and safety during activities.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Payments (Stripe)</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Payments for memberships or events are processed securely through
            Stripe. We do not store your full payment details on our servers.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            By purchasing a membership, you agree to Stripe’s processing terms
            and our pricing structure as displayed on the platform.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Cancellations & Refunds</h2>
          <p className="text-zinc-400 leading-relaxed">
            Memberships or event fees may be non-refundable unless otherwise
            stated. We reserve the right to update pricing or event availability
            at any time.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Changes to the Platform</h2>
          <p className="text-zinc-400 leading-relaxed">
            We may update features, events, or policies as the community grows.
            Any major changes will be communicated through the platform.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
          <p className="text-zinc-400 leading-relaxed">
            We are not responsible for injuries, losses, or damages that may
            occur during participation in community activities. Members
            participate voluntarily and at their own discretion.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-10 border-t border-zinc-800">
          <h3 className="text-xl font-bold mb-4">
            By joining, you become part of something bigger.
          </h3>
          <p className="text-zinc-400 mb-6">
            We’re building a community — not just a platform.
          </p>

          <Link
            to="/signup"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Join the Community
          </Link>
        </div>

      </div>
    </div>
  );
}