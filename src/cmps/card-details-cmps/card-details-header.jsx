export function CardDetailsHeader({ card }) {

    return (
        <div className="card-details-header">
            <h3>Header:</h3>
            <h3>Title: {card.title}</h3>
            <h3>Due date: {card.dueDate}</h3> 
            
        </div>
    )
}