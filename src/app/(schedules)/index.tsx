import { ScrollView, View, Text, Pressable } from "react-native";
import { useState } from "react";
import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import { getTripsByDirection } from "@/data/schedules";
import { getStationName } from "@/data/stations";
import { formatTime, getCurrentTime, isAfterTime } from "@/utils/time";
import { Direction, TripType } from "@/types/caltrain";

export default function SchedulesRoute() {
  const [direction, setDirection] = useState<Direction>("SB");
  const [filterType, setFilterType] = useState<TripType | "All">("All");

  const currentTime = getCurrentTime();
  const trips = getTripsByDirection(direction).filter(
    (trip) => filterType === "All" || trip.type === filterType
  );

  const upcomingTrips = trips.filter((trip) =>
    isAfterTime(trip.stops[0].departureTime, currentTime)
  );

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: AC.systemBackground as any }}
    >
      <View style={{ padding: 16, gap: 16 }}>
        {/* Direction Toggle */}
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground as any,
            borderRadius: 12,
            borderCurve: "continuous",
            padding: 4,
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Pressable
            onPress={() => setDirection("SB")}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              borderCurve: "continuous",
              backgroundColor:
                direction === "SB"
                  ? (AC.systemBackground as any)
                  : "transparent",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: direction === "SB" ? "600" : "400",
                color: AC.label as any,
              }}
            >
              Southbound
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setDirection("NB")}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              borderCurve: "continuous",
              backgroundColor:
                direction === "NB"
                  ? (AC.systemBackground as any)
                  : "transparent",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: direction === "NB" ? "600" : "400",
                color: AC.label as any,
              }}
            >
              Northbound
            </Text>
          </Pressable>
        </View>

        {/* Filter by Type */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {(["All", "Local", "Limited", "Express"] as const).map((type) => (
            <Pressable
              key={type}
              onPress={() => setFilterType(type)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                borderCurve: "continuous",
                backgroundColor:
                  filterType === type
                    ? (AC.systemBlue as any)
                    : (AC.secondarySystemBackground as any),
              }}
            >
              <Text
                style={{
                  color:
                    filterType === type
                      ? "#FFFFFF"
                      : (AC.label as any),
                  fontWeight: filterType === type ? "600" : "400",
                }}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Trip List */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: AC.label as any,
            }}
          >
            {upcomingTrips.length > 0 ? "Upcoming Trains" : "No Upcoming Trains"}
          </Text>

          {upcomingTrips.map((trip) => {
            const firstStop = trip.stops[0];
            const lastStop = trip.stops[trip.stops.length - 1];
            const typeColor =
              trip.type === "Express"
                ? AC.systemRed
                : trip.type === "Limited"
                ? AC.systemOrange
                : AC.systemGreen;

            return (
              <Link
                key={trip.id}
                href={`/(schedules)/trip/${trip.id}`}
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
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
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
                      <View
                        style={{
                          backgroundColor: AC.tertiarySystemBackground as any,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 6,
                          borderCurve: "continuous",
                        }}
                      >
                        <Text
                          style={{
                            color: AC.secondaryLabel as any,
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          {trip.type}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ gap: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: AC.secondaryLabel as any,
                            marginBottom: 4,
                          }}
                        >
                          Departs
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: AC.label as any,
                            fontVariant: ["tabular-nums"],
                          }}
                        >
                          {formatTime(firstStop.departureTime)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: AC.secondaryLabel as any,
                            marginTop: 2,
                          }}
                        >
                          {getStationName(firstStop.stationId)}
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          paddingHorizontal: 16,
                        }}
                      >
                        <Text style={{ fontSize: 24, color: AC.tertiaryLabel as any }}>
                          →
                        </Text>
                      </View>

                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: AC.secondaryLabel as any,
                            marginBottom: 4,
                          }}
                        >
                          Arrives
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: AC.label as any,
                            fontVariant: ["tabular-nums"],
                          }}
                        >
                          {formatTime(lastStop.arrivalTime)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: AC.secondaryLabel as any,
                            marginTop: 2,
                            textAlign: "right",
                          }}
                        >
                          {getStationName(lastStop.stationId)}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: AC.tertiaryLabel as any,
                        }}
                      >
                        {trip.stops.length} stops
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
