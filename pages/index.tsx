import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'

export default function Home() {
  return (
    <div className="h-full flex flex-col relative">
      <div className='absolute top-0 right-0 left-0 z-50 bg-black'>
        <Header label="Home" />
        <Form placeholder="What's happening!" />
      </div>
      <div className='
        pt-[222px]
        h-screen
        overflow-hidden
        overflow-y-auto
        scrollbar-hide'>
        <PostFeed />
      </div>
    </div>
  )
}
