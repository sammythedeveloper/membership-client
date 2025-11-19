import Navbar from "../../components/Navbar";
import Footer from "../Footer";
import artImg from "../../assets/art.jpg";
import bookClubImg from "../../assets/bookclub.jpg";
import basketballImg from "../../assets/basketball.jpg";
import walkImg from "../../assets/walk.jpg";

export default function About() {
  const memberships = [
    {
      activity: "Art & Sketch Membership",
      image: artImg,
      description: `
        Our Art & Sketch Membership is perfect for anyone looking to explore their
        creativity. You’ll engage with fellow artists, attend weekly sketch sessions,
        learn new techniques, and have the opportunity to share your artwork in a 
        collaborative environment. Materials such as sketch pads, pencils, and colors 
        are provided. This membership costs $30/month and includes a 7-day free trial. 
        You can cancel anytime before the next billing cycle.
      `,
    },
    {
      activity: "Book Club Membership",
      image: bookClubImg,
      description: `
        Join our Book Club Membership and immerse yourself in the joy of reading.
        Participate in monthly discussions, access curated reading lists, and connect
        with other book lovers. Books are included in your membership. This plan costs
        $25/month with a 30-day free trial, and you can cancel anytime before next month.
      `,
    },
    {
      activity: "Basketball Training Membership",
      image: basketballImg,
      description: `
        Improve your skills with our Basketball Training Membership. Train with 
        professional coaches, take part in drills and games, and boost your fitness.
        Members get access to gym and training equipment. The membership is $50/month, 
        with the first session free. Cancel anytime with 7 days' notice.
      `,
    },
    {
      activity: "Walking Club Membership",
      image: walkImg,
      description: `
        Stay fit and socialize with our Walking Club Membership. Join weekly walking 
        sessions in scenic locations, track your fitness progress, and meet fellow walkers.
        Guided routes and fitness tracking are included. The plan costs $15/month, includes
        a 7-day free trial, and can be canceled anytime.
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userName="Guest" />

      <main className="flex-grow p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About Our Memberships
        </h1>
        <p className="text-gray-700 mb-10 text-center">
          Our platform offers memberships tailored to a variety of interests.
          Each membership is designed to provide value, community, and growth in
          your chosen activity.
        </p>

        {memberships.map((mem, idx) => (
          <section
            key={idx}
            className="mb-16 flex flex-col sm:flex-row items-start gap-6"
          >
            <img
              src={mem.image}
              alt={mem.activity}
              className="w-full sm:w-96 h-64 object-cover rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-extralight mb-3">{mem.activity}</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {mem.description}
              </p>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
