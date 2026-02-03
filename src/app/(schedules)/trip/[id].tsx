import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { getTripById } from "@/data/schedules";
import { getStationName } from "@/data/stations";
import { formatTime, getCurrentTime, isAfterTime, getTimeDifferenceMinutes } from "@/utils/time";

export default function TripDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTripById(id);

  if (!trip) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: AC.systemBackground as any }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: AC.label as any }}>Trip not found</Text>
        </View>
      </ScrollView>
    );
  }

  const currentTime = getCurrentTime();
  const typeColor =
    trip.type === "Express"
      ? AC.systemRed
      : trip.type === "Limited"
      ? AC.systemOrange
      : AC.systemGreen;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: AC.systemBackground as any }}
    >
      <View style={{ padding: 16, gap: 20 }}>
        {/* Trip Header */}
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
                backgroundColor: typeColor as any,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 10,
                borderCurve: "continuous",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                  fontSize: 24,
                }}
              >
                {trip.name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: AC.label as any,
                }}
              >
                {trip.type}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: AC.secondaryLabel as any,
                }}
              >
                {trip.direction === "NB" ? "Northbound" : "Southbound"}
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

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: AC.secondaryLabel as any,
                  marginBottom: 4,
                }}
              >
                First Stop
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: AC.label as any,
                }}
              >
                {getStationName(trip.stops[0].stationId)}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: AC.secondaryLabel as any,
                  marginBottom: 4,
                }}
              >
                Last Stop
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: AC.label as any,
                }}
              >
                {getStationName(trip.stops[trip.stops.length - 1].stationId)}
              </Text>
            </View>
          </View>
        </View>

        {/* Stops Timeline */}
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: AC.label as any,
              marginBottom: 8,
            }}
          >
            All Stops
          </Text>

          {trip.stops.map((stop, index) => {
            const isFirst = index === 0;
            const isLast = index === trip.stops.length - 1;
            const isPassed = !isAfterTime(stop.departureTime, currentTime);
            const nextStop = index < trip.stops.length - 1 ? trip.stops[index + 1] : null;
            const travelTime = nextStop
              ? getTimeDifferenceMinutes(stop.departureTime, nextStop.arrivalTime)
              : 0;

            return (
              <View key={`${stop.stationId}-${index}`}>
                <View
                  style={{
                    backgroundColor: AC.secondarySystemBackground as any,
                    borderRadius: 12,
                    borderCurve: "continuous",
                    padding: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                    opacity: isPassed ? 0.5 : 1,
                  }}
                >
                  {/* Timeline Indicator */}
                  <View style={{ alignItems: "center", width: 24 }}>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: isFirst || isLast
                          ? (typeColor as any)
                          : (AC.systemFill as any),
                        borderWidth: isFirst || isLast ? 0 : 2,
                        borderColor: AC.tertiarySystemFill as any,
                      }}
                    />
                  </View>

                  {/* Stop Info */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: AC.label as any,
                        marginBottom: 4,
                      }}
                    >
                      {getStationName(stop.stationId)}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        Arr: {formatTime(stop.arrivalTime)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as any,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        Dep: {formatTime(stop.departureTime)}
                      </Text>
                    </View>
                  </View>

                  {/* Status Badge */}
                  {isPassed && (
                    <View
                      style={{
                        backgroundColor: AC.tertiarySystemFill as any,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 6,
                        borderCurve: "continuous",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: AC.tertiaryLabel as any,
                          fontWeight: "600",
                        }}
                      >
                        Passed
                      </Text>
                    </View>
                  )}
                </View>

                {/* Travel Time */}
                {!isLast && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 28,
                      paddingVertical: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 2,
                        height: 20,
                        backgroundColor: AC.systemFill as any,
                        marginRight: 12,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: AC.tertiaryLabel as any,
                        fontStyle: "italic",
                      }}
                    >
                      {travelTime} min
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
