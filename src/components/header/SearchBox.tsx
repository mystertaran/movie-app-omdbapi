import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import useStore from "../../store";

// interface SearchIconProps {
//   size: number;
// }

// interface SearchInputProps {
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   placeholder: string;
// }

interface SearchBoxProps {
  setSearchQuery: (query: string) => void;
}

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


type HandleInput = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleSubmit = (event: FormEvent<HTMLFormElement>) => void;


const SearchBox: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {setSearchQuery, setSearchType, setSearchYear}= useStore();

  const handleInput: HandleInput = (event) => {
    // console.log('Input value:', event.target.value);
    setInputValue(event.target.value);
  };

  const handleSubmit: HandleSubmit = (event) => {
    event.preventDefault();
    // console.log('Setting search query:', inputValue);
    setSearchQuery(inputValue);
    setSearchYear("");
    setSearchType("");
  };

  return (
    <SearchBoxContainer>
      {!isFocused && <SearchIcon size={20} />}
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search title..."
        />
      </SearchForm>
    </SearchBoxContainer>
  );
};

export default SearchBox;
