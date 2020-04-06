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
                    <button
                        onClick={this.followClick}
                        className="btn "
                    >
                        Follow
                    </button>
                ) : (
                    <button onClick={this.unfollowClick} className="btn ">
                        UnFollow
                    </button>
                )}
            </div>
        );
    }
}

export default FollowProfileButton;