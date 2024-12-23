// Component Imports
import RootLayout from "./RootLayout.jsx";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../components/Home/Home.jsx")); //home page import
const AboutusPage = lazy(() => import("../components/AboutUs/AboutUs.jsx")); //about us page import
const GallerPage = lazy(() => import("../components/Gallery/Gallery.jsx")); //gallery page import
const ContactusPage = lazy(() =>
  import("../components/ContactUs/ContactUs.jsx")
); //contact us page import
const NightscampsPage = lazy(() => import("./NightCamps.jsx")); //nightcamps page import
const BooknowPage = lazy(() => import("../components/BookNow/BookNow.jsx")); //booknow component import
const VolunteerPage = lazy(() =>
  import("../components/Volunteer/Volunteer.jsx")
); //volunteer page import

const TrekPage = lazy(() => import("./TrekPage.jsx"));
const EventPage = lazy(() => import("./EventPage.jsx"));

const PaymentSuccessPage = lazy(() =>
  import("../components/PaymentSuccess/PaymentSuccess.jsx")
);
const User = lazy(() => import("../components/User/User.jsx"));

const Bookings = lazy(() => import("../components/Bookings/Bookings.jsx"));

// policypages
const PrivacyPolicy = lazy(() =>
  import("../components/Policies/PrivacyPolicy/PrivacyPolicy.jsx")
);

const CancellationPolicy = lazy(() =>
  import("../components/Policies/CancellationPolicy/CancellationPolicy.jsx")
);

const TermsConditions = lazy(() =>
  import("../components/Policies/TermsCondtitions/TermsConditions.jsx")
);

const ReleaseofLibality = lazy(() =>
  import("../components/Policies/ReleaseofLiability/ReleaseofLiability.jsx")
);
import PrivateRoute from "./PrivateRoute.jsx";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

const UserRoutes = {
  path: "/",
  element: <RootLayout />,
  // errorElement: <Error />,
  children: [
    {
      index: true,
      element: (
        <SuspenseWrapper>
          <HomePage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/aboutus",
      element: (
        <SuspenseWrapper>
          <AboutusPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/gallery",
      element: (
        <SuspenseWrapper>
          <GallerPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/contactus",
      element: (
        <SuspenseWrapper>
          <ContactusPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/:trekId",
      element: (
        <SuspenseWrapper>
          <TrekPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/nightcamps",
      element: (
        <SuspenseWrapper>
          <NightscampsPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/:trekId",
      children: [
        {
          index: true,
          element: (
            <SuspenseWrapper>
              <TrekPage />
            </SuspenseWrapper>
          ),
        },
        {
          path: ":eventId",
          element: (
            <SuspenseWrapper>
              <EventPage />
            </SuspenseWrapper>
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
            <SuspenseWrapper>
              <TrekPage />
            </SuspenseWrapper>
          ),
        },
        {
          path: ":eventId",
          element: (
            <SuspenseWrapper>
              <EventPage />
            </SuspenseWrapper>
          ),
        },
      ],
    },
    {
      path: "/booknow",
      element: (
        <PrivateRoute>
          <SuspenseWrapper>
            <BooknowPage />
          </SuspenseWrapper>
        </PrivateRoute>
      ),
    },
    {
      path: "/volunteer",
      element: (
        <SuspenseWrapper>
          <VolunteerPage />
        </SuspenseWrapper>
      ),
    },

    // policy pages
    {
      path: "/privacypolicy",
      element: (
        <SuspenseWrapper>
          <PrivacyPolicy />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/cancellationpolicy",
      element: (
        <SuspenseWrapper>
          <CancellationPolicy />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/terms&conditions",
      element: (
        <SuspenseWrapper>
          <TermsConditions />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/releaseofliability",
      element: (
        <SuspenseWrapper>
          <ReleaseofLibality />
        </SuspenseWrapper>
      ),
    },

    {
      path: "/paymentsuccess",
      element: (
        <SuspenseWrapper>
          <PaymentSuccessPage />
        </SuspenseWrapper>
      ),
    },
    {
      path: "/user",
      element: (
        <SuspenseWrapper>
          <User />
        </SuspenseWrapper>
      ),
    },

    {
      path: "/bookings",
      element: (
        <PrivateRoute>
          <SuspenseWrapper>
            <Bookings />
          </SuspenseWrapper>
        </PrivateRoute>
      ),
    },
  ],
};

export default UserRoutes;
