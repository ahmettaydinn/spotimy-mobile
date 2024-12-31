import React, { useRef } from "react";
import { Text, Button, Dimensions, View, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";

const { height } = Dimensions.get("window");

export default function Drawer() {
  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <>
      <Button
        style={styles.openButton}
        title="Open Action Sheet"
        onPress={openActionSheet}
      />
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          height: height,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        gestureEnabled={true}
      >
        <View>
          <Text style={{ fontSize: 24, color: 'black' }}>
            Hi, I am hereldfkglşdfkglşfdkglşfdkglşfdkşckvblşvckbşlvcblvcblşvcblşvclcvkblcşvkblcşvbklşvckblşvcbkşlvc.
          </Text>
        </View>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  openButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1DB954', 
    borderRadius: 5, 
  },
});
