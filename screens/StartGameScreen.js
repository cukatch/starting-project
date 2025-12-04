import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Colors from "../constants/colors";

const MIN_NUMBER = 1;
const MAX_NUMBER = 99;
const SMALL_HEIGHT_THRESHOLD = 380;
const SMALL_MARGIN_TOP = 30;
const DEFAULT_MARGIN_TOP = 100;

function StartGameScreen({ onPickedNumber }) {
  const [enteredValue, setEnteredValue] = useState("");

  const { height } = useWindowDimensions();

  function numInputHandler(text) {
    setEnteredValue(text);
  }

  function resetInputHandler() {
    setEnteredValue("");
  }

  function confirmButtonHandler() {
    const chosenNumber = parseInt(enteredValue);

    if (
      isNaN(chosenNumber) ||
      chosenNumber < MIN_NUMBER ||
      chosenNumber > MAX_NUMBER
    ) {
      Alert.alert(
        "Invalid Number!",
        `Number has to be between ${MIN_NUMBER} and ${MAX_NUMBER}`,
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    onPickedNumber(chosenNumber);
  }

  const marginTopDistance =
    height < SMALL_HEIGHT_THRESHOLD ? SMALL_MARGIN_TOP : DEFAULT_MARGIN_TOP;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
