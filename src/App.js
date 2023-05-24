import React, { useState } from "react";
import Fuse from "fuse.js";
import "./App.css";

// Test data we'll be making searchable in the demo
const initialData = [
  { name: "John Doe", age: 25, email: "johndoe@example.com" },
  { name: "Jane Doe", age: 30, email: "janedoe@example.com" },
  { name: "Bob Smith", age: 35, email: "bobsmith@example.com" },
  { name: "Alice Johnson", age: 40, email: "alicejohnson@example.com" },
];

function App() {
  const [searchResults, setSearchResults] = useState(initialData);
  
  const options = {
    includeScore: true,
    keys: ["name", "email"],
  };

  const fuse = new Fuse(initialData, options);
  
  const handleSearch = (event) => {
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      setSearchResults(initialData);
      return;
    }

    const results = fuse.search(value).map((result) => result.item);
    console.log("results:", results)
    setSearchResults(results);
  };

  return (
    <div className="App">
      <h1>Real-Time Search with Fuse.js in React</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
