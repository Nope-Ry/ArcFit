import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemedText } from './ThemedText';
import { useNavigation } from "@react-navigation/native";
import { CartContext } from '@/components/CartContext';

const { width } = Dimensions.get('window');

export default function Cart() {
    const navigation = useNavigation();
    const {cart} = useContext(CartContext);
    if(cart.length !== 0) {
    return (
        <TouchableOpacity 
            style={styles.cartContainer} 
            onPress={() => {
                
                navigation.navigate("training");}}
        >
            <Icon name="cart" size={width*0.1} color="#fff" />
            {(
            <View style={styles.cartBadge}>
                <ThemedText type="defaultBold" style={{color:'#fff'}}>{cart.length}</ThemedText>
            </View>
            )}
        </TouchableOpacity>
    );}
}

const styles = StyleSheet.create({
    cartContainer: {
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        right: 20,
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: '#27272a',
        borderRadius: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#ff6347',
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        },
});