import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const value = { show, setShow, toggle };
  return (
    <DropdownContext.Provider value={value}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
