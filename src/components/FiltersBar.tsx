import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export type Filters = {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
};

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

export default function FiltersBar({ filters, onChange }: Props) {
  const parseNumber = (text: string) => {
    const n = Number(text.replace(/[^0-9]/g, ''));
    return Number.isFinite(n) && n > 0 ? n : undefined;
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Min $</Text>
        <TextInput
          keyboardType="number-pad"
          value={filters.minPrice ? String(filters.minPrice) : ''}
          onChangeText={(t) => onChange({ ...filters, minPrice: parseNumber(t) })}
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Max $</Text>
        <TextInput
          keyboardType="number-pad"
          value={filters.maxPrice ? String(filters.maxPrice) : ''}
          onChangeText={(t) => onChange({ ...filters, maxPrice: parseNumber(t) })}
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Beds</Text>
        <TextInput
          keyboardType="number-pad"
          value={filters.minBedrooms ? String(filters.minBedrooms) : ''}
          onChangeText={(t) => onChange({ ...filters, minBedrooms: parseNumber(t) })}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  field: { flexDirection: 'row', alignItems: 'center' },
  label: { marginRight: 6, color: '#555' },
  input: {
    width: 72,
    height: 36,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
  },
});

