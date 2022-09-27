import {
  TrashIcon,
  DownloadIcon,
  ReplaceIcon,
  AlignImageLeftIcon,
  AlignImageRightIcon,
  AlignImageCenterIcon,
} from "outline-icons";
import isNodeActive from "../queries/isNodeActive";
import { MenuItem } from "../types";
import baseDictionary from "../dictionary";
import { EditorState } from "prosemirror-state";
import {Slider as MuiSlider} from '@mui/material'

export default function imageMenuItems(
  state: EditorState,
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
  const isLeftAligned = isNodeActive(schema.nodes.image, {
    layoutClass: "align-left",
  });
  const isRightAligned = isNodeActive(schema.nodes.image, {
    layoutClass: "align-right",
  });
  const isUnstyled = isNodeActive(schema.nodes.image, {
    unstyled: "unstyled",
  });

  return [
    {
      name: "alignLeft",
      tooltip: dictionary.alignLeft,
      icon: AlignImageLeftIcon,
      visible: true,
      active: isLeftAligned,
    },
    {
      name: "alignCenter",
      tooltip: dictionary.alignCenter,
      icon: AlignImageCenterIcon,
      visible: true,
      active: state =>
        isNodeActive(schema.nodes.image)(state) &&
        !isLeftAligned(state) &&
        !isRightAligned(state),
    },
    {
      name: "alignRight",
      tooltip: dictionary.alignRight,
      icon: AlignImageRightIcon,
      visible: true,
      active: isRightAligned,
    },
    {
      name: "separator",
      visible: true,
    },
    {
      name: "imageCustomWidth",
      tooltip: dictionary.imageCustomWidth,
      component: Slider,
      visible: selectionToolbarExtras?.includes("image-custom-width"),
    },
    {
      name: "imageUnstyled",
      tooltip: dictionary.imageUnstyled,
      icon: ImageUnstyled,
      visible: selectionToolbarExtras?.includes("image-unstyled"),
      active: isUnstyled,
    },
    {
      name: "separator",
      visible: selectionToolbarExtras?.includes("image-custom-width") || selectionToolbarExtras?.includes("image-unstyled"),
    },
    {
      name: "downloadImage",
      tooltip: dictionary.downloadImage,
      icon: DownloadIcon,
      visible: !!fetch,
      active: () => false,
    },
    {
      name: "replaceImage",
      tooltip: dictionary.replaceImage,
      icon: ReplaceIcon,
      visible: true,
      active: () => false,
    },
    {
      name: "deleteImage",
      tooltip: dictionary.deleteImage,
      icon: TrashIcon,
      visible: true,
      active: () => false,
    },
  ];
}

const Slider = ({value, onChangeCommitted}) => {
  return (
    <MuiSlider
      onChangeCommitted={onChangeCommitted}
      defaultValue={value ? parseInt(value) : 50}
      step={10}
      min={30}
      max={70}
      sx={{ minWidth: '60px', margin: '-3px 10px'}}
    />
  )
}

// XXX: temp
const ImageUnstyled = () => <span style={{color: '#fff'}}>U</span>