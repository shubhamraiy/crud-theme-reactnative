import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ThemedText, ThemedView, useTheme } from "../component/layout";
import Header from "../component/header";
import { addPostAPI, updatePostAPI } from "../api/post";

export default function AddPostScreen(props: any) {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useTheme();

  const post = props?.route?.params?.post || null;

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
    }
  }, [post]);

  const handleSavePost = async (data: any) => {
    if (!data.title.trim() || !data.body.trim()) return;
    setLoading(true);

    try {
      if (post) {
        const response = await updatePostAPI(post.id, {
          title: data.title,
          body: data.body,
        });
        console.log("Post updated:", response?.data);
        alert("Post updated successfully");
      } else {
        // Add new post
        const response = await addPostAPI({
          title: data.title,
          body: data.body,
          userId: user?.id,
        });
        console.log("Post added:", response?.data);
        alert("Post added successfully");
      }

      props?.navigation?.goBack();
      reset();
    } catch (error) {
      console.error("Error saving post:", error);
    }

    setLoading(false);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <Header
        title={post ? "Update Post" : "Add Post"}
        goBack
        style={{ margin: 20 }}
        {...props}
      />

      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>Enter Post Title</ThemedText>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Type your post title..."
              />
              {error && (
                <ThemedText style={styles.errorText}>
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />

        <ThemedText style={styles.label}>Enter Post Body</ThemedText>
        <Controller
          control={control}
          name="body"
          defaultValue=""
          rules={{ required: "Body is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Type your post body..."
                multiline
              />
              {error && (
                <ThemedText style={styles.errorText}>
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleSavePost)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>
              {post ? "Update Post" : "Add Post"}
            </ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
