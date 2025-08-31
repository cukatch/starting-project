import { Alert, FlatList, StyleSheet, View } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBound = 1;
let maxBound = 100;

function GameScreen({ selected, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, selected);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === selected) {
      onGameOver(guessRoundsListLength + 1);
    }
  }, [currentGuess, selected, onGameOver]);

  useEffect(() => {
    minBound = 1;
    maxBound = 100;
  }, []);

  function nextGeussHandler(direction) {
    if (
      (direction === "lower" && currentGuess < selected) ||
      (direction === "higher" && currentGuess > selected)
    ) {
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

    const newRandNumber = generateRandomBetween(
      minBound,
      maxBound,
      currentGuess
    );
    setCurrentGuess(newRandNumber);
    setGuessRounds((prevGuessRounds) => [newRandNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructonProp}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGeussHandler.bind(this, "lower")}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={"white"}
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGeussHandler.bind(this, "higher")}>
              <Ionicons name="add-circle-outline" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
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
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructonProp: {
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
