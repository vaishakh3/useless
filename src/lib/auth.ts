import toast from 'react-hot-toast';

const CLIENT_ID = '536780971675-ii4th2jbve5f23e8r3s3ilndkjeuhcr0.apps.googleusercontent.com';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const signInWithGoogle = async (): Promise<GoogleUser | null> => {
  try {
    const auth2 = await (window as any).google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'email profile',
      callback: (response: any) => {
        if (response.error) {
          toast.error('Failed to sign in with Google');
          return null;
        }
        
        // Get user info using the access token
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${response.access_token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          const user: GoogleUser = {
            id: data.sub,
            name: data.name,
            email: data.email,
            picture: data.picture
          };
          localStorage.setItem('user', JSON.stringify(user));
          window.dispatchEvent(new Event('storage'));
        });
      }
    });
    
    auth2.requestAccessToken();
    return null;
  } catch (error) {
    console.error('Sign-in error:', error);
    toast.error('Failed to sign in. Please try again.');
    return null;
  }
};

export const signOut = () => {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('storage'));
};

export const getUser = (): GoogleUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};