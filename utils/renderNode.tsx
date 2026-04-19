import { Text, View } from "tamagui";

export const renderNode = (node: any, index: number): any => {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return node.content?.map(renderNode);

    case "heading":
      return (
        <Text
          key={index}
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {node.content?.map(renderNode)}
        </Text>
      );

    case "paragraph":
      return (
        <Text key={index} style={{ marginBottom: 8 }}>
          {node.content?.map(renderNode)}
        </Text>
      );

    case "text": {
      let style: any = {};

      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === "bold") style.fontWeight = "bold";
          if (mark.type === "italic") style.fontStyle = "italic";
          if (mark.type === "underline") style.textDecorationLine = "underline";
        });
      }

      return (
        <Text key={index} style={style}>
          {node.text}
        </Text>
      );
    }

    default:
      return null;
  }
};