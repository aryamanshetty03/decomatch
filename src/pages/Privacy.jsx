import React from 'react';
import ContentPage from '../components/layout/ContentPage';

const Privacy = () => (
    <ContentPage title="Privacy Policy">
        <p className="mb-4 text-gray-600 dark:text-gray-300">Last updated: December 2024</p>
        <p className="mb-4 text-gray-600 dark:text-gray-300">At Decomatch, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-white">1. Information We Collect</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4 dark:text-white">2. How We Use Your Information</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">We use your information to provide, maintain, and improve our services, including to match you with designers and process payments.</p>
    </ContentPage>
);

export default Privacy;
