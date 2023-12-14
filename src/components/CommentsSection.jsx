import { FocusedCommentsProvider } from "../contexts/FocusedComments"
import { ExistingComments } from "./ExistingComments"
import { PostComment } from "./PostComment"

export const CommentsSection = () => {
    return (
        <section>
            <FocusedCommentsProvider>
                <PostComment />
                <ExistingComments />
            </FocusedCommentsProvider>
        </section>
    )
}