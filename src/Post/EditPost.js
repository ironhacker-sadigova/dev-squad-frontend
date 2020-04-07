import React, {Component} from 'react'; 

export class EditPost extends Component{

    render(){
        return (
        <div>
            <h2> Edit Post</h2>
            {this.props.match.params.postId}
        </div>
        )
    };
}


export default EditPost;