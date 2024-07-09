import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import React from 'react';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {bodyParts} from "../constants";
import Exercises from "../app/exercises";
import {useRouter} from "expo-router";
import { Image } from 'expo-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ExercisesList({ data }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => <ExerciseCard router={router} index={index} item={item} />}
            />
            <TouchableOpacity style={styles.button} onPress={() => router.push('../PedometerScreen')}>
                <Text style={styles.buttonText}>Go to Pedometer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

const ExerciseCard = ({ item, router, index }) => {
    return (
        <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity onPress={() => router.push({ pathname: '/exerciseDetails', params: item })} className="flex py-3 space-y-2">
                <View className="bg-neutral-200 shadow rounded-[25px]" />
                <Image
                    source={{ uri: item.gifUrl }}
                    style={{ width: wp(44), height: wp(52) }}
                    className="rounded-[25px]"
                />
                <Text
                    style={{fontSize: hp(1.7)}}
                    className="text-neutral-700 font-semibold ml-1 tracking-wide">
                    {item.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
