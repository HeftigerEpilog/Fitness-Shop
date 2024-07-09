import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Animated } from "react-native";
import { FadeInDown } from "react-native-reanimated";

export default function BodyParts() {
    const router = useRouter();
    return (
        <View style={{ marginHorizontal: 16 }}>
            <Text style={{ fontSize: hp(3), fontWeight: '600', color: '#4A5568' }}>
                Übungen
            </Text>

            <FlatList
                data={bodyParts}
                numColumns={2}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 550, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => <BodyPartCard router={router} index={index} item={item} />}
            />
        </View>
    );
}

const BodyPartCard = ({ item, router, index }) => {
    return (
        <Animated.View entering={FadeInDown.duration(400).delay(200).springify()}>
            <TouchableOpacity
                onPress={() => {
                    console.log('Button pressed', item); // Debugging log
                    router.push({ pathname: '/exercises', params: item });
                }}
                style={{ width: wp(44), height: wp(52) }}
                className="flex justify-end p-4 mb-4">
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={{ width: wp(44), height: wp(52), borderRadius: 35, position: 'absolute' }}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35, position: 'absolute', bottom: 0 }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />

                <Text
                    style={{ fontSize: hp(2.3), color: '#fff', fontWeight: '600', textAlign: 'center', marginTop: 'auto' }}
                >
                    {item?.name}
                </Text>

            </TouchableOpacity>
        </Animated.View>
    );
};
