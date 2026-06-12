// Curated Unsplash imagery for the sales-training / seminar aesthetic.
// All URLs are direct CDN with width parameters for performance.
const U = (id, w = 2000) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMG = {
  // Hero / fullbleed seminar imagery
  heroSeminarStage: U("photo-1505373877841-8d25f7d46678", 2400),       // crowd raising hands at event
  heroAudience:     U("photo-1559136555-9303baea8ebd", 2400),          // speaker addressing audience
  heroConference:   U("photo-1556761175-5973dc0f32e7", 2400),          // business handshake
  heroWorkshop:     U("photo-1591115765373-5207764f72e7", 2400),       // audience listening
  heroSpeaker:      U("photo-1540575467063-178a50c2df87", 2400),       // speaker on stage
  heroPanel:        U("photo-1475721027785-f74eccf877e2", 2400),       // business meeting
  heroCrowd:        U("photo-1531058020387-3be344556be6", 2400),       // conference crowd from back

  // Section backgrounds & inline imagery
  trainingRoom:     U("photo-1517048676732-d65bc937f952", 2000),
  teamHuddle:       U("photo-1521737711867-e3b97375f902", 2000),
  brainstorm:       U("photo-1542744173-8e7e53415bb0", 2000),
  applause:         U("photo-1517245386807-bb43f82c33c4", 2000),
  whiteboard:       U("photo-1551836022-d5d88e9218df", 2000),
  closing:          U("photo-1664474619075-644dd191935f", 2000),
  manSpeaking:      U("photo-1560439514-4e9645039924", 2000),
  bigRoom:          U("photo-1591115766087-c8c0d4bbe1ac", 2000),
  showroom:         U("photo-1503376780353-7e6692767b70", 2000), // car (auto)
  jewelryShow:      U("photo-1605100804763-247f67b3557e", 2000), // jewelry store
  furnitureShow:    U("photo-1555041469-a586c61ea9bc", 2000),    // furniture interior
  homeImprov:       U("photo-1567016376408-0226e4d0c1ea", 2000), // home improvement
};
