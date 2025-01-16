import React from 'react';

const Welcome = () => {
    return (
        <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Application</h1>
            <p className="text-xl mb-8">We are glad to have you here. Explore and enjoy our features!</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
            </button>
        </div>
    );
};

export default Welcome;