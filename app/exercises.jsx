import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { bodyParts, demoExercises } from "../constants";
import { fetchExercisesByBodypart } from "../api/exerciseDB";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import ExercisesList from "../components/ExercisesList";
import { ScrollView } from "react-native-virtualized-view";

export default function Exercises() {
    const router = useRouter();
    const [exercises, setExercises] = useState();
    const item = useLocalSearchParams();
    //console.log('got item:', item);

    useEffect(() => {
        if (item) {
            getExercises(item.name);
        }
    }, [item]);

    const getExercises = async (bodyPart) => {
        let data = await fetchExercisesByBodypart(bodyPart);
        setExercises(data);
    }

    return (
        <ScrollView>
            <StatusBar style="light"/>
            <Image
                source={item.image}
                style={{ width: wp(100), height: hp(45) }}
                className="rounded-b-[40px]"
            />


            {/* exercises */}
            <View className="mx-4 space-y-3 mt-4">
                <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
                    {item.name} exercises
                </Text>
                <View className="mb-10">
                    <ExercisesList data={exercises}/>
                </View>
            </View>
        </ScrollView>
    );
}
