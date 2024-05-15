import React from "react";
import styled from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useStore from "../../store";

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
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

interface PaginationButtonsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberOfPages: number;
  disabled: boolean;
} 


const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const hasNextPage = useStore((state) => state.hasNextPage); 

  return (
    <PaginationContainer>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiArrowLeft size={20} /> Prev
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!hasNextPage} 
      >
        Next <FiArrowRight size={20} />
      </Button>
    </PaginationContainer>
  );
};

export default PaginationButtons;
