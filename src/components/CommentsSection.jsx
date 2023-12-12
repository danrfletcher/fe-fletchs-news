import { ExistingComments } from "./ExistingComments"
import { PostComment } from "./PostComment"

export const CommentsSection = () => {
    return (
        <section>
            <PostComment />
            <ExistingComments />
        </section>
    )
}