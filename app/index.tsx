import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Modal,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import type {NavProps} from '../types/types';
// import {useAuth} from '../database/authContext';

export default function Login(): React.JSX.Element {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; confirmPassword?: string;}>({})
  const [modalVisible, setModalVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);

  // const {login, signUp} = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(?:com|net|org|edu)$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validate = () => {
    let validationErrors: {email?: string; password?: string; confirmPassword?: string;} = {};
    
    if (isSignUp) {
      if (!emailValue) {
        validationErrors.email = 'Email is required';
      } else if (!validateEmail(emailValue)) {
        validationErrors.email = 'Invalid email address';
      }

      if (!passwordValue) {
        validationErrors.password = 'Password is required';
      } else if (!validatePassword(passwordValue)) {
        validationErrors.password = 'Password must be at least 6 characters long';
      }

      if (!confirmPassword) {
        validationErrors.confirmPassword = 'Confirm Password is required';
      } else if (passwordValue !== confirmPassword) {
        validationErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      const {data, error} = await login(emailValue, passwordValue);
      if (error && typeof error.message === 'string') {
        if (error.message.includes('Invalid login credential')) {
          throw new Error('Invalid login credential');
        }
        throw new Error(`Authentication error: ${error.message}`);
      }
      if (!data.session) {
        throw new Error('No session returned after login');
      }
      console.log('Login successful!');
      // navigation.navigate('BottomTabs');
    } catch (error: any) {
      console.log('Login failed:', error);
      Alert.alert(error.message);
    }
  };

  //! create if else email is not unique
  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const {data, error} = await signUp(emailValue, passwordValue);
      if (error) {
        console.log(error);
        throw new Error(`Sign Up error: ${error.message}`);
      } else {
        console.log('Sign up successful!', data);
        Alert.alert('Sign up successful, confirm email then sign in')
        setIsSignUp(false);
      }
    } catch (error: any) {
      console.log('Sign up failed', error);
      Alert.alert('Sign up failed', error.message);
    }
  };

  return (
    <View style={styles.body}>
      <Image source={require('../assets/logo.png')} />
      {isSignUp && <Text style={styles.signUp}>Sign Up</Text>}
      <Modal 
        animationType="slide"
        // transparent={true}
        visible={modalVisible}>
        <View style={[styles.modal, styles.mFormat]}>
          <Text style={styles.title}>
            Welcome to Grand Hand Slam
          </Text>
          <Text style={[styles.modalTxt, styles.intro]}>
          Before we begin, we must have your deliberate aknowledgement of the rules for this game. We also ask for your full cooperation. By agreeing and signing up, you will FOREVER BE IN THIS GAME. If forever is too long of a commitment then feel free to leave the app now. There will be retributions if a player sees you breaking the rules. You will be excommunicated if you are constinuously reported or deemed by a commissioner as an unworthy or dishonest player, and you will be forever disgraced and put in to the HALL OF SHAME for all to see. Be aware this is a game of honor and merit. You should conduct yourself in those regards regularly. Please drink responsibly and continue at your own risk.
            </Text>
          <View style={styles.btnLayout}>
            <Pressable 
              style={styles.btn} 
              onPress={() => setModalVisible(false)}>
              <Text style={styles.btnTxt}>Decline</Text></Pressable>
            <Pressable 
              style={styles.btn}
              onPress={() => (setModalVisible(!modalVisible), (setRulesVisible(!rulesVisible)))}>
              <Text 
                style={styles.btnTxt}>Accept</Text></Pressable>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardInputFormat}>
        <TextInput
        style={styles.input}
        placeholder={'E-mail'}
        placeholderTextColor="white"
        value={emailValue}
        onChangeText={input => 
          setEmail(input)}/>
        {errors.email && <Text style={styles.require}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder={'Password'}
        placeholderTextColor="white"
        value={passwordValue}
        onChangeText={input => setPassword(input)}/>
        {errors.password && <Text style={styles.require}>{errors.password}</Text>}
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder={'Confirm Password'}
            placeholderTextColor='white'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}/>
            )}
              {errors.confirmPassword && <Text style={styles.require}>{errors.confirmPassword}</Text>}
      </KeyboardAvoidingView>
      
      
      <Pressable style={styles.loginBtn} onPress={isSignUp ? handleSignUp : handleLogin}>
        <Text style={styles.loginTxt}>{isSignUp ? 'SignUp' : 'Login'}</Text>
      </Pressable>
      <Text style={styles.text}>
        {isSignUp ? `Already have an account?` : `Don't have an account?`}
        {isSignUp ? (
      // This is mini Log in Button
          <Text
          style={styles.signUpTxt}
          onPress={() => setIsSignUp(!isSignUp)}>
          {' '}
          Log in
        </Text>) : (
      // This is mini sign Up Button
          <Text
          style={styles.signUpTxt}
          onPress={() => setModalVisible(!modalVisible)}>
            {' '}
            Sign up
        </Text>)}
      </Text>
      <Modal
        animationType="slide"
        visible={rulesVisible}>
        <View style={styles.modal}> 
          <Text style={styles.title}>
            Rules of Grand Hand Slam
          </Text>
          <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.modalTxt}>
            1. You will from now on, only drink with your non-dominant hand. {'\n'}{'\n'}
            2. If you are called out for drinking with your dominant hand(DH) by anyone playing the game, that is a Grand Hand Slam(GHS), you chug the remainder of your drink. {'\n'}{'\n'}
            3. A GHS means you have to chug the remainder of your drink, regarldess of type, amount, time or place to completion. {'\n'}{'\n'}
            4. At purchase or upon receival, you are allowed transportation of said drink to which ever location you decided to sit/stand/laydown with your
            DH. After relocation, game is back on and you will be vulnerable to a GHS. Even if you're just holding you're drink. {'\n'}{'\n'}
            5. This means any drink, bottle, can, pint, ect. or other drinking receptable. (Be aware, holding a straw after receiving a drink and relocating, will be considered a GHS.) {'\n'}{'\n'}
            6. Touching a straw with your DH after relocation will be vulnerble to a GHS. {'\n'}{'\n'}
            7. If you cannot chug said drink, you are allowed ONE mulligan per month, absolving you of your responsibitly to chug said drink. {'\n'}{'\n'}
            8. The mulligan does NOT carry over to the next month and will only absolve you of that person's call to GHS you and if you are caught again, you MUST chug. {'\n'}{'\n'}
            9. It must be your OWN DRINK. Someone cannot call a GHS if you're holding someone else's drink. {'\n'}{'\n'}
            10. Be a gentleman/gentlewoman, use discretion when calling a GHS. If a player is clearly way too drunk to continue, don't be an asshole.
          </Text>
          <View style={styles.btnLayout}>
            <Pressable 
            style={styles.btn} 
            onPress={() => setRulesVisible(!rulesVisible)}>
              <Text style={styles.btnTxt}>Decline</Text></Pressable>
            <Pressable 
              style={styles.btn}
              onPress={() => (setRulesVisible(!rulesVisible), (setIsSignUp(!isSignUp)))}>
              <Text style={styles.btnTxt}>Accept</Text></Pressable>
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  signUp: {
    fontSize: 25,
    marginBottom: 16,
    color: 'white'
  },

  mFormat: {
    alignItems: 'center',
  },

  modal: {
    justifyContent: 'center',
    height: '100%',
    padding: 12,
    backgroundColor: '#00308F'
  },

  modalTxt: {
    color: 'white',
    fontSize: 19,
  },

  intro: {
    textAlign: 'justify',
  },

  scroll: {
    flexGrow: 1,
    alignItems: 'center',
  },

  btn: {
    backgroundColor: '#FFBF00',
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 8,
    margin: '10%',
  },

  btnLayout: {
    flexDirection: 'row',
    margin: '5%',
  },
  
  btnTxt: {
    color: 'black',
  },

  keyboardInputFormat: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  title: {
    color: 'white',
    marginBottom: 40,
    fontSize: 30,
    fontWeight: 'bold',
    
  },

  input: {
    color: 'white',
    fontSize: 15,
    borderWidth: 2,
    height: 40,
    paddingLeft: 10,
    width: 200,
    borderRadius: 5,
    marginBottom: 15,
  },

  loginBtn: {
    backgroundColor: '#2EA1DD',
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },

  loginTxt: {
    fontSize: 15,
    color: 'aliceblue',
  },

  text: {
    fontSize: 14,
    color: 'white',
  },

  signUpTxt: {
    color: '#2EA1DD',
  },

  require: {
    color: 'red',
    marginTop: -15,
  },
});