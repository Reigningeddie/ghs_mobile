// app/(main)/(tabs)/(_profile)/edit.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
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

    setIsSubmitting(true);

    try {
      const { data, error } = await updateProfileService(authUser.id, {
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        mobile_number: mobileNumber,
        dom_hand: domHand,
      });

      if (error) {
        Alert.alert('Error', error.message || 'Failed to update profile');
      } else {
        Alert.alert('Success', 'Profile updated successfully!');
        fetch(authUser.id); // refresh context
        router.back();
      }
    } catch (err: any) {
      console.error('Unexpected error updating profile:', err);
      Alert.alert('Error', err.message || 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text>Left 👈</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
