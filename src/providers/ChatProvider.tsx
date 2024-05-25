import { PropsWithChildren, useEffect, useState } from "react";
import { Stack, Slot } from "expo-router";
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator } from "react-native";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";


const client = StreamChat.getInstance("wc2jpch4vt6f");

export default function ChatProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false); 
    const { profile } = useAuth();
   
    useEffect(() => {
        console.log('USE EFFECT:', profile); 
        if (!profile) {
            return;
        }
        const connect = async () => {
            console.log(profile.id);

            await client.connectUser(
                {
                    id: profile.id,
                    name: profile.full_name,
                    image: supabase.storage
                        .from('avatars')
                        .getPublicUrl(profile.avatar_url).data.publicUrl,
                },
                client.devToken(profile.id),
            );
            setIsReady(true);
            
            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });
            
            // await channel.watch();

        };

        connect();

        return () => {
            if (isReady) {
                client.disconnectUser();               
            }
            setIsReady(false);
        };
    }, [profile?.id]);

    if (!isReady) {
        return <ActivityIndicator />;
    }
    
    return (
        <OverlayProvider>
            <Chat client={client}>{children}</Chat>           
        </OverlayProvider>


    )
}