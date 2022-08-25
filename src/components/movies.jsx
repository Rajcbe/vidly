import React, { Component } from 'react';
// import Like from "./common/like";
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from '../services/fakeGenreService';
import {paginate} from "../utils/paginate"
import ListGroup from './listgroup';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies:[],
        currentPage:1,
        pageSize:4,
        genres:[],
        sortColumn:{path:'title',order:'asc'}
     } ;
     componentDidMount(){
        const genres=[{_id:'',name:'All Genres'},...getGenres()];
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
     handleSort=sortColumn=>{
        
        this.setState({sortColumn});
     }
    render() { 
        const {length:count}=this.state.movies;
        const {pageSize,currentPage,selectedGenre,sortColumn,movies:allmovies}=this.state;
        if(count===0) return <p>There are no movies in db</p>;

        const filtered=selectedGenre && selectedGenre._id
        ? allmovies.filter(m=>m.genre._id===selectedGenre._id)
        :allmovies;
        const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies=paginate(sorted,currentPage,pageSize);
        return (
            <div className='row mt-4'>
                <div className="col-3">
                    <ListGroup items={this.state.genres} 
                    selectedItem={this.state.selectedGenre} 
                    onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col-9">
                <p>Showing {filtered.length} movies in database.</p>
                <MoviesTable movies={movies}
                             sortColumn={sortColumn}
                             onLike={this.handleLike}
                             onDelete={this.handleDelete}
                             onSort={this.handleSort}
                             />
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