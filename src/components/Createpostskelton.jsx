import React from 'react'

export const Createpostskelton = () => {
  return (
    <div className="skeleton-blog-post">
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div className="skeleton skeleton-avatar" style={{ width: 32, height: 32 }}></div>
        <div className="skeleton" style={{ width: 90, height: 14 }}></div>
      </div>

     
      <div className="skeleton skeleton-blog-title"></div>

      
      <div className="skeleton skeleton-blog-meta"></div>
    
      <div className="skeleton skeleton-blog-line"></div>
      <div className="skeleton skeleton-blog-line"></div>
      <div className="skeleton skeleton-blog-line short"></div>

      
      <div className="skeleton-blog-actions">
        <div className="skeleton skeleton-action"></div>
        <div className="skeleton skeleton-action"></div>
      </div>
    </div>
  );
}
