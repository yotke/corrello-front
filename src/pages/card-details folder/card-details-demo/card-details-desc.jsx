export function CardDetailsDesc({ card }) {

    return (
        <div className="card-details-desc">
            <div className="card-details-desc-title">
                <h3>Description:{card.description}</h3>
            </div>
        </div>
    )
}