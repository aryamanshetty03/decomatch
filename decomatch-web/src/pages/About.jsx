import React from 'react';
import ContentPage from '../components/layout/ContentPage';

const About = () => (
    <ContentPage title="About Decomatch">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Decomatch is the world's first AI-powered interior design marketplace. We believe that everyone deserves a beautiful home, and that finding the right professional to help you shouldn't be a struggle.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our mission is to connect homeowners with talented interior designers through the power of artificial intelligence. By analyzing your style preferences, budget, and location, we match you with the perfect designer for your unique needs.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-white">Our Story</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
            Founded in 2025, Decomatch started with a simple idea: what if you could know exactly how much your renovation would cost and who could do it best, instantly?
        </p>
    </ContentPage>
);

export default About;
