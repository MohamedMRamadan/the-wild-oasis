import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { open, close, openId, setPosition } = useContext(MenusContext);

  const toggleHandler = (e) => {
    e.stopPropagation(); // prevent the function from being executed at bubbling phase
    console.log("click from toogle");
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(e.target);
    const positon = {
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    };
    setPosition(positon);
    openId === "" || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle onClick={toggleHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const List = ({ children, id }) => {
  const { openId, close, position } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (id !== openId) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};
const Button = ({ children, icon, onClick, disable }) => {
  const { close } = useContext(MenusContext);
  const clickHandler = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton disabled={disable || false} onClick={clickHandler}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
