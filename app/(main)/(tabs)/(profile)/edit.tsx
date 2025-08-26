import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert
} from 'react-native';
import {useAuth} from '../../../../database/authContext';



//! add user already exists alerts to userName, email, and mobile Number.

export default function SignUp(): React.JSX.Element {
  const [firstName, setFirst] = useState<string>('');
  const [lastName, setLast] = useState<string | undefined>(undefined);
  const [userName, setUser] = useState<string | undefined>(undefined);
  const [mobileNumber, setMobile] = useState<string>('');
  //Error State Saves
  const [errUserName, setErrUserName] = useState<string | null>(null);

  const {update} = useAuth();

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
    if (!userName || userName.trim().length === 0) {  // Fixed comparison operator
        setErrUserName('*Required');
        hasError = true;
    }
    
    if (hasError) return;

    try {
        // await signUp(email, password);
        await update(
            firstName,
            lastName,
            userName,
            mobileNumber,
        );
        
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
        console.error('Error during sign up:', error);
        Alert.alert('Error', error.message);
    }
};

  return (
    <View style={styles.body}>
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
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    width: 180,
    marginRight: 15,
    marginLeft: 15,
  },

  input: {
    color: '#1B1B1B',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
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
  },
});
