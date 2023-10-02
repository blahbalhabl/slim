import { useEffect, useState } from "react"
// import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../utils/Icons";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth";
import '../styles/SearchBar.css'

const SearchBar = ({ data, fn }) => {
	const [search, setSearch] = useState('');
	const [filtered, setFiltered] = useState();
	const [unfiltered, setUnfiltered] = useState();

	const handleChange = (e) => {
		const searchTerm = e.target.value;
		setSearch((prev) => {
			return {...prev, searchTerm}
		})
		const filteredItems = data.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		data.number.includes(searchTerm)
    );
    setFiltered(filteredItems);
  };

	useEffect(() => {
		setUnfiltered(data);
	},[]);

	useEffect(() => {
		// data ? fn(unfiltered) : null
		filtered && fn(filtered)
		console.log(unfiltered)
	}, [ search ])

  return (
    <div className="Search">
      <input 
        type="text"
        id='search'
        name='search'
        className='Search__Inputbox'
        placeholder='Search Ordinance'
        onChange={handleChange}
      />
			<span>
				<FontAwesomeIcon icon={icons.search}/>
			</span>
    </div>
  )
}

export default SearchBar