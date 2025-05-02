const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259], // Malibu coordinates
    },
  },
  {
    title: "Mountain Retreat Lodge",
    description:
      "Experience the serenity of the mountains in this cozy lodge. Perfect for nature lovers and outdoor enthusiasts.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911], // Aspen coordinates
    },
  },
  {
    title: "Urban Loft Apartment",
    description:
      "Stay in the heart of the city in this modern loft apartment. Close to shopping, dining, and nightlife.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "New York City",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128], // NYC coordinates
    },
  },
  {
    title: "Secluded Forest Cabin",
    description:
      "Unplug and unwind in this rustic cabin tucked away in the woods. Ideal for a peaceful retreat.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vZGVuJTIwY2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Smoky Mountains",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-83.5085, 35.6118], // Smoky Mountains coordinates
    },
  },
  {
    title: "Charming Countryside B&B",
    description:
      "Enjoy the hospitality of the countryside at this charming bed and breakfast. Homemade meals and scenic views await.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vZGVuJTIwY2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 700,
    location: "Cotswolds",
    country: "United Kingdom",
    geometry: {
      type: "Point",
      coordinates: [-1.784, 51.833], // Cotswolds coordinates
    },
  },
  {
    title: "Desert Oasis Villa",
    description:
      "Discover luxury in the desert at this stunning oasis villa. Poolside relaxation and desert adventures await.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Palm Springs",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-116.5453, 33.8303], // Palm Springs coordinates
    },
  },
  {
    title: "Historic City Apartment",
    description:
      "Step back in time with this historic apartment located in the old town. Perfect for history buffs and explorers.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Edinburgh",
    country: "Scotland",
    geometry: {
      type: "Point",
      coordinates: [-3.1883, 55.9533], // Edinburgh coordinates
    },
  },
  {
    title: "Lakeside Modern Retreat",
    description:
      "Relax in style at this sleek modern retreat by the lake. Enjoy watersports, sunset views, and luxury amenities.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Lake Tahoe",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-120.044, 39.0968], // Lake Tahoe coordinates
    },
  },
  {
    title: "Tropical Treehouse Adventure",
    description:
      "Live among the trees in this tropical treehouse. A unique stay for adventurous souls in a lush paradise.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Bali",
    country: "Indonesia",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095], // Bali coordinates
    },
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes from your doorstep at this cozy ski-in/ski-out chalet. Perfect for winter sports lovers.",
    image: {
      filename: "listing image",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Whistler",
    country: "Canada",
    geometry: {
      type: "Point",
      coordinates: [-122.948, 50.1163], // Whistler coordinates
    },
  },
];

module.exports = sampleListings;
