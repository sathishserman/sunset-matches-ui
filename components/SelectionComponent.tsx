import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SelectionComponentProps = {
  communitiesList: string[];
  dateThemesList: string[];
  initialSelectedCommunities: string[];
  initialSelectedDateThemes: string[];
  onSave: (
    selectedCommunities: string[],
    selectedDateThemes: string[]
  ) => Promise<void>;
};

const SelectionComponent: React.FC<SelectionComponentProps> = ({
  communitiesList,
  dateThemesList,
  initialSelectedCommunities,
  initialSelectedDateThemes,
  onSave,
}) => {
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(
    initialSelectedCommunities
  );
  const [selectedDateThemes, setSelectedDateThemes] = useState<string[]>(
    initialSelectedDateThemes
  );

  const maxSelections = 3;

  const toggleSelection = async (
    item: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
    isCommunity: boolean
  ) => {
    let newSelectedItems;
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter((i) => i !== item);
    } else if (selectedItems.length < maxSelections) {
      newSelectedItems = [...selectedItems, item];
    } else {
      return; // max selections reached, do nothing
    }

    setSelectedItems(newSelectedItems); // This updates the state optimistically

    // Now, await the save operation after the state update to ensure we have the latest state.
    if (isCommunity) {
      await onSave(newSelectedItems, selectedDateThemes); // Use the latest date themes state
    } else {
      await onSave(selectedCommunities, newSelectedItems); // Use the latest communities state
    }
  };

  console.log("Initially selected communities", initialSelectedCommunities);

  const renderSelectionButtons = (
    list: string[],
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    isCommunity: boolean = false
  ) =>
    list.map((item) => {
      //   console.log(item);
      return (
        <TouchableOpacity
          key={item}
          onPress={() =>
            toggleSelection(item, selectedItems, setSelectedItems, isCommunity)
          }
          style={[
            styles.button,
            selectedItems.includes(item) && styles.selectedButton,
          ]}
        >
          <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
      );
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Communities</Text>
      <View style={styles.buttonContainer}>
        {renderSelectionButtons(
          communitiesList,
          selectedCommunities,
          setSelectedCommunities,
          true
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
  addButton: {},
  buttonText: {
    color: "white",
  },
});

export default SelectionComponent;
