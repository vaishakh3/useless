import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import MatchAnimation from './MatchAnimation';

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photoURL: string;
  interests: string[];
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
}

const WarningModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      className="bg-white rounded-xl p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto text-center shadow-xl flex flex-col items-center"
      onClick={e => e.stopPropagation()}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Ah ah ah! 😈</h3>
      </motion.div>
      <p className="text-base sm:text-lg mb-2 sm:mb-4">Not so fast! No escaping me!</p>
      <div className="flex justify-center mb-4">
        <img
          src="https://i.ibb.co/zn3rH7w/IMG-20240911-WA0166.jpg"
          alt="User Photo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-pink-500"
        />
      </div>
      <button
        onClick={onClose}
        className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Keep Looking
      </button>
    </motion.div>
  </motion.div>
);

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const userPhotoURL = JSON.parse(localStorage.getItem('profile') || '{}').photoURL;

  const handleLike = () => {
    if (profile.name === 'Vaishakh Suresh') {
      setShowMatch(true);
    } else {
      setShowWarning(true);
    }
  };

  const handleDislike = () => {
    if (profile.name === 'Vaishakh Suresh') {
      toast.success("Nice try! But we're meant to be! 💘");
      setShowMatch(true);
    } else {
      setShowMatch(false);
      onSwipe('right');
    }
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    onSwipe('right');
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden mx-auto"
      >
        <div className="relative h-96">
          <img
            src={profile.photoURL}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-white/90">{profile.location}</p>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-4">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
          
          <div className="flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDislike}
              className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
            >
              <X size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
            >
              <Heart size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showWarning && <WarningModal onClose={() => setShowWarning(false)} />}
        {showMatch && (
          <MatchAnimation
            profile={profile}
            userPhotoURL={userPhotoURL} 
            onClose={handleMatchClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileCard;
