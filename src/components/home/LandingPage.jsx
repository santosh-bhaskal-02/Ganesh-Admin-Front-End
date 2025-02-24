import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative -top-14">
      <section
        className="bg-cover bg-center min-h-screen flex items-center justify-center relative"
        style={{ backgroundImage: "url('Hero.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to the Ganesh Museum
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Discover the Rich Culture and Heritage of Lord Ganesh
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-100" id="exhibits">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Featured Exhibits
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Origins of Ganesh",
                description:
                  "Ganesh, created by Goddess Parvati and later given an elephant head by Lord Shiva, symbolizes wisdom and strength...",
              },
              {
                title: "Artistic Representations of Ganesh",
                description:
                  "Ganesh is depicted in various forms, from traditional Indian statues to contemporary art...",
              },
              {
                title: "Festivals Celebrating Ganesh",
                description:
                  "The grand festival of Ganesh Chaturthi celebrates Ganesh’s birth with vibrant processions...",
              },
            ].map((exhibit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold">{exhibit.title}</h3>
                <p className="mt-2 text-gray-600">{exhibit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center px-6" id="visit">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Visitor Information
        </h2>
        <p className="mt-4 text-gray-700">
          Hours of Operation: Open daily from 10 AM to 6 PM
        </p>
        <p className="mt-2 text-gray-700">
          Admission Fees: Adults: $10 | Children under 12: Free
        </p>
        <p className="mt-2 text-gray-700">
          Location: 123 Ganesh Lane, City, State, ZIP
        </p>
        <Link
          to="#plan-your-visit"
          className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Plan Your Visit
        </Link>
      </section>

      <section className="py-20 bg-gray-100 text-center px-6" id="events">
        <h2 className="text-3xl md:text-4xl font-semibold">Upcoming Events</h2>
        <div className="mt-10">
          {[
            {
              title: "Ganesh Chaturthi Celebration",
              details: "Date and Details",
            },
            {
              title: "Art Workshop: Crafting Ganesh Statues",
              details: "Date and Details",
            },
          ].map((event, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-700">{event.details}</p>
            </div>
          ))}
        </div>
        <Link
          to="#all-events"
          className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          See All Events
        </Link>
      </section>

      <section className="py-20 bg-white text-center px-6" id="testimonials">
        <h2 className="text-3xl md:text-4xl font-semibold">Testimonials</h2>
        <div className="mt-10">
          {[
            "“A beautiful tribute to Lord Ganesh! The exhibits are enlightening.”",
            "“A must-visit for anyone interested in culture and art!”",
          ].map((quote, index) => (
            <p key={index} className="italic text-gray-700 mt-4">
              {quote}
            </p>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-center px-6" id="newsletter">
        <h2 className="text-3xl md:text-4xl font-semibold">Stay Updated!</h2>
        <p className="mt-4">
          Subscribe to our newsletter for the latest news and events.
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full max-w-sm rounded-l-lg border border-gray-300 focus:ring focus:ring-orange-300"
          />
          <button className="bg-orange-500 text-white px-6 py-3 rounded-r-lg hover:bg-orange-600 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
