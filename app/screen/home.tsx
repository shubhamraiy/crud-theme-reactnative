import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, Alert } from "react-native";
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedView, useTheme } from "../component/layout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import Header from "../component/header";
import { getProfileAPI } from "../api/profile";

export default function HomeScreen(props: any) {
  const { isDarkMode, setUser } = useTheme();
  const navigation: any = useNavigation();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const isFocus = useIsFocused();

  useEffect(() => {
    fetchPosts();
    getData();
  }, [isFocus]);
  const getData = async () => {
    try {
      const response: any = await getProfileAPI();
      if (response?.data) {
        setUser(response?.data);
      }
    } catch (error) {}
  };

  const fetchPosts = async (search?: string) => {
    setLoading(true);
    try {
      let url = search
        ? `https://dummyjson.com/posts/search?q=${search}`
        : "https://dummyjson.com/posts/user/5";

      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((text) => {
    fetchPosts(text);
  }, 500);

  const handleDelete = async (postId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(postId);
            try {
              await fetch(`https://dummyjson.com/posts/${postId}`, {
                method: "DELETE",
              });
              setPosts((prevPosts: any) =>
                prevPosts.filter((post: any) => post.id !== postId)
              );
            } catch (error) {
              console.error("Error deleting post:", error);
            } finally {
              setDeleting(null);
            }
          },
        },
      ]
    );
  };

  const handleUpdate = (post: any) => {
    navigation.navigate("AddUpdate", { post });
  };

  const renderItem = ({ item }: any) => (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.title}>{item.title}</ThemedText>
      <ThemedText>{item.body}</ThemedText>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdate(item)}
        >
          <ThemedText style={styles.buttonText}>Update</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
          disabled={deleting === item.id}
        >
          {deleting === item.id ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <ThemedText style={styles.buttonText}>Delete</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <Header title="My Post" {...props} />

      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        placeholderTextColor="gray"
        onChangeText={handleSearch}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddUpdate")}
      >
        <ThemedText style={styles.addButtonText}>+</ThemedText>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? "white" : "black"}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            !loading && posts.length < 1 ? (
              <ThemedView style={styles.empty}>
                <ThemedText style={styles.title}>No Posts Found.</ThemedText>
              </ThemedView>
            ) : null
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  empty: {
    alignItems: "center",
    padding: 20,
    marginTop: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
