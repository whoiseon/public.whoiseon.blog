'use client';

import { css } from '@styled-system/css';
import { Post } from '@/lib/api/types';
import PostHead from '@/components/post/PostHead';
import Image from 'next/image';
import MarkdownRender from '@/components/common/MarkdownRender';
import { parseHeadings } from '@/lib/heading';
import PostNav from '@/components/post/PostNav';
import { format } from 'date-fns';
import MyProfileCard from '@/components/post/MyProfileCard';
import QuickPostLink from '@/components/post/QuickPostLink';

interface Props {
  post: Post;
}

function ViewContainer({ post }: Props) {
  console.log(post);
  const toc = parseHeadings(post.body!);

  return (
    <div className={postBlock}>
      <div
        className={css({
          flex: '1',
          pb: '4rem',
        })}
      >
        <PostHead
          title={post.title}
          tags={post.tags}
          createdAt={post.createdAt}
        />
        {post.thumbnail && (
          <Image
            className={css({
              position: 'relative',
              overflow: 'hidden',
              my: '2.5rem',
              aspectRatio: '16 / 9',
            })}
            src={post.thumbnail}
            alt={post.title as string}
            width={768}
            height={432}
            priority
          />
        )}
        <MarkdownRender
          markdown={post.body}
          className={css({
            px: '1rem',
            md: {
              px: 0,
            },
          })}
        />
        <div
          className={css({
            mt: '6rem',
            md: {
              mt: '8rem',
            },
          })}
        >
          <div
            className={css({
              px: '1rem',
              mb: '2.5rem',
              md: {
                px: 0,
              },
            })}
          >
            <span
              className={css({
                color: 'destructive1',
              })}
            >
              마지막 업데이트{' '}
            </span>
            <span
              className={css({
                color: 'text4',
              })}
            >
              {format(new Date(post.updatedAt!), 'yyyy년 MM월 dd일')}
            </span>
          </div>
          <MyProfileCard />
          <div
            className={css({
              bg: 'outline1',
              height: '1px',
              my: '2rem',
            })}
          />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: '1rem',
              gap: '1rem',
              md: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 0,
                gap: 0,
              },
            })}
          >
            <div
              className={css({
                width: '100%',
                md: {
                  width: 'auto',
                },
              })}
            >
              {post.prevPost && (
                <QuickPostLink
                  slug={post.prevPost.urlSlug}
                  title={post.prevPost.title}
                  type="prev"
                />
              )}
            </div>
            <div
              className={css({
                width: '100%',
                md: {
                  width: 'auto',
                },
              })}
            >
              {post.nextPost && (
                <QuickPostLink
                  slug={post.nextPost.urlSlug}
                  title={post.nextPost.title}
                  type="next"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={css({
          display: 'none',
          md: {
            display: 'block',
            width: '224px',
            position: 'sticky',
            top: '117px',
            px: '0.5rem',
            py: '0.25rem',
            overflowY: 'auto',
          },
        })}
      >
        <PostNav toc={toc} />
      </div>
    </div>
  );
}

const postBlock = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 0,
  mt: '1.5rem',
  md: {
    gap: '2.5rem',
    mt: '3.5rem',
    px: 0,
  },
});

export default ViewContainer;
