import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'PropertyDetail'>;

export default function PropertyDetailScreen({ route }: Props) {
  const { property } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.price}>${property.price.toLocaleString()}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{property.city ?? 'Unknown'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bedrooms:</Text>
        <Text style={styles.value}>{property.bedrooms ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bathrooms:</Text>
        <Text style={styles.value}>{property.bathrooms ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sq Ft:</Text>
        <Text style={styles.value}>{property.sqft ?? '—'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#111' },
  price: { fontSize: 18, fontWeight: '600', color: '#0c6', marginVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  label: { width: 100, color: '#666' },
  value: { color: '#111', fontWeight: '500' },
});

