import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from "../provider/AuthProvider";

export default function RootLayout() {
    return <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
        <Slot></Slot>
        </AuthProvider>
    </GestureHandlerRootView>
}