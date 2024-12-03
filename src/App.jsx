import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Component Imports
import RootLayout from "./pages/RootLayout";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./components/Home/Home.jsx")); //home page import
const AboutusPage = lazy(() => import("./components/AboutUs/AboutUs.jsx")); //about us page import
const GallerPage = lazy(() => import("./components/Gallery/Gallery.jsx")); //gallery page import
const ContactusPage = lazy(() =>
  import("./components/ContactUs/ContactUs.jsx")
); //contact us page import
const NightscampsPage = lazy(() => import("./pages/NightCamps.jsx")); //nightcamps page import
const BooknowPage = lazy(() => import("./components/BookNow/BookNow.jsx")); //booknow component import
const PoliciesPage = lazy(() => import("./components/Policies/Policies.jsx")); //policies page import
const VolunteerPage = lazy(() =>
  import("./components/Volunteer/Volunteer.jsx")
); //volunteer page import

const TrekPage = lazy(() => import("./pages/TrekPage.jsx"));
const EventPage = lazy(() => import("./pages/EventPage.jsx"));

const PaymentSuccessPage = lazy(() =>
  import("./components/PaymentSuccess/PaymentSuccess.jsx")
);
const User = lazy(() => import("./components/User/User.jsx"));

const Bookings = lazy(() => import("./components/Bookings/Bookings.jsx"));

// policypages
const PrivacyPolicy = lazy(() =>
  import("./components/Policies/PrivacyPolicy/PrivacyPolicy.jsx")
);

const CancellationPolicy = lazy(() =>
  import("./components/Policies/CancellationPolicy/CancellationPolicy.jsx")
);

const TermsConditions = lazy(() =>
  import("./components/Policies/TermsCondtitions/TermsConditions.jsx")
);

const ReleaseofLibality = lazy(() =>
  import("./components/Policies/ReleaseofLiability/ReleaseofLiability.jsx")
);
import PrivateRoute from "./pages/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/aboutus",
        element: (
          <Suspense>
            <AboutusPage />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense>
            <GallerPage />
          </Suspense>
        ),
      },
      {
        path: "/contactus",
        element: (
          <Suspense>
            <ContactusPage />
          </Suspense>
        ),
      },
      {
        path: "/:trekId",
        element: (
          <Suspense>
            <TrekPage />
          </Suspense>
        ),
      },
      {
        path: "/nightcamps",
        element: (
          <Suspense>
            <NightscampsPage />
          </Suspense>
        ),
      },
      {
        path: "/:trekId",
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <TrekPage />
              </Suspense>
            ),
          },
          {
            path: ":eventId",
            element: (
              <Suspense>
                <EventPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/:trekId",
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <TrekPage />
              </Suspense>
            ),
          },
          {
            path: ":eventId",
            element: (
              <Suspense>
                <EventPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/booknow",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <BooknowPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteer",
        element: (
          <Suspense>
            <VolunteerPage />
          </Suspense>
        ),
      },

      // policy pages
      {
        path: "/privacypolicy",
        element: (
          <Suspense>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "/cancellationpolicy",
        element: (
          <Suspense>
            <CancellationPolicy />
          </Suspense>
        ),
      },
      {
        path: "/terms&conditions",
        element: (
          <Suspense>
            <TermsConditions />
          </Suspense>
        ),
      },
      {
        path: "/releaseofliability",
        element: (
          <Suspense>
            <ReleaseofLibality />
          </Suspense>
        ),
      },
      {
        path: "/policies",
        element: (
          <Suspense>
            <PoliciesPage />
          </Suspense>
        ),
      },
      {
        path: "/paymentsuccess",
        element: (
          <Suspense>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense>
            <User />
          </Suspense>
        ),
      },

      {
        path: "/bookings",
        element: (
          <PrivateRoute>
            <Suspense>
              <Bookings />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
