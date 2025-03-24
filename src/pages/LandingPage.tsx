"use client";

import { Sun, Calendar, BarChart3, FootprintsIcon as Shoe } from "lucide-react";

function LandingPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Hero Section with Background */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <div className="relative h-full w-full clip-diagonal">
          <img
            src="/running-background.png"
            alt="Running background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/100 to-teal-800/70" />
          {/* Added shadow under the polygon cut */}
          <div className="absolute bottom-0 left-0 right-0 h-16 shadow-polygon"></div>
        </div>
      </div>
      <div className="relative z-10 flex justify-center items-center flex-col h-screen w-full gap-y-4 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white">
          Unleash your running potential
        </h1>
        <h2 className="text-xl sm:text-2xl text-teal-50 max-w-3xl">
          Whether you are planning for your upcoming marathon or trying to get
          back in shape, we have{" "}
          <span className="text-white font-semibold">personalized</span> plans
          that will make you improve
        </h2>
      </div>
      <div className="py-10">
        <section className="w-full py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/shoes.png?height=400&width=500"
                  alt="Shoe tracking dashboard"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-800 font-medium">
                  NEW FEATURE
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Track Your Running Shoes
                </h2>
                <p className="text-gray-600">
                  Never wear out your shoes again. Our shoe tracking feature
                  monitors the mileage on each pair and sends you timely
                  reminders when it's time for a replacement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-teal-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Track multiple pairs of shoes</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-teal-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Automatic mileage calculation from your runs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-teal-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable replacement reminders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Strava Integration Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/strava.jpg?height=400&width=500"
                  alt="Strava integration"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-800 font-medium">
                  STRAVA INTEGRATION
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Connect With Strava
                </h2>
                <p className="text-gray-600">
                  Seamlessly integrate with your Strava account to import all
                  your activities and stats. No manual entry required - your
                  runs automatically sync to our platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-orange-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>One-click Strava connection</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-orange-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Import historical activities</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-orange-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Sessions based on your data</span>
                  </li>
                </ul>
                <button className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-6 rounded-md transition-all flex items-center">
                  <span>Connect with Strava</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.893 13.828h4.172" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/gcalendar.png?height=400&width=500"
                  alt="calendar showcase"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-800 font-medium">
                  GOOGLE CALENDAR SYNC
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Import and Export Your Runs to Your Calendar
                </h2>
                <p className="text-gray-600">
                  Keep your training schedule organized by syncing your runs
                  directly with Google Calendar. Plan future workouts , and get
                  automatic reminders so you never miss a session.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-yellow-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Seamless Google Calendar integration</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-yellow-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Automatically sync planned and completed runs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-yellow-500 mt-1 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Avoid scheduling conflicts with other events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <section className="bg-teal-800 py-16 w-full">
        <div className="container max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your running journey?
          </h2>
          <p className="text-teal-100 mb-8">
            Join other runners who have achieved their goals with our platform
          </p>
          <button className="bg-white text-teal-900 hover:bg-teal-50 font-medium px-8 py-3 rounded-full text-lg shadow-lg transition-all">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 w-full">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-white text-xl font-bold">
                Run Against The Wind
              </span>
              <p className="mt-2 text-sm">
                Helping runners achieve their goals since 2025
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 
 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between">
            <p className="text-sm">
              © 2025 Run Against The Wind. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
        }
        
        /* Added shadow under the polygon cut */
        .shadow-polygon {
          box-shadow: 0 -15px 30px 0 rgba(0, 0, 0, 0.5);
          transform: translateY(100%);
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
