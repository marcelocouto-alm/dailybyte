import React, { useState } from "react";
import Post from "../post";
import './style.css';

export default function PostList({ posts }) {

  // Usa o estado para manter o controle da página atual
  const [currentPage, setCurrentPage] = useState(1);

  // Retorna os 10 posts da página atual
  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return posts.slice(startIndex, endIndex);
  }

  // Incrementa ou decrementa a página atual
  const changePage = (pageIncrement) => {
    const newPage = currentPage + pageIncrement;

    // Verifica se a nova página está dentro dos limites possíveis
    if (newPage >= 1 && newPage <= Math.ceil(posts.length / 10)) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="post-list-container">
      {
        // Renderiza cada post da página atual utilizando o componente Post
        getCurrentPagePosts().map((post) => {
          return <Post post={post} key={post.id} />
        })
      }
      <div className="pagination">
        <button onClick={() => changePage(-1)}>Anterior</button>
        <span>Página {currentPage} de {Math.ceil(posts.length / 10)}</span>
        <button onClick={() => changePage(1)}>Próxima</button>
      </div>
    </div>
  )
}
