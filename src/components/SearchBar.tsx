import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({ query, onChangeQuery, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={onChangeQuery}
        placeholder={placeholder ?? 'Search properties'}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, backgroundColor: '#fff' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
  },
});

