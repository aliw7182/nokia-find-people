import Button from "@atlaskit/button";
import QuoteIcon from "@atlaskit/icon/glyph/quote";
import Editor from "@draft-js-plugins/editor";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import "@draft-js-plugins/emoji/lib/plugin.css";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import "draft-js/dist/Draft.css";
import Immutable from "immutable";
import React from "react";
import styled from "styled-components";
import { CommentsContext } from "../ChildProfile/tabs/Comments/CommentsContext";
import MentionEntry from "./MentionEntry";
import mentionsStyles from "./mentionsStyles.css";
import position from "./position";
import Toolbars from "./Toolbar";
import emojiStyles from "./emojiStyles.css";
import {
  theme,
  StyledEmojiSelectWrapper,
  GlobalStyleForEmojiSelect,
} from "./emojiStyles";

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.length > 0) {
    transform = "scaleY(1)";
    transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)";
  } else if (state.isActive) {
    transform = "scaleY(0)";
    transition = "all 0.25s cubic-bezier(.3,1,.2,1)";
  }

  return {
    transform,
    transition,
  };
};

const positionSuggestionsEmoji = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive & (props.suggestions.size > 0)) {
    transform = "scaleY(1) translateY(-100%)";
    transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)";
  } else if (state.isActive) {
    transform = "scaleY(0) translateY(-100%)";
    transition = "all 0.25s cubic-bezier(.3,1,.2,1)";
  }

  return {
    display: "block",
    transform: "scale(1) translateY(-100%)",
    transformOrigin: "1em 0% 0px",
    transition: "all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)",
  };
};

class MentionWysiwygEditor extends React.Component {
  static contextType = CommentsContext;

