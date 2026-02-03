import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { getStationById } from "@/data/stations";
import { getAllTrips } from "@/data/schedules";
import { formatTime, getCurrentTime, isAfterTime } from "@/utils/time";
import { getStationName } from "@/data/stations";

export default function StationDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const station = getStationById(id);

  if (!station) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: AC.systemBackground as any }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: AC.label as any }}>Station not found</Text>
        </View>
      </ScrollView>
    );
  }

  const currentTime = getCurrentTime();

  // Find all trips that stop at this station
  const allTrips = getAllTrips();
  const tripsAtStation = allTrips
    .map((trip) => {
      const stop = trip.stops.find((s) => s.stationId === id);
      if (!stop) return null;
      return { trip, stop };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .filter((item) => isAfterTime(item.stop.departureTime, currentTime))
    .sort((a, b) => {
      const [h1, m1] = a.stop.departureTime.split(':').map(Number);
      const [h2, m2] = b.stop.departureTime.split(':').map(Number);
      return (h1 * 60 + m1) - (h2 * 60 + m2);
    });

  const northboundTrips = tripsAtStation.filter((item) => item.trip.direction === "NB");
  const southboundTrips = tripsAtStation.filter((item) => item.trip.direction === "SB");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: AC.systemBackground as any }}
    >
      <View style={{ padding: 16, gap: 20 }}>
        {/* Station Header */}
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground as any,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                backgroundColor: AC.systemBlue as any,
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {station.id}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: AC.label as any,
                }}
              >
                {station.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: AC.secondaryLabel as any,
                  marginTop: 4,
                }}
              >
                Zone {station.zone}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: AC.separator as any,
              marginVertical: 4,
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 12,
                color: AC.secondaryLabel as any,
                marginBottom: 4,
              }}
            >
              Coordinates
            </Text>
            <Text
              selectable
              style={{
                fontSize: 14,
                color: AC.label as any,
                fontVariant: ["tabular-nums"],
              }}
            >
              {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
            </Text>
          </View>
        </View>

        {/* Northbound Trains */}
        {northboundTrips.length > 0 && (
          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label as any,
              }}
            >
              Northbound
            </Text>

            {northboundTrips.map(({ trip, stop }) => {
              const typeColor =
                trip.type === "Express"
                  ? AC.systemRed
                  : trip.type === "Limited"
                  ? AC.systemOrange
                  : AC.systemGreen;

              return (
                <View
                  key={trip.id}
                  style={{
                    backgroundColor: AC.secondarySystemBackground as any,
                    borderRadius: 12,
                    borderCurve: "continuous",
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <View
                      style={{
                        backgroundColor: typeColor as any,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        borderCurve: "continuous",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        {trip.name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                        }}
                      >
                        {trip.type}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: AC.tertiaryLabel as any,
                        }}
                      >
                        To {getStationName(trip.stops[trip.stops.length - 1].stationId)}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: AC.label as any,
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {formatTime(stop.departureTime)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Southbound Trains */}
        {southboundTrips.length > 0 && (
          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label as any,
              }}
            >
              Southbound
            </Text>

            {southboundTrips.map(({ trip, stop }) => {
              const typeColor =
                trip.type === "Express"
                  ? AC.systemRed
                  : trip.type === "Limited"
                  ? AC.systemOrange
                  : AC.systemGreen;

              return (
                <View
                  key={trip.id}
                  style={{
                    backgroundColor: AC.secondarySystemBackground as any,
                    borderRadius: 12,
                    borderCurve: "continuous",
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <View
                      style={{
                        backgroundColor: typeColor as any,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        borderCurve: "continuous",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        {trip.name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                        }}
                      >
                        {trip.type}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: AC.tertiaryLabel as any,
                        }}
                      >
                        To {getStationName(trip.stops[trip.stops.length - 1].stationId)}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: AC.label as any,
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {formatTime(stop.departureTime)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {tripsAtStation.length === 0 && (
          <View
            style={{
              backgroundColor: AC.secondarySystemBackground as any,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: AC.secondaryLabel as any,
                textAlign: "center",
              }}
            >
              No upcoming trains at this station
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
