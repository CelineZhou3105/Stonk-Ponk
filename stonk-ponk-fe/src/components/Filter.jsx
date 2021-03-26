import Select from 'react-select';
import { SubText } from '../css/Text';

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: 200,
        backgroundColor: 'white',
        padding: 10,
    }),
    control: (styles) => ({
        ...styles,
        width: 200,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: 'black',
            backgroundColor: isFocused ? 'rgba(158, 34, 255, 0.48)' : null,
        }
    }
};

// Filter for sectors
const sectorOptions = [
    { value: 'all', label: 'All' },
    { value: 'aus', label: 'Australia' },
    { value: 'us', label: 'US' },
];

// Filter for security type (ETFs, Shares)
const securityTypeOption = [
    { value: 'all', label: 'All' },
    { value: 'stock', label: 'Stocks' },
    { value: 'derivative', label: 'Deriviatives' },
    { value: 'etf', label: 'ETFs' },
];

export function onSectorChange(event, stocks) {
    if (event.value === 'all') {
        return stocks;
    }
    const filteredData = stocks.filter((stock) => stock.sector === event.value);
    return filteredData;
};

export function onSecurityChange(event, stocks) {
    if (event.value === 'all') {
        return stocks;
    }
    const filteredData = stocks.filter((stock) => stock.type === event.value);
    return filteredData;
};


function Filter(props) {
    const { setState, data } = props;

    return(
        <>  
            <SubText>SECTOR:</SubText>
            <Select styles={customStyles} options={sectorOptions} defaultValue={{ value: 'all', label: 'All' }} aria-label="Dropdown for filtering by sector." onChange={(e) => { setState(onSectorChange(e, data)) }} />
            <SubText>SECURITY TYPE:</SubText>
            <Select styles={customStyles} options={securityTypeOption} defaultValue={{ value: 'all', label: 'All' }} aria-label="Dropdown for filtering by security type." onChange={(e) => { setState(onSecurityChange(e, data)) }} />
        </>
    );
}

export default Filter;