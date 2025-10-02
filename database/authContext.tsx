// src/contexts/AuthContext.tsx
import {createContext, useContext, useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
	signUpService,
	loginService,
} from './services/authService'
import { normalizeAuthError } from './errorHandeling/authErrors';
import {supabase} from '../database/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type AuthContextType = {
	authUser: any;
	profile: any;
	isLoading: boolean;
	isProfileComplete: boolean;
	signUp: (email: string, password: string) => Promise<{data:any; error?: any}>;
	login: (email: string, password: string) => Promise<{data: any; error?: any}>;
	fetchProfile: (id: string) => Promise<{data: any, error?: any}>;
	addPoints: (userId: string, amount: number) => Promise<{data: any; error?: any}>;
	update: (first_name?: string, last_name?: string, user_name?: string, mobile_number?: string, dom_hand?: string) => Promise<{data: any; error?: any}>;
	logout: () => Promise<void>;
	err: string | null;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [authUser, setAuthUser] = useState<any>(null);
	const [profile, setProfile] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);
	const [isProfileComplete, setIsProfileComplete] = useState(false);

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			console.log('Auth state change event:', event);

			if (session) {
				setAuthUser(session.user);
				fetchProfile(session.user.id);
			} else {
				setAuthUser(null);
				setProfile(null);
			}
			
			setIsLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await signUpService(email, password);
      if (error) {
        const message = normalizeAuthError("signup", error.message);
        setErr(message);
        return { data: null, error: { message } };
      }
      return { data, error: null };
    } catch (err: any) {
      const message = err.message ?? "Unexpected error";
      setErr(message);
      return { data: null, error: { message } };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await loginService(email, password);
      if (error) {
        const message = normalizeAuthError("login", error.message);
        setErr(message);
        return { data: null, error: { message } };
      }
      return { data, error: null };
    } catch (err: any) {
      const message = err.message ?? "Unexpected error";
      setErr(message);
      return { data: null, error: { message } };
    }
  };

	const fetchProfile = async (id: string) => {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', id)
				.single();

			if (error) {
				console.error('Error fetching profile:', error);
				return { data: null, error };
			}

			setProfile(data);
			checkProfileComplete(data);
			return { data, error: null };
		} catch (error: any) {
			console.error('Error fetching profile:', error);
			return { data: null, error: { message: error.message } };
		}
	};

	const addPoints = async (userId: string, amount: number) => {
		// Check if user's profile is complete before allowing points
		if (!isProfileComplete) {
			console.log('Cannot add points: Profile incomplete');
			return { data: null, error: { message: 'Complete your profile before earning points' } };
		}
		
		try {
			const { data: currentProfile, error: fetchError } = await supabase
				.from('profiles')
				.select('id, points, user_name')
				.eq('user_id', userId)
				.single();

			if (fetchError) throw fetchError;
			
			const currentPoints = currentProfile?.points || 0;
			const newPoints = currentPoints + amount;
			
			const { data, error: updateError } = await supabase
				.from('profiles')
				.update({ points: newPoints })
				.eq('id', currentProfile.id)
				.select()
				.single();
				
			if (updateError) throw updateError;

			setProfile(data);
			
			return { data, error: null };
		} catch (error: any) {
			console.error('Error adding points:', error.message);
			return { data: null, error: { message: error.message } };
		}
	};

	const update = async (
		firstName?: string,
		lastName?: string,
		userName?: string,
		mobileNumber?: string,
		domHand?: string,
	) => {
		setErr(null);
		try {
			// Check if profile already exists
			const { data: existingProfile, error: fetchError } = await supabase
				.from('profiles')
				.select('id')
				.eq('user_id', authUser.id)
				.single();

			const updateData = {
				first_name: firstName || null,
				last_name: lastName || null,
				user_name: userName || null,
				mobile_number: mobileNumber || null,
				dom_hand: domHand || null,
			};

			let updateUserResult, updateError;

			if (existingProfile) {
				// Profile exists - update it
				const result = await supabase
					.from('profiles')
					.update(updateData)
					.eq('user_id', authUser.id)
					.select()
					.single();
				updateUserResult = result.data;
				updateError = result.error;
			} else {
				// Profile doesn't exist - create it
				const result = await supabase
					.from('profiles')
					.insert({ user_id: authUser.id, ...updateData })
					.select()
					.single();
				updateUserResult = result.data;
				updateError = result.error;
			}

			if (updateError) {
				throw new Error(`Error updating user profile: ${updateError.message}`);
			}
		
			setProfile(updateUserResult);
			checkProfileComplete(updateUserResult);
			return {data: updateUserResult, error: null};
		} catch (error: any) {
			console.error('Error updating profile:', error);
			setErr(error.message);
			return { data: null, error };
		}
	};

	const logout = async () => {
		try {
			await supabase.auth.signOut();
			console.log('logout Successful!')
		} catch (error) {
			console.error('Logout failed:', error);
			setErr('Failed to sign out');
		}
	};

	const checkProfileComplete = (profileData: any) => {
		if (!profileData) {
			setIsProfileComplete(false);
			return;
		}
		
		// Check if required fields are completed
		const isComplete = !!(profileData.user_name && 
			profileData.first_name && 
		profileData.dom_hand);

		setIsProfileComplete(isComplete);
	};

	return (
		<AuthContext.Provider value={{authUser, profile, isLoading, isProfileComplete, signUp, fetchProfile, addPoints, update, login, logout, err}}>
			{!isLoading ? children : <View style={styles.view}><Text style={styles.loading}>Loading...</Text></View>  }
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loading: {
		backgroundColor: '#F5F5F5',
		fontSize: 50
	}
});
