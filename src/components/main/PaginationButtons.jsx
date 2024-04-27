import React from "react";
import styled from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";


const Button = styled.button`
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
    }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const PaginationButtons = ({ currentPage, setCurrentPage, numberOfPages, disabled }) => {
  return (
    <PaginationContainer>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        <FiArrowLeft size={20}/> Prev
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={disabled || currentPage === numberOfPages}
      >
        Next <FiArrowRight size={20}/>
      </Button>
    </PaginationContainer>
  );
};

export default PaginationButtons;
