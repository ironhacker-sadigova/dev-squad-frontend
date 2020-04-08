import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    render() {
        return (
            <div className="d-inline-block">
                {!this.props.following ? (
                   <div className="flexbtnOtherUser"> <button  type="button" className="btn btn-outline-secondary"
                        onClick={this.followClick}
                        
                    >
                        Follow
                    </button> </div>
                ) : (
                    <div className="flexbtnOtherUser"> <button onClick={this.unfollowClick} className="btn ">
                        UnFollow
                    </button></div>
                )}
            </div>
        );
    }
}

export default FollowProfileButton;