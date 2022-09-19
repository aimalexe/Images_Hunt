import React, { Component } from 'react';
import axios from 'axios';
import '../sass/css/custom.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './ImageHunt.css';


class ImagesHunt extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchKeyWord : '',
            results :[] ,
        }
    }
    async handleSubmit(event){
        event.preventDefault();
        const searchTerm = this.state.searchKeyWord;
        const key = "_6BxmIaoA4_E59wZFWYzf_2cfbVSZo7S-QMrnuDcLJE";
        const {data}= await axios.get(`https://api.unsplash.com/search/photos?client_id=${key}&query=${searchTerm}`);
        this.setState({
            results : data.results
        })
        console.log(data);
        //console.log(data.results.urls.small);
        console.log(data.results.alt_description);

    }
    handleChange(event){
        this.setState({
            searchKeyWord: event.target.value,
        })
    }

  render() {
    return (
      <div 
        className='container text-center mt-3'
        id='parentDiv'
      >
        <form onSubmit={ this.handleSubmit }>
            <div className='row bg-santhra'>
                <div className='col-4 m-2'>
                    <input 
                        type = 'text'
                        id = 'searchBox'
                        name = 'searchBox'
                        placeholder='Type Target To Hunt ...'
                        onChange = { this.handleChange }
                        value = { this.state.searchKeyWord }
                        className = 'form-control py-2'
                    />
                </div>
                <div className='col-2 m-2'>
                    <button
                        id = 'searchButton'
                        name = 'searchButton'
                        type='submit'
                        className='btn btn-outline-info py-2'
                    ><i className="bi bi-binoculars-fill"></i> Search
                    </button>
                </div>
            </div>
        </form>
        <div className='mt-3 p-3 bg-image' id='imagesContainer'>
            {
                this.state.results.map(eachImage => {
                    return <img 
                                src={eachImage.urls.small}
                                alt={eachImage.alt_description}
                                key={eachImage.id}
                                width='300vw'
                                height='300vh'
                                className='m-1'
                            />
                })
            }
        </div>
      </div>
    )
  }
}
export default ImagesHunt;