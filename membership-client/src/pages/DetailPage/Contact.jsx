import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just simulate submission
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Contact <span className="text-rose-600">Us</span>
          </h1>
          <p className="text-zinc-400">
            Have a question, suggestion, or want to get involved? We’d love to
            hear from you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-6 md:p-10 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-600 transition"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-600 transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-600 transition resize-none"
              placeholder="Write your message..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition"
          >
            Send Message
          </button>

          {/* Success Message */}
          {submitted && (
            <p className="text-green-400 text-sm text-center">
              Message sent successfully. We’ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
