const communitiesOptions = [
  "Asian",
  "Blk",
  "Christian",
  "Disabled",
  "Jewish",
  "Latino",
  "LGBTQ",
  "Muslim",
  "Veteran",
];
const datePreferencesOptions = [
  "Beer",
  "Chinese Food",
  "Coffee",
  "Dating with the View",
  "Drinks",
  "Indian Cuisine",
  "Italian Food",
  "Korean Food",
  "Local Food",
  "Mexican Food",
  "Pizza",
  "Rooftop Date",
  "Seafood",
  "Sushi",
  "Thai Food",
  "Wine",
];



export default function generateRandomUser(id: number): User {
  const getRandomAge = (): number => Math.floor(Math.random() * 50) + 18;
  const getRandomHeight = (): number => Math.floor(Math.random() * 50) + 150;
  const getRandomArrayItems = (items: any[], numItems: number): any[] => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  return {
    id,
    image: require("@/assets/onboarding/onboarding-match.png"),
    name: `User${id}`,
    age: getRandomAge(),
    bio: "This is a sample bio.",
    height: getRandomHeight(),
    communities: getRandomArrayItems(
      communitiesOptions,
      Math.floor(Math.random() * 7) + 1
    ),
    datePreferences: getRandomArrayItems(
      datePreferencesOptions,
      Math.floor(Math.random() * 7) + 1
    ),
  };
}
