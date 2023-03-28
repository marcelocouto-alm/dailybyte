import React, { useState } from "react";
import './style.css';

export default function Post({ post }) {

  // Estado para controlar a exibição dos comentários
  const [showComments, setShowComments] = useState(false);

  // Função para alternar a exibição dos comentários
  const toggleComments = () => {
    setShowComments(!showComments);
  }

  return (
    <div className="post">
      <h3 className="title-post">{post.title}</h3>
      <h4 className="author-post">{post.authorName}</h4>
      <p className="body-post">{post.body}</p>

      {/* Título para alternar a exibição dos comentários */}
      <h3 className="title-comments" onClick={toggleComments}>
        {showComments ? 'Esconder comentários' : 'Mostrar comentários'}
      </h3>

      {/* Condição para exibir os comentários caso showComments seja true */}
      {showComments && (
        <div className="container-comments">
          {post.comments && post.comments.map(comment => (
            <div key={comment.id}>
              <p className="name-comment">· {comment.name}</p>
              <p className="body-comment">{comment.body}</p>
              <p className="author-comment">{comment.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
