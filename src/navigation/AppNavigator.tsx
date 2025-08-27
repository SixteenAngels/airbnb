import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyListScreen from '../screens/PropertyListScreen';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { RootStackParamList } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, loading, signOut } = useAuth();
  if (loading) return null;
  const authed = Boolean(user);
  return authed ? (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={PropertyListScreen}
        options={{
          title: 'Properties',
          headerRight: () => (
            <LogoutButton onPress={signOut} />
          ),
        }}
      />
      <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}

function LogoutButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <Text style={{ color: '#2563eb', fontWeight: '600' }}>Sign out</Text>
    </TouchableOpacity>
  );
}

