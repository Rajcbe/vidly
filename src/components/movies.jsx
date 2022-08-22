import React, { Component } from 'react';
import Like from "./common/like";
import Pagination from './common/pagination';
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from '../services/fakeGenreService';
import {paginate} from "../utils/paginate"
import List from './listgroup';

class Movies extends Component {
    state = { 
        movies:[],
        currentPage:1,
        pageSize:4,
        genres:[]
     } ;
     componentDidMount(){
        const genres=[{name:'All Genres'},...getGenres()];
        this.setState({movies:getMovies(),genres:genres})
     }
     handleDelete=(movie)=>{
            const movies=this.state.movies.filter(deleteId=>deleteId._id !==movie._id);
            this.setState({movies});
     }
     handleLike=(movie)=>{
        console.log('click like');
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        console.log(index);
        movies[index]={...movies[index]};
        console.log( movies[index]);
        movies[index].liked= !movies[index].liked;
        this.setState({movies});
     }
     handlePageChange=page=>{
        this.setState({currentPage:page});
     }
     handleGenreSelect=(genre)=>{
            this.setState({selectedGenre:genre,currentPage:1})
     }
    render() { 
        const {length:count}=this.state.movies;
        const {pageSize,currentPage,selectedGenre,movies:allmovies}=this.state;
        if(count===0) return <p>There are no movies in db</p>;

        const filtered=selectedGenre && selectedGenre._id
        ? allmovies.filter(m=>m.genre._id===selectedGenre._id)
        :allmovies;
        const movies=paginate(filtered,currentPage,pageSize);
        return (
            <div className='row mt-4'>
                <div className="col-3">
                    <List items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col-9">
                <p>Showing {filtered.length} movies in database.</p>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                         {movies.map(movie=><tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/></td>
                            <td><button onClick={() => this.handleDelete(movie)} className='btn btn-danger btn-sm'>Delete</button></td>
                         </tr>)
                        }
                    </tbody>
                </table>
                <Pagination itemsCount={filtered.length} 
                pageSize={pageSize} 
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
                </div>
            </div>
        )
    }
}
 
export default Movies;