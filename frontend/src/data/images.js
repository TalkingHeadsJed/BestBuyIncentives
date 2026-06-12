// Curated imagery for the sales-guru / direct-response aesthetic.
// All URLs are direct CDN with width parameters for performance.
const U = (id, w = 2000) => `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const IMG = {
  // Hero / fullbleed seminar imagery
  heroSeminarStage: U("photo-1505373877841-8d25f7d46678", 2400),
  heroAudience:     U("photo-1559136555-9303baea8ebd", 2400),
  heroConference:   U("photo-1556761175-5973dc0f32e7", 2400),
  heroWorkshop:     U("photo-1591115765373-5207764f72e7", 2400),
  heroSpeaker:      U("photo-1540575467063-178a50c2df87", 2400),
  heroPanel:        U("photo-1475721027785-f74eccf877e2", 2400),
  heroCrowd:        U("photo-1531058020387-3be344556be6", 2400),

  // Seminar floor / training photography
  trainingRoom:     U("photo-1517048676732-d65bc937f952", 2000),
  teamHuddle:       U("photo-1521737711867-e3b97375f902", 2000),
  brainstorm:       U("photo-1542744173-8e7e53415bb0", 2000),
  applause:         U("photo-1517245386807-bb43f82c33c4", 2000),
  whiteboard:       U("photo-1551836022-d5d88e9218df", 2000),
  closing:          U("photo-1664474619075-644dd191935f", 2000),
  manSpeaking:      U("photo-1560439514-4e9645039924", 2000),
  bigRoom:          U("photo-1591115766087-c8c0d4bbe1ac", 2000),
  salesfloor:       U("photo-1556761175-4b46a572b786", 2000),
  highFive:         U("photo-1556761175-b413da4baf72", 2000),
  laptopMeeting:    U("photo-1573497019940-1c28c88b4f3e", 2000),
  conferenceBack:   U("photo-1591115766100-2da66fc4ed8c", 2000),

  // Industry-specific
  autoShowroom:     U("photo-1492144534655-ae79c964c9d7", 2000),
  jewelryShow:      U("photo-1515562141207-7a88fb7ce338", 2000),
  furnitureShow:    U("photo-1555041469-a586c61ea9bc", 2000),
  homeImprov:       U("photo-1581094288338-2314dddb7ece", 2000),
  flooring:         U("photo-1581291518857-4e27b48ff24e", 2000),
  mattress:         U("photo-1505693416388-ac5ce068fe85", 2000),
  luxuryRetail:     U("photo-1567401893414-76b7b1e5a7a5", 2000),
  b2bSales:         U("photo-1557804506-669a67965ba0", 2000),

  // Business-owner / sales-leader portraits for testimonials
  ownerMan1:        U("photo-1560250097-0b93528c311a", 1000),  // confident man in suit
  ownerMan2:        U("photo-1472099645785-5658abf4ff4e", 1000),  // bearded business owner
  ownerWoman1:      U("photo-1573496359142-b8d87734a5a2", 1000), // confident woman exec
  ownerWoman2:      U("photo-1580489944761-15a19d654956", 1000), // woman with glasses
  ownerMan3:        U("photo-1519085360753-af0119f7cbe7", 1000), // mature exec
};
