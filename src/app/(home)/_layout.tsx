import { useAuth } from "@/src/provider/AuthProvider";
import ChatProvider from "@/src/provider/ChatProvider";
import { Redirect, Slot, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';






export default function HomeLayout() {
   
    const { user } = useAuth()

   if (!user) {
    return <Redirect href={"/(auth)/login"} />
   }

    return (
        
            <ChatProvider>
            <Stack> 
             <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>    
            </Stack> 
            </ChatProvider>
        
    )
          
}