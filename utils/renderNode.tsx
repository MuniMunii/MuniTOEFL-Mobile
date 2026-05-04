import React from "react";
import { Text, View, YStack } from "tamagui";
import { TipTapNode } from "../types/Test";
// note this is ai made function
// Marks are the inline styles (bold, italic, etc.)
export const renderNode = (node: TipTapNode, index: number): any => {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      // Wrap the whole document in a Fragment or View 
      // to avoid returning a raw array, which can crash some parents.
      return (
        <React.Fragment key="root-doc">
          {node.content?.map((child: any, i: number) => renderNode(child, i)) ?? null}
        </React.Fragment>
      );

    case "heading":
      return (
        <View key={index} style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 20 - (node.attrs?.level || 1), // Adjust size based on level
              fontWeight: "bold",
            }}
          >
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </Text>
        </View>
      );

    case "paragraph":
      return (
        // Using a View/YStack for the block-level margin.
        // Nested Text components in RN don't always respect margins correctly.
        <View key={index} style={{ marginBottom: 12 }}>
          <Text>
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </Text>
        </View>
      );

    case "text": {
      if (!node.text) return null;

      let style: any = {};
      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === "bold") style.fontWeight = "bold";
          if (mark.type === "italic") style.fontStyle = "italic";
          if (mark.type === "underline") style.textDecorationLine = "underline";
        });
      }

      // Return the text as a span. 
      // If no styles exist, you could even return node.text directly, 
      // but a Text component is safer for keys.
      return (
        <Text key={index} style={style}>
          {node.text}
        </Text>
      );
    }

    default:
      // Always return null for unknown nodes to prevent "Objects are not valid" errors
      return null;
  }
};