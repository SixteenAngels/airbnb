import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Property } from '../types';
import SearchBar from '../components/SearchBar';
import { fetchProperties } from '../services/properties';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function PropertyListScreen({ navigation }: Props) {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [properties, setProperties] = React.useState<Property[]>([]);

  const handlePress = (property: Property) => {
    navigation.navigate('PropertyDetail', { property });
  };

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProperties({ query });
      setProperties(data);
    } finally {
      setLoading(false);
    }
  }, [query]);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <SearchBar query={query} onChangeQuery={setQuery} />
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>{item.city ?? 'Unknown city'}</Text>
            </View>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No properties found.</Text>}
        contentContainerStyle={properties.length === 0 ? styles.emptyContainer : undefined}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  title: { fontSize: 16, fontWeight: '600', color: '#111' },
  meta: { fontSize: 13, color: '#666', marginTop: 2 },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#e5e7eb' },
  price: { fontSize: 15, fontWeight: '600', color: '#0c6' },
  empty: { textAlign: 'center', padding: 24, color: '#666' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
});

