import { ImageSourcePropType } from "react-native";

type CommunityData = {
  community: string;
  image: ImageSourcePropType;
};

const communityImages: Record<string, ImageSourcePropType> = {
  Black: require("@/assets/communities/black.png"),
  Latino: require("@/assets/communities/latino.png"),
  Asian: require("@/assets/communities/asian.png"),
  Jewish: require("@/assets/communities/jewish.png"),
  Muslim: require("@/assets/communities/muslim.png"),
  Veteran: require("@/assets/communities/veteran.png"),
  LGBTQ: require("@/assets/communities/lgbtq.png"),
  Disabled: require("@/assets/communities/disabled.png"),
  Christian: require("@/assets/communities/christian.png"),
};

const dummyCommmunities: CommunityData[] = [
  {
    community: "Black",
    image: communityImages.Black,
  },
  {
    community: "Latino",
    image: communityImages.Latino,
  },
  {
    community: "Asian",
    image: communityImages.Asian,
  },
  {
    community: "Jewish",
    image: communityImages.Jewish,
  },
  {
    community: "Muslim",
    image: communityImages.Muslim,
  },
  {
    community: "Veteran",
    image: communityImages.Veteran,
  },
  {
    community: "LGBTQ",
    image: communityImages.LGBTQ,
  },
  {
    community: "Disabled",
    image: communityImages.Disabled,
  },
  {
    community: "Christian",
    image: communityImages.Christian,
  },
];

export { communityImages, dummyCommmunities, CommunityData };
