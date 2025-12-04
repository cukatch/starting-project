import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

const MIN_BOUNDARY = 1;
const MAX_BOUNDARY = 100;
const NARROW_SCREEN_WIDTH = 500;
const ICON_SIZE = 24;
const ICON_COLOR = "white";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

let minBound = MIN_BOUNDARY;
let maxBound = MAX_BOUNDARY;

function GameScreen({ selected, onGameOver }) {
  const initialGuess = generateRandomBetween(
    MIN_BOUNDARY,
    MAX_BOUNDARY,
    selected
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width } = useWindowDimensions();
  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (currentGuess === selected) {
      onGameOver(guessRoundsListLength);
    }
  }, [currentGuess, selected, onGameOver, guessRoundsListLength]);

  useEffect(() => {
    minBound = MIN_BOUNDARY;
    maxBound = MAX_BOUNDARY;
  }, []);

  const nextGuessHandler = useCallback(
    (direction) => {
      const isInvalidLower = direction === "lower" && currentGuess < selected;
      const isInvalidHigher = direction === "higher" && currentGuess > selected;

      if (isInvalidLower || isInvalidHigher) {
        Alert.alert("Don't lie!", "You know this was wrong...", [
          { text: "Sorry!", style: "cancel" },
        ]);
        return;
      }

      if (direction === "lower") {
        maxBound = currentGuess;
      } else {
        minBound = currentGuess + 1;
      }

      const newRandomNumber = generateRandomBetween(
        minBound,
        maxBound,
        currentGuess
      );
      setCurrentGuess(newRandomNumber);
      setGuessRounds((prevGuessRounds) => [
        newRandomNumber,
        ...prevGuessRounds,
      ]);
    },
    [currentGuess, selected]
  );

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons
                name="remove-circle-outline"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons
                name="add-circle-outline"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width < NARROW_SCREEN_WIDTH) {
    content = (
      <>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons
                name="remove-circle-outline"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <Ionicons
                name="add-circle-outline"
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GameScreen;
