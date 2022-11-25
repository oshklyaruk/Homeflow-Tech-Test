import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import PropertyCard from './PropertyCard';
import SearchBox from './SearchBox';

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [search, setSearch] = useState('');

  const isPropertySaved = (property) => (
    savedProperties.some((pr) => pr.property_id === property.property_id)
  )

  const filterProperties = useCallback(() => {
    let newFilteredProperties = properties;

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      newFilteredProperties = properties.filter((property) => (
        property.short_description && property.short_description.includes(trimmedSearch)));
    }

    setFilteredProperties(newFilteredProperties);
  }, [properties, search])

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleBookmarkClick = (property) => {
    const propertyIsSaved = isPropertySaved(property);

    if (propertyIsSaved) {
      setSavedProperties(savedProperties.filter((pr) => pr.property_id !== property.property_id))
    } else {
      setSavedProperties([...savedProperties, property]);
    }
  }

  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();
      const { elements } = json.result.properties;

      setProperties(elements);
    };

    fetchPropertyData();
  }, []);

  useEffect(() => {
    const searchTimeOut = setTimeout(() => filterProperties(), 500);

    return () => clearTimeout(searchTimeOut);
  }, [search, properties, filterProperties])

  return (
    <div className="container mx-auto my-5">
      <Header>
        <SearchBox
          search={search}
          handleSearchChange={handleSearchChange}
        />
      </Header>

      {
        filteredProperties.length
          ? (
            <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.property_id}
                    property={property}
                    isSaved={isPropertySaved(property)}
                    handleBookmarkClick={handleBookmarkClick}
                  />
                ))
              }
            </div>
          ) : <div className="text-center mt-5">No result found</div>
      }
    </div>
  );
}

export default App;
