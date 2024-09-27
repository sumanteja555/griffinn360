import one from "../assets/nightCamps/nightcamps.webp";
import two from "../assets/nightCamps/nightcampsone.webp";
import three from "../assets/nightCamps/nightcampstwo.webp";
import four from "../assets/nightCamps/nightcampsthree.webp";
import five from "../assets/nightCamps/nightcampsfour.webp";

const nightCamps = {
  title: "Night Camping",
  price: "1700",
  images: [
    {
      img: one,
      title: "image one",
    },
    {
      img: two,
      title: "image two",
    },
    {
      img: three,
      title: "image three",
    },
    {
      img: four,
      title: "image four",
    },
    {
      img: five,
      title: "image five",
    },
  ],
  inclusions: [
    `Food ( snacks, dinner and breakfast)`,
    `Camping tents  (three sharing basis)`,
    `Tea and snacks`,
    `Music and Bonfire`,
    `Open air movie screening`,
    `Cycling`,
    `Indoor and outdoor games`,
  ],
  exclusions: [`No transportation will be provided`],
  itinerary: [
    {
      day: "day One",
      details: [
        `4:30pm - Assemble at the campsite and get to know each other`,
        `5:00 pm - Camping tent allotment followed by Tea and snacks`,
        `5:30 pm - Indoor and Outdoor games & cycling around the jungle (and volleyball, badminton, carroms and other fun games)`,
        `8:00 pm - Dinner`,
        `9:00 pm - We will start some DJ music with the bonfire`,
        `10:30 pm - Open air Movie screening under the stars`,
      ],
      text: "End of Day One",
    },
    {
      day: "day Two",
      details: [
        `8: 00 am - Breakfast time`,
        `9: 00 am - group photo sessions`,
        `Pack up the day with some beautiful memories and new friends `,
      ],
      text: "End of Day Two",
    },
  ],
};

export default nightCamps;
