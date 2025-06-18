import React from "react";
import "../assets/contextMenu.css";

const ContextMenu = ({
  rightClickItem,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}) => {
  return (
    <div
      ref={contextMenuRef}
      className={`context-menu ${isToggled ? "visible" : ""}`}
      style={{
        top: positionY + 2 + "px",
        left: positionX + 10 + "px",
      }}
    >
      {buttons.map((button, index) => (
        <div
          key={index}
          className={`context-menu-item ${button.isDanger ? "danger" : ""}`}
          onClick={button.onClick}
        >
          {button.icon && <span className="icon">{button.icon}</span>}
          {button.text}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
