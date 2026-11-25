function FeedCard({ image, name, location, onRemove }) {
    return (
        <div className="feed-card">
            {image ? (
                <img src={image} alt={name} />
            ) : (
                <div className="feed-card-no-image">No image</div>
            )}

            <div className="feed-card-details">
                <h3>{name}</h3>
                <p>{location}</p>
            </div>

            <button onClick={onRemove}>Remove</button>
        </div>
    );
}

export default FeedCard;