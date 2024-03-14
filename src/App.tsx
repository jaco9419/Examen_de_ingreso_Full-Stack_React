import { ChangeEvent, useState } from "react";
import "./App.css";

const constants = {
  SELECT_ALL: "Select All",
};

interface ICountry {
  name: string;
  checked: boolean;
}

const countriesInitialState: ICountry[] = [
  {
    name: "India",
    checked: false,
  },
  {
    name: "USA",
    checked: false,
  },
  {
    name: "France",
    checked: false,
  },
];

function App() {
  const [countries, setCountries] = useState<ICountry[]>(countriesInitialState);
  const [areAllCountriesChecked, setAreAllCountriesChecked] = useState<boolean>(false);

  const handleCountriesCheckboxOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const updatedCountriesState = getUpdatedCountriesState(event.target);
    setCountries(updatedCountriesState);
    updateSelectAllCheckbox(updatedCountriesState);
  };

  const getUpdatedCountriesState = ({ value, checked }: HTMLInputElement) => {
    const countriesStateToUpdate = [...countries];

    return countriesStateToUpdate.map((country: ICountry): ICountry => {
      if (value === constants.SELECT_ALL || value === country.name) {
        return { ...country, checked };
      }

      return country;
    });
  };

  const updateSelectAllCheckbox = (updateCountries: ICountry[]): void => {
    setAreAllCountriesChecked(
      updateCountries.every((country: ICountry): boolean => country.checked)
    );
  };

  return (
    <div className="countries-checkbox-container">
      <div>
        <input
          key={"select-all"}
          type={"checkbox"}
          id={"checkbox-select-all"}
          name={"checkbox-select-all"}
          value={constants.SELECT_ALL}
          checked={areAllCountriesChecked}
          onChange={handleCountriesCheckboxOnChange}
        />
        <label htmlFor={"checkbox-select-all"}>Select All</label>
      </div>

      {countries.map((country) => {
        return (
          <div>
            <input
              key={country.name}
              type="checkbox"
              id={`checkbox-${country.name}`}
              name={`checkbox-${country.name}`}
              value={country.name}
              checked={country.checked}
              onChange={handleCountriesCheckboxOnChange}
            />
            <label htmlFor={`checkbox-${country.name}`}>{country.name}</label>
          </div>
        );
      })}
    </div>
  );
}

export default App;