  constructor(props) {
    super(props);
    const { defaultValue = "", withMention = true } = props;
    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(defaultValue)),
      suggestions: [],
      suggestions2: [],
      withMention,
    };
    this.myRef = React.createRef();
    this.editorRef = React.createRef();
    this.mentions = [];
    this.mentionPlugin = createMentionPlugin({
      mentions: this.mentions,
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      positionSuggestions,
      mentionPrefix: "@",
      mentionTrigger: "@",
      supportWhitespace: true,
    });
    this.contactMentions = [];
    this.contactMentionPlugin = createMentionPlugin({
      mentions: this.contactMentions,
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      positionSuggestions,
      mentionPrefix: "#",
      mentionTrigger: "#",
      supportWhitespace: true,
    });
    this.emojiPlugin = createEmojiPlugin({
      useNativeArt: true,
      selectButtonContent: "😀",
      theme: theme,
    });
    this.blockTypeButtons = [
      {
        value: "H1",
        block: "header-one",
      },

      {
        value: "H2",
        block: "header-two",
      },

      {
        value: "H3",
        block: "header-three",
      },

      {
        value: "Blockquote",
        block: "blockquote",
      },
    ];

    this.blockRenderMap = Immutable.Map({
      "header-two": {
        element: "h2",
      },
      "header-one": {
        element: "h1",
      },
      "header-three": {
        element: "h3",
      },
      "header-four": {
        element: "h4",
      },
    });
  }

  onSearchChange = ({ value }) => {
    if (value) {
      this.setState({
        suggestions: defaultSuggestionsFilter(value, this.context.mentions),
      });
      this.props.setSuggestions &&
        this.props.setSuggestions(
          defaultSuggestionsFilter(value, this.context.mentions).length
        );
    }
  };

  onSearchChange2 = ({ value }) => {
    if (value) {
      this.setState({
        suggestions2: defaultSuggestionsFilter(value, this.context.contacts),
      });
      this.props.setSuggestions &&
        this.props.setSuggestions(
          defaultSuggestionsFilter(value, this.context.contacts).length
        );
    }
  };

  // componentDidMount() {
  //   this.editorRef.current && this.editorRef.current.focus();
  // }

  componentDidMount() {
    if (this.state.withMention) {
      this.mentions = this.context.mentions;
    }
  }

  componentDidUpdate() {
    console.log(
      convertToRaw(this.state.editorState.getCurrentContent()).blocks
    );
    this.props.setBlocks &&
      this.props.setBlocks(
        convertToRaw(this.state.editorState.getCurrentContent()).blocks
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.upd !== prevProps.upd) {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

  onChange = (editorState) => {
    let len = convertToRaw(this.state.editorState.getCurrentContent()).blocks
      .length;
    let newLen = convertToRaw(editorState.getCurrentContent()).blocks.length;
    if (
      convertToRaw(this.state.editorState.getCurrentContent()).blocks.length !==
      convertToRaw(editorState.getCurrentContent()).blocks.length
    ) {
      this.props.setBlocks &&
        this.props.setBlocks(
          convertToRaw(editorState.getCurrentContent()).blocks.length
        );
    } else if (
      convertToRaw(this.state.editorState.getCurrentContent()).blocks[len - 1]
        .type === "unstyled" &&
      (convertToRaw(editorState.getCurrentContent()).blocks[len - 1].type ===
        "ordered-list-item" ||
        convertToRaw(editorState.getCurrentContent()).blocks[len - 1].type ===
          "unordered-list-item")
    ) {
      this.props.setBlocks &&
        this.props.setBlocks(
          convertToRaw(editorState.getCurrentContent()).blocks.length + 1
        );
    } else if (
      convertToRaw(this.state.editorState.getCurrentContent()).blocks[len - 1]
        .type !== "unstyled" &&
      convertToRaw(editorState.getCurrentContent()).blocks[len - 1].type ===
        "unstyled"
    ) {
      this.props.setBlocks &&
        this.props.setBlocks(
          convertToRaw(this.state.editorState.getCurrentContent()).blocks
            .length - 1
        );
    }
    this.setState({ editorState: editorState });
    this.props.onChange(
      convertToRaw(editorState.getCurrentContent())
        .blocks.map((block) => (!block.text.trim() && "\n") || block.text)
        .join("\n"),
      convertToRaw(editorState.getCurrentContent()),
      stateToHTML(editorState.getCurrentContent())
    );
  };

  focus = () => {
    this.editor.focus();
  };

  onAddLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      console.log("handled");
      return "handled";
    }
    console.log("not-handled");
    return "not-handled";
  };

  onTab = (e) => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  onFontSizeClick = (fontSize) => {
    console.log(fontSize);
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "header-one")
    );
  };

  onOrderedPointsClick = () => {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "ordered-list-item")
    );
  };

  onBulletPointsClick = () => {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "unordered-list-item")
    );
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onStrikeThroughClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
  };

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleBlockType2 = (event) => {
    event.preventDefault();

    let block = event.currentTarget.getAttribute("data-block");
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, block));
  };

  renderBlockButton = (value, block) => {
    return (
      <Button
        key={block}
        value={value}
        data-block={block}
        onMouseDown={this.toggleBlockType2}
        appearance="subtle"
        iconBefore={value === "Blockquote" ? <QuoteIcon size="small" /> : null}
        style={{ color: "#42526E", fontWeight: "600" }}
      >
        {value === "Blockquote" ? null : value}
      </Button>
    );
  };

  suspendSuggestions = (event) => {
    if (this.props.setSuggestions !== undefined) {
      if (event.which == 13 || event.keyCode == 13) {
        this.props.setSuggestions(0);
        return false;
      }
      return true;
    }
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const MentionSuggestions2 = this.contactMentionPlugin.MentionSuggestions;
    const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
    const plugins = [
      this.mentionPlugin,
      this.emojiPlugin,
      this.contactMentionPlugin,
    ];
    // console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    // console.log(this.context);
    // console.log(this.editorRef.current?.editor);
    // this.refs.
    return (
      <EditorContainer>
        <Editors
          onClick={() => {
            this.editorRef.current && this.editorRef.current.focus();
            this.props.setSuggestions && this.props.setSuggestions(0);
          }}
          onKeyDown={(e) => this.suspendSuggestions(e)}
        >
          <div
            style={{ display: "flex", marginBottom: "1em", marginLeft: "-1em" }}
          >
            <div className="block-style-options">
              {this.blockTypeButtons.map((button) => {
                return this.renderBlockButton(button.value, button.block);
              })}
            </div>
            <Toolbars
              onUnderlineClick={this.onUnderlineClick}
              onBoldClick={this.onBoldClick}
              onItalicClick={this.onItalicClick}
              onStrikeThroughClick={this.onStrikeThroughClick}
              onAddLink={this.onAddLink}
              onBulletPointsClick={this.onBulletPointsClick}
              onOrderedPointsClick={this.onOrderedPointsClick}
              onFontSizeClick={this.onFontSizeClick}
              toggleBlockType={this.toggleBlockType}
            />
            <StyledEmojiSelectWrapper>
              <EmojiSelect
                // className={emojiStyles}
                onOpen={() => {
                  console.log("ONOPEN ON EMOJI!");
                  this.props.setSuggestions && this.props.setSuggestions(10);
                }}
                onClose={() => {
                  console.log("ONCLOSE ON EMOJI!");

                  this.props.setSuggestions && this.props.setSuggestions(0);
                }}
              />
            </StyledEmojiSelectWrapper>
          </div>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            handleKeyCommand={this.handleKeyCommand}
            ref={(editor) => (this.editorRef.current = editor)}
            blockRenderMap={this.blockRenderMap}
          />
          <EmojiSuggestions
            onSearchChange={() => {
              console.log("sds");
            }}
          />
          {this.state.withMention && (
            <>
              <MentionSuggestions
                onSearchChange={this.onSearchChange}
                suggestions={this.state.suggestions}
                entryComponent={(props) => (
                  <MentionEntry
                    ref={this.myRef}
                    {...props}
                    setSuggestions={this.props.setSuggestions}
                  />
                )}
                className={mentionsStyles.mentionSuggestions}
              />
              <MentionSuggestions2
                onSearchChange={this.onSearchChange2}
                suggestions={this.state.suggestions2}
                entryComponent={(props) => (
                  <MentionEntry
                    ref={this.myRef}
                    {...props}
                    setSuggestions={this.props.setSuggestions}
                  />
                )}
                className={mentionsStyles.mentionSuggestions}
              />
            </>
          )}
        </Editors>
      </EditorContainer>
    );
  }
}
export default MentionWysiwygEditor;

const EditorContainer = styled.div`
  padding: 0em 1em 1em 1em;
  margin: 0.5em 1em 1em 1em;
`;

const Editors = styled.div`
  border: 1px transparent solid;
  // padding: 1.5em 2em 2.75em 2em;
  font-size: 14px;
  /* letter-spacing: 1.2px; */
  border-radius: 6px;
  text-align: left;
  line-height: 1.5em;
  color: black;
`;
