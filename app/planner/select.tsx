import { RecipeItem } from "@/components/RecipeItem";
import { savePlannedRecipes } from "@/db/planner";
import { useRecipes } from "@/hooks/useRecipes";
import { colors } from "@/lib/colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import {
    FlatList,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function SelectRecipesForDay() {
    const insets = useSafeAreaInsets();

    const router = useRouter();
    const { date } = useLocalSearchParams<{ date: string }>();
    const { recipes } = useRecipes();

    const { width } = useWindowDimensions();
    const numColumns = width < 360 ? 1 : width < 700 ? 2 : 3;

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((r) => r !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: date ? `Plan for ${date}` : "Select Recipes",
                }}
            />

            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
                <FlatList
                    data={recipes}
                    numColumns={numColumns}
                    key={numColumns}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        flex: 1,
                    }}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                    }}
                    renderItem={({ item }) => {
                        const selected = selectedIds.includes(item.id);

                        return (
                            <Pressable
                                onPress={() => toggleSelect(item.id)}
                                style={{
                                    marginRight: 12,
                                    marginBottom: 14,
                                    borderRadius: 20,
                                    borderWidth: selected ? 2 : 1,
                                    borderColor: selected
                                        ? colors.accent
                                        : colors.border,
                                }}
                            >
                                {/* Reuse Recipe card visually */}
                                <RecipeItem
                                    item={item}
                                    onRemove={() => { }}
                                    onPress={() => toggleSelect(item.id)}
                                />
                            </Pressable>
                        );
                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: insets.bottom + 12, // 🔥 THIS IS THE FIX
                        paddingHorizontal: 16,
                    }}
                >
                    <Pressable
                        disabled={selectedIds.length === 0}
                        onPress={async () => {
                            if (!date) return;

                            await savePlannedRecipes(date, selectedIds);
                            console.log("Saved planner entries:", {
                                date,
                                selectedIds,
                            });

                            router.back();
                        }}

                        style={{
                            paddingVertical: 14,
                            borderRadius: 16,
                            backgroundColor: colors.accent,
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
                            {selectedIds.length > 0
                                ? `Add ${selectedIds.length} recipes`
                                : "Select recipes"}
                        </Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </>
    );
}

