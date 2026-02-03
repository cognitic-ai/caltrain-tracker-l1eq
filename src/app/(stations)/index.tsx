import { ScrollView, View, Text, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import { STATIONS } from "@/data/stations";

function useSearch(options: any = {}) {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerSearchBarOptions: {
        placeholder: "Search stations",
        ...options,
        onChangeText(e: any) {
          setSearch(e.nativeEvent.text);
          options.onChangeText?.(e);
        },
        onSearchButtonPress(e: any) {
          setSearch(e.nativeEvent.text);
          options.onSearchButtonPress?.(e);
        },
        onCancelButtonPress(e: any) {
          setSearch("");
          options.onCancelButtonPress?.(e);
        },
      },
    });
  }, [options, navigation]);

  return search;
}

export default function StationsRoute() {
  const search = useSearch();

  const filteredStations = useMemo(() => {
    if (!search) return STATIONS;
    const searchLower = search.toLowerCase();
    return STATIONS.filter((station) =>
      station.name.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const stationsByZone = useMemo(() => {
    const zones: Record<number, typeof STATIONS> = {};
    filteredStations.forEach((station) => {
      if (!zones[station.zone]) {
        zones[station.zone] = [];
      }
      zones[station.zone].push(station);
    });
    return zones;
  }, [filteredStations]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: AC.systemBackground as any }}
    >
      <View style={{ padding: 16, gap: 24 }}>
        {Object.entries(stationsByZone)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([zone, stations]) => (
            <View key={zone} style={{ gap: 12 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: AC.label as any,
                }}
              >
                Zone {zone}
              </Text>

              {stations.map((station) => (
                <Link
                  key={station.id}
                  href={`/(stations)/station/${station.id}`}
                  asChild
                >
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: AC.secondarySystemBackground as any,
                      borderRadius: 16,
                      borderCurve: "continuous",
                      padding: 16,
                      opacity: pressed ? 0.7 : 1,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    })}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: AC.label as any,
                          marginBottom: 4,
                        }}
                      >
                        {station.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                        }}
                      >
                        Zone {station.zone}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: AC.systemBlue as any,
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 12,
                          fontWeight: "700",
                        }}
                      >
                        {station.id}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              ))}
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
