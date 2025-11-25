export default function Filter() {

    return(
        <section className="filter-container">
            <div className="filter">
                <h2>Sort by:</h2>

                <select >
                    <option value="">Newest Added</option>
                        <option>
                        </option>
                </select>

                <select >
                    <option value="">All Shows</option>
                    <option value="newest">Newest</option>
                    <option value="upDown">A - Z</option>
                    <option value="downUp">Z - A</option>
                </select>
            </div>
        </section>
    )
}