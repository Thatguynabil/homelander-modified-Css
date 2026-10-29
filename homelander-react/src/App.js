import { useState, useEffect, useRef} from "react";
import styled from "styled-components";
import "./App.css";

const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=870&auto=format&fit=crop");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
    position: relative;
  z-index: 1
`;

// Component 1: Navbar
function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">HOMELANDER</div>
      <div className="links">
        <a href="#home">HOME</a>
        <a href="#about">ABOUT</a>
        <a href="#features">FEATURES</a>
        <a href="#services">SERVICES</a>
        <a href="#contacts">CONTACT</a>
      </div>
      <button><a href="#register">REGISTER</a></button>
    </nav>
  );
}

// Component 2: HouseCard
function HouseCard({ house }) {
  return (
    <div className="house-card">
      <img src={house.img} alt={house.location} width="300" height="200" />
      <p>{house.location.toUpperCase()}</p>
      <div className="house-info">
        {house.features}<br />
        PRICE: {house.displayPrice}
      </div>
    </div>
  );
}

// Component 3: SearchForm
function SearchForm({ cityRef,cityStreet, houseType, priceInput, setCityStreet, setHouseType, setPriceInput, onSearch }) {
  return (
    <div className="container">
      <input
      ref={cityRef}
        placeholder="CITY STREET"
        value={cityStreet}
        onChange={(e) => setCityStreet(e.target.value)}
      />
      <input
        placeholder="TYPE OF HOUSE"
        value={houseType}
        onChange={(e) => setHouseType(e.target.value)}
      />
      <input
        placeholder="PRICE"
        type="number"
        value={priceInput}
        onChange={(e) => setPriceInput(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

// Component 4: SearchResults
function SearchResults({ results }) {
  return (
    <div className="search-results">
      <h2>{results.length > 0 ? `${results.length} Result(s) Found` : "No Houses Found"}</h2>
      <div className="container2">
        {results.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}

// Component 5: RecommendedSection
function RecommendedSection({ houses }) {
  return (
    <section className="recommend">
      RECOMMENDED HOUSES
      <div className="container2">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </section>
  );
}

// Component 6: Footer
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Homelander Real Estate. Built by Nabil.</p>
    </footer>
  );
}

const API_URL = "http://localhost:3001/houses";
// Custom hook: fetches houses from the API
function useHouses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setHouses(data));
  }, []);

  return houses;
}

function App() {
  
  const [cityStreet, setCityStreet] = useState("");
  const [houseType, setHouseType] = useState("")
 const cityRef = useRef(null);
  useEffect(() => {
  cityRef.current.focus();
}, []);;
  const [priceInput, setPriceInput] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);


  const handleSearch = () => {
    const filtered = houses.filter((house) => {
      const matchLocation =
        cityStreet === "" || house.location.toLowerCase().includes(cityStreet.toLowerCase());
      const matchType =
        houseType === "" || house.type.includes(houseType.toLowerCase());
      const matchPrice =
        priceInput === "" || house.price <= parseFloat(priceInput) * 1000000;
      return matchLocation && matchType && matchPrice;
    });
    setResults(filtered);
    setSearched(true);
  };
    const houses = useHouses();


  return (
    <>
      <HeroSection>
        <Navbar />
        <p className="hero-p">Get Your Dream Home</p>
        <SearchForm
        cityRef={cityRef}
          cityStreet={cityStreet}
          houseType={houseType}
          priceInput={priceInput}
          setCityStreet={setCityStreet}
          setHouseType={setHouseType}
          setPriceInput={setPriceInput}
          onSearch={handleSearch}
        />
      </HeroSection>

     
      {searched && <SearchResults results={results} />}

      <RecommendedSection houses={houses} />
      <Footer />
    </>
  );
}
  export default App;