import { View, Text, StyleSheet, ProgressBarAndroid, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';

export default function PedometerScreen() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const stepGoal = 10000; // Daily step goal

    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }

            return Pedometer.watchStepCount(result => {
                setCurrentStepCount(prevCount => prevCount + result.steps);
            });
        }
    };

    useEffect(() => {
        const subscription = subscribe();
        return () => subscription;
    }, []);

    const getProgress = () => {
        return Math.min(currentStepCount / stepGoal, 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pedometer</Text>
            <Ionicons name="walk-outline" size={100} color="#4CAF50" style={styles.icon} />
            <Text style={styles.availability}>
                {isPedometerAvailable === 'true' ? "Pedometer is available" : "Pedometer is not available"}
            </Text>
            <View style={styles.infoContainer}>
                <Text style={styles.stepCount}>Steps in the last 24 hours: {pastStepCount}</Text>
                <Text style={styles.stepCount}>Current steps: {currentStepCount}</Text>
                <Text style={styles.stepGoal}>Daily Step Goal: {stepGoal}</Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={getProgress()}
                    style={styles.progressBar}
                />
            </View>
            <Text style={styles.motivation}>
                {currentStepCount >= stepGoal ? "Great job! You've reached your goal!" : "Keep going, you're doing great!"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    icon: {
        marginBottom: 20,
    },
    availability: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepCount: {
        fontSize: 20,
        color: '#333',
        marginVertical: 5,
    },
    stepGoal: {
        fontSize: 18,
        color: '#777',
        marginVertical: 5,
    },
    progressBar: {
        width: '80%',
        height: 10,
        marginTop: 10,
    },
    motivation: {
        fontSize: 22,
        color: '#4CAF50',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});
