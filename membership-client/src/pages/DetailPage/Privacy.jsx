import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <div className="px-6 md:px-20 py-20 text-center border-b border-zinc-900">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          Privacy <span className="text-rose-600">Policy</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          We respect your privacy and are committed to protecting your personal
          information. This policy explains how we collect, use, and safeguard
          your data.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 space-y-16">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-zinc-400 leading-relaxed">
            We may collect basic information such as your name, email address,
            and activity on the platform when you sign up, join events, or
            interact with our services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2">
            <li>Provide access to community events and programs</li>
            <li>Improve user experience and platform features</li>
            <li>Communicate updates, schedules, and announcements</li>
            <li>Maintain safety and community guidelines</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Data Protection</h2>
          <p className="text-zinc-400 leading-relaxed">
            We take reasonable measures to protect your information from
            unauthorized access, loss, or misuse. However, no system is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Sharing of Information</h2>
          <p className="text-zinc-400 leading-relaxed">
            We do not sell or rent your personal information. We may share
            limited data only when required to operate the platform or comply
            with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
          <p className="text-zinc-400 leading-relaxed">
            You have the right to access, update, or request deletion of your
            personal data at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Changes to This Policy</h2>
          <p className="text-zinc-400 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Payments (Stripe)</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            We use Stripe, a secure third-party payment processor, to handle all
            payments on our platform. We do not store or process your full
            credit card information on our servers.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-4">
            When you make a payment, your payment details are securely collected
            and processed directly by Stripe in accordance with their privacy
            policy.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Stripe may collect information such as your name, billing address,
            and payment details to complete transactions and prevent fraud.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-10 border-t border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Questions about privacy?</h3>
          <p className="text-zinc-400 mb-6">
            Reach out to us anytime if you have concerns about your data.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
