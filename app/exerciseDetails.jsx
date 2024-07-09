import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Anticons from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-virtualized-view";

export default function ExerciseDetails() { // Capitalized the component name to follow convention
    const item = useLocalSearchParams();
    const router = useRouter();
    console.log('got item:', item);

    return (
        <View className="flex flex-1">
            <View className="shadow-md bg-neutral-200 rounded-b-[40px]" />
            <Image
                source={{ uri: item.gifUrl }}
                contentFit="cover"
                style={{ width: wp(100), height: wp(100) }}
                className="rounded-b-[40px]"
            />


            {/* details */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                className="mx-4 space-y-2 mt-3">
                <Text
                    style={{ fontSize: hp(3.5) }}
                    className="font-semibold text-neutral-700 tracking-wide"
                >
                    {item.name}
                </Text>
                <Text
                    style={{ fontSize: hp(2) }}
                    className=" text-neutral-700 tracking-wide"
                >
                    Equipment <Text className="font-bold text-neutral-700">
                    {item?.equipment}
                </Text>
                </Text>

                {/* Sekundäre Muskeln */}
                <Text
                    style={{ fontSize: hp(2) }}
                    className=" text-neutral-700 tracking-wide"
                >
                    Secondery Muscles <Text className="font-bold text-neutral-800">
                    {item?.secondaryMuscles}
                </Text>
                </Text>

                {/* Target */}
                <Text
                    style={{ fontSize: hp(2) }}
                    className=" text-neutral-700 tracking-wide"
                >
                    Target <Text className="font-bold text-neutral-800">
                    {item?.target}
                </Text>
                </Text>

                {/* Instructions */}
                <Text
                    style={{ fontSize: hp(3) }}
                    className=" font-semibold text-neutral-700 tracking-wide"
                >
                    Instructions:
                </Text>

                {
                    item?.instructions.split(',').map((instruction, index) => {
                        return (
                            <Text
                                key={instruction}
                                style={{ fontSize: hp(1.7) }}
                                className="text-neutral-700"
                            >
                                {instruction}
                            </Text>

                        )
                    })
                }


            </ScrollView>


        </View>
    );
}
