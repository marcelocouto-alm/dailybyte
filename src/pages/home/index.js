import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import PostList from "../../components/post-list/post-list";
import './style.css';

export default function Home() {

  // Estado para armazenar os posts
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função assíncrona para buscar posts, usuários e comentários da API
  async function getPosts() {
    setIsLoading(true);

    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsData = await postsResponse.json();

    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersData = await usersResponse.json();

    // Mapeia cada post para uma lista de promessas de comentários
    const commentPromises = postsData.map(post => {
      const url = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
      return fetch(url).then(response => response.json());
    });

    // Aguarda a resolução de todas as promessas de comentários
    const commentsData = await Promise.all(commentPromises);

    // Mapeia os dados dos posts, usuários e comentários para a estrutura desejada
    const updatedPosts = postsData.map(post => {
      const user = usersData.find(user => user.id === post.userId);
      const comments = commentsData.find(commentList => commentList[0].postId === post.id);
      return { ...post, authorName: user.name, comments };
    });

    // Atualiza o estado com os posts atualizados
    setTimeout(() => {
      setIsLoading(false);
      setPosts(updatedPosts);
    }, 4000);
  }

  // useEffect para chamar a função getPosts na montagem do componente
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <div className="loader">
          <span class="loader-text">Carregando</span>
          <span class="load"></span>
        </div>
      ) : (
        <main className="content">
          <h2 className="sub-title">Desenvolvido por <a href="https://marcelo-couto.web.app/" target="_blank"> Marcelo Couto</a></h2>
          <PostList posts={posts} />
        </main>
      )}
    </div>
  )

}