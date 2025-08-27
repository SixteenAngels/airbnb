import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSupabaseClient } from '../config/supabase';

type Props = NativeStackScreenProps<any>;

export default function ResetPasswordScreen({ navigation }: Props) {
  const supabase = getSupabaseClient();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onReset = async () => {
    if (!email.trim()) {
      Alert.alert('Enter your email');
      return;
    }
    setLoading(true);
    try {
      if (!supabase) {
        Alert.alert('If configured, a reset email will be sent.');
        navigation.goBack();
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) {
        Alert.alert('Reset failed', error.message);
        return;
      }
      Alert.alert('Check your email for reset instructions.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onReset} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send reset email</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  input: { height: 44, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  button: { height: 44, borderRadius: 8, backgroundColor: '#0c6', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: '700' },
});

