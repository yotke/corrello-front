export function CardDetailsHeader({ card }) {

    return (
        <div className="card-details-header">
            <h3>Header:</h3>
            Title: {card.title}
        </div>
    )
}