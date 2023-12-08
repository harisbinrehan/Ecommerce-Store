import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function CustomDropdown({ heading, items, handleFilter }) {
  const colorMap = {
    '#155724': 'Green',
    '#AAA': 'Grey',
    '#1B1E21': 'Black',
    '#231579': 'Blue',
    '#740F0F': 'Red'
  };

  const [selectedFilterText, setSelectedFilterText] = useState(heading);

  const updateSelectedFilterText = (filter) => {
    const filterName = Object.keys(filter)[0];
    const filterAction = filter[filterName];
    setSelectedFilterText(
      `${filterName}: ${colorMap[filterAction] || filterAction}`
    );
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="light">{selectedFilterText.split(':')[1] === ' none' ? selectedFilterText.split(':')[0] : selectedFilterText}</Button>

      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item
            onClick={() => {
              handleFilter({ [heading]: item, filterAction: item });
              updateSelectedFilterText({ [heading]: item });
            }}
            key={index}
          >
            {colorMap[item] || item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
