import Head from 'next/head'
import {Container, TitleContainer} from '../styles/Home'

import Link from 'next/link'
import { RichText } from 'prismic-reactjs';
import { fetchAPI } from '../lib/api-prismic';


interface HomeProps {
  posts: NodePost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Container>
      <Head>
        <title>Rocketseat | Blog Next.JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TitleContainer>
        
      </TitleContainer>

     <ul>
       {posts?.map(({ node }) => (
         <li key={`post-${node._meta.uid}`}>
            <Link href={`posts/${node._meta.uid}`}>
              <a>
                <img width="100" src={node.thumbnail.url} />
                {RichText.render(node.title)}
              </a>
            </Link>
         </li>
       ))}
     </ul>
    </Container>
  )
}

export async function getServerSideProps() {
  const posts = await fetchAPI(`
    query {
      allPosts {
        edges {
          node{
            _meta {
              uid
            }
            title
            thumbnail
            content
          }
        }
      }
    }
  `, {});

  return {
    props: {
      posts: posts.allPosts.edges,
    }
  }
}

