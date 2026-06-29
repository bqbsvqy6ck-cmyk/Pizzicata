import { Stack } from "expo-router";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import { WebView } from "react-native-webview";

export default function RootLayout() {
  if (Platform.OS !== "web") {
    return (
      <View style={{ flex: 1, backgroundColor: "#8B1A1A" }}>
        <StatusBar barStyle="light-content" backgroundColor="#8B1A1A" />
        <WebView
          source={{ uri: "https://pizzicata.vercel.app" }}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          mediaPlaybackRequiresUserAction={false}
          renderLoading={() => (
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "#F2E8D5" }}>
              <ActivityIndicator size="large" color="#8B1A1A" />
            </View>
          )}
        />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}