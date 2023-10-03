import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatLogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

function ScrollAbleChat({ messages }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id} style={{ display: "flex" }}>
            {isSameSender(messages, m, i, user._id) ||
              (isLastMessage(messages, i, user._id) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt={7}
                    mr={1}
                    size={"sm"}
                    cursor={"pointer"}
                    name={m.sender.name}
                    src={m.sender.pic}
                  ></Avatar>
                </Tooltip>
              ))}

            <span
              style={{
                backgroundColor:
                  m.sender._id === user._id ? "#B9f5d0" : "#BEE3F8",
                borderRadius: 20,
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                marginBottom: isSameUser(messages, m, i, user._id) ? 2 : 6,
              }}
            >
            {}
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollAbleChat;
