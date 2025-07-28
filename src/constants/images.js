// Image constants for the application
// This file centralizes all image URLs and provides fallbacks

export const IMAGE_DOMAINS = {
  UNSPLASH: 'https://images.unsplash.com',
  LOCAL: '/images',
};

// Fallback images for when external images fail to load
export const FALLBACK_IMAGES = {
  ACTIVITY: '/images/fallback-activity.jpg',
  DESTINATION: '/images/fallback-destination.jpg',
  BLOG: '/images/fallback-blog.jpg',
  HERO: '/images/fallback-hero.jpg',
};

// Activity images with fallbacks
export const ACTIVITY_IMAGES = {
  cruise: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  boat_tour: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  food_tour: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  city_tour: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  empire_state: 'https://images.unsplash.com/photo-1611147348463-a5c33dc61284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RW1waXJlJTIwU3RhdGUlMjBCdWlsZGluZyUyMEFkbWlzc2lvbiUyMEZvcnQlMjBMYXVkZXJkYWxlfGVufDB8fDB8fHww',
  los_angeles: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  seaplane: 'https://images.unsplash.com/photo-1622386608025-19923caa77b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEdvbGRlbiUyMEdhdGUlMjBTZWFwbGFuZSUyMFRvdXIlMjBNaWFtaSUyMEJlYWNofGVufDB8fDB8fHww',
  escape_game: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
};

// Destination images
export const DESTINATION_IMAGES = {
  virginia: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  philadelphia: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=81',
  new_jersey: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  delaware: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  united_states: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  san_francisco: 'https://images.unsplash.com/photo-1719858403455-9a2582eca805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FuJTIwRnJhbmNpc2NvfGVufDB8fDB8fHww',
};

// Blog images
export const BLOG_IMAGES = {
  laguna_beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  tulips: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  philadelphia_blog: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
};

// Hero images
export const HERO_IMAGES = {
  activities: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
};

// Function to get image URL with fallback
export const getImageUrl = (imageKey, category = 'ACTIVITY') => {
  const imageMap = {
    ACTIVITY: ACTIVITY_IMAGES,
    DESTINATION: DESTINATION_IMAGES,
    BLOG: BLOG_IMAGES,
    HERO: HERO_IMAGES,
  };

  const fallbackMap = {
    ACTIVITY: FALLBACK_IMAGES.ACTIVITY,
    DESTINATION: FALLBACK_IMAGES.DESTINATION,
    BLOG: FALLBACK_IMAGES.BLOG,
    HERO: FALLBACK_IMAGES.HERO,
  };

  return imageMap[category]?.[imageKey] || fallbackMap[category];
};
