import React from 'react';
import { Stack } from 'expo-router';
import { LogBox } from 'react-native';

// Ignoriere Warnungen in der Logbox
LogBox.ignoreAllLogs(["Warning: Failed prop type"]);

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="exercises"
                options={{
                    presentation: "fullScreenModal",
                    headerShown: true, // Falls du einen Header anzeigen möchtest
                    title: "Home" // Falls du einen Titel für den Header möchtest
                }}
            />
            <Stack.Screen
                name="exerciseDetails"
                options={{ presentation: 'modal',  headerShown: true, title: "Exercises",}}
            />
            <Stack.Screen
                name="pedometer"
                options={{ headerShown: true, title: "Pedometer" }}
            />
        </Stack>
    );
}
