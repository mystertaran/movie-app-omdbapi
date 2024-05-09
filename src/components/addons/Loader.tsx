import React from "react";
import styled, { keyframes, css } from "styled-components";

interface LoaderContainerProps {
  color?: string;
  centered?: boolean;
}

interface LoaderProps {
  centered?: boolean;
  color?: string;
}

const rotate = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;
const LoaderContainer = styled.div<LoaderContainerProps>`
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 50px auto;
  position: relative;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: ${(props) => props.color || "#000"} transparent
      ${(props) => props.color || "#000"} transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
  ${(props) =>
    props.centered &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      @media (max-width: 768px) {
        top: initial;
      }
      
      @media (min-width: 769px) {
        top: 50%;
      }
    `}
`;

const Loader: React.FC<LoaderProps> = ({ centered, color }) => (
  <LoaderContainer centered={centered} color={color} />
);

export default Loader;
