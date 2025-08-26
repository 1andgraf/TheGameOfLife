import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  Modal,
  TextInput,
  Switch,
  Button,
} from "react-native";
import styles, { dark } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const MAX_BAR = 200;

const initialTasks = [
  {
    id: "1",
    name: "Drink water",
    type: "health",
    xp: 12,
    gold: 12,
    isDaily: true,
    streak: 0,
  },
  {
    id: "2",
    name: "Exercise 1h",
    type: "power",
    xp: 55,
    gold: 55,
    isDaily: true,
    streak: 0,
  },
  {
    id: "3",
    name: "Read 30 min",
    type: "intelligence",
    xp: 35,
    gold: 35,
    isDaily: true,
    streak: 0,
  },
];

const shopItems = [
  {
    id: "1",
    name: "Sword",
    cost: 500,
    characteristic: "Power 2x, XP 1.2x, Money 2x",
  },
  {
    id: "2",
    name: "Shield",
    cost: 300,
    characteristic: "Health 2x, XP 1.2x, Money 1.2x",
  },
  {
    id: "3",
    name: "Hat",
    cost: 100,
    characteristic: "Intelligence 2x, XP 1.2x, Money 1.2x",
  },
];

const spriteMap = {
  Sword: require("./assets/sprites/sword.png"),
  Shield: require("./assets/sprites/shield.png"),
  Hat: require("./assets/sprites/hat.png"),
};

