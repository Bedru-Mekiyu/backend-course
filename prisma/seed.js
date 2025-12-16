// prisma/seed.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  // optional logging, same as db.js
  log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"],
});




const userId="95e5b3a8-3fb5-4078-bb31-da2404e43033"

const movies = [
  {
    title: "Shadows Over Nairobi",
    overview: "A veteran detective uncovers a political conspiracy after a routine robbery goes wrong.",
    releaseYear: 2021,
    runtime: 119,
    posterUrl: "https://example.com/posters/shadows-over-nairobi.jpg",
    createdBy: userId,
    genres: ["Thriller", "Crime", "Drama"],
  },
  {
    title: "Code of the Savannah",
    overview: "A young software engineer returns to her rural hometown to build an app that transforms local trade.",
    releaseYear: 2023,
    runtime: 106,
    posterUrl: "https://example.com/posters/code-of-the-savannah.jpg",
    createdBy: userId,
    genres: ["Drama", "Tech"],
  },
  {
    title: "Midnight Train to Addis",
    overview: "Strangers on an overnight train slowly realize their lives are all connected by one missing passenger.",
    releaseYear: 2020,
    runtime: 98,
    posterUrl: "https://example.com/posters/midnight-train-to-addis.jpg",
    createdBy: userId,
    genres: ["Romance", "Drama"],
  },
  {
    title: "The Last Line of Code",
    overview: "On the eve of launch, a burned‑out engineer races to fix a catastrophic bug that could bankrupt his company.",
    releaseYear: 2024,
    runtime: 112,
    posterUrl: "https://example.com/posters/the-last-line-of-code.jpg",
    createdBy: userId,
    genres: ["Thriller", "Tech"],
  },
  {
    title: "Echoes of the Rift",
    overview: "After an earthquake in the Great Rift Valley, a geologist discovers evidence of a long‑buried civilization.",
    releaseYear: 2019,
    runtime: 121,
    posterUrl: "https://example.com/posters/echoes-of-the-rift.jpg",
    createdBy: userId,
    genres: ["Adventure", "Mystery", "Fantasy"],
  },
  {
    title: "Skyline Café",
    overview: "An aspiring musician and a stressed banker meet every Friday at a rooftop café overlooking the city.",
    releaseYear: 2018,
    runtime: 103,
    posterUrl: "https://example.com/posters/skyline-cafe.jpg",
    createdBy: userId,
    genres: ["Romance", "Drama"],
  },
  {
    title: "Packet Loss",
    overview: "A team of network engineers must trace a mysterious cyberattack that only appears during power cuts.",
    releaseYear: 2022,
    runtime: 101,
    posterUrl: "https://example.com/posters/packet-loss.jpg",
    createdBy: userId,
    genres: ["Sci-Fi", "Thriller", "Tech"],
  },
  {
    title: "Matatu Dreams",
    overview: "A graffiti artist turns Nairobi matatus into moving art galleries while escaping a troubled past.",
    releaseYear: 2017,
    runtime: 95,
    posterUrl: "https://example.com/posters/matatu-dreams.jpg",
    createdBy: userId,
    genres: ["Drama"],
  },
  {
    title: "Solar Market",
    overview: "An entrepreneur builds a solar‑powered marketplace that threatens the monopoly of a powerful utility company.",
    releaseYear: 2023,
    runtime: 108,
    posterUrl: "https://example.com/posters/solar-market.jpg",
    createdBy: userId,
    genres: ["Drama", "Business"],
  },
  {
    title: "Bandwidth Hearts",
    overview: "Two gamers from different continents fall in love while competing in an online tournament.",
    releaseYear: 2022,
    runtime: 99,
    posterUrl: "https://example.com/posters/bandwidth-hearts.jpg",
    createdBy: userId,
    genres: ["Romance", "Comedy", "Tech"],
  },
];


const main = async () => {
  console.log("seeding movies...");
  for (const movie of movies) {
    const created = await prisma.movie.create({
      data: movie,
    });
    console.log(`created movie: ${created.title}`);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

