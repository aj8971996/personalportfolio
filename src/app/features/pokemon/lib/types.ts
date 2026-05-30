export interface PokemonEntry {
  name?: string;
  mega?: boolean;
  types: string[];
  ability: string;
  item: string;
  moves: string[];
}

export interface TreeOption {
  id: string;
  label: string;
  icon: string;
  desc: string;
  typeColor?: string;
  sample?: string[];
  mon?: string;
  fillers?: string[];
  finisherRole?: string;
  terminal?: boolean;
  next?: TreeNode;
}

export interface TreeNode {
  id: string;
  question: string;
  description: string;
  depth: number;
  options: TreeOption[];
}

export interface PathStep {
  nodeId: string;
  optionId: string;
  option: TreeOption;
  depth: number;
}

export interface SvgPos {
  x: number;
  y: number;
  label: string;
  kind: 'done' | 'sibling' | 'unexplored';
  parent: SvgPos | null;
  animated: boolean;
  isRoot: boolean;
  opt?: TreeOption;
}

export interface SvgLink {
  d: string;
  active: boolean;
}

export interface SvgNodeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SvgNodeData {
  cx: number;
  cy: number;
  rect: SvgNodeRect;
  kind: 'done' | 'sibling' | 'unexplored';
  animated: boolean;
  label: string;
  isRoot: boolean;
}

export interface SvgData {
  links: SvgLink[];
  nodes: SvgNodeData[];
}
