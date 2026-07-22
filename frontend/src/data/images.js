// Site imagery — self-hosted for a fully portable static build (no external CDN).
// Photos were sourced from Unsplash and downloaded into /public/images/unsplash.
const L = (name) => `/images/unsplash/${name}.jpg`;

export const IMG = {
  // Hero / fullbleed seminar imagery
  heroSeminarStage: L("heroSeminarStage"),
  heroAudience:     L("heroAudience"),
  heroConference:   L("heroConference"),
  heroWorkshop:     L("heroWorkshop"),
  heroSpeaker:      L("heroSpeaker"),
  heroPanel:        L("heroPanel"),
  heroCrowd:        L("heroCrowd"),

  // Seminar floor / training photography
  trainingRoom:     L("trainingRoom"),
  teamHuddle:       L("teamHuddle"),
  brainstorm:       L("brainstorm"),
  applause:         L("applause"),
  whiteboard:       L("whiteboard"),
  closing:          L("closing"),
  manSpeaking:      L("manSpeaking"),
  bigRoom:          L("bigRoom"),
  salesfloor:       L("salesfloor"),
  highFive:         L("highFive"),
  laptopMeeting:    L("laptopMeeting"),
  conferenceBack:   L("conferenceBack"),

  // Industry-specific
  autoShowroom:     L("autoShowroom"),
  jewelryShow:      L("jewelryShow"),
  furnitureShow:    L("furnitureShow"),
  homeImprov:       L("homeImprov"),
  ecommerce:        L("ecommerce"),
  travelClub:       L("travelClub"),
  healthClub:       L("healthClub"),
  employeeRewards:  L("employeeRewards"),
  luxuryRetail:     L("luxuryRetail"),
  b2bSales:         L("b2bSales"),

  // Business-owner / sales-leader portraits
  ownerMan1:        L("ownerMan1"),
  ownerMan2:        L("ownerMan2"),
  ownerWoman1:      L("ownerWoman1"),
  ownerWoman2:      L("ownerWoman2"),
  ownerMan3:        L("ownerMan3"),
};
