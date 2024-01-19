import { JSONContent } from "@tiptap/core";

export function splitArrayByHorizontalRule(doc: JSONContent) {
  const array = doc.content;
  const result = [];
  let currentSection: any[] = [];

  array?.forEach((item) => {
    if (item.type === "horizontalRule") {
      if (currentSection.length > 0) {
        result.push(currentSection);
        currentSection = [];
      }
    } else {
      currentSection.push(item);
    }
  });

  if (currentSection.length > 0) {
    result.push(currentSection);
  }

  return result;
}

export function wrapChunkOfContent(chunk: any) {
  return {
    type: "doc",
    content: chunk,
  };
}
