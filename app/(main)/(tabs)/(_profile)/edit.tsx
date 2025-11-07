// app/(main)/(tabs)/(_profile)/edit.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable, 
  Alert, Image, 
  ScrollView } from 'react-native';
import { pickImage } from '../../../../database/services/imageService';
import { useAuth } from '../../../../database/context/authContext';
import { updateProfileService } from '../../../../database/services/profileService';
import { useProfile } from '../../../../database/context/profileContext';
import { useRouter } from 'expo-router';

export default function EditProfile() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { profile, fetchProfile } = useProfile();
  // Local state for form inputs
  const [firstName, setFirstName] = useState(profile?.first_name ?? '');
  const [lastName, setLastName] = useState(profile?.last_name ?? '');
  const [userName, setUserName] = useState(profile?.user_name ?? '');
  const [mobileNumber, setMobileNumber] = useState(profile?.mobile_number ?? '');
  const [domHand, setDomHand] = useState(profile?.dom_hand);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep local state synced if profile changes
  useEffect(() => {
    setFirstName(profile?.first_name ?? '');
    setLastName(profile?.last_name ?? '');
    setUserName(profile?.user_name ?? '');
    setMobileNumber(profile?.mobile_number ?? '');
    setDomHand(profile?.dom_hand);
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (!authUser?.id) return;

    // Trim and normalize the username
  const normalizedUserName = userName.trim().toLowerCase();

  // Validation: username must be at least 6 characters
  if (normalizedUserName.length < 6) {
    Alert.alert('Invalid Username', 'Username must be at least 6 characters long.');
    return;
  }

    // if user didn't change anything, skip the update
    const hasChanges =
    firstName !== profile?.first_name ||
    lastName !== profile?.last_name ||
    normalizedUserName !== profile?.user_name ||
    mobileNumber !== profile?.mobile_number ||
    domHand !== profile?.dom_hand;

  if (!hasChanges) {
    Alert.alert('No changes detected', 'Your profile is already up to date.');
    return;
  }

    setIsSubmitting(true);

    try {
      const { data, error } = await updateProfileService(authUser.id, {
        first_name: firstName,
        last_name: lastName,
        user_name: normalizedUserName,
        mobile_number: mobileNumber,
        dom_hand: domHand,
      });

      if (error) {
        Alert.alert('Error', error.message || 'Failed to update profile');
      } else {
        Alert.alert('Success', 'Profile updated successfully!');
        await fetchProfile(authUser.id); // refresh context
        router.back();
      }
    } catch (err: any) {
      console.error('Unexpected error updating profile:', err);
      Alert.alert('Error', err.message || 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatar = async () => {
  const result = await pickImage();
  if (!result?.uri) return;

  try {
    setIsSubmitting(true);
    await updateProfileService(authUser.id, { avatar_url: result.uri });
    await fetchProfile(authUser.id);
    Alert.alert('Success', 'Avatar updated!');
  } catch (err: any) {
    Alert.alert('Error', err.message || 'Failed to update avatar.');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.banner}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Image source={require('../../../../assets/back.png')} />
          <Text style={styles.bannertxt}>Back</Text>
        </Pressable>
      </View>
      <Pressable style={styles.picBorder} onPress={()=>{handleAvatar()}}>
        <View style={styles.pic}/>
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Username"
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Dominant Hand</Text>
      <View style={styles.handContainer}>
        <Pressable
          style={[styles.handButton, domHand === 'left' && styles.selectedHand]}
          onPress={() => setDomHand('left')}
        >
          <Text>👈 Left</Text>
        </Pressable>
        <Pressable
          style={[styles.handButton, domHand === 'right' && styles.selectedHand]}
          onPress={() => setDomHand('right')}
        >
          <Text>Right 👉</Text>
        </Pressable>
      </View>

      <Pressable style={styles.submitButton} onPress={handleUpdateProfile} disabled={isSubmitting}>
        <Text style={styles.submitText}>{isSubmitting ? 'Saving...' : 'Save Profile'}</Text>
      </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
  },
  banner: {
    backgroundColor: '#284B63',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    flexDirection: 'row',
  },
  bannertxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D9D9D9'
  },
  picBorder: {
    alignItems: 'center',
    paddingTop: 10
  },
  pic: {
    backgroundColor: '#3C6E71',
    height: 150,
    width: 150,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#353535'
  },
  container: {
    padding: 20
  },
  label: {
    fontSize: 18,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  handContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  handButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    width: 100,
    alignItems: 'center',
  },
  selectedHand: {
    backgroundColor: '#437BA1',
    borderColor: '#284B63',
  },
  submitButton: {
    backgroundColor: '#284B63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});
