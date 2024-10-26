import React, { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';
import { GoogleUser } from '../lib/auth';
import { motion } from 'framer-motion';

interface ProfileSetupProps {
  user: GoogleUser;
  onComplete: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: '',
    location: '',
    bio: '',
    interests: '',
  });
  const [photoURL, setPhotoURL] = useState(user.picture);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const profileData = {
        ...formData,
        age: parseInt(formData.age),
        interests: formData.interests.split(',').map(i => i.trim()),
        photoURL,
      };
      localStorage.setItem('profile', JSON.stringify(profileData));
  
      onComplete();
    } catch (error) {
      console.error('Error setting up profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </motion.div>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
          required
        />

        <input
          type="text"
          placeholder="Interests (comma-separated)"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Complete Setup'}
        </motion.button>
      </form>
    </div>
  );
};

export default ProfileSetup;