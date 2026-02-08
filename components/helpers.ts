import { TreeNode } from "./TreeView";

export const generateId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

export const numberToLetters = (
  num: number,
  uppercase: boolean
): string => {
  let result = "";

  while (num >= 0) {
    const charCode = (num % 26) + (uppercase ? 65 : 97);
    result = String.fromCharCode(charCode) + result;
    num = Math.floor(num / 26) - 1;
  }

  return result;
};

export const getNodeName = (level: number, index: number): string => {
  if (level === 0) {
    return numberToLetters(index, true);
  }
  if (level === 1) {
    return numberToLetters(index, false);
  }
  return numberToLetters(index, false);
};

export const getPrefix = (level: number): string => {
  if (level === 0) return "";
  return "----------".repeat(level) + " ";
};

export const initialData: TreeNode[] = [
  { id: "1", name: "Level A", hasChildren: true },
];