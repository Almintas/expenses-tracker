import styled from "styled-components"

const InputStyled = styled.input`
`;

export const Input = ({ ...props }) => {
    return <InputStyled {...props} />
}