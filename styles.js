// Dark theme variant overrides
export const dark = {
  safeArea: {
    backgroundColor: "#181a20",
  },
  appContainer: {
    backgroundColor: "#181a20",
  },
  headerContainer: {
    backgroundColor: "#181a20",
    borderBottomColor: "#454a5aff",
  },
  title: {
    color: "#f3f6fb",
  },
  subtitle: {
    color: "#b2b8c5",
  },
  sectionHeader: {
    color: "#f3f6fb",
  },
  emptyText: {
    color: "#7e8597",
  },
  taskCard: {
    backgroundColor: "#23262f",
    shadowColor: "#000",
  },
  taskName: {
    color: "#f3f6fb",
  },
  taskStreak: {
    color: "#2ecc71",
  },
  shopCard: {
    backgroundColor: "#23262f",
    shadowColor: "#000",
  },
  shopItemText: {
    color: "#f3f6fb",
  },
  shopHeader: {
    color: "#f3f6fb",
  },
  bottomPanel: {
    backgroundColor: "#23262f",
    borderTopColor: "#474d5dff",
    shadowColor: "#000",
  },
  modalContainer: {
    backgroundColor: "#23262f",
  },
  statText: {
    color: "#f3f6fb",
  },
  statBarLabel: {
    color: "#f3f6fb",
  },
  statBarBackground: {
    backgroundColor: "#313543",
  },
  input: {
    backgroundColor: "#23262f",
    color: "#f3f6fb",
    borderColor: "#414458",
  },
  shopButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  shopButtonText: {
    color: "#f3f6fb",
    fontSize: 14,
    fontWeight: "600",
  },
  shopSquareButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
  },
  shopItemCharacteristic: {
    color: "#b2b8c5",
    fontSize: 12,
  },
};
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  // Safe area container
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Android status bar
  },

  // App container
  appContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // Headers
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },

  // Task item
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 25,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  taskName: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  taskStreak: {
    fontSize: 12,
    color: "#2ecc71",
    marginTop: 2,
  },
  taskButton: {
    backgroundColor: "#2ecc71",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  taskButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  // Shop items
  shopCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  shopItemText: {
    fontSize: 16,
    color: "#222",
  },
  shopButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  shopButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  shopHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },

  // Avatar
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  avatarSprite: {
    width: 48,
    height: 48,
    margin: 6,
  },

  // XP popup
  xpPopup: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "600",
    color: "#2ecc71",
  },

  // FlatList content padding
  listContent: {
    paddingBottom: 80,
  },

  // Bottom panel (modern tab bar)
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  panelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  panelIcon: {
    width: 32,
    height: 32,
    marginBottom: 1,
  },
  panelLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginBottom: 20,
  },
  taskSquareButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#2ecc71",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  shopSquareButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.27)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  headerContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5c5ff",
    alignItems: "center",
    flexDirection: "row",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 50,
    marginRight: -25,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  statText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 4,
    fontWeight: "600",
  },

  addButton: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  // Stat bars container (for Health, Power, Intelligence)
  statBarContainer: {
    marginVertical: 6,
    width: "100%",
  },

  statBarLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },

  statBarBackground: {
    height: 14,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 7,
    overflow: "hidden",
  },

  statBarFill: {
    height: 14,
    backgroundColor: "#2ecc71", // default color, can be overridden
    borderRadius: 7,
  },
  settingsButton: {
    marginLeft: 15,
  },
  shopItemCharacteristic: {
    fontSize: 12,
    color: "#000000ff",
  },
});
