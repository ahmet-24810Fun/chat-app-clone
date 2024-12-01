import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children} : PropsWithChildren) {

    const [isReady, setIsready] = useState(false)
    const { profile} = useAuth()

    useEffect(() => {
       
      if (!profile) {
         return
      }



        const connect = async () => {
            await client.connectUser(
                {
                  id: profile.id,
                  name: profile.full_name,
                  image: supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl,
                },
                client.devToken(profile.id)
              );
              setIsready(true)
        //      const channel = client.channel('messaging', 'the_park', {
         //       name: 'The Park',
        //      });
        //      await channel.watch()
        }

        connect()

        return () => {
          if (isReady) {
            client.disconnectUser()
          }
          
            setIsready(false)
        }

    },[profile?.id])

    if (!isReady) {
       return  <ActivityIndicator></ActivityIndicator>
    }

    return (
       <OverlayProvider>
         <Chat client={client}>{ children}</Chat>
       </OverlayProvider>
    )
}