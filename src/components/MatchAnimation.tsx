import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MatchAnimationProps {
  profile: {
    name: string;
    photoURL: string;
  };
  userPhotoURL: string;
  onClose: () => void;
}

const MatchAnimation: React.FC<MatchAnimationProps> = ({ profile, userPhotoURL, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 sm:p-8 rounded-3xl text-center max-w-xs sm:max-w-sm w-full mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Heart className="text-white w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6" fill="white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">It's a Match! 💘</h2>
          
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white"
            >
              <img
                src={userPhotoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-white text-3xl sm:text-4xl"
            >
              ❤️
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white"
            >
              <img
                src={profile.photoURL}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <p className="text-white text-base sm:text-lg mb-4 sm:mb-6">
            You and {profile.name} have matched! Time to start your journey together! 🎉
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            onClick={onClose}
          >
            Continue Swiping
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);


export default MatchAnimation;
