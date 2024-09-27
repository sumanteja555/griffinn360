import Count from "./Count/Count.jsx";
import HomeCover from "./HomeCover/HomeCover.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import reviewStyles from "./Reviews/Reviews.module.css";
import Categories from "./Categories/Categories.jsx";

export default function Home() {
  return (
    <>
      {/* Main cover or hero section */}
      <HomeCover />

      {/* Categories section */}
      <Categories />

      {/* Reviews section */}
      <section className={reviewStyles.reviewsMainContainer}>
        <Reviews />
      </section>

      {/* Count or stats section */}
      <Count />
    </>
  );
}