export default function App() {
  const [avatar, setAvatar] = useState([]);
  const [xp, setXp] = useState(0);
  const [gold, setGold] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);
  const [currentPage, setCurrentPage] = useState("Tasks");

  // Stat bars
  const [health, setHealth] = useState({ value: 0, level: 1 });
  const [power, setPower] = useState({ value: 0, level: 1 });
  const [intelligence, setIntelligence] = useState({ value: 0, level: 1 });

  const healthAnim = useRef(new Animated.Value(health.value)).current;
  const powerAnim = useRef(new Animated.Value(power.value)).current;
  const intelligenceAnim = useRef(
    new Animated.Value(intelligence.value)
  ).current;

  useEffect(() => {
    Animated.timing(healthAnim, {
      toValue: health.value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [health.value]);
  useEffect(() => {
    Animated.timing(powerAnim, {
      toValue: power.value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [power.value]);
  useEffect(() => {
    Animated.timing(intelligenceAnim, {
      toValue: intelligence.value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [intelligence.value]);

  // XP popup
  const [xpData, setXPData] = useState(null);
  const xpAnim = useRef(new Animated.Value(0)).current;
  const xpOpacity = useRef(new Animated.Value(1)).current;

  // Modal control
  const [showModal, setShowModal] = useState(false);
  const modalOpacity = useRef(new Animated.Value(0)).current;

  // Settings modal control
  const [showSettings, setShowSettings] = useState(false);
  const settingsOpacity = useRef(new Animated.Value(0)).current;

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskXP, setNewTaskXP] = useState("");
  const [newTaskGold, setNewTaskGold] = useState("");
  const [newTaskDaily, setNewTaskDaily] = useState(false);
  const [newTaskType, setNewTaskType] = useState("health");

  const [darkTheme, setDarkTheme] = useState(false);

  // Helper to apply dark theme class conditionally
  const theme = styles; // theme always points to styles; all usages must include [theme.*, darkTheme && dark.*]

  const level = Math.floor(xp / 100) + 1;

  const openModal = () => {
    setShowModal(true);
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const openSettings = () => {
    setShowSettings(true);
    Animated.timing(settingsOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSettings = () => {
    Animated.timing(settingsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowSettings(false));
  };

  const showXP = ({ xp, x, y }) => {
    setXPData({ xp, x, y });
    xpAnim.setValue(0);
    xpOpacity.setValue(1);
    Animated.parallel([
      Animated.timing(xpAnim, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(xpOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setXPData(null));
  };

  // Rewritten increaseStat to handle large XP gains efficiently with batching and smooth animation for the final bar
  const increaseStat = (statType, amount) => {
    let stat, setStat, animRef;
    if (statType === "health") {
      stat = health;
      setStat = setHealth;
      animRef = healthAnim;
    } else if (statType === "power") {
      stat = power;
      setStat = setPower;
      animRef = powerAnim;
    } else if (statType === "intelligence") {
      stat = intelligence;
      setStat = setIntelligence;
      animRef = intelligenceAnim;
    }

    // Apply item multipliers
    let modifiedAmount = amount;
    if (statType === "power" && avatar.includes("Sword")) {
      modifiedAmount = amount * 2;
    } else if (statType === "intelligence" && avatar.includes("Hat")) {
      modifiedAmount = amount * 2;
    } else if (statType === "health" && avatar.includes("Shield")) {
      modifiedAmount = amount * 2;
    }

    // Calculate total XP to add to the stat
    let total = stat.value + modifiedAmount;
    let newLevel = stat.level;
    let fullBars = Math.floor(total / MAX_BAR);
    let remainder = total % MAX_BAR;

    // Immediately update for all full bars
    if (fullBars > 0) {
      newLevel += fullBars;
      setStat({ value: remainder, level: newLevel });
      // Instantly set the bar to full, then animate from 0 to remainder for the last bar
      // Set animRef to 0 for the new bar
      animRef.setValue(0);
      Animated.timing(animRef, {
        toValue: remainder,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      // No full bars, just animate as usual
      setStat({ value: remainder, level: newLevel });
      Animated.timing(animRef, {
        toValue: remainder,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const completeTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    // XP and gold rewards are multiplied by 2^avatar.length
    let xpGain = task.xp;
    let goldGain = task.gold;
    const multiplier = Math.pow(1.2, avatar.length);
    xpGain *= Math.round(multiplier);
    goldGain *= Math.round(multiplier);
    setXp((prev) => prev + xpGain);
    setGold((prev) => prev + goldGain);
    if (task.type) increaseStat(task.type, xpGain); // pass multiplied xp
    setTasks((prev) =>
      prev
        .map((t) =>
          t.id === taskId
            ? t.isDaily
              ? { ...t, streak: t.streak + 1 }
              : null
            : t
        )
        .filter(Boolean)
    );
  };

  const buyItem = (item) => {
    if (gold >= item.cost && !avatar.includes(item.name)) {
      setGold((prev) => prev - item.cost);
      setAvatar((prev) => [...prev, item.name]);
    }
  };

  const addTask = () => {
    if (!newTaskName) return;
    const task = {
      id: (tasks.length + 1).toString(),
      name: newTaskName,
      xp: Math.min(parseInt(newTaskXP) || 10, 1000),
      gold: Math.min(parseInt(newTaskGold) || 5, 1000),
      type: newTaskType,
      isDaily: newTaskDaily,
      streak: 0,
    };
    setTasks([...tasks, task]);
    setNewTaskName("");
    setNewTaskXP("");
    setNewTaskGold("");
    setNewTaskDaily(false);
    setNewTaskType("health");
    closeModal();
  };

  const StatBar = ({ label, stat, color, animValue }) => {
    const widthInterpolated = animValue.interpolate({
      inputRange: [0, MAX_BAR],
      outputRange: ["0%", "100%"],
    });
    return (
      <View
        style={[theme.statBarContainer, darkTheme && dark.statBarContainer]}
      >
        <Text style={[theme.statBarLabel, darkTheme && dark.statBarLabel]}>
          {label} (LvL {stat.level})
        </Text>
        <View
          style={[theme.statBarBackground, darkTheme && dark.statBarBackground]}
        >
          <Animated.View
            style={[
              theme.statBarFill,
              darkTheme && dark.statBarFill,
              { width: widthInterpolated, backgroundColor: color },
            ]}
          />
        </View>
      </View>
    );
  };

  const renderTasks = () => (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[theme.taskCard, darkTheme && dark.taskCard]}>
          <View>
            <Text style={[theme.taskName, darkTheme && dark.taskName]}>
              {item.name}
            </Text>
            <Text style={[theme.taskStreak, darkTheme && dark.taskStreak]}>
              +{item.xp} XP
            </Text>
            {item.streak > -1 && (
              <Text style={[theme.taskStreak, darkTheme && dark.taskStreak]}>
                🔥 {item.streak} streak
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={(event) => {
              const { pageX, pageY } = event.nativeEvent;
              showXP({ xp: item.xp, x: pageX, y: pageY });
              completeTask(item.id);
            }}
            style={[theme.taskSquareButton, darkTheme && dark.taskSquareButton]}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={
        <Text style={[theme.emptyText, darkTheme && dark.emptyText]}>
          No tasks left!
        </Text>
      }
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );

  // Only display shop items in avatar, not tasks.
  const renderAvatar = () => {
    // Only include avatar items that are actually shop items (i.e., exist in spriteMap)
    const avatarItems = avatar.filter((item) =>
      Object.keys(spriteMap).includes(item)
    );
    return (
      <View style={[theme.pageContainer, darkTheme && dark.pageContainer]}>
        <Text
          style={[theme.title, darkTheme && dark.title, { marginBottom: 20 }]}
        >
          Avatar
        </Text>
        {/* Avatar square at the top, like on Tasks page */}
        <View
          style={[
            theme.avatarBox,
            darkTheme && dark.avatarBox,
            {
              width: 250,
              height: 250,
              borderRadius: 12,
              backgroundColor: darkTheme ? "#14161cff" : "#f1f1f1",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 18,
              borderWidth: 1,
              borderColor: darkTheme ? "#444" : "#ddd",
              overflow: "hidden",
              alignSelf: "center",
              position: "relative",
            },
          ]}
        >
          <Image
            source={require("./assets/sprites/avatar.png")}
            style={{
              width: "70%",
              height: "70%",
              resizeMode: "contain",
              top: 10,
            }}
          />
          {avatar.includes("Sword") && (
            <Image
              source={spriteMap["Sword"]}
              style={{
                position: "absolute",
                width: 80,
                height: 80,
                left: 130,
                bottom: 60,
                resizeMode: "contain",
              }}
            />
          )}
          {avatar.includes("Shield") && (
            <Image
              source={spriteMap["Shield"]}
              style={{
                position: "absolute",
                width: 80,
                height: 80,
                right: 115,
                bottom: 45,
                resizeMode: "contain",
              }}
            />
          )}
          {avatar.includes("Hat") && (
            <Image
              source={spriteMap["Hat"]}
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                top: -20,
                left: 45,
                resizeMode: "contain",
              }}
            />
          )}
        </View>
        {/* Show bought items as cards */}
        <Text
          style={[
            theme.title,
            darkTheme && dark.title,
            { marginBottom: 10, marginTop: 15 },
          ]}
        >
          Bought Items
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {avatarItems.length > 0 ? (
            avatarItems.map((item, i) => (
              <View
                key={i}
                style={[
                  theme.avatarItemCard,
                  darkTheme && dark.avatarItemCard,
                  {
                    width: 100,
                    padding: 12,
                    margin: 6,
                    borderRadius: 12,
                    backgroundColor: darkTheme ? "#111318ff" : "#fff",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  },
                ]}
              >
                <Image
                  source={spriteMap[item]}
                  style={{ width: 50, height: 50, marginBottom: 6 }}
                />
                <Text
                  style={[
                    theme.avatarItemName,
                    darkTheme && dark.avatarItemName,
                    { fontWeight: "600", marginBottom: 4 },
                    darkTheme && { color: "#fff" },
                  ]}
                >
                  {item}
                </Text>
                <Text
                  style={[
                    theme.avatarItemCharacteristic,
                    darkTheme && dark.avatarItemCharacteristic,
                    { fontSize: 12, textAlign: "center" },
                    darkTheme && { color: "#bbb" },
                  ]}
                >
                  {shopItems.find((si) => si.name === item)?.characteristic}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[theme.subtitle, darkTheme && dark.subtitle]}>
              No items equipped
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderShop = () => (
    <View style={[theme.pageContainer, darkTheme && dark.pageContainer]}>
      <View style={[styles.shopContainer, darkTheme && dark.shopContainer]}>
        <Text style={[styles.shopHeader, darkTheme && dark.shopHeader]}>
          Shop
        </Text>

        {shopItems.map((item) => {
          const affordable = gold >= item.cost && !avatar.includes(item.name);
          const isOwned = avatar.includes(item.name);

          return (
            <View
              key={item.id}
              style={[styles.shopCard, darkTheme && dark.shopCard]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {spriteMap && spriteMap[item.name] && (
                  <Image
                    source={spriteMap[item.name]}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                )}
                <View>
                  <Text
                    style={[
                      styles.shopItemText,
                      darkTheme && dark.shopItemText,
                    ]}
                  >
                    {item.name} - {item.cost} Gold
                  </Text>
                  <Text
                    style={[
                      styles.shopItemCharacteristic,
                      darkTheme && dark.shopItemCharacteristic,
                    ]}
                  >
                    {item.characteristic}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.shopSquareButton,
                  darkTheme && dark.shopSquareButton,
                  { backgroundColor: affordable ? "#2ecc71" : "#888" },
                ]}
                onPress={() => buyItem(item)}
                disabled={!affordable}
              >
                <Ionicons
                  name={isOwned ? "checkmark-outline" : "cart-outline"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "Tasks":
        return renderTasks();
      case "Avatar":
      case "Profile": // Ensure "Profile" page shows avatar as well
        return renderAvatar();
      case "Shop":
        return renderShop();
      default:
        return renderTasks();
    }
  };

  return (
    <View style={[theme.appContainer, darkTheme && dark.appContainer]}>
      <SafeAreaView style={[theme.safeArea, darkTheme && dark.safeArea]}>
        {/* Header */}
        <View
          style={[theme.headerContainer, darkTheme && dark.headerContainer]}
        >
          <TouchableOpacity
            onPress={openSettings}
            style={[theme.settingsButton, darkTheme && dark.settingsButton]}
          >
            <Ionicons
              name="settings-outline"
              size={28}
              color={darkTheme ? "#eee" : "#6c6c6cff"}
            />
          </TouchableOpacity>
          <View
            style={[theme.statsContainer, darkTheme && dark.statsContainer]}
          >
            <View style={[theme.statItem, darkTheme && dark.statItem]}>
              <Ionicons name="flame-outline" size={20} color="#e74c3c" />
              <Text style={[theme.statText, darkTheme && dark.statText]}>
                Level {level}
              </Text>
            </View>
            <View style={[theme.statItem, darkTheme && dark.statItem]}>
              <Ionicons name="star-outline" size={20} color="#f1c40f" />
              <Text style={[theme.statText, darkTheme && dark.statText]}>
                {xp} XP
              </Text>
            </View>
            <View style={[theme.statItem, darkTheme && dark.statItem]}>
              <Ionicons name="cash-outline" size={20} color="#2ecc71" />
              <Text style={[theme.statText, darkTheme && dark.statText]}>
                {gold}
              </Text>
            </View>
          </View>
        </View>

        {/* Show avatar and stat bars in a horizontal layout on Tasks page */}
        {currentPage === "Tasks" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 8,
            }}
          >
            {/* Avatar square */}
            <View
              style={[
                {
                  width: 130,
                  height: 130,
                  borderRadius: 12,
                  backgroundColor: darkTheme ? "#14161cff" : "#eaeaeaff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 18,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: darkTheme ? "#303339ff" : "#c8c8c8ff",
                  overflow: "hidden",
                  position: "relative",
                },
              ]}
            >
              <Image
                source={require("./assets/sprites/avatar.png")}
                style={{
                  width: "80%",
                  height: "80%",
                  top: 10,
                  resizeMode: "contain",
                }}
              />
              {avatar.includes("Sword") && (
                <Image
                  source={spriteMap["Sword"]}
                  style={{
                    position: "absolute",
                    width: 45,
                    height: 45,
                    left: 70,
                    bottom: 25,
                    resizeMode: "contain",
                  }}
                />
              )}

              {avatar.includes("Shield") && (
                <Image
                  source={spriteMap["Shield"]}
                  style={{
                    position: "absolute",
                    width: 50,
                    height: 50,
                    right: 55,
                    bottom: 15,
                    resizeMode: "contain",
                  }}
                />
              )}

              {avatar.includes("Hat") && (
                <Image
                  source={spriteMap["Hat"]}
                  style={{
                    position: "absolute",
                    width: 85,
                    height: 85,
                    top: -15,
                    left: 20,
                    resizeMode: "contain",
                  }}
                />
              )}
            </View>
            {/* Stat bars and Add Task button */}
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <StatBar
                label="Health"
                stat={health}
                color="#e74c3c"
                animValue={healthAnim}
              />
              <StatBar
                label="Power"
                stat={power}
                color="#f1c40f"
                animValue={powerAnim}
              />
              <StatBar
                label="Intelligence"
                stat={intelligence}
                color="#3498db"
                animValue={intelligenceAnim}
              />
              <TouchableOpacity
                style={[
                  theme.addButton,
                  darkTheme && dark.addButton,
                  {
                    marginTop: 25,
                    marginRight: 5,
                    alignSelf: "flex-end",
                    marginBottom: 10,
                    flexDirection: "row",
                    backgroundColor: "#2ecc71",
                    borderRadius: 10,
                    padding: 6,
                    paddingLeft: 12,
                  },
                ]}
                onPress={openModal}
              >
                <Text style={{ fontSize: 16, color: "#ffffffff" }}>
                  Add Task{" "}
                </Text>
                <Ionicons name="add-circle" size={32} color="#ffffffff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {renderPage()}
      </SafeAreaView>

      {xpData && (
        <Animated.Text
          style={[
            theme.xpPopup,
            darkTheme && dark.xpPopup,
            {
              left: xpData.x - 25,
              top: xpData.y - 10,
              transform: [{ translateY: xpAnim }],
              opacity: xpOpacity,
            },
          ]}
        >{`+${xpData.xp} XP`}</Animated.Text>
      )}

      {showModal && (
        <Modal transparent visible={true} onRequestClose={closeModal}>
          <Animated.View
            style={[
              theme.modalBackground,
              darkTheme && dark.modalBackground,
              { backgroundColor: "rgba(0,0,0,0.5)", opacity: modalOpacity },
            ]}
          >
            <Animated.View
              style={[
                theme.modalContainer,
                darkTheme && dark.modalContainer,
                { opacity: modalOpacity },
              ]}
            >
              <Text
                style={[
                  theme.title,
                  darkTheme && dark.title,
                  { marginBottom: 12, marginTop: 5 },
                ]}
              >
                Add New Task
              </Text>
              <TextInput
                style={[theme.input, darkTheme && dark.input]}
                placeholder="Task Name"
                placeholderTextColor={darkTheme ? "#aaa" : undefined}
                value={newTaskName}
                onChangeText={setNewTaskName}
              />
              <TextInput
                style={[theme.input, darkTheme && dark.input]}
                placeholder="XP"
                placeholderTextColor={darkTheme ? "#aaa" : undefined}
                keyboardType="numeric"
                value={newTaskXP}
                onChangeText={setNewTaskXP}
              />
              <TextInput
                style={[theme.input, darkTheme && dark.input]}
                placeholder="Gold"
                placeholderTextColor={darkTheme ? "#aaa" : undefined}
                keyboardType="numeric"
                value={newTaskGold}
                onChangeText={setNewTaskGold}
              />

              <View style={{ marginBottom: 20, marginTop: 12 }}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "600",
                    textAlign: "center",
                    color: darkTheme ? "#fff" : "#222",
                  }}
                >
                  Task Type:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  {["health", "power", "intelligence"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setNewTaskType(type)}
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 8,
                        backgroundColor:
                          newTaskType === type
                            ? "#2ecc71"
                            : darkTheme
                            ? "#444"
                            : "#ddd",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            newTaskType === type
                              ? "#fff"
                              : darkTheme
                              ? "#eee"
                              : "#333",
                          fontWeight: "600",
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    marginRight: 8,
                    color: darkTheme ? "#fff" : undefined,
                  }}
                >
                  Daily Task
                </Text>
                <Switch value={newTaskDaily} onValueChange={setNewTaskDaily} />
              </View>

              <Button title="Add Task" onPress={addTask} />
              <Button title="Cancel" color="#888" onPress={closeModal} />
            </Animated.View>
          </Animated.View>
        </Modal>
      )}

      {showSettings && (
        <Modal transparent visible={true} onRequestClose={closeSettings}>
          <Animated.View
            style={[
              theme.modalBackground,
              darkTheme && dark.modalBackground,
              { backgroundColor: "rgba(0,0,0,0.5)", opacity: settingsOpacity },
            ]}
          >
            <Animated.View
              style={[
                theme.modalContainer,
                darkTheme && dark.modalContainer,
                { opacity: settingsOpacity },
              ]}
            >
              <Text
                style={[
                  theme.title,
                  darkTheme && dark.title,
                  { marginBottom: 20 },
                ]}
              >
                Settings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 30,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: darkTheme ? "#fff" : undefined,
                  }}
                >
                  Dark Theme
                </Text>
                <Switch
                  value={darkTheme}
                  onValueChange={setDarkTheme}
                  trackColor={{ false: "#bbb", true: "#2ecc71" }}
                  thumbColor={darkTheme ? "#222" : "#fff"}
                />
              </View>
              <Button title="Close" onPress={closeSettings} />
            </Animated.View>
          </Animated.View>
        </Modal>
      )}

      <View style={[theme.bottomPanel, darkTheme && dark.bottomPanel]}>
        {[
          { page: "Tasks", icon: "list-outline" },
          { page: "Profile", icon: "person-circle-outline" },
          { page: "Shop", icon: "cart-outline" },
        ].map(({ page, icon }) => (
          <TouchableOpacity
            key={page}
            onPress={() => setCurrentPage(page)}
            style={[theme.panelButton, darkTheme && dark.panelButton]}
          >
            <Ionicons
              style={[theme.panelIcon, darkTheme && dark.panelIcon]}
              name={icon}
              size={32}
              color={
                currentPage === page ? "#2ecc71" : darkTheme ? "#aaa" : "#888"
              }
            />
            <Text
              style={[
                theme.panelLabel,
                darkTheme && dark.panelLabel,
                {
                  color:
                    currentPage === page
                      ? "#2ecc71"
                      : darkTheme
                      ? "#aaa"
                      : "#888",
                },
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
