import React from 'react';
import withSession from '../session/withSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE } from '../../greaphql/mutations/likeRecipe';
import { UNLIKE_RECIPE } from '../../greaphql/mutations/unlikeRecipe';
import { GET_RECIPE } from '../../queries/getRecipe';

class LikeRecipe extends React.Component {
    state = {
        liked: false,
        userName: '',
    }

    componentDidMount() {
        if (this.props.session.getCurrentUSer) {
            const { userName, favorites } = this.props.session.getCurrentUSer;
            const { _id } = this.props;
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
            this.setState({
                liked: prevLiked,
                userName
            });
        }
    }

    handleClick = (likeRecipe, unLikeRecipe) => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeRecipe, unLikeRecipe)
        )
    }

    handleLike = async (likeRecipe, unLikeRecipe) => {
        if (this.state.liked) {
            await likeRecipe().then(
                data => console.log(data)
            )
            await this.props.refetch();
        } else {
            // unlike recipe mutation
            await unLikeRecipe().then(
                data => console.log(data)
            )
        }
    }

    updateLike = (cache, { data: { likeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({
            query: GET_RECIPE,
            variables: { _id }
        })

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
            }
        })
    }

    updateUnLike = (cache, { data: { unLikeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({
            query: GET_RECIPE,
            variables: { _id }
        })

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: unLikeRecipe.likes - 1 }
            }
        })
    }

    render() {
        const { userName, liked } = this.state;
        const { _id } = this.props;
        console.log('this.props._id', this.props._id);
        return <Mutation
            mutation={UNLIKE_RECIPE}
            update={this.updateUnLike}
            variables={{ _id, userName }}
        >
            {(unLikeRecipe) => (
                <Mutation
                    mutation={LIKE_RECIPE}
                    variables={{ _id, userName }}
                    update={this.updateLike}
                >
                    {
                        (likeRecipe) => {
                            return (
                                userName && <button onClick={() => this.handleClick(likeRecipe, unLikeRecipe)}>
                                    {liked ? 'unlike' : "like"}
                                </button>
                            )
                        }
                    }
                </Mutation>
            )}
        </Mutation>
    }
}


export default withSession(LikeRecipe);