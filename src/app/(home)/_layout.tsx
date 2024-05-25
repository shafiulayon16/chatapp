import { Redirect, Stack } from "expo-router";
import { StreamChat } from 'stream-chat';
import ChatProvider from '../../providers/ChatProvider';
import { useAuth } from '../../providers/AuthProvider';

export default function HomeLayout() {
    const { user } = useAuth() ;

    if (!user) {
        return <Redirect href="/(auth)/login" />
    }

    return (
        
                <ChatProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                    </ChatProvider>
               
       
    );
        
}