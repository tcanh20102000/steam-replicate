const categoryData = [
  {
    cateLink: "racing",
    cateName: "Racing",
  },
  {
    cateLink: "casual",
    cateName: "Casual",
  },
  {
    cateLink: "puzzle_matching",
    cateName: "Puzzle",
  },
  {
    cateLink: "simulation",
    cateName: "Simulation",
  },
  {
    cateLink: "rpg",
    cateName: "Role-playing",
  },
  {
    cateLink: "horror",
    cateName: "Horror",
  },
  {
    cateLink: "fighting_martial_arts",
    cateName: "Fighting",
  },
  {
    cateLink: "adventure",
    cateName: "Adventure",
  },
  {
    cateLink: "story_rich",
    cateName: "Story rich",
  },
  {
    cateLink: "visual_novel",
    cateName: "Visual novel",
  },
  {
    cateLink: "strategy",
    cateName: "Strategy",
  },
  {
    cateLink: "sports",
    cateName: "All Sports",
  },
  {
    cateLink: "multiplayer_coop",
    cateName: "Co-Operative",
  },
];

const listOfBgStyle = [
  "linear-gradient(rgba(0,0,0,0), rgb(139,0,0) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(0,0,139) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(184,134,11) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(0,100,0) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(0,139,139) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(139,0,139) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(139,0,139) 100%)",
  "linear-gradient(rgba(0,0,0,0), rgb(233,140,0) 100%)",
];

export const categoryBgData = categoryData.map((item, id) => {
  let indexBg = Math.floor(Math.random() * listOfBgStyle.length);
  return { ...item, bg: listOfBgStyle[indexBg] };
});
