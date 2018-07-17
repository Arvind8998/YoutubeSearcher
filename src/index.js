import _ from 'lodash';
import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';

import YtSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';



const API_KEY = 'AIzaSyA2ZoWC0yWBheT8IZ8FVk5mgY34DMDwZ38';
// Create a new component , this componenet should produce soem html

YtSearch({key : API_KEY , term : 'react js'} , function(data){
    console.log(data);
});

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            videos : [],
            selectedVideo : null
        };

      YtSearch({key : API_KEY, term : 'react js'} , (videos)=>{
        this.setState(
            {videos:videos,
             selectedVideo :videos[0]
        });
        // this.setState({videos:videos})
        this.videoSearch('react js');
      });  
    }

    videoSearch(term) {
        YtSearch({key : API_KEY, term : term} , (videos)=>{
            this.setState(
                {videos:videos,
                 selectedVideo :videos[0]
            });
            // this.setState({videos:videos})
          });
    }
 render() {
     
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return(
         <div> 
        <SearchBar onSearchTermChange = {videoSearch} />
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList 
        onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
        videos = {this.state.videos}/>
    </div>
    );
}
}

// Take the component generaqted and put it in  page (in the dom)

ReactDOM.render(<App /> , document.querySelector('.container'));