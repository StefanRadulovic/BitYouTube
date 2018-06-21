import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
    }
    onKeyupHandler = (event) => {

        if (event.keyCode === 13) {
            this.props.searchHandler(event.target.value)
            this.setState({
                searchInput: ''
            })


        }
    }

    onChangeHandler = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    render() {
        return (
            <div className='container search-box'>
                <input type='text' value={this.state.searchInput} onChange={this.onChangeHandler} onKeyUp={this.onKeyupHandler} />

            </div>
        )
    }
}

export default SearchBar