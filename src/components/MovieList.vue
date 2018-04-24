
<template>
    <div id='movie-list'>
        <movie-item v-for="item in filteredMovies" v-bind:movie="item.movie"></movie-item>
    </div>
</template>

<script>

import genres from '../util/genres';
import MovieItem from './MovieItem.vue'

export default{
  
        props: ['genre', 'time', 'movies'], 
        methods:{
            moviePassesGenreFilter(movie){
                if(!this.genre.length)
                {
                    return true;
                }
                else
                {
                    return this.genre.find(element => element === movie.genre)
                }
            }
        },
        computed:{
            filteredMovies(){
                return this.movies.filter(this.moviePassesGenreFilter);
            }
        },
        components:{

            MovieItem
        }

}
</script>