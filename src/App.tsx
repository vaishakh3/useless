import React, { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { signInWithGoogle, signOut } from './lib/auth';
import { useAuth } from './hooks/useAuth';
import ProfileCard from './components/ProfileCard';
import ProfileSetup from './components/ProfileSetup';

function App() {
  const user = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Sample profiles including Vaishakh
  const profiles = [
    {
      id: 'vaishakh',
      name: 'Vaishakh Suresh',
      age: 21,
      location: 'Kannur, India',
      bio: 'Tech enthusiast and coding wizard. Looking for someone to debug life with! 💻✨',
      photoURL: 'https://i.ibb.co/zn3rH7w/IMG-20240911-WA0166.jpg',
      interests: ['Coding', 'Coffee', 'Music', 'Travel']
    },
    {
      id: 'sarah_chen',
      name: 'Sarah Chen',
      age: 28,
      location: 'San Francisco, USA',
      bio: 'UX designer by day, amateur chef by night. Seeking someone to taste-test my culinary experiments! 🍳',
      photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      interests: ['Design', 'Cooking', 'Photography', 'Hiking']
    },
    {
      id: 'marco_silva',
      name: 'Marco Silva',
      age: 31,
      location: 'Lisbon, Portugal',
      bio: 'Startup founder who believes in work-life balance. Looking for adventures and deep conversations 🌅',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      interests: ['Entrepreneurship', 'Surfing', 'Philosophy', 'Wine Tasting']
    },
    {
      id: 'priya_patel',
      name: 'Priya Patel',
      age: 27,
      location: 'Mumbai, India',
      bio: 'Digital nomad and yoga instructor. Spreading positivity one pose at a time! 🧘‍♀️',
      photoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      interests: ['Yoga', 'Meditation', 'Travel', 'Sustainable Living']
    },
    {
      id: 'james_wilson',
      name: 'James Wilson',
      age: 29,
      location: 'London, UK',
      bio: 'Finance professional with a passion for live music. Looking for my concert buddy! 🎸',
      photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      interests: ['Music Festivals', 'Guitar', 'Football', 'Photography']
    },
    {
      id: 'emma_schmidt',
      name: 'Emma Schmidt',
      age: 26,
      location: 'Berlin, Germany',
      bio: 'Art curator and coffee connoisseur. Let\'s explore galleries and find the best cafés! ☕',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      interests: ['Art', 'Coffee', 'Literature', 'Jazz']
    },
    {
      id: 'alex_kim',
      name: 'Alex Kim',
      age: 30,
      location: 'Seoul, South Korea',
      bio: 'Game developer who loves board games too. Ready to play life\'s next level! 🎮',
      photoURL: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
      interests: ['Gaming', 'Board Games', 'Anime', 'Technology']
    },
    {
      id: 'sofia_martinez',
      name: 'Sofia Martinez',
      age: 24,
      location: 'Barcelona, Spain',
      bio: 'Marine biologist and beach lover. Looking for someone to share sunset walks! 🌊',
      photoURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      interests: ['Marine Life', 'Beach', 'Scuba Diving', 'Environmental Conservation']
    },
    {
      id: 'oliver_brown',
      name: 'Oliver Brown',
      age: 33,
      location: 'Melbourne, Australia',
      bio: 'Chef with a love for adventure sports. Seeking someone to share thrills and meals! 🏄‍♂️',
      photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      interests: ['Cooking', 'Surfing', 'Rock Climbing', 'Photography']
    },
    {
      id: 'nina_ivanova',
      name: 'Nina Ivanova',
      age: 28,
      location: 'Moscow, Russia',
      bio: 'Classical pianist and data scientist. Looking for harmony in code and life! 🎹',
      photoURL: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453',
      interests: ['Piano', 'Data Science', 'Classical Music', 'Poetry']
    },
    {
      id: 'lucas_santos',
      name: 'Lucas Santos',
      age: 27,
      location: 'Rio de Janeiro, Brazil',
      bio: 'Professional photographer capturing life\'s beautiful moments. Let\'s create memories! 📸',
      photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      interests: ['Photography', 'Travel', 'Surfing', 'Street Art']
    },
    {
      id: 'aisha_khan',
      name: 'Aisha Khan',
      age: 29,
      location: 'Dubai, UAE',
      bio: 'Architect designing dreams. Looking for someone to build a future with! 🏗️',
      photoURL: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
      interests: ['Architecture', 'Design', 'Art', 'Travel']
    },
    {
      id: 'thomas_miller',
      name: 'Thomas Miller',
      age: 32,
      location: 'Toronto, Canada',
      bio: 'Environmental lawyer fighting for a better planet. Want to join the cause? 🌱',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      interests: ['Environmental Activism', 'Hiking', 'Photography', 'Cooking']
    },
    {
      id: 'yuki_tanaka',
      name: 'Yuki Tanaka',
      age: 26,
      location: 'Tokyo, Japan',
      bio: 'Manga artist and cat lover. Seeking someone to share creative adventures! 🎨',
      photoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      interests: ['Drawing', 'Anime', 'Cats', 'Gaming']
    },
    {
      id: 'isabella_rossi',
      name: 'Isabella Rossi',
      age: 30,
      location: 'Milan, Italy',
      bio: 'Fashion designer with a passion for vintage. Looking for style and substance! 👗',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      interests: ['Fashion', 'Vintage Shopping', 'Art', 'Travel']
    },
    {
      id: 'mohamed_hassan',
      name: 'Mohamed Hassan',
      age: 28,
      location: 'Cairo, Egypt',
      bio: 'History professor and amateur archaeologist. Let\'s uncover life\'s mysteries! 🏺',
      photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      interests: ['History', 'Archaeology', 'Reading', 'Travel']
    },
    {
      id: 'lisa_anderson',
      name: 'Lisa Anderson',
      age: 31,
      location: 'Stockholm, Sweden',
      bio: 'Renewable energy researcher. Powered by curiosity and coffee! ⚡',
      photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      interests: ['Sustainability', 'Science', 'Hiking', 'Photography']
    },
    {
      id: 'raj_sharma',
      name: 'Raj Sharma',
      age: 29,
      location: 'New Delhi, India',
      bio: 'Food blogger and startup enthusiast. Looking for my partner in dine! 🍜',
      photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      interests: ['Food', 'Blogging', 'Startups', 'Photography']
    },
    {
      id: 'carmen_lopez',
      name: 'Carmen Lopez',
      age: 27,
      location: 'Mexico City, Mexico',
      bio: 'Dance instructor spreading joy through movement. Shall we dance? 💃',
      photoURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      interests: ['Dancing', 'Music', 'Fitness', 'Teaching']
    },
    {
      id: 'david_cohen',
      name: 'David Cohen',
      age: 34,
      location: 'Tel Aviv, Israel',
      bio: 'AI researcher teaching machines to learn. Looking for human connection! 🤖',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      interests: ['AI', 'Technology', 'Philosophy', 'Beach']
    },
    {
      id: 'anna_kowalski',
      name: 'Anna Kowalski',
      age: 25,
      location: 'Warsaw, Poland',
      bio: 'Botanical illustrator bringing nature to life. Let\'s grow together! 🌿',
      photoURL: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453',
      interests: ['Art', 'Plants', 'Nature', 'Photography']
    }
  ];

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    setCurrentIndex(0);
    setHasProfile(false);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentIndex(prev => prev + 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transition-transform transform hover:scale-105">
          <img
            src="https://i.ibb.co/tbn0rXC/destiny.png"
            alt="Destiny Logo"
            className="mx-auto mb-4 h-32 w-auto"
          />
          <h1 className="text-4xl font-extrabold text-purple-700">Destiny</h1>
          <p className="text-gray-700 mb-6 text-lg">Sign in to start your journey to love</p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50"
          >
            <LogIn size={20} />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ProfileSetup user={user} onComplete={() => setHasProfile(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />

      <nav className="bg-white shadow-md p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Destiny</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-lg mx-auto p-4 pt-8">
        {profiles[currentIndex] && (
          <ProfileCard
            profile={profiles[currentIndex]}
            onSwipe={handleSwipe}
          />
        )}
        
        {currentIndex >= profiles.length && (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No more profiles!</h2>
            <p className="text-gray-600">Check back later for more matches.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;