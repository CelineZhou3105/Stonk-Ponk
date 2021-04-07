export const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: 200,
        backgroundColor: 'white',
        padding: 10,
    }),
    control: (styles) => ({
        ...styles,
        width: 200,
        cursor: 'pointer',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: 'black',
            backgroundColor: isFocused ? 'rgba(158, 34, 255, 0.48)' : null,
            cursor: 'pointer',
        }
    }
};