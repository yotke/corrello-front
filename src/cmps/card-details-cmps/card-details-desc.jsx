export function CardDetailsDesc({ card }) {

    return (
        <div className="card-details-desc">
            <div className="card-details-desc-title">
                <h3>Description:</h3>
            </div>
            <div className="card-details-desc-title">
                {card.description}
            </div>
        </div>
    )
}