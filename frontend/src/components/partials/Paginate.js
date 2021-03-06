import React from 'react';
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, isAdmin = false, keyword = "", display = "", root = "page" }) {

    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => {

                return (
                    <LinkContainer
                        to={!isAdmin
                            ? keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/${root}/${x + 1}`
                            : `/admin/${display}/${x + 1}`}
                        key={x + 1} >

                        <Pagination.Item active={x + 1 === page} >{x + 1}</Pagination.Item>

                    </LinkContainer>
                )
            }
            )}
        </Pagination>
    )
}

export default Paginate;
