import React from 'react'

import styled from 'styled-components';
import Colors from '../../utils/colors.util';

export default function Pagination({ pages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(pages + 1).keys()].slice(1);

    const nextPage = () => {
        if (currentPage !== pages) setCurrentPage(currentPage + 1);
    }
    const previousPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    return (
        <StyledPagination>
            <PaginationMenu>
                <PaginationMenuPage onClick={previousPage}>
                    Previous
                </PaginationMenuPage>
                {pageNumbers && pageNumbers.map((pageNumber) => {
                    return <PaginationMenuPage key={`page_${pageNumber}`} active={currentPage === pageNumber} onClick={setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </PaginationMenuPage>
                })}
                <PaginationMenuPage onClick={nextPage}>
                    Next
                </PaginationMenuPage>
            </PaginationMenu>
        </StyledPagination>
    )
}

const StyledPagination = styled.nav`
`;
const PaginationMenu = styled.ul`
display: flex;
justify-content: space-between;
list-style: none;
padding: 0 20px;
`;
const PaginationMenuPage = styled.li`
border-radius: 2px;
border: 1px solid ${Colors.primary};
color: ${Colors.primary};
padding: 0 10px;
`;
