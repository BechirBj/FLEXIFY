import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="w-64 bg-white p-4 shadow-md">
            <nav>
              <ul>
                <li>
                  <a href="/workouts" className="block py-2 px-4 hover:bg-gray-200 rounded-lg">
                    Workouts
                  </a>
                </li>
                <li>
                  <a href="/exercises" className="block py-2 px-4 hover:bg-gray-200 rounded-lg">
                    Exercises
                  </a>
                </li>
                <li>
                  <a href="/profile" className="block py-2 px-4 hover:bg-gray-200 rounded-lg">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/progress" className="block py-2 px-4 hover:bg-gray-200 rounded-lg">
                    Progress
                  </a>
                </li>
                <li>
                  <a href="/settings" className="block py-2 px-4 hover:bg-gray-200 rounded-lg">
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex-grow p-4">
            {/* Quick Stats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
                  <h3 className="text-xl font-bold mb-2">Recent Workouts</h3>
                  <p>See your most recent workouts here.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
                  <h3 className="text-xl font-bold mb-2">Goals</h3>
                  <p>Track your fitness goals and achievements.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300">
                  <h3 className="text-xl font-bold mb-2">Progress</h3>
                  <p>Visualize your progress over time.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Welcome to your dashboard!</h3>
              <p>This is your main hub for accessing all features of the app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
