import styled from "styled-components";

export const Wrapper = styled.div`
display : flex;
justify-content:space-between ;
flex-direction: column;
width: 100%;
border: 1px solid lightblue ;
border-radius: 20px;
height : 100%;
margin-top: 35px; ;


button {
    border-radius: 0 0 20px 20px ;
    color: white;
    background-color: black;

    :hover{
        color: black;
    background-color: lightgrey;
    }
}

img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    padding: 1rem;
}

div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
     height: 100%
}
`;