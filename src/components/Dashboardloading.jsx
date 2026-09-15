import '../App.css'

export default function DashboardSkeleton() {
    return (
        <div className="dashboard-page">
            <div className="skeleton-nav">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-avatar"></div>
            </div>

            <div className="skeleton-blogs">
                <div className="skeleton skeleton-blogs-header"></div>

                {[1, 2].map((i) => (
                    <div className="skeleton-blog-post" key={i}>
                        <div className="skeleton skeleton-blog-title"></div>
                        <div className="skeleton skeleton-blog-meta"></div>
                        <div className="skeleton skeleton-blog-line"></div>
                        <div className="skeleton skeleton-blog-line short"></div>
                        <div className="skeleton-blog-actions">
                            <div className="skeleton skeleton-action"></div>
                            <div className="skeleton skeleton-action"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}