import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton.js";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title.js";
import Card from "../components/ui/Card.js";
import InstructionText from "../components/ui/InstructionText.js";

function StartGameScreen({ onPickedNumber }) {
  const [enteredValue, setEnteredValue] = useState("");

  function numInputHandler(text) {
    setEnteredValue(text);
  }

  function resetInputHandler() {
    setEnteredValue("");
  }

  function confirmButtonHandler() {
    const choiceNumber = parseInt(enteredValue);

    if (isNaN(choiceNumber) || choiceNumber <= 0 || choiceNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    onPickedNumber(choiceNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number?</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredValue}
          onChangeText={numInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmButtonHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 60,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
