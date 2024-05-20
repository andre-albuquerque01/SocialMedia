import Image from 'next/image'
import { FormatData } from '@/functions/formatData'
import Link from 'next/link'
import { ShowUser, UserInterface } from '@/actions/user/show'
import { CommentForm } from '@/components/form/commentForm'
import { DropdownPost } from '@/components/other/dropdownPost'
import { DropdownComment } from '@/components/other/dropdownComment'
import LinkPagination from '@/components/other/LinkPagination'
import { Post } from '@/components/dashboard/cardPost'

export const CardPostsProfileComponent = async ({
  data,
  query,
  countPage,
}: {
  data: Post[]
  query: number
  countPage: number
}) => {
  const dt = await ShowUser()
  const user: UserInterface = dt.data

  return (
    <>
      {data &&
        data.map((post) => (
          <div className="bg-zinc-800 min-h-32 p-6 " key={post.idPost}>
            <div className="flex justify-between items-center">
              <div className="">
                <Link href={`/user/profile/${post.idUser}`}>
                  <span className="uppercase font-bold">{post.firstName}</span>{' '}
                  <span> {post.lastName}</span>
                </Link>
              </div>
              <div className="opacity-50 flex gap-2">
                {FormatData(post.created_at)}
                {user.idUser === post.idUser && (
                  <DropdownPost idPost={post.idPost} />
                )}
              </div>
            </div>
            <div className="mt-4 text-white text-justify break-words">
              <p>{post.description}</p>
              {post.imageUrlOne && (
                <Image
                  // src={`/mnt/069E34C19E34AB57/SocialMidia/Api/storage/app/public/img/${post.imageUrlOne}`}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sBJBIfQ8eG49ACgcJGpIfiGBXksA_-CayA&usqp=CAU"
                  alt="Image post"
                  width={550}
                  height={550}
                  className="object-scale-down mx-auto w-80 h-80"
                />
              )}
            </div>
            {post.comments.length > 0 && (
              <div className="mt-4 text-justify bg-zinc-700 rounded-lg max-w-full">
                <h2 className="px-3 font-semibold">Comentários</h2>
                {post.comments.map((comment) => (
                  <div key={comment.idComment} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="uppercase font-bold">
                          {comment.firstName}
                        </span>{' '}
                        <span> {comment.lastName}</span>
                      </div>
                      <div className="opacity-50 flex gap-2">
                        {FormatData(comment.created_at)}
                        {user.idUser === comment.idUser && (
                          <DropdownComment idComment={comment.idComment} />
                        )}
                      </div>
                    </div>
                    <div className="text-wrap break-words text-justify">
                      <p className="min-h-5">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-zinc-700 h-auto p-4 rounded-lg mt-2">
              <CommentForm idPost={post.idPost} />
            </div>
          </div>
        ))}
      <LinkPagination query={query} countPage={countPage} />
    </>
  )
}
