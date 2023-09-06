'use client'

import Form from '@/components/Form'
import Header from '@/components/Header'
import CommentFeed from '@/components/posts/CommentFeed'
import PostItem from '@/components/posts/PostItem'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'

const PostView = () => {
  const router = useRouter()

  const { postId } = router.query

  console.log('Post id: ', postId)

  const { data: fetchedPost, isLoading } = usePost(postId as string)

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={80} color="lightblue" />
      </div>
    )
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView
