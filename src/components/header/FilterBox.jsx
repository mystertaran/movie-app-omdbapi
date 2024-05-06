import React, { useState } from 'react';
import styled from 'styled-components';
import  useStore  from '../../store';

const FilterBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const FilterFieldsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const FilterHeader = styled.h2`
  color: #fff;
`;


const FilterInput = styled.input`
padding-left: 10px;
font-size: 16px;
width: 200px;
height: 40px;
border-radius: 10px;
border: none;
box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
outline: none;

@media (max-width: 768px) {
    width: 150px;
}
`;

const FilterSelect = styled.select`
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); 
  outline: none;
`;

const FilterButton = styled.button`
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
border-radius: 10px;
border: none;
box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
tranisition: transform 0.3s ease;
display: flex;
align-items: center;
gap: 10px;

&:active {
    transform: scale(0.95);

}

&:disabled {
    opacity: 0.5;
    cursor: not-allowed;
};
`;

const FilterBox = () => {
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  const setSearchYear = useStore((state) => state.setSearchYear);
  const setSearchType = useStore((state) => state.setSearchType);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const handleSearch = () => {
    setSearchYear(year);
    setSearchType(type);
    setCurrentPage(1);
  };

  return (
    <FilterBoxContainer>
      <FilterHeader>Additional filters:</FilterHeader>
      <FilterFieldsContainer>
      <FilterInput
        type="number"
        placeholder="Year..."
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <FilterSelect
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </FilterSelect>
      <FilterButton onClick={handleSearch}>
        Search
      </FilterButton>
      </FilterFieldsContainer>
    </FilterBoxContainer>
  );
};

export default FilterBox;