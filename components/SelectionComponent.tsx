import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const communitiesList = ["Asian", "Jewish"]; // Add more options as needed
const dateThemesList = ["Drinks", "Sushi", "Wine", "Pizza"]; // Add more options as needed

const SelectionComponent = () => {
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [selectedDateThemes, setSelectedDateThemes] = useState<string[]>([]);
  const maxSelections = 3; // Example limit

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else if (selectedItems.length < maxSelections) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderSelectionButtons = (
    list: string[], // list should be an array of strings
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) =>
    list.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() => toggleSelection(item, selectedItems, setSelectedItems)}
        style={[
          styles.button,
          selectedItems.includes(item) && styles.selectedButton,
        ]}
      >
        <Text style={styles.buttonText}>{item}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Communities</Text>
      <View style={styles.buttonContainer}>
        {renderSelectionButtons(
          communitiesList,
          selectedCommunities,
          setSelectedCommunities
        )}
        {selectedCommunities.length < maxSelections && (
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+ New</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>Date Themes</Text>
      <View style={styles.buttonContainer}>
        {renderSelectionButtons(
          dateThemesList,
          selectedDateThemes,
          setSelectedDateThemes
        )}
        {selectedDateThemes.length < maxSelections && (
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+ New</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E25A28",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#712C0D",
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#E25A28",
  },
  addButton: {
    // ... same as button but for the "+ New" button
  },
  buttonText: {
    color: "white",
  },
});

export default SelectionComponent;
