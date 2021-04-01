import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { getAllCategories } from '../../util/apiHelper';

const queryOption = {
  staleTime: 60000,
  cacheTime: 3600000,
};

const PictureSelection: React.FC = () => {
  const { data, status } = useQuery(
    `PictureCategories`,
    () => getAllCategories('image'),
    { ...queryOption }
  );

  return (
    <>
      <NavDropdown title="Pictures" id="collasible-nav-dropdown">
        {status === 'loading' && (
          <NavDropdown.Item>Loading...</NavDropdown.Item>
        )}
        {status === 'error' && <NavDropdown.Item>Error O.o</NavDropdown.Item>}
        {status === 'success' &&
          data &&
          data.map((category) => {
            return (
              <LinkContainer to={`/pictures/${category}`}>
                <NavDropdown.Item>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavDropdown.Item>
              </LinkContainer>
            );
          })}
        {status === 'success' && data?.length === 0 && (
          <NavDropdown.Item>Nothing to see ...</NavDropdown.Item>
        )}
      </NavDropdown>
    </>
  );
};

export default PictureSelection;
