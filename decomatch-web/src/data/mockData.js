export const CITIES = ["New York, NY", "London, UK", "Paris, France", "Austin, TX", "Toronto, ON", "Los Angeles, CA", "Berlin, DE"];
export const STYLES = ["Modern Luxury", "Industrial", "Bohemian", "Scandinavian", "Mid-Century", "Japandi", "Cyberpunk", "Rustic"];

export const IMAGE_IDS = [
    '1618221195710-dd6b41faaea6', '1616486338812-3dadae4b4f9d', '1616137466211-f939a71247d5',
    '1618220179428-22790b461013', '1615873968403-89e061852b2c', '1600210492486-724fe5c67fb0',
    '1600607687939-ce8a6c25118c', '1600585154340-be6161a56a0c', '1600566753190-17f0baa2a6b3'
];

export const getRealImage = (index) => `https://images.unsplash.com/photo-${IMAGE_IDS[index % IMAGE_IDS.length]}?auto=format&fit=crop&q=80&w=800&h=600`;

export const generateDesigners = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        realName: `Designer ${i + 1}`,
        age: 25 + Math.floor(Math.random() * 25),
        experienceYears: Math.floor(Math.random() * 15) + 2,
        style: STYLES[Math.floor(Math.random() * STYLES.length)],
        rating: (4.0 + Math.random()).toFixed(1),
        reviews: Math.floor(Math.random() * 300) + 20,
        location: CITIES[Math.floor(Math.random() * CITIES.length)],
        hourlyRate: Math.floor(Math.random() * 150) + 75,
        fullDesignFee: (Math.floor(Math.random() * 5) + 2) * 1000,
        totalSupport: Math.random() > 0.5 ? "Unlimited Revisions" : "3 Rounds of Revisions",
        totalProjects: Math.floor(Math.random() * 150) + 12,
        availabilityStatus: Math.random() > 0.8 ? "Busy" : "Available",
        avatar: `https://i.pravatar.cc/150?u=${i + 50}`,
        cover: getRealImage(i),
        portfolio: [getRealImage(i + 3), getRealImage(i + 4), getRealImage(i + 5), getRealImage(i + 6)],
        verified: Math.random() > 0.4,
        bio: `Creative professional with a focus on ${STYLES[Math.floor(Math.random() * STYLES.length)]} aesthetics. My goal is to bring your vision to life through thoughtful planning and execution.`
    }));
};

export const INITIAL_DESIGNERS = generateDesigners(16);
