import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
  OrderedListIcon,
  BulletedListIcon,
  TodoListIcon,
  InputIcon,
  HighlightIcon,
} from "outline-icons";
import { isInTable } from "prosemirror-tables";
import { EditorState } from "prosemirror-state";
import isInList from "../queries/isInList";
import isMarkActive from "../queries/isMarkActive";
import isNodeActive from "../queries/isNodeActive";
import { MenuItem } from "../types";
import baseDictionary from "../dictionary";
import {FormatUnderlined} from '@mui/icons-material'

export default function formattingMenuItems(
  state: EditorState,
  isTemplate: boolean,
  dictionary: typeof baseDictionary,
  selectionToolbarExtras?: (
    "em" |
    "underline" |
    "heading-extra" |
    "image-custom-width" |
    "image-unstyled"
  )[],
): MenuItem[] {
  const { schema } = state;
  const isTable = isInTable(state);
  const isList = isInList(state);
  const allowBlocks = !isTable && !isList;

  return [
    {
      name: "placeholder",
      tooltip: dictionary.placeholder,
      icon: InputIcon,
      active: isMarkActive(schema.marks.placeholder),
      visible: isTemplate,
    },
    {
      name: "separator",
      visible: isTemplate,
    },
    {
      name: "strong",
      tooltip: dictionary.strong,
      icon: BoldIcon,
      active: isMarkActive(schema.marks.strong),
    },
    {
      name: "em",
      tooltip: dictionary.em,
      icon: ItalicIcon,
      active: isMarkActive(schema.marks.italic),
      visible: selectionToolbarExtras?.includes("em"),
    },
    {
      name: "underline",
      tooltip: dictionary.underline,
      icon: FormatUnderlined,
      active: isMarkActive(schema.marks.underline),
      visible: selectionToolbarExtras?.includes("underline"),
    },
    {
      name: "strikethrough",
      tooltip: dictionary.strikethrough,
      icon: StrikethroughIcon,
      active: isMarkActive(schema.marks.strikethrough),
    },
    {
      name: "highlight",
      tooltip: dictionary.mark,
      icon: HighlightIcon,
      active: isMarkActive(schema.marks.highlight),
      visible: !isTemplate,
    },
    {
      name: "code_inline",
      tooltip: dictionary.codeInline,
      icon: CodeIcon,
      active: isMarkActive(schema.marks.code_inline),
    },
    {
      name: "separator",
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.heading,
      icon: Heading1Icon,
      active: isNodeActive(schema.nodes.heading, { level: 1 }),
      attrs: { level: 1 },
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading2Icon,
      active: isNodeActive(schema.nodes.heading, { level: 2 }),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading3Icon,
      active: isNodeActive(schema.nodes.heading, { level: 3 }),
      attrs: { level: 3 },
      visible: allowBlocks && selectionToolbarExtras?.includes("heading-extra"),
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading4Icon,
      active: isNodeActive(schema.nodes.heading, { level: 4 }),
      attrs: { level: 4 },
      visible: allowBlocks && selectionToolbarExtras?.includes("heading-extra"),
    },
    {
      name: "blockquote",
      tooltip: dictionary.quote,
      icon: BlockQuoteIcon,
      active: isNodeActive(schema.nodes.blockquote),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "separator",
      visible: allowBlocks || isList,
    },
    {
      name: "checkbox_list",
      tooltip: dictionary.checkboxList,
      icon: TodoListIcon,
      keywords: "checklist checkbox task",
      active: isNodeActive(schema.nodes.checkbox_list),
      visible: allowBlocks || isList,
    },
    {
      name: "bullet_list",
      tooltip: dictionary.bulletList,
      icon: BulletedListIcon,
      active: isNodeActive(schema.nodes.bullet_list),
      visible: allowBlocks || isList,
    },
    {
      name: "ordered_list",
      tooltip: dictionary.orderedList,
      icon: OrderedListIcon,
      active: isNodeActive(schema.nodes.ordered_list),
      visible: allowBlocks || isList,
    },
    {
      name: "separator",
    },
    {
      name: "link",
      tooltip: dictionary.createLink,
      icon: LinkIcon,
      active: isMarkActive(schema.marks.link),
      attrs: { href: "" },
    },
  ].filter(i => !!i);
}

// XXX: temp
const Heading4Icon = () => <span style={{color: '#fff'}}>H4</span>