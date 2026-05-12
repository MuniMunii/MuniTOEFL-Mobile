import React from "react";
import { Text, View } from "react-native"; 
import { TipTapNode } from "../types/Test";

const filterNull = (nodes: (React.ReactNode)[]): React.ReactNode[] =>
  nodes.filter((n) => n !== null && n !== undefined);

const renderInline = (node: TipTapNode, index: number,textColor:string="white"): React.ReactNode => {
  if (!node) return null;

  switch (node.type) {
    case "text": {
      if (!node.text) return null;

      const style: {
        fontWeight?: "bold";
        fontStyle?: "italic";
        textDecorationLine?: "underline";
      } = {};

      node.marks?.forEach((mark:any) => {
        if (mark.type === "bold") style.fontWeight = "bold";
        if (mark.type === "italic") style.fontStyle = "italic";
        if (mark.type === "underline") style.textDecorationLine = "underline";
      });

      return (
        <Text key={index} style={{...style,color:textColor}}>
          {node.text}
        </Text>
      );
    }
    default:
      return null;
  }
};

export const renderNode = (
  node: TipTapNode,
  index: number,
  textColor:string="white"
): React.ReactNode => {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return (
        <React.Fragment key="root-doc">
          {filterNull(
            node.content?.map((child: TipTapNode, i: number) =>
              renderNode(child, i)
            ) ?? []
          )}
        </React.Fragment>
      );

    case "heading": {
      const level = node.attrs?.level ?? 1;
      const fontSize = 28 - level * 2;
        const content = Array.isArray(node.content) ? node.content : [];

      return (
        <View key={index} style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize,
              fontWeight: "bold",
              lineHeight: fontSize * 1.3,
              color:textColor
            }}
          >
            {filterNull(
              content.map((child: TipTapNode, i: number) =>
                renderInline(child, i)
              ) ?? []
            )}
          </Text>
        </View>
      );
    }

case "paragraph": {
  // Handle missing, undefined, or empty content
  const content = Array.isArray(node.content) ? node.content : [];
  const children = filterNull(
    content.map((child: TipTapNode, i: number) => renderInline(child, i))
  );
  if (children.length === 0) {
    return <View key={index} style={{ height: 12 }} />;
  }
  return (
    <View key={index} style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 16, lineHeight: 24, color:textColor }}>{children}</Text>
    </View>
  );
}

    case "bulletList":
    case "orderedList":{
        const content = Array.isArray(node.content) ? node.content : [];

      return (
        <View key={index} style={{ marginBottom: 12, paddingLeft: 16 }}>
          {filterNull(
            content.map((child: TipTapNode, i: number) =>
              renderNode(child, i)
            ) ?? []
          )}
        </View>
      );
}
    case "listItem":{
        const content = Array.isArray(node.content) ? node.content : [];

      return (
        <View key={index} style={{ flexDirection: "row", marginBottom: 4 }}>
          <Text style={{ marginRight: 8, color:textColor }}>{"•"}</Text>
          <View style={{ flex: 1 }}>
            {filterNull(
              content.map((child: TipTapNode, i: number) =>
                renderNode(child, i)
              ) ?? []
            )}
          </View>
        </View>
      );
}
    default:
      return null;
  }
};