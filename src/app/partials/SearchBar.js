import React from 'react';
import './SearchBar.css';
import { debounce } from 'lodash'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
        this.searchHandler = debounce(this.searchHandler, 500)
    }
    // onKeyupHandler = (event) => {

    //     if (event.keyCode === 13) {
    //         this.props.searchHandler(event.target.value)
    //         this.setState({
    //             searchInput: ''
    //         })


    //     }
    // }

    searchHandler = (searchInput) => {
        this.props.searchHandler(searchInput)
    }
    onChangeHandler = (event) => {
        this.searchHandler(event.target.value)

        this.setState({
            searchInput: event.target.value
        });

    }

    render() {
        return (
            <div className='search-box'>
                <input type='text' value={this.state.searchInput} onChange={this.onChangeHandler} placeholder="Search videos" />

            </div>
        )
    }
}

export default SearchBar