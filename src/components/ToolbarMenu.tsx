import * as React from "react";
import { EditorView } from "prosemirror-view";
import styled, { withTheme } from "styled-components";
import ToolbarButton from "./ToolbarButton";
import ToolbarSeparator from "./ToolbarSeparator";
import theme from "../styles/theme";
import { MenuItem } from "../types";

type Props = {
  tooltip: typeof React.Component | React.FC<any>;
  commands: Record<string, any>;
  view: EditorView;
  theme: typeof theme;
  items: MenuItem[];
};

const FlexibleWrapper = styled.div`
  display: flex;
`;

class ToolbarMenu extends React.Component<Props> {
  render() {
    const { view, items } = this.props;
    const { state } = view;
    const Tooltip = this.props.tooltip;

    return (
      <FlexibleWrapper>
        {items.map((item, index) => {
          if (item.name === "separator" && item.visible !== false) {
            return <ToolbarSeparator key={index} />;
          }
          if (item.visible === false || (!item.icon && !item.component)) {
            return null;
          }
          const Icon = item.icon;
          const Component = item.component;
          const isActive = item.active ? item.active(state) : false;

          return (
            Component ?
            // TODO(mime): this is a crap interface for now to test out at least one feature.
            <Component key={index} onChangeCommitted={(event: Event, newValue: number | number[]) =>
              item.name && this.props.commands[item.name](newValue)
            } value={state.selection.node?.attrs?.width?.replace('width-', '')} /> :
              <ToolbarButton
                key={index}
                onClick={() =>
                  item.name && this.props.commands[item.name](item.attrs)
                }
                active={isActive}
              >
                <Tooltip tooltip={item.tooltip} placement="top">
                  <Icon color={this.props.theme.toolbarItem} style={{fill: "#fff"}} />
                </Tooltip>
              </ToolbarButton>
            );
        })}
      </FlexibleWrapper>
    );
  }
}

export default withTheme(ToolbarMenu);
