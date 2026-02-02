import { colors } from "@/lib/colors";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Planner() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = selectedDate
    ? {
        [selectedDate]: {
          selected: true,
          selectedColor: colors.accent,
        },
      }
    : {};

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={markedDates}
      />

      <Pressable
        disabled={!selectedDate}
        onPress={() =>
          router.push({
            pathname: "/planner/select",
            params: { date: selectedDate },
          })
        }
        style={{
          marginTop: 20,
          paddingVertical: 16,
          borderRadius: 16,
          backgroundColor: selectedDate
            ? colors.accent
            : colors.border,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {selectedDate
            ? `Plan meals for ${selectedDate}`
            : "Select a date first"}
        </Text>
      </Pressable>
    </View>
  );
}
