import archery from "../assets/adventureActivities/archery.webp";
import kayaking from "../assets/adventureActivities/kayaking.webp";
import rapelling from "../assets/adventureActivities/rapelling.webp";
import shooting from "../assets/adventureActivities/shooting.webp";
import skyCycling from "../assets/adventureActivities/skyCycling.webp";
import wallClimbing from "../assets/adventureActivities/wallClimbing.webp";
import zipLining from "../assets/adventureActivities/zipLining.webp";
import indoorGames from "../assets/adventureActivities/indoorGames.webp";
import cycling from "../assets/adventureActivities/cycling.webp";
import megaPackage from "../assets/adventureActivities/megaPackage.webp";
import kiddosPackage from "../assets/adventureActivities/kiddosPackage.webp";
import powerplayPackage from "../assets/adventureActivities/powerplayPackage.webp";

const adventurePark = [
  {
    heading: "adventure Park",
    gridData: [
      {
        title: "Archery",
        img: archery,
        price: "100",
        book: true,
      },
      {
        title: "Kayaking",
        img: kayaking,
        price: "150",
        book: true,
      },
      {
        title: "rapelling",
        img: rapelling,
        price: "200",
        book: true,
      },
      {
        title: "rifle shooting",
        img: shooting,
        price: "200",
        book: true,
      },
      {
        title: "sky cycling",
        img: skyCycling,
        price: "300",
        book: true,
      },
      {
        title: "wall climbing",
        img: wallClimbing,
        price: "200",
        book: true,
      },
      {
        title: "zip lining",
        img: zipLining,
        price: "300",
        book: true,
      },
      {
        title: "Indoor Games (complementary with package)",
        img: indoorGames,
        price: "0",
        book: true,
      },
      {
        title: "cycling",
        img: cycling,
        price: "50",
        book: true,
      },
      {
        title: "Mega Package",
        img: megaPackage,
        points: [
          "zip lining",
          "sky cycling",
          "wall climbing",
          "archery",
          "rope course",
          "ground cycling",
          "indoor games",
          "rapelling",
          "rifle shooting",
          "kayaking",
          "obstacle course",
        ],
        price: "1200",
        book: true,
      },
      {
        title: "Kiddos Package",
        img: kiddosPackage,
        points: [
          "Zip lining",
          "wall climbing",
          "archery",
          "rope course",
          "ground cycling",
          "indoor games",
          "kayaking",
          "obstacle course",
        ],
        price: "675",
        book: true,
      },
      {
        title: "Power Play Package",
        img: powerplayPackage,
        points: [
          "zip lining",
          "sky cyclng",
          "wall climbing",
          "indoor games",
          "rifle shooting",
          "kayaking",
          "obstacle course",
        ],
        price: "862",
        book: true,
      },
    ],
  },
];

export default adventurePark;
