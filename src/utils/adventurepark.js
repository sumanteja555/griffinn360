import archery from "../assets/adventureActivities/archery.webp";
import kayaking from "../assets/adventureActivities/kayaking.webp";
import rapelling from "../assets/adventureActivities/rapelling.webp";
import shooting from "../assets/adventureActivities/shooting.webp";
import skyCycling from "../assets/adventureActivities/skyCycling.webp";
import wallClimbing from "../assets/adventureActivities/wallClimbing.webp";
import zipLining from "../assets/adventureActivities/zipLining.webp";
import indoorGames from "../assets/adventureActivities/indoorGames.webp";
import cycling from "../assets/adventureActivities/cycling.webp";

const adventurePark = [
  {
    heading: "adventure Park",
    gridData: [
      {
        title: "Archery",
        img: archery,
        description: `Step into the world of archery, where every shot brings a blend of thrill and satisfaction.
         Whether you're a first-timer or an experienced marksman, archery offers a unique challenge that sharpens your
          concentration and hones your skills.`,
        price: "100",
        book: true,
      },
      {
        title: "Kayaking",
        img: kayaking,
        description: `Set off on an unforgettable kayaking adventure and experience nature like never before. Glide
         through serene waterways and soak in the breathtaking landscapes that only a kayak can reveal.`,
        price: "150",
        book: true,
      },
      {
        title: "rapelling",
        img: rapelling,
        description: `Ready to conquer new heights? Our rappelling adventure offers an adrenaline-pumping descent that will test your
         nerves and thrill your senses. Embrace the challenge and feel the rush as you descend from stunning heights!`,
        price: "200",
        book: true,
      },
      {
        title: "rifle shooting",
        img: shooting,
        description: `Ready to test your precision and focus? Our rifle shooting experience offers an exhilarating opportunity to master 
        your aim and enjoy the thrill of hitting the mark. Whether you’re a seasoned shooter or a curious beginner, this adventure is designed for everyone!`,
        price: "200",
        book: true,
      },
      {
        title: "sky cycling",
        img: skyCycling,
        description: `Get ready to pedal through the clouds and enjoy unparalleled views from
         Telangana’s longest skycycling route. It’s not just a ride; it’s a breathtaking journey 
         high above the ground, offering a unique perspective on the stunning landscapes below`,
        price: "300",
        book: true,
      },
      {
        title: "wall climbing",
        img: wallClimbing,
        description: `Ready to challenge yourself and experience the thrill of climbing? Our wall 
        climbing adventure offers an exhilarating opportunity to test your strength, agility, and 
        determination as you ascend to new heights!`,
        price: "200",
        book: true,
      },
      {
        title: "zip lining",
        img: zipLining,
        description: `Ready to unleash your inner daredevil? Our zip-lining adventure lets you glide
         effortlessly from tree to tree, feeling the rush of wind and the excitement of height. 
         It’s an exhilarating way to see nature from a whole new perspective!`,
        price: "300",
        book: true,
      },
      {
        title: "Indoor Games (complementary with package)",
        img: indoorGames,
        description: `Looking for a way to add some excitement to your day? Our indoor games are perfect for
         everyone, whether you’re planning a family gathering, a team-building event, or just a fun day out. 
         Dive into a world of games that promise laughter, challenge, and unforgettable moments!`,
        price: "0",
        book: true,
      },
      {
        title: "cycling",
        img: cycling,
        description: `Ready to escape the everyday hustle and immerse yourself in nature? Our ground cycling 
        adventures through lush forests offer the perfect blend of exercise, excitement, and breathtaking scenery. 
        Feel the thrill of the ride as you navigate through serene trails and discover the beauty of the great outdoors!`,
        price: "50",
        book: true,
      },
      {
        title: "Mega Package",
        img: cycling,
        description: `Includes Ground Cycling, Archery, Kayaking, Rope Course, Rifle Shooting, Wall Climbing, Zip Lining, Indoor Games,
        Obstacle Course, Sky Cycling, Rapelling.  Total 11 Activities Rs: 1650. This Package has 25% discount.`,
        price: "1238",
        book: true,
      },
      {
        title: "Kudos Package",
        img: cycling,
        description: `Includes Ground Cycling, Archery, Kayaking, Rope Course, Rifle Shooting, Wall Climbing, Zip Lining, Indoor Games,
        Obstacle Course.  Total 9 Activities Rs: 1150. This Package has 25% discount.`,
        price: "863",
        book: true,
      },
    ],
  },
];

export default adventurePark;
