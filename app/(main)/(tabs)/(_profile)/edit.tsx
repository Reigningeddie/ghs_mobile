import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Image
} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '../../../../database/authContext';



//! add user already exists alerts to userName, email, and mobile Number.

export default function SignUp(): React.JSX.Element {
  const router = useRouter();
  const [firstName, setFirst] = useState<string | undefined>(undefined);
  const [lastName, setLast] = useState<string | undefined>(undefined);
  const [userName, setUser] = useState<string | undefined>(undefined);
  const [mobileNumber, setMobile] = useState<string | undefined>(undefined);
  const [domHand, setHand] = useState<string | undefined>(undefined);

  //Error State Saves
  const [errUserName, setErrUserName] = useState<string | null>(null);

  const {update, profile} = useAuth();

  useEffect(() => {
    if (profile) {
      setFirst(profile.first_name);
      setLast(profile.last_name);
      setUser(profile.user_name);
      setMobile(profile.mobile_number);
      setHand(profile.dom_hand);
    }
  }, [profile]);

    //validation functions for state saves
    const validateUserName = (value: string): void => {
      if (!value || value.length < 6) {
        setErrUserName('Username must be at east 6 characters long');
      } else {
        setErrUserName(null);
      }
    };
    //end of validation functions

  const handleSubmit = async () => {
    let hasError = false;
    
    // Validation
    if (!userName || userName.trim().length === 0) { 
        setErrUserName('Username is required');
        hasError = true;
    } else if (userName.length < 6) {
        setErrUserName('Username must be at least 6 characters long');
        hasError = true;
    }
    
    if (hasError) return;

    try {
        console.log('Updating profile with:', {
            firstName,
            lastName,
            userName,
            mobileNumber,
            domHand
        });
        
        const result = await update(
            firstName,
            lastName,
            userName,
            mobileNumber,
            domHand,
        );
        
        console.log('Update result:', result);
        
        if (result.error) {
            throw new Error(result.error.message);
        }
        
        // Show success alert
        Alert.alert(
            'Success',
            'Profile updated successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('Success alert closed')
                }
            ]
        );
    } catch (error: any) {
        console.error('Error during profile update:', error);
        Alert.alert('Error', error.message || 'Failed to update profile');
    }
};

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.pressable}>
          <Image source={require('../../../../assets/back.png')} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
<Text style={styles.txt}>Edit your profile</Text>
      <Pressable>
        <View style={styles.pic}/>
      </Pressable>
      <View style={styles.name}>
            <TextInput
              style={styles.nameInput}
              placeholder={'First Name'}
              placeholderTextColor="#1B1B1B"
              value={firstName}
              onChangeText={input => setFirst(input)}
            />
            <TextInput
              style={styles.nameInput}
              placeholder={'Last Name'}
              placeholderTextColor="#1B1B1B"
              value={lastName}
              onChangeText={input => setLast(input)}
            />
      </View>
          <TextInput
            style={styles.input}
            placeholder={'Create a User Name'}
            placeholderTextColor="#1B1B1B"
            value={userName}
            onChangeText={input => {
              setUser(input);
              validateUserName(input)
            }}
          />
      {errUserName && <Text style={styles.require}>{errUserName}</Text>}
          {/* <TextInput
            style={styles.input}
            value={email}
            placeholder={'Email'}
            placeholderTextColor="#1B1B1B"
            onChangeText={input => {
              setEmail(input);
              validateEmail(input)
            }}
          />
      {errEmail && <Text style={styles.require}>{errEmail}</Text>} */}
          <TextInput
            style={styles.input}
            placeholder={'Mobile Number'}
            placeholderTextColor="#1B1B1B"
            value={mobileNumber}
            onChangeText={input => setMobile(input)}
          />
          <View style={styles.toggleAlign}>
            <Text style={styles.toggleText}>Dominant Hand</Text>
            <View style={styles.toggleContainer}>
              <Pressable 
                style={[styles.toggleBtn, domHand === 'left' && styles.toggleActive]}
                onPress={() => setHand('left')}
                >
                <Text style={[styles.toggleText, domHand === 'left' && styles.toggleActiveText]}>
                  Left
                </Text>
              </Pressable>
              <Pressable 
                style={[styles.toggleBtn, domHand === 'right' && styles.toggleActive]}
                onPress={() => setHand('right')}
                >
                <Text style={[styles.toggleText, domHand === 'right' && styles.toggleActiveText]}>
                  Right
                </Text>
              </Pressable>
            </View>
          </View>
          {/* <TextInput
            style={styles.input}
            placeholder={'New Password'}
            secureTextEntry={true}
            placeholderTextColor="#1B1B1B"
            value={password}
            onChangeText={input => {
              setPassword(input);
              validatePassword(input)}}
          />
      {errPassword && <Text style={styles.require}>{errPassword}</Text>}
          <TextInput
            style={styles.input}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            placeholderTextColor="#1B1B1B"
            value={confirmPassword}
            onChangeText={input => {
              setConfirmPassword(input);
              validateConfirmPassword(input, password)}}
          />
      {errConfirmPassword && <Text style={styles.require}>{errConfirmPassword}</Text>} */}
      <Pressable style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.signUp}>Update</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    backgroundColor: '#284B63',
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  txt: {
    color: '#1B1B1B',
    fontSize: 30,
  },

  pic: {
    backgroundColor: '#3C6E71',
    height: 100,
    width: 100,
    borderRadius: 80,
    borderColor: '#353535',
    borderWidth: 2,
    marginTop: 20,
  },

  name: {
    marginTop: 15,
    flexDirection: 'row',
  },

  nameInput: {
    color: '#1B1B1B',
    fontSize: 15,
    borderWidth: 1.5,
    borderBottomRightRadius: 5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    height: 40,
    width: 180,
    marginRight: 15,
    marginLeft: 15,
  },

  input: {
    color: '#1B1B1B',
    fontSize: 15,
    borderWidth: 1.5,
    borderBottomRightRadius: 5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    height: 40,
    width: 390,
    marginTop: 15,
  },

  btn: {
    backgroundColor: '#2EA1DD',
    fontSize: 10,
    height: 40,
    width: 200,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#2EA1DD',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signUp: {
    color: 'aliceblue',
  },

  require: {
    color: 'red',
    justifyContent: 'center',
  },

  toggleAlign: {
    marginTop: 15,
  },

  toggleText: {
    marginBottom: 5,
    textAlign: 'center',
  },

  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  toggleBtn: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 6,
    // color: 'white',
    // borderColor: '#2EA1DD',
    // backgroundColor: '#2EA1DD',
    paddingLeft: 31,
    paddingRight: 31
    ,
  },

  toggleActive: {
    borderColor: '#2EA1DD',
    backgroundColor: '#2EA1DD',
  },

  toggleActiveText: {
    color: 'white',
  },
});
