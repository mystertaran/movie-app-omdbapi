import React, {useState} from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import  useStore  from '../../store';

const SearchBoxContainer = styled.div`
    position: relative;
`;

const SearchIcon = styled(FiSearch)`
    position: absolute;
    top: 48%;
    left: 8px;
    transform: translateY(-50%);
`;

const SearchInput = styled.input`
    padding-left: 40px;
    font-size: 16px;
    width: 200px;
    height: 40px;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    outline: none;
`;

const SearchForm = styled.form`
    display: flex;
`;



const SearchBox = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const setSearchQuery = useStore(state => state.setSearchQuery);

    const handleInput = (event) => {
        console.log('Input value:', event.target.value);
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Setting search query:', inputValue);
        setSearchQuery(inputValue)
    }



  return (
    <SearchBoxContainer>
        {!isFocused && <SearchIcon size={20} />}
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search title..." />
        </SearchForm>
    </SearchBoxContainer>
  )
}

export default SearchBox
