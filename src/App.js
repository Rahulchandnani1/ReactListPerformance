import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
//react dom

// Intentionally slow component rendering
const Item = React.memo(({ index, selected, handleSelectChange }) => {
  const [value, setValue] = useState(index);
  const isSelected = selected.includes(index);

  const handleOnChange = useCallback(() => {
    handleSelectChange(index);
  }, [index, handleSelectChange]);

  return (
    <div style={{ padding: "10px", border: "1px dashed #cecece" }}>
      <img src="https://m.media-amazon.com/images/I/41nl+U3GtQL._S2L250_.jpg" height="50px" />
      <input type="checkbox" checked={isSelected} onChange={handleOnChange} />
      <li>{`Item ${value}`}</li>
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(100);
  const [selected, setSelected] = useState([]);

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1000);
  }, []);

  const handleSelectChange = useCallback((index) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  }, []);

  const items = useMemo(() => {
    return [...Array(count)].map((_, index) => (
      <Item key={index} index={index} selected={selected} handleSelectChange={handleSelectChange} />
    ));
  }, [count, selected, handleSelectChange]);

  return (
    <div>
      <h1>React Performance Test</h1>
      <button onClick={handleClick}>Add 1000 Items</button>
      <ul>
        {items}
      </ul>
    </div>
  );
};
export default App;