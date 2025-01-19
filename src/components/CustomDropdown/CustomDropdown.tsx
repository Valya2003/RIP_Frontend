import {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

type DropdownProps = {
    label: string,
    options: Record<string, string>,
    selectedItem: string,
    setSelectedItem: (val:string) => void
}

const CustomDropdown = ({label, options, selectedItem, setSelectedItem}:DropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="d-flex align-items-center gap-3 w-100">
            <span>{label}</span>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="w-100" >
                <DropdownToggle color="primary"  className="w-100" caret>{options[selectedItem]}</DropdownToggle>
                <DropdownMenu className="w-100">
                    {Object.entries(options).map(([key, value]) => (
                        <DropdownItem active={key == selectedItem} key={key} onClick={() => setSelectedItem(key)}>{value}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default CustomDropdown