import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <View style={{ flex: 1 }}>
                <Image
                    source={require('../assets/images/welcomeLion.jpg')}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.View entering={FadeInDown.delay(100).springify()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('5'), color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
                            Best <Text style={{ color: '#ffff00' }}>Workouts</Text>
                        </Text>
                        <Text style={{ fontSize: hp('5'), color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
                            For you
                        </Text>
                    </Animated.View>

                    <View style={{ width: '100%', paddingHorizontal: wp(4), marginTop: hp(5) }}>
                        <View style={{ backgroundColor: 'rgb(255,185,15)', padding: 15, borderRadius: 20, marginBottom: hp(2.5) }}>
                            <TextInput placeholder='Email' placeholderTextColor={'white'} style={{ color: 'black' }} />
                        </View>
                        <View style={{ backgroundColor: 'rgb(255,185,15)', padding: 15, borderRadius: 20, marginBottom: hp(2.5) }}>
                            <TextInput placeholder='Password' placeholderTextColor={'white'} secureTextEntry style={{ color: 'black' }} />
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: hp('10%'), width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => router.push('/home')}
                        style={{
                            height: hp(7),
                            width: wp(80),
                            backgroundColor: 'rgb(255,185,15)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: wp('2%'),
                            borderWidth: wp('0.3%'),
                            borderColor: '#cccccc'
                        }}
                    >
                        <Text style={{ fontSize: hp('3'), color: '#ffffff', fontWeight: 'bold' }}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
